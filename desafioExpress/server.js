const express = require("express");
const fs = require("fs");
const app = express();

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;    
    }

    async getAll(){
        
        try{
            let data = await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8');
            data = JSON.parse(data);
            return data;
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    async getRandom(){

        try{
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)+min);
              }
            let data = await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8');
            data = JSON.parse(data);
            let idRandom = getRandomInt(1, 6);
            let prodRandom = data.find(item => item.id === idRandom);
            return prodRandom;

        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

}

const compra = new Contenedor('productos');

app.get('/', (req, res)=>{

    res.send({mensaje: "Bienvenidos a la ruta raíz"});
})

app.get('/productoRandom', async (req, res)=>{

    const prodRandom = await compra.getRandom();
    res.send({productoRandom: prodRandom});
})

app.get('/productos', async (req, res)=>{

    const prod = await compra.getAll();


    res.send({productos: prod});
})

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
