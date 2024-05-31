import { Tarefa } from "../model/Tarefa";

// Importando Conexão com banco de dados
const bd = require("./../bd/conexao");


// Classe que possui métodos que realizam consultas e operações ao banco de dados
export class TarefaRepository {

    private conexao: any;

    constructor() {
        this.conexao = bd;
    }

    async selecionarTodas() {
        return await this.conexao.manyOrNone("SELECT * FROM tarefas");
    }

    async selecionarAtivas() {
        return await this.conexao.manyOrNone("SELECT * FROM tarefas WHERE estado = 1");
    }

    async selecionarInativas() {
        return await this.conexao.manyOrNone("SELECT * FROM tarefas WHERE estado = 0");
    }

    async criar(tarefa: Tarefa) {
        await this.conexao.any("INSERT INTO tarefas (titulo, descricao) VALUES ($1, $2)", [tarefa.titulo, tarefa.descricao]);
        return this.selecionarUltimoRegistro();
    }

    async selecionar(id: number) {
        return await this.conexao.oneOrNone("SELECT * FROM tarefas WHERE id = $1", id);
    }

    async atualizar(tarefa: Tarefa) {

        const valoresValidos: string[] = [];

        if(tarefa.titulo != null) valoresValidos.push("titulo = $1");
        if(tarefa.descricao != null) valoresValidos.push("descricao = $2");
        if(tarefa.concluido != null) valoresValidos.push("concluido = $3");
        if(tarefa.estado != null) valoresValidos.push("estado = $4");
        valoresValidos.push("atualizado_em = $5");

        this.conexao.any("UPDATE tarefas SET " + valoresValidos.join(", ") + " WHERE id = $6", [tarefa.titulo, tarefa.descricao, tarefa.concluido, tarefa.estado, new Date(), tarefa.id]);
        return this.selecionar(tarefa.id || 0);

    }

    async inativar(id: number) {
        this.conexao.any("UPDATE tarefas SET estado = 0 WHERE id = $1", id);
        return this.selecionar(id);
    }

    async deletar(id: number) {
        this.conexao.any("DELETE FROM tarefas WHERE id = $1", id);
        return this.selecionar(id);
    }

    async selecionarUltimoRegistro() {
        return await this.conexao.any("SELECT * FROM tarefas ORDER BY criado_em DESC LIMIT 1");
    }

}