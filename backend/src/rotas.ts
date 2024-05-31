import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { TarefaController } from "./controller/TarefaController";
import { Tarefa } from "./model/Tarefa";

// Função que entrega as rotas da aplicação
export const rotas = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    const tarefaController = new TarefaController();

    //Rota para pegar todas as tarefas
    fastify.get("/tarefas", async function (request: FastifyRequest, reply: FastifyReply) {
        const tarefas: Tarefa[] = await tarefaController.listar();  
        reply.send(tarefas);
    });

    //Rota para pegar todas as tarefas ativas
    fastify.get("/tarefas/ativas", async (request: FastifyRequest, reply: FastifyReply) => {
        const tarefasAtivas: Tarefa[] = await tarefaController.listarAtivas();  
        reply.send(tarefasAtivas);
    });

    //Rota para pegar todas as tarefas inativas
    fastify.get("/tarefas/inativas", async (request: FastifyRequest, reply: FastifyReply) => {
        const tarefasInativas: Tarefa[] = await tarefaController.listarInativas();  
        reply.send(tarefasInativas);
    });

    // Rota para pegar tarefa única
    fastify.get(`/tarefas/:id`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id: number = parseInt(params.id);

        const tarefaSelecionada: Tarefa = await tarefaController.selecionar(id);
        reply.send(tarefaSelecionada);
    });

    // Rota para criar uma tarefa
    fastify.post("/tarefas", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id, titulo, descricao}: any = request.body;
        const tarefaSalva: Tarefa = await tarefaController.salvar(id, titulo, descricao);
        reply.send(tarefaSalva);
    });

    // Rota para atualizar uma tarefa
    fastify.patch("/tarefas/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const { titulo, descricao, concluido, estado}: any = request.body;
        const id = parseInt(params.id);

        const tarefaAtualizada: Tarefa = await tarefaController.atualizar(id, titulo, descricao, concluido, estado);
        reply.send(tarefaAtualizada);

    });

    // Rota para inativar uma tarefa
    fastify.put(`/tarefas/:id`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id = parseInt(params.id);

        const tarefaDeletada: Tarefa = await tarefaController.inativar(id);
        reply.send(tarefaDeletada);
    });

    // Rota para deletar uma tarefa
    fastify.delete(`/tarefas/:id/deletar`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id = parseInt(params.id);

        const rep: Tarefa = await tarefaController.deletar(id);
        reply.send(rep);
    });

}