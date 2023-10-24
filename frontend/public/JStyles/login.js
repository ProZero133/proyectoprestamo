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