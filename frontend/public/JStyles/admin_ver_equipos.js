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
    const columns = ['codigo_equipo','numero_inventario','modelo', 'tipo', 'estado', 'condicion', 'propietario', 'fechallegada', 'carrera'];
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
            <input type="text" id="codigo_equipo" value="${equipment.numeroSerie}" />

            <label for="codigo_inventario">Número de Inventario:</label>
            <input type="text" id="codigo_inventario" value="${equipment.numeroInventario}" />

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

            <label for="modelo">Modelo:</label>
            <input type="text" id="model" value="${equipment.modelo}" />

            <label for="carrera">Carrera:</label>
            <select id="carrera">
                <option value="ICINF" ${equipment.carrera === 'ICINF' ? 'selected' : ''}>ICINF</option>
                <option value="IECI" ${equipment.carrera === 'IECI' ? 'selected' : ''}>IECI</option>
            </select>

            <button id="saveChanges">Guardar Cambios</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Cierra el modal al hacer clic en la "x"
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => document.body.removeChild(modal));

    // Manejar la lógica de guardar cambios
    const saveButton = modal.querySelector('#saveChanges');
    saveButton.addEventListener('click', () => saveChanges(equipment));
}

function saveChanges(equipment) {
    // Obtener los valores actualizados del modal
    const codigo_equipo = document.getElementById('codigo_equipo').value;
    const codigo_inventario = document.getElementById('codigo_inventario').value;
    const tipo = document.getElementById('tipo').value;
    const estado = document.getElementById('estado').value;
    const condicion = document.getElementById('condicion').value;
    const modelo = document.getElementById('modelo').value;
    const carrera = document.getElementById('carrera').value;

    // Actualizar los valores del equipo
    equipment.numeroSerie = codigo_equipo;
    equipment.numeroInventario = codigo_inventario;
    equipment.tipo = tipo;
    equipment.estado = estado;
    equipment.condicion = condicion;
    equipment.modelo = modelo;
    equipment.carrera = carrera;

    // Cerrar el modal
    const modal = document.querySelector('.modal');
    document.body.removeChild(modal);
}