const express = require("express");
const app = express();
const fs = require('fs').promises;
const moment = require('moment');

const fechaHoy = moment().format('DD-MM-YYYY');

app.listen(3000, () => {
console.log("El servidor está inicializado en el puerto 3000");
});

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html")
})

app.get("/crear", async(req, res) =>{
    let {archivo, contenido} = req.query
    try {
        await fs.writeFile(archivo, fechaHoy + "\n" + contenido,"utf8")
        res.send("Se ha creado con éxito")
    } catch (error) {
        res.send("El archivo no pudo ser creado")
    }
    
})

app.get("/leer", async(req, res) =>{
    let {archivo} = req.query

    try {
        let data = await fs.readFile(archivo,"utf8")
        res.send(data)
    } catch (error) {
        res.send("Archivo no encontrado")
    }
    
})

app.get("/renombrar", async(req, res) =>{
    let {nombre, nuevoNombre} = req.query

    try {
        await fs.rename(nombre, nuevoNombre)
        res.send(`Archivo ${nombre} fue renombrado como ${nuevoNombre}`)
    } catch (error) {
        res.send("Archivo no renombrado")
    }
    
    
})

app.get("/eliminar", async(req, res) =>{
    let {archivo} = req.query
    
    try {
        await fs.unlink(archivo)
        res.send("Archivo eliminado correctamente")
    } catch (error) {
        res.send("Archivo no eliminado")
    }
        
    
    
})
