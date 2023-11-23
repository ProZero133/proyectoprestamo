// admin_solicitudes.js

// Función para cargar los datos en la tabla desde el servidor
async function cargarDatosEnTablaDesdeServidor() {
    try {
      // Hacer la solicitud al servidor para obtener las solicitudes
      const response = await fetch('api/user-home/getSolicitudes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Obtener los datos de respuesta en formato JSON
        const solicitudes = await response.json();
  
        // Obtén la referencia a la tabla en el DOM
        const table = document.querySelector("table tbody");
  
        // Limpia la tabla antes de cargar nuevos datos
        table.innerHTML = '';
  
        // Itera sobre las solicitudes y crea las filas de la tabla con el checkbox
        solicitudes.forEach((solicitud) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td><input type="checkbox"></td>
              <td>${solicitud.Fecha}</td>
              <td>${solicitud.Hora}</td>
              <td>${solicitud.Nombre}</td>
              <td>${solicitud.Rut}</td>
              <td>${solicitud.Correo}</td>
              <td>${solicitud.Carrera}</td>
              <td>${solicitud.EquipoSolicitado}</td>
              <td>
                  <button class="sancionar">Sancionar</button>
                  <button class="observacion">Agregar Observación</button>
              </td>
          `;
  
          table.appendChild(row);
        });
      } else {
        console.error('Error al obtener las solicitudes desde el servidor');
      }
    } catch (error) {
      console.error('Error de red al obtener las solicitudes:', error);
    }
  }
  
  // Agrega un evento de clic al botón "Aceptar"
  document.getElementById("acceptButton").addEventListener("click", function () {
    // Lógica de clic en el botón Aceptar, si es necesario
    // ...
  
    // Después de realizar la lógica, vuelve a cargar los datos en la tabla
    cargarDatosEnTablaDesdeServidor();
  });
  
  // Llama a la función de carga al cargar la página
  document.addEventListener("DOMContentLoaded", function () {
    cargarDatosEnTablaDesdeServidor();
  });