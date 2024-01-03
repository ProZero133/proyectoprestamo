document.addEventListener("DOMContentLoaded", function () {
    var inputFields = document.querySelectorAll(".input-group input");

    inputFields.forEach(function (input) {
        input.addEventListener("focus", function () {
            input.previousElementSibling.style.top = "-10px";
            input.previousElementSibling.style.fontSize = "12px";
            input.previousElementSibling.style.color = "#6C3483";
        });

        input.addEventListener("blur", function () {
            if (input.value === "") {
                input.previousElementSibling.style.top = "10px";
                input.previousElementSibling.style.fontSize = "16px";
                input.previousElementSibling.style.color = "#adadad";
            }
        });

        if (input.value !== "") {
            input.previousElementSibling.style.top = "-10px";
            input.previousElementSibling.style.fontSize = "12px";
            input.previousElementSibling.style.color = "#6C3483";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var inputFields = document.querySelectorAll(".input-group input");

    inputFields.forEach(function (input) {
        // ... (tu código actual para gestionar etiquetas flotantes)
    });

    // Agrega el evento click al enlace de olvidoContrasena
    document.getElementById("olvidoContrasena").addEventListener("click", function (event) {
        event.preventDefault(); // Evita la acción predeterminada del enlace
        mostrarModal();
    });

    // Función para cerrar el modal
    function cerrarModal() {
        var modal = document.getElementById("modalOlvidoContrasena");
        modal.style.display = "none";
    }

    // Agrega el evento click al botón de cierre del modal
    document.querySelector(".close").addEventListener("click", function () {
        cerrarModal();
    });

    // Agrega el evento click al fondo oscuro del modal para cerrarlo
    window.addEventListener("click", function (event) {
        var modal = document.getElementById("modalOlvidoContrasena");
        if (event.target === modal) {
            cerrarModal();
        }
    });
});

// Función para mostrar el modal
function mostrarModal() {
    var modal = document.getElementById("modalOlvidoContrasena");
    modal.style.display = "block";
}