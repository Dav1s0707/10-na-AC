module.exports = (app) => {
    app.post('/atividades', async (req, res) => {
        var dados = req.body
        //return console.log(dados)
        //Conct Mongo
        const database = require("../config/database")()
        //importar o model atividades
        const atividades = require("../models/atividades")
        //gravar as informaçoes no formulario database
        var gravar = await new atividades({
            data: dados.data,
            tipo: dados.tipo,
            entrega:dados.entrega,
            diciplina: dados.diciplina,
            intrucoes: dados.orientacoes,
            usuario: dados.id,
            titulo: dados.titulo
        }).save()
        //buscar as ativdades do usuario
        var buscar = await atividades.find({ usuario: dados.id })
        //recarregar a pagina atividades
        res.render('atividades.ejs', {
            nome: dados.nome,
            id: dados.id,
            lista: buscar
        })
    })
}