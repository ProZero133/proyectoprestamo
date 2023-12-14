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
async function cargarDatosEnTablaDesdeServidor() {
    try {

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

        // Extrae el valor de la cookie 'token'
        const tokenValue = tokenCookie.split('=')[1];

        // Decodifica el token y extrae la propiedad 'rut'
        const payloadBase64 = tokenValue.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        const response = await fetch(`/api/user-home/ObtenerHistorial/${payload.rut}`);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }

        // Convierte la respuesta a formato JSON
        const data = await response.json();

        // Obtén la referencia a la tabla en el DOM
        const tableBody = document.querySelector('table tbody');

        // Limpia el contenido actual de la tabla
        tableBody.innerHTML = '';

        // Itera sobre los datos y agrega filas a la tabla
        for (const row of data) {
            const newRow = tableBody.insertRow();
            // Realiza una solicitud fetch al servidor para obtener los detalles del equipo
            const detallesEquipoResponse = await fetch(`/api/user-home/ObtenerEquipoHistorial/${row.equipo}`);
            
            // Verifica si la respuesta es exitosa
            if (detallesEquipoResponse.ok) {
                const detallesEquipoData = await detallesEquipoResponse.json();
                const primerElemento = detallesEquipoData[0];
                // Añade celdas con los datos de la fila
                const fechaCell = newRow.insertCell();
                fechaCell.textContent = row.fecha;
        
                const horaSolicitudCell = newRow.insertCell();
                horaSolicitudCell.textContent = row.horasolicitud;
        
                const horaEntregaCell = newRow.insertCell();
                horaEntregaCell.textContent = row.horaentrega;
        
                // Añade celdas con los datos de la tabla equipo
                const tipoCell = newRow.insertCell();
                tipoCell.textContent = primerElemento.tipo;
        
                const modeloCell = newRow.insertCell();
                modeloCell.textContent = primerElemento.modelo;
                
                const equiposolicitado = newRow.insertCell();
                equiposolicitado.textContent = row.equipo;
                // Puedes agregar más celdas según sea necesario...
            } else {
                console.error(`Error al obtener detalles del equipo para ${row.equipo}`);
                // Manejar el error de la solicitud al servidor según tus necesidades
            }
        }
    } catch (error) {
        console.error('Error al cargar datos en la tabla:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarDatosEnTablaDesdeServidor);
