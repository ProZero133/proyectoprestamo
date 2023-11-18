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


function obtenerCarreraDesdeToken() {
    // Obtén todas las cookies
    const cookies = document.cookie;

    // Si no hay cookies, devuelve null
    if (!cookies) {
        console.error('No se encontraron cookies.');
        return null;
    }

    // Divide las cookies en un array
    const cookieArray = cookies.split('; ');

    // Busca la cookie 'token' en el array de cookies
    const tokenCookie = cookieArray.find(cookie => cookie.startsWith('token='));

    // Si no se encuentra la cookie 'token', devuelve null
    if (!tokenCookie) {
        console.error('La cookie "token" no se encontró.');
        return null;
    }

    try {
        // Extrae el valor de la cookie 'token'
        const tokenValue = tokenCookie.split('=')[1];

        // Decodifica el token y extrae la propiedad 'carrera'
        const payloadBase64 = tokenValue.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        // Verifica si la propiedad 'carrera' existe en el payload
        if (payload && payload.carrera) {
            console.log('Carrera obtenida correctamente:', payload.carrera);
            return payload.carrera;
        } else {
            console.error('La propiedad "carrera" no se encontró en el payload del token.');
            return null;
        }
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

function performSearch(searchInput, filterModel, filterType, filterState, filterCondition, filterOwner) {
    console.log('Realizando búsqueda con carrera:');
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
    const carrera = obtenerCarreraDesdeToken();
    
    if (carrera) {
        console.log("Buscando equipos para la carrera: " + carrera);
        fetch('/api/user-home/solicitar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carrera: carrera,
                // Otros campos si es necesario
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            updateEquipmentTable(data);
        })
        .catch(error => console.error('Error al obtener datos de equipos:', error));
    } else {
        console.error('No se pudo obtener la carrera desde la cookie.');
    }
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