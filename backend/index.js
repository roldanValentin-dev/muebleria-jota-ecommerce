const express = require("express")
const cors = require("cors")
const app = express()
const productos = require("./data/catalogo_productos.json")
const PORT = 3000

app.use(cors())
app.use(express.json())


app.get("/api/productos",(req,res)=>{
    app.send("Prueba")
})

app.get("/api/productos:id",(req,res)=>{
    app.send("Prueba")
})


app.listen(PORT,()=> console.log(`Server corriendo en el puerto ${PORT}`))