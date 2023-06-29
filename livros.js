const express = require("express") 
const router = express.Router() 
const cors = require('cors')

const Livro = require('./livrosModel')

const app = express() 
app.use(express.json())
app.use(cors())

const porta = 3333 

//Get
async function mostraLivro(require, response){
    try{
        const livroVindoDoBancoDeDados = await Livro.find()

        response.json(livroVindoDoBancoDeDados)
    } catch(erro){
        console.log(erro)
    }
}


function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta)
