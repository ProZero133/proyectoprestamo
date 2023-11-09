# proyectoprestamo

Como setear el proyecto? desde Git clone en adelante
-Creacion de carpeta con el fin de ir al repositorio
-Instalar Node.js
-Ejecutar el comando git clone http://gitlab.face.ubiobio.cl/proyecto-prestamo-lab-especialidades/proyectoprestamo
-Creacion de un .env en la carpeta config, para la definicion de las variables de entorno
- .env: PORT=80
        user ='leoprac'
        password="leo2023"
        host='146.83.194.142'
        portpg=5432
        database='leoprac_bd':
        
-En la carpeta backend ejecutar comando "npm install", para instalar todas las dependencias necesarias
-Entrar a la carpeta src y ejecutar el comando "node index.js", para inicializar la pagina en el puerto por defecto


Parametros para ingresar a un usuario: 
Nombre: Texto en no más de 50 caracteres
Rut_usuario: Texto en no más de 14 caracteres (formato xxxxxxxx-x)
Correo: Texto en no más de 60 caracteres (Debe tener un @)
Contraseña: Minimo 6 caracteres considerando una mayuscula, un numero y un caracter especial (Contraseña por defecto para cada usuario recien creado?)
Carrera: Debe pertenecer a la lista de carreras? (Podria ser una tabla de seleccion o validar el contenido con una tabla en la base de datos)
Rol: Estudiante o Docente