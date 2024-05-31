import Fastify from "fastify";
import { rotas } from "./rotas";
import fastifyCors from "@fastify/cors";

const app = Fastify({logger: true})

async function executar() {

    // Registrando rotas
    await app.register(rotas);
    
    //Adicionando Cors
    await app.register(fastifyCors);

    // URL http://localhost:3333
    try {
        await app.listen({ port: 3333 }); 
    } catch (e) {
        process.exit(1);
    }

}

// Executando servidor
executar();