const userRoutes = require('./src/routes/user.routes');
const express = require('express');
const cors = require('cors');

const app = express();

// le asignamos puerto por defecto
app.set('port', 3000);

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true })); // para que mi servidor acepte formatos json (es lo mismo que bodyparser)
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Por si queremos enviar desde HTML

// Configurar cabeceras y cors
let peticion = '';
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    // para saber que petición se está haciendo -> uso solo en desarrollo
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    peticion = `[${new Date()}] ${req.method} ${req.url}`;
    next();
});

//rutas de usuarios
app.use('/api/user', userRoutes);

app.listen(app.get('port'), () => {
    console.log('Puerto ' + app.get('port'));
});

app.get('*', function (req, res) {
    res.status(404).send(peticion);
});