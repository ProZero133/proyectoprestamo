// Funcion de click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

// Variables
var side_menu = document.getElementById("menu__side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");

function open_close_menu() {
    body.classList.toggle("body_move");
    side_menu.classList.toggle("menu__side_move");
}

// Oculta el menú al recargar si la página es pequeña
if (window.innerWidth < 760) {
    body.classList.add("body_move");
    side_menu.classList.add("menu__side_move");
}

// Menú adaptable
window.addEventListener("resize", function () {
    if (this.window.innerWidth > 760) {
        body.classList.remove("body_move");
        side_menu.classList.remove("menu__side_move");
    }
    if (this.window.innerWidth < 760) {
        body.classList.remove("body_move");
        side_menu.classList.remove("menu__side_move");
    }
});
document.getElementById('equipos').addEventListener('click', function () {
    var submenu = document.getElementById('equiposSubmenu');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});
document.getElementById('usuario').addEventListener('click', function () {
    var submenu = document.getElementById('equiposUsuario');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});
document.getElementById('faltas').addEventListener('click', function () {
    var submenu = document.getElementById('adminFaltas');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});

function addEquipmentRow(equipment) {
    // Obtén la referencia a la tabla
    const tableBody = document.querySelector('#equipment-table tbody');

    // Crea una nueva fila
    const newRow = document.createElement('tr');

    // Añade celdas con la información del equipo
    const columns = ['codigo_equipo', 'numero_inventario', 'modelo', 'tipo', 'estado', 'condicion', 'propietario', 'fechallegada', 'carrera'];
    columns.forEach(columnName => {
        const cell = document.createElement('td');
        if (columnName.startsWith('Fecha')) {
            // Formatea las fechas si existen
            if (equipment[columnName]) {
                const date = new Date(equipment[columnName]);
                cell.textContent = date.toLocaleDateString(); // O utiliza otros métodos de formato de fecha
            } else {
                cell.textContent = 'N/A'; // O algún otro valor predeterminado para fechas nulas
            }
        } else {
            cell.textContent = equipment[columnName];
        }
        newRow.appendChild(cell);
    });
    // Añade una celda para el botón "Editar"
    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => openEditModal(equipment));
    editCell.appendChild(editButton);
    newRow.appendChild(editCell);
    // Añade la nueva fila a la tabla
    tableBody.appendChild(newRow);
}
// Agrega un evento al botón de búsqueda
document.getElementById("search-button").addEventListener("click", function () {
    const searchInput = document.getElementById("search-input").value;
    const filterModel = document.getElementById("filter-model").value;
    const filterType = document.getElementById("filter-type").value;
    const filterState = document.getElementById("filter-state").value;
    const filterCondition = document.getElementById("filter-condition").value;
    const filterOwner = document.getElementById("filter-owner").value;


    // Ejemplo: llamada a una función que maneja la búsqueda en el backend
    performSearch(searchInput, filterModel, filterType, filterState, filterCondition, filterOwner);
});

function performSearch(searchInput, filterModel, filterType, filterState, filterCondition, filterOwner) {
    // Realiza una solicitud al backend con los valores de búsqueda y filtros
    fetch('/api/admin-home/ObtenerEquipos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchInput: searchInput,
            filterModel: filterModel,
            filterType: filterType,
            filterState: filterState,
            filterCondition: filterCondition,
            filterOwner: filterOwner,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Llama a una función para actualizar la tabla con los datos de equipos
            updateEquipmentTable(data);
        })
        .catch(error => console.error('Error al obtener datos de equipos:', error));
}

// ... Más código para manipular la tabla de resultados ...
document.addEventListener("DOMContentLoaded", function () {
    // Realiza una solicitud para obtener los datos de equipos desde el servidor
    fetch('/api/admin-home/ObtenerEquipos')  // Modifica la ruta aquí
        .then(response => response.json())
        .then(data => {
            // Llama a una función para actualizar la tabla con los datos de equipos
            updateEquipmentTable(data);
        })
        .catch(error => console.error('Error al obtener datos de equipos:', error));
});

