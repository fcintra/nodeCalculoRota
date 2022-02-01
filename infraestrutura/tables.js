const {
    VARCHAR
} = require("mysql/lib/protocol/constants/types");

class Tables {
    init(conexao) {
        this.conexao = conexao;
        console.log('tabelas foram chamadas')
        this.criarAtendimentos();
    }


    criarAtendimentos() {

        const sql = 'CREATE TABLE IF NOT EXISTS Adress (id int NOT NULL AUTO_INCREMENT, nome_local VARCHAR(50) NOT NULL, latitude VARCHAR(20), longitude VARCHAR(20) NOT NULL, PRIMARY KEY(id))'
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            } else {
                console.log('table Adress criada com sucesso');
            }
        })
    }
}


module.exports = new Tables()