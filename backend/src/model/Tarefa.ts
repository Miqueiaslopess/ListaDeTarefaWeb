// Classe para servir de Modelo à uma tarefa
export class Tarefa {

    id: number | null;
    titulo: string | null;
    concluido: boolean | null;
    descricao: string | null;
    estado: number | null;
    criadoEm: Date | null;
    atualizadoEm: Date | null;

    // Com este construtor uma Tarefa pode ter atributos null
    constructor(id?: number | null, titulo?: string, descricao?: string, concluido?: boolean, estado?: number, criadoEm?: Date, atualizadoEm?: Date) {

        if(id !== undefined && titulo !== undefined && descricao !== undefined && concluido !== undefined && estado !== undefined &&  criadoEm !== undefined && atualizadoEm !== undefined) {
            this.id = null;
            this.titulo = titulo;
            this.descricao = descricao;
            this.concluido = concluido;
            this.estado = estado;
            this.criadoEm = criadoEm;
            this.atualizadoEm = atualizadoEm;
        } 
        
        this.id = id || null;
        this.titulo = titulo || null;
        this.descricao = descricao || null;
        this.concluido = concluido || null;
        this.estado = estado || null;
        this.criadoEm = criadoEm || null;
        this.atualizadoEm = atualizadoEm || null;
        
    }

}