function updateEquipmentTable(equipmentData) {
    // Limpia la tabla
    const tableBody = document.querySelector('#equipment-table tbody');
    tableBody.innerHTML = '';

    // Agrega las filas a la tabla con los datos de equipos
    equipmentData.forEach((equipment) => {
        addEquipmentRow(equipment);
    });
};
function openEditModal(equipment) {
    // Crear el modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Editar Equipo</h2>
            <label for="codigo_equipo">Número de Serie:</label>
            <input type="text" id="codigo_equipo" value="${equipment.codigo_equipo}" />

            <label for="numero_inventario">Número de Inventario:</label>
            <input type="text" id="numero_inventario" value="${equipment.numero_inventario}" />

            <label for="modelo">Modelo:</label>
            <input type="text" id="model" value="${equipment.modelo}" />

            <label for="tipo">Tipo:</label>
            <select id="tipo">
                <option value="A" ${equipment.tipo === 'A' ? 'selected' : ''}>A</option>
                <option value="B" ${equipment.tipo === 'B' ? 'selected' : ''}>B</option>
            </select>

            <label for="estado">Estado:</label>
            <select id="estado">
                <option value="Disponible" ${equipment.estado === 'Disponible' ? 'selected' : ''}>Disponible</option>
                <option value="No Disponible" ${equipment.estado === 'No Disponible' ? 'selected' : ''}>No Disponible</option>
            </select>

            <label for="condicion">Condición:</label>
            <select id="condicion">
                <option value="Nuevo" ${equipment.condicion === 'Nuevo' ? 'selected' : ''}>Nuevo</option>
                <option value="Usado" ${equipment.condicion === 'Usado' ? 'selected' : ''}>Usado</option>
            </select>

            <label for="propietario">Propietario:</label>
            <select id="propietario">
            <option value="propiedad-de-la-u" ${equipment.propietario === 'propiedad-de-la-u' ? 'selected' : ''}>UBB</option>
            <option value="arrendado" ${equipment.propietario === 'arrendado' ? 'selected' : ''}>Arrendado</option>
            </select>

            <label for="carrera">Carrera:</label>
            <select id="carrera">
                <option value="ICINF" ${equipment.carrera === 'ICINF' ? 'selected' : ''}>ICINF</option>
                <option value="IECI" ${equipment.carrera === 'IECI' ? 'selected' : ''}>IECI</option>
            </select>
            <label for="visible_equipo">Visibilidad:</label>
            <select id="visible_equipo">
            <option value="0" ${equipment.visible_equipo === 0 ? 'selected' : ''}>Invisible</option>
            <option value="1" ${equipment.visible_equipo === 1 ? 'selected' : ''}>Visible</option>
        </select>

            <button id="saveChanges">Guardar Cambios</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Cierra el modal al hacer clic en la "x"
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => document.body.removeChild(modal));

    // También puedes cerrar el modal al hacer clic fuera del contenido
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Manejar la lógica de guardar cambios
    const saveButton = modal.querySelector('#saveChanges');
    saveButton.addEventListener('click', () => saveChanges());
}

function saveChanges() {
    console.log('Guardando cambios...');
    // Obtener los valores actualizados del modal
    const codigo_equipo = document.getElementById('codigo_equipo').value;
    console.log("codigo del equipo a editar: " + codigo_equipo);
    const numero_inventario = document.getElementById('numero_inventario').value;
    console.log("Numero inventario: " + numero_inventario);
    const tipo = document.getElementById('tipo').value;
    console.log("tipo: " + tipo);
    const estado = document.getElementById('estado').value;
    console.log("estado: " + estado);
    const condicion = document.getElementById('condicion').value;
    console.log("condicion: " + condicion);
    const modelo = document.getElementById('model').value;
    console.log("modelo: " + modelo);
    const carrera = document.getElementById('carrera').value;
    console.log("carrera: " + carrera);
    const visibilidad_equipo = document.getElementById('visible_equipo').value;
    console.log("visibilidad: " + visibilidad_equipo);
    console.log("codigo del equipo a editar: " + codigo_equipo);
    // Realizar una solicitud al backend para actualizar los datos
    fetch('/api/admin-home/equipos/actualizar-equipo', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            codigo_equipo,
            numero_inventario,
            tipo,
            estado,
            condicion,
            modelo,
            carrera,
            visibilidad_equipo,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Verifica si la actualización fue exitosa
            if (data.success) {
                // Realiza una nueva búsqueda y actualiza la tabla
                performSearch();
            } else {
                console.error('Error al actualizar equipo:', data.error);
            }
        })
        .catch(error => console.error('Error al enviar solicitud de actualización:', error));

    // Cerrar el modal
    const modal = document.querySelector('.modal');
    document.body.removeChild(modal);
}

// Añade un evento de clic para cada ícono de la barra lateral
document.getElementById('equipos').addEventListener('click', function () {
    toggleSideMenu();
});

document.getElementById('usuario').addEventListener('click', function () {
    toggleSideMenu();
});

document.getElementById('faltas').addEventListener('click', function () {
    toggleSideMenu();
});

// Función para alternar la visibilidad de la barra lateral
function toggleSideMenu() {
    var isSideMenuVisible = side_menu.classList.contains("menu__side_move");

    // Si la barra lateral no está visible, se abre
    if (!isSideMenuVisible) {
        body.classList.add("body_move");
        side_menu.classList.add("menu__side_move");
    }
}