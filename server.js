const express = require("express");
const fs = require("fs");
const { Router } = express;
const app = express();
const routerProducto = Router();
const productos = [];

//Utilizar JSON en las request (Cuerpo)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//


//Rutas para productos
routerProducto.get('/', (req, res) => {
    res.send(productos);
})

routerProducto.post('/', (req, res) => {
    const producto = req.body;
    productos.push(producto);
    res.json(productos);
})

app.use('/api/productos', routerProducto);


const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})


server.on("error", error => console.log(`Error: ${error}`));