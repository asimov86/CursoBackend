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
            let data = await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8');
            data = JSON.parse(data);
            let randomPos = getRandomPos(1, data.length - 1);
            let prodRandom = data[randomPos];
            return prodRandom;

        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

}

function getRandomPos(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)+min);
  }


const producto = new Contenedor('productos');

app.get('/', (req, res)=>{

    res.send({mensaje: "Bienvenidos a la ruta raíz"});
})

app.get('/productoRandom', async (req, res)=>{

    const prodRandom = await producto.getRandom();
    res.send({productoRandom: prodRandom});
})

app.get('/productos', async (req, res)=>{

    const prod = await producto.getAll();


    res.send({productos: prod});
})

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
