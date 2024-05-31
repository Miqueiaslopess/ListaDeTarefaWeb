import pgPromise from "pg-promise";

// Instanciando biblioteca Postgre Promise - Conexão com banco de dados
const pgp = require("pg-promise")(); 

// Conexão com banco de dados
const conexao: any = pgp("postgres://postgres:mberoot@localhost:5432/lista_de_tarefas_bd");

module.exports = conexao;