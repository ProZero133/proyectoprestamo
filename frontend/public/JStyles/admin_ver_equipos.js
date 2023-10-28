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
// ... Tu código existente ...

// Agrega un evento al botón de búsqueda
document.getElementById("search-button").addEventListener("click", function () {
    const searchInput = document.getElementById("search-input").value;
    const filterModel = document.getElementById("filter-model").value;
    const filterType = document.getElementById("filter-type").value;
    const filterState = document.getElementById("filter-state").value;
    const filterCondition = document.getElementById("filter-condition").value;
    const filterOwner = document.getElementById("filter-owner").value;

    // Lógica de búsqueda en el backend
    // Realiza una solicitud al backend con los valores de búsqueda y filtros
    // Recibe los resultados y actualiza la tabla en la página
    // Aquí puedes usar AJAX, Fetch o cualquier otra biblioteca o enfoque que prefieras

    // Ejemplo: llamada a una función que maneja la búsqueda en el backend
    performSearch(searchInput, filterModel, filterType, filterState, filterCondition, filterOwner);
});

function performSearch(searchInput, filterModel, filterType, filterState, filterCondition, filterOwner) {
    // Simula una solicitud al backend y resultados de ejemplo
    const equipmentData = [
        {
            modelo: 'Equipo 1',
            tipo: 'Portátil',
            estado: 'Nuevo',
            condicion: 'Buena',
            propietario: 'Departamento 1',
            'fecha-llegada': '2023-01-10',
            'fecha-salida': '2023-01-15',
        },
        // Agrega más datos de equipos aquí
    ];

    // Filtra los resultados en función de los criterios de búsqueda y filtros
    const filteredResults = equipmentData.filter((equipment) => {
        return (
            (searchInput === '' || equipment.modelo.toLowerCase().includes(searchInput.toLowerCase())) &&
            (filterModel === '' || equipment.modelo === filterModel) &&
            (filterType === '' || equipment.tipo === filterType) &&
            (filterState === '' || equipment.estado === filterState) &&
            (filterCondition === '' || equipment.condicion === filterCondition) &&
            (filterOwner === '' || equipment.propietario === filterOwner)
        );
    });

    // Limpia la tabla
    const tableBody = document.querySelector('#equipment-table tbody');
    tableBody.innerHTML = '';

    // Agrega las filas a la tabla
    filteredResults.forEach((equipment) => {
        addEquipmentRow(equipment);
    });
}

// ... Más código para manipular la tabla de resultados ...
