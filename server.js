const express = require("express");
const app = express();
const port = 8080;

const date = new Date();

const frase ='Hola mundo como están?'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let visitas = 0;

let momentoDelDia = "";

let dia = date.getDate();
let mes = date.getMonth() + 1;
let año = date.getFullYear();

let hora = date.getHours();
let minutos = date.getMinutes();

hora >= 6 && hora < 12 ? (momentoDelDia = "Buenos dias") : "No se que hora es";
hora >= 12 && hora < 19
    ? (momentoDelDia = "Buenas tardes")
    : "No se que hora es";
hora >= 19 && hora <= 23
    ? (momentoDelDia = "Buenas noches")
    : "No se que hora es";
hora >= 0 && hora < 6 ? (momentoDelDia = "Buenas noches") : "No se que hora es";

function obtenerPalabra(cadenaADividir,separador,indice){
    let arrayDeStrings = cadenaADividir.split(separador); 
    if (indice > arrayDeStrings.length -1 || indice <= 0) {
        return 'El numero ingresado supera a la cantidad palabras en la frase'
    }  else if (isNaN(indice)) {
        return 'El parámetro no es un número'
    } else {
        return arrayDeStrings[indice]
    }
}

app.post("/" , (req,res) => {
    console.log(req.body)

    res.send(frase);
})

app.get("/" , (req,res) =>{
    res.send(frase)
})

app.get("/inicio", (req, res) => {
    res.send(`
    <h1>Bienvenidos al servidor Express </h1>
    <a href="http://localhost:${port}/fyh">fecha y hora</a>
    <a href="http://localhost:${port}/visitas">visitas</a>
    `);
});

app.get("/frase", (req,res) => {
    res.send(frase)
})
app.get("/letras/:num", (req,res) => {

    let indiceDelCaracter = req.params.num - 1

    if (indiceDelCaracter > frase.length || indiceDelCaracter <= 0) {
        res.send('El numero ingresado supera a la cantidad de letras de la frase')
    } else if (isNaN(indiceDelCaracter)) {
        res.send('El parámetro no es un número')
    } else {
        res.send(frase.charAt(indiceDelCaracter))
    }
    
})
app.get("/palabras/:num", (req,res) => {
    let indiceDePalabra = req.params.num - 1

    res.send(obtenerPalabra(frase, " ",indiceDePalabra))
})




app.get("/visitas/:id", (req, res) => {
    // http://localhost:8080/visitas/15
    console.log(req.params.id);
    
    res.send(`Número de visitas: ${visitas++} con el id: ${req.params.id}`);
});

app.get("/fyh", (req, res) => {
    // http://localhost:8080/fyh?name=damian
    console.log(req.query);
    res.send(
        `<div class="text-center">
            <h1>Hola ${req.query.name}, ${momentoDelDia}</h1>
            <p>Hoy es ${dia} / ${mes} / ${año}</p>
            <p>Hora actual: ${hora} : ${minutos}</p>
        </div>
    `
    );
});

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});
