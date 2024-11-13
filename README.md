Proyecto sencillo sistema web
Se deben tener instalados estas versiones para que no haya ningún inconveniente
    Angular v17 -> se usa standalone y no ngmodule, sobre todo en nodejs
    Node v18.18.2   
        version mínima para Angular17 -> v18.16.0
    PHP v8.3.0
    MySQL

1. Clonar el repositorio, comando: git clone https://github.com/ivanmerida/prueba-tecnica.git
     ahí vienen tres carpetas, api-nodejs, service-php y frontend

2. Poner toda la carpeta prueba-tecnica en C:\xampp\htdocs si se usa xampp como servidor de php y mysql
    o como es mi caso wamp64: C:\wamp64\www - esto para que funcione el servicio de php (generar reporte)
    se debe tener corriendo el servicio wamp64 o xampp

3. Acceder a la carpeta api-nodejs
    1. Acceder a la carpeta src/database/create.sql copiar el script
    2. Abrir el administrador base de datos que use, abrir un nuevo script, pegar lo que habiamos copiado y ejecutar el script
    3. Si nuestras credenciales son distintas para acceder a nuestra base de datos
    se debe cambiar en api-nodejs/config.js
    4. Abrir la terminal en la ruta "Aquí va lo demás de la ruta, dependiendo donde se encuentre la      carpeta"/prueba-tecnica/api-nodejs
    5. Una vez estando en dicha ruta hay que instalar los paquetes de node
        comando: npm install
    6. Ya que se instalaron todos los paquetes sin error alguno se debe correr el proyecto
        estando en misma ruta que el paso 3, comando: npm run dev
    7. Si todo va bien, se ejecutara en http://localhost:3000

4. Acceder a la carpeta frontend
    1. Abrir una terminal en la ruta "Aquí va lo demás de la ruta, dependiendo donde se encuentre la      carpeta"/prueba-tecnica/frontend
    2. Una vez estando en dicha ruta, hay que instalar los paquetes de node
        comando: npm install
    3. Ya que se instalaron todos los paquetes sin error alguno se debe ejecutar el proyecto
    estando en la misma ruta que el paso 1, comando: ng serve
    4. Si todo va bien, se ejecutara en http://localhost:4200

5. Para el service-php, solo hay que validar que se este ejecutando el localhost,
    en mi caso mi ruta es 'http://localhost/prueba-tecnica/service-php/index.php'
    ese es mi endpoint que uso en el frontend/src/services/user.service.ts
    en el método getReport, si llegara a cambiar el endpoint ahí es donde se debe
    modificar