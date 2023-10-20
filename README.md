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