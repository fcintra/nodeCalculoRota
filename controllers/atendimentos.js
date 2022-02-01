const atendimentos = require('../models/atendimentos');
const Atendimento = require('../models/atendimentos')


module.exports = app => {
    app.get('/atendimentos', (req, res) =>{
        Atendimento.lista(res);
    });

    app.get('/atendimentos/:id', (req, res) =>{
         const id = req.params.id;
         Atendimento.buscaPorId(id, res);
    });
  

    app.post('/atendimentos', (req, res) => {

      /*  const data = {
            nomeLocal = req.body.nomeLocal,
            latitudeLocal = req.body.latLocal,
            longitudeLocal = req.body.longLocal
        }*/

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