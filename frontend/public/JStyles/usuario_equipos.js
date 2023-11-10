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

function addEquipmentRow(equipment) {
    // Obtén la referencia a la tabla
    const tableBody = document.querySelector('#equipment-table tbody');

    // Crea una nueva fila
    const newRow = document.createElement('tr');

    // Añade celdas con la información del equipo
    const columnsToShow = ['codigo_equipo', 'tipo', 'condicion'];
    columnsToShow.forEach(columnName => {
        const cell = document.createElement('td');
        cell.textContent = equipment[columnName] || 'N/A'; // Utiliza 'N/A' si el valor es nulo o indefinido
        newRow.appendChild(cell);
    });

    // Añade la nueva fila a la tabla
    tableBody.appendChild(newRow);
}




function performSearch(searchInput, filterModel, filterType, filterState, filterCondition, filterOwner) {
    // Realiza una solicitud al backend con los valores de búsqueda y filtros
    fetch('/api/user-home/solicitar', {
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





document.addEventListener("DOMContentLoaded", function () {
    // Realiza una solicitud para obtener los datos de equipos desde el servidor
    fetch('/api/user-home/solicitar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // Contenido del cuerpo de la solicitud
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
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