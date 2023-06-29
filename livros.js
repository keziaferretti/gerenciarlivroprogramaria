const express = require("express") 
const router = express.Router() 
//const cors = require('cors')
//https://backe-bkee.onrender.com

const conectaBancoDeDados = require('./BancoDeDados')
conectaBancoDeDados()

const Livro = require('./livroModel')

const app = express() 
app.use(express.json())
//app.use(cors())

const porta = 3333 

//Get
async function mostraLivro(request, response){
    try{
        const livroVindoDoBancoDeDados = await Livro.find()

        response.json(livroVindoDoBancoDeDados)
    } catch(erro){
        console.log(erro)
    }
}

//Post
async function criaLivro(request, response){
    const novoLivro = new Livro({
        nome: request.body.nome,
        autora: request.body.autora,
        categoria: request.body.categoria,
      })

    try{
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)
    } catch(erro){
        console.log(erro)
    }


}

//Patch
async function corrigiLivro(request, response){
    try{
        const livroEncontrado = await Livro.findById({_id: request.params.id})

        if(request.body.nome){
            livroEncontrado.nome = request.body.nome
        }
        if(request.body.autora){
            livroEncontrado.autora = request.body.autora
        }
        if(request.body.categoria){
            livroEncontrado.categoria = request.body.categoria
        }

        const livroAtualizadoBancoDeDados = await livroEncontrado.save()
        response.json(livroAtualizadoBancoDeDados)
    } catch(erro){
        console.log(erro)
    }

}

//Delete
async function deletaLivro(request, response){
    try{
        await Livro.findByIdAndDelete(request.params.id)
        response.json({messagem:'Livro deletado com sucesso!'})
    } catch(erro){
        console.log(erro)
    }
}

app.use(router.get('/livros', mostraLivro))
app.use(router.post('/livros', criaLivro))
app.use(router.patch('/livros/:id', corrigiLivro))
app.use(router.delete('/livros/:id', deletaLivro))

//Porta
function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta)
