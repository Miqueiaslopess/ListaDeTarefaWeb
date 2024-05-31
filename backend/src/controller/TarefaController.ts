import { Tarefa } from "../model/Tarefa";
import { TarefaRepository } from "../repository/TarefaRepository";

const tarefaRepository = new TarefaRepository();

// Classe que controla o fluxo do programa
export class TarefaController {

    async listar() {
        return await tarefaRepository.selecionarTodas();
    }

    async listarAtivas() {
        return await tarefaRepository.selecionarAtivas();
    }

    async listarInativas() {
        return await tarefaRepository.selecionarInativas();
    }

    // Selecionar uma tarefa
    async selecionar(id: number) {
        return await tarefaRepository.selecionar(id);
    }

    async salvar(id: number, titulo: string, descricao: string) {
        const tarefa: Tarefa = new Tarefa(id, titulo, descricao, true, 1, new Date(), new Date());
        const tarefaSalva = await tarefaRepository.criar(tarefa);
        return tarefaSalva;
    }

    async atualizar(id: number, titulo: string, descricao: string, concluido: boolean, estado: number) {
        let tarefa: Tarefa = new Tarefa();
        
        if (id !== undefined && id !== null) tarefa.id = id;
        if (titulo !== undefined && titulo !== null  && titulo !== "") tarefa.titulo = titulo;
        if (descricao !== undefined && descricao !== null  && descricao !== "") tarefa.descricao = descricao;
        if (concluido !== undefined && concluido !== null) tarefa.concluido = concluido;
        if (estado !== undefined && estado !== null) tarefa.estado = estado;

        return tarefaRepository.atualizar(tarefa);
    }

    // Deletar logicamente, estado = 0
    async inativar(id: number) {
        return await tarefaRepository.inativar(id);
    }

    // Deletar tarefa concretamente
    async deletar(id: number) {
        return await tarefaRepository.deletar(id);
    }

}