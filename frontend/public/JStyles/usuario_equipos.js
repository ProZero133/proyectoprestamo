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
    const columnsToShow = ['modelo', 'RAM', 'PROCESADOR'];

    // Añade celdas con la información del equipo
    columnsToShow.forEach(columnName => {
        const cell = document.createElement('td');
        cell.textContent = equipment[columnName] || 'N/A'; // Utiliza 'N/A' si el valor es nulo o indefinido
        newRow.appendChild(cell);
    });

    // Añade una celda para el checkbox al final de la fila
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.code = equipment['codigo_equipo']; // Almacena el código del equipo como atributo de datos
    checkboxCell.appendChild(checkbox);
    newRow.appendChild(checkboxCell);

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

// Función para realizar la búsqueda
function performSearch() {
    const computerName = document.getElementById('computerName').value;
    const processor = document.getElementById('processor').value;
    const ram = document.getElementById('ram').value;

    // Llama a la función que realiza la búsqueda en el backend
    // Puedes ajustar los parámetros según sea necesario
    performSearch(computerName, processor, ram);
}

// Función para enviar la solicitud al backend
function sendRequest() {
    // Obtén todas las filas de la tabla
    const tableRows = document.querySelectorAll('#equipment-table tbody tr');

    // Array para almacenar los datos de las filas seleccionadas
    const selectedRowsData = [];

    // Recorre cada fila de la tabla
    tableRows.forEach(row => {
        // Obtiene el checkbox de la fila
        const checkbox = row.querySelector('input[type="checkbox"]');

        // Verifica si el checkbox está marcado
        if (checkbox.checked) {
            // Objeto para almacenar los datos de la fila actual
            const rowData = {
                modelo: row.cells[0].textContent,
                RAM: row.cells[1].textContent,
                procesador: row.cells[2].textContent
                // Agrega más propiedades según sea necesario
            };

            // Agrega los datos al array
            selectedRowsData.push(rowData);
        }
    });

    // Realiza una solicitud fetch al servidor
    fetch('/api/user-home/EnviarSolicitud', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selectedRows: selectedRowsData
            // Puedes agregar más datos si es necesario
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Maneja la respuesta del servidor aquí
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => console.error('Error al enviar la solicitud:', error));
}