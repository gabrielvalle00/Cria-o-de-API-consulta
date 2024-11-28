
$(document).ready(async function () {

    const board = {
        "Não Iniciado": document.querySelector("#nao-iniciado"),
        "Em Desenvolvimento": document.querySelector("#em-desenvolvimento"),
        "Finalizado": document.querySelector("#finalizado"),
    }

    const statusMapping = {
        "não iniciado": "Não Iniciado",
        "em desenvolvimento": "Em Desenvolvimento",
        "finalizado": "Finalizado",
    }

    async function buscarTarefas() {
        Object.values(board).forEach(column => {
            
            const cards = column.querySelectorAll(".card");
            cards.forEach(card => card.remove());
        })
        try {
            const response = await axios.get(`${localStorage.getItem('ipAPI')}listarTarefas`);
            const taks = response.data.tarefas;
            console.log(response);
            
            taks.forEach(tarefa => {
                const mappedStatus = statusMapping[tarefa.status?.toLowerCase()];
                const column = board[mappedStatus];

                if (column) {
                    const card = document.createElement("div");
                    card.className = `card`;
                    card.innerHTML = `
                    <h3>Descrição: ${tarefa.descricao}</h3>
                    <p>Equipe: ${tarefa.equipe}</p>
                    <p>Prioridade: ${tarefa.prioridade}</p>
                    <p>Vinculado a: ${tarefa.nome}</p>

                    <div class="card.actions">
    <button class="btn-edit" onclick="carregarPagina('novaTarefa')" href="#" data-id="${tarefa.id_tarefa}">Editar</button>
    <button class="btn-delete" data-id="${tarefa.id_tarefa}">Deletar</button>
</div>
<div class="card-status">
    <select class="status-dropdown" data-id="${tarefa.id_tarefa}">
        <option value="Não Iniciado"${mappedStatus === "Não Iniciado" ? "selected" : " "}>Não Iniciado</option>
        <option value="Em Desenvolvimento"${mappedStatus === "Em Desenvolvimento" ? "selected" : "" }> Em Desenvolvimento</option>
        <option value="Finalizado"${mappedStatus === "Finalizado" ? "selected" : " "}> Finalizado </option>
    </select>

    <button class="btn-save-status" data-id="${tarefa.id_tarefa}">salvar</button>
</div>
                    `;
                    column.appendChild(card);
                }else{
                    console.warn("Status desconhecido ou coluna não encontrada"), tarefa.status;
                }
            })
        } catch (error) {
            console.error("Erro ao buscar tarefas",error);

        }

    }
    await buscarTarefas();

    $(document).off ('click', '.btn-save-status');
    $(document).on('click', '.btn-save-status', async function (event) {
        const taskId = $(this).data('id');
        const newStatus = $(`.status-dropdown[data-id='${taskId}']`).val();

        try {
            await axios.put(`${localStorage.getItem('ipAPI')}atualizarStatus/${taskId}`, {status:newStatus});
            await buscarTarefas();
        } catch (error) {
            console.log(error);
            
        }

    })

    $(document).off ('click', '.btn-delete');
    $(document).on('click', '.btn-delete', async function (event) {
        const taskId = $(this).data('id');
        const newStatus = $(`.status-dropdown[data-id='${taskId}']`).val();

        try {
            await axios.delete(`${localStorage.getItem('ipAPI')}deletar/${taskId}`, {status:newStatus});
            await buscarTarefas();
            alert("Tarefa excluida com sucesso!")
        } catch (error) {
            console.log(error);
            
        }

    })


    $(document).off ('click', '.btn-edit');
    $(document).on('click', '.btn-edit', async function (event) {
        const taskId = $(this).data('id');
       sessionStorage.setItem("taskId", taskId);
       console.log(taskId);
       


    })

 
})