// URL da API
const uri = "/tarefas"
const url = "http://localhost:3333" + uri;



// Vai guardar as informações do bd
var dataForm = [];

// Array para representar tarefas
const tarefasBD = [];

// Pegar uma lista de tarefas do banco de dados
async function listar() {

    try {

        await fetch(url + "/ativas")
            .then(res => res.json())
            .then(data => {

                data.map(tarefa => {
                    tarefasBD.push(tarefa);
                })

                renderizarTarefas(tarefasBD);

            })
            .catch(error => console.log("Error: " + error));

    } catch (e) {
        console.error("Erro ao listar dados:", e);
    }

}

// Pegar uma lista de tarefas do banco de dados
async function pegarTarefaPorId(id) {

    try {

        const idTarefa = resgatarParametroURL("cod");

        await fetch(url + `/${idTarefa}`)
            .then(res => res.json())
            .then(data => {
               
                inserirDados(
                    {
                        titulo: data.titulo,
                        descricao: data.descricao,
                        criadoEm: data.criado_em,
                        atualizadoEm: new Date()
                    }
                );

            })
            .catch(error => console.log("Error: " + error));

    } catch (e) {
        console.error("Erro ao obter dados:", e);
    }

}


function inserirDados(tarefa) {
    
    const titulo = document.getElementById("tituloEdit");
    const descricao = document.getElementById("descricaoEdit");
    const criadoEm = document.getElementById("criadoEmEdit");
    const atualizadoEm = document.getElementById("atualizadoEmEdit");

    // Pega somente data do timestamp
    let tarefaCriadaData = tarefa.criadoEm.split("T");

    // divide a data em dia , mês e ano
    let partes = tarefaCriadaData[0].split("-");

    // Reorganize as partes para o formato dd/mm/aaaa
    let criadoEmData = partes[2] + '/' + partes[1] + '/' + partes[0];


    titulo.innerText = tarefa.titulo;
    descricao.innerText = tarefa.descricao;
    criadoEm.innerText = "Criado em: " + criadoEmData;
    if (tarefa.atualizado) atualizadoEm.innerText = "Atualizado em: " + tarefa.atualizadoEm;
    
}


// Editar tarefa
async function editarTarefa() {

    const idTarefa = resgatarParametroURL("cod");

    const titulo = document.getElementById("tituloInput");
    const descricao = document.getElementById("descricaoInput");


    try {
        // Enviando os dados para a API usando Fetch
        let response = await fetch(`${url}/${idTarefa}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo.value,
                descricao: descricao.value
            })
        });

        alert("Tarefa editada!");

        window.location.reload();

    } catch (error) {
        console.error("Erro ao Editar tarefa:", error);
    }


}


// Arquivar tarefa
async function arquivar(id) {

    try {
        // Enviando os dados para a API usando Fetch
        await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estado: 0
            })
        });

        alert("Tarefa Arquivada!");

        window.location.reload();

    } catch (error) {
        console.error("Erro ao cadastrar tarefa:", error);
    }

}


// Marcar a tarefa como concluída ou não
async function marcarTarefaConcluida(id, concluido) {

    let marcarComo;

    if(concluido) {
        marcarComo = false;
    } else {
        marcarComo = true;
    }

    try {
        // Enviando os dados para a API usando Fetch
        let response = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                concluido: marcarComo
            })
        });

        let tarefaCriada = await response.json();

        // Adicionando a nova tarefa na tela
        //renderTask({titulo: titulo, descricao: descricao});

        alert("Clicada!");

        window.location.reload();

    } catch (error) {
        console.error("Erro ao cadastrar tarefa:", error);
    }

}


// Inserir dados do da tarefa selecionada na tela de edição
function renderizarTarefas(tarefas) {

    const todasTarefasDiv = document.getElementById('todasTarefas');


    tarefas.forEach(tarefa => {

        let novaTarefaDiv = document.createElement('div');
        novaTarefaDiv.className = 'task';

        novaTarefaDiv.innerHTML = `
            
            <div class="taskHeader">
                <button type="button" onclick="marcarTarefaConcluida(${tarefa.id}, ${tarefa.concluido})" class="btnMarcarTarefa">${tarefa.concluido ? 'desmarcar' : 'concluir'}</button>
                <h2 class="titleTask">${tarefa.titulo}</h2>
            </div>

            <div class="taskBody">
                <p class="descTask">${tarefa.descricao}</p>

                <p class="estadoTarefa">Estado: ${tarefa.concluido ? '<span style="color: green">concluida</span>' : '<span style="color: red">não concluída</span>'}</p>

                <div class="containerOptions">
                    <button class="edit"><a href="./paginas/editar.html?cod=${tarefa.id}">Editar</a></button>
                    <button type="button" onclick="arquivarTarefa(${tarefa.id})" class="delete">Deletar</button>
                </div>
            </div>
        `;

        todasTarefasDiv.appendChild(novaTarefaDiv);
    });

}


// Função para cadastrar uma nova tarefa
async function criarTarefa(tarefas) {

    // Pegando os valores dos inputs de título e descrição
    var titulo = document.getElementById('tituloInput').value;
    var descricao = document.getElementById('descricaoInput').value;

    alert(titulo + "   " + descricao)

    // Verificando se os campos estão preenchidos
    if (titulo === '' || descricao === '') {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        // Enviando os dados para a API usando Fetch
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao
            })
        });

        let tarefaCriada = await response.json();

        // Adicionando a nova tarefa na tela
        renderTask({titulo: titulo, descricao: descricao});

    } catch (error) {
        console.error("Erro ao cadastrar tarefa:", error);
    }
}


// Pegar parâmetro "cod" que é o id da Tarefa diretamente da URL
function resgatarParametroURL(param) {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    return urlParams.get(param);
}
