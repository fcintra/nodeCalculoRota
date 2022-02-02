const atendimentos = require('../models/atendimentos');
const Atendimento = require('../models/atendimentos')

//no tutotial, não passaram pela parte de criar um router?
module.exports = app => {
    app.get('/atendimentos', (req, res) =>{
        Atendimento.lista(res);
    });

    app.get('/atendimentos/:id', (req, res) =>{
         const id = req.params.id;
         Atendimento.buscaPorId(id, res);
    });
  

    app.post('/atendimentos', (req, res) => {
        //se não tiver voltando o req.body, dê um console.log(req.body) pra ver se está undefined.
        //console.log(data) pode ser que o node não coloque nada e dê um erro porque vc ta tentando atribuir 
        //undefined pra uma variavel.

      /*  const data = {
            nomeLocal = req.body.nomeLocal,
            latitudeLocal = req.body.latLocal,
            longitudeLocal = req.body.longLocal
        }*/

        //quando criar um objeto igual o data, as propriedades dele são definidas com ":"
        //exemplo: 
        /*
        const data = {
            nomeLocal: req.body.nomeLocal,
            latitudeLocal: req.body.latLocal,
            longitudeLocal: req.body.longLocal
        }
        */
       // "=" é usado somente pra atribuir variaveis e criar operadores lógicos

        
        const atendimento = req.body

        //console.log(data)
    
        Atendimento.adiciona(atendimento, res);
       
    });

    app.patch('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id);
        const valores = req.body;
        Atendimento.altera(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id);
        Atendimento.deleta(id, res);
    });
}