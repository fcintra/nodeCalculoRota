const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tables = require ('./infraestrutura/tables');

conexao.connect(erro =>{
    if(erro){
        console.log('deu ruim');
    }else{
        console.log('deu bom no banco de dados');
        Tables.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log('servidor rodando na porta 3000'));
    }
})




