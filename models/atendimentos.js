const res = require('express/lib/response');
const moment = require('moment')
const conexao = require('../infraestrutura/conexao');


class Atendimento{
    adiciona(atendimento, res){
        
        const clienteEValido = atendimento.nome_local.length >= 5;

        const validacoes = [
            {
                nome: 'nome_local',
                valido: clienteEValido,
                mensagem: 'O nome deve conter 5 ou mais caracteres'
            },
        ]

        const erros = validacoes.filter(campo => !campo.valido)

        const existemErros = erros.length
        
        if(existemErros){
            res.status(400).json(erros)
        }else{

            const atendimetoDatado = {...atendimento}
            const sql = 'INSERT INTO adress SET ?'
            conexao.query(sql, atendimetoDatado, (erro, resultados) =>{
            
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(resultados)
            }
            
            });
        };
    };

    lista(res){
        const sql = 'SELECT * FROM adress'

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    };

    buscaPorId(id, res){

        
        if(isNaN(id)){
          const sqlValidacao = `SELECT * FROM adress WHERE nome_local LIKE '%${id}%'`;
            conexao.query(sqlValidacao, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(resultados)
                };                
            });
          
   
        }else{
            const sqlValidacao = `SELECT * FROM adress WHERE id=${id}`
            conexao.query(sqlValidacao, (erro, resultados) =>{

                const atendimento = resultados[0];

                if(erro){
                    res.status(400).json(erro)
                }else if(atendimento == undefined){
                    res.status(200).json({
                        'Esse id já foi excluido, ou não existe no banco de dados': id
                    });
                }else{
                        res.status(200).json(atendimento)
                };                
            });
        }
        
    };

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sqlValidacao = `SELECT * FROM Atendimentos WHERE id=${id}`
            conexao.query(sqlValidacao, (erro, resultados) =>{

                const atendimento = resultados[0];

                if(erro){
                    res.status(400).json(erro)
                }else if(atendimento == undefined){
                    res.status(200).json({
                        'Esse id já foi excluido, ou não existe no banco de dados': id
                    });
                }else{
                    const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

                    conexao.query(sql, [valores, id], (erro, resultados) =>{
                    if(erro){
                        res.status(400).json(erro);                
                    }else{
                        res.status(200).json({...valores, id});
                    }
                  })
                };                
            });
    };

    deleta(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({
                    'id removido': id
                })
            }
        })
    };

};
module.exports = new Atendimento