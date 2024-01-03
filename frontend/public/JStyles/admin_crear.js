// Funcion de click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

// Variables
var side_menu = document.getElementById("menu__side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");
let listaUsuarios = [];
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

// Abrir el modal
document.getElementById("registrarBtn").addEventListener("click", function (event) {
    event.preventDefault();
    crearUsuario()
        .then(creacionExitosa => {
            if (creacionExitosa) {
 
                const confirmacion = confirm('Usuario registrado con éxito. ¿Deseas realizar otra acción?');
                if (confirmacion) {

                    window.location.href = '/api/admin-home';
                } else {
                    // El usuario hizo clic en "Cancelar" (false) o cerró la ventana emergente
                    // Puedes realizar alguna acción adicional si es necesario
                }
            }
        })
        .catch(error => console.error('Error al crear usuario:', error));
});
document.addEventListener('DOMContentLoaded', function () {


    // Obtener la lista de equipos desde el servidor
    fetch('/api/admin-home/CargarUsuarios')
        .then(response => response.json())
        .then(data => {
            AlmacenarUsuarios(data);
        })
        .catch(error => {
            console.error('Error al obtener Usuarios:', error);
        });
});

    function AlmacenarUsuarios(data) {
        listaUsuarios = [];
        data.forEach(usuario => {
            listaUsuarios.push({
                rutUsuario: usuario.rut_usuario,
            });
        });
        console.log("Usuarios almacenados en listaUsuarios:", listaUsuarios);
    }
// Cerrar el modal
function cerrarModal() {
    var modal = document.getElementById('miModal');
    modal.style.display = 'none';
}
function existeUsuario(rut) {
    return listaUsuarios.some(usuario => usuario.rutUsuario === rut);
}
function crearUsuario() {
    return new Promise((resolve, reject) => {
        const nombre = document.getElementById('nombre').value;
        const rut = document.getElementById('rut').value;
        const carrera = document.getElementById('carrera').value;
        const celular = document.getElementById('celular').value;
        const correo = document.getElementById('correo').value;
        const direccion = document.getElementById('direccion').value;
        const contrasena = document.getElementById('contrasena').value;
        const rol = document.getElementById('rol').value;
        const mensajeElemento = document.getElementById('mensajeError');

        if (existeUsuario(rut)) {
            mensajeElemento.textContent = 'Error: El rut ya existe';
            resolve(false);  // No se envía la solicitud al servidor si ya existe
            return;
        }

        mensajeElemento.textContent = '';

        fetch('/api/admin-home/crear-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                rut_usuario: rut,
                carrera: carrera,
                correo: correo,
                direccion: direccion,
                contrasena: contrasena,
                rol: rol,
                // Agrega otros campos si es necesario
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuario registrado con éxito:', data);
            mensajeElemento.textContent = 'Usuario registrado con éxito';
            resolve(true);  // Indica que la creación fue exitosa
        })
        .catch(error => {
            console.error('Error al registrar usuario:', error);
            mensajeElemento.textContent = 'Error al registrar usuario';
            reject(error);  // Indica que hubo un error en la creación
        });
    });
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