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
document.addEventListener("DOMContentLoaded", function () {
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
    var passwordChangeForm = document.getElementById("passwordChangeForm");

    passwordChangeForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera convencional

        var rut = payload.rut;
        var currentPassword = document.getElementById("currentPassword").value;
        var newPassword = document.getElementById("newPassword").value;
        var confirmNewPassword = document.getElementById("confirmNewPassword").value;

        if (newPassword !== confirmNewPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        fetch('/api/user-home/Perfil/CambiarContra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rut: rut,
                contrasenaActual: currentPassword,
                contrasenaNueva: newPassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});