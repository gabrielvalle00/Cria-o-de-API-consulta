
$(document).ready(function () {

    axios.get(`${localStorage.getItem('ipAPI')}listarUsuarios`)
        .then(response => {
            console.log(response.data);

            const userSelect = $('#nomeUser');
            userSelect.empty();
            userSelect.append(`<option value="">Selecione um usuário</option>`);

            const users = response.data.users;
            users.forEach(users => {
                userSelect.append(`<option value="${users.ID_USUARIO}">${users.NOME}</option>`)
            });

            carregarDadosPagina();
        })
        .catch(error => {
            console.error(error)
        })

    const taskId = sessionStorage.getItem("taskId");
    console.log("taskId", taskId);

    function carregarDadosPagina() {

        if (taskId) {
            axios.get(`${localStorage.getItem('ipAPI')}listarTarefa/${taskId}`)
                .then((response) => {
                    console.log(response);
                    const tarefa = response.data.tarefa[0];
                    document.getElementById("descricao").value = tarefa.descricao;
                    document.getElementById("equipe").value = tarefa.equipe;

                    const nomeUserSelect = document.getElementById("nomeUser");
                    nomeUserSelect.value = tarefa.id_usuario;

                    const prioridadeSelect = document.getElementById("prioridade");
                    prioridadeSelect.value = tarefa.prioridade;

                }).catch((error) => {
                    console.error(error);
                });
        }
    }
    $(document).off('submit', '#formNovaTarefa');
    $(document).on('submit', '#formNovaTarefa', async function (event) {
        event.preventDefault();

        console.log(localStorage.getItem('ipAPI'));

        const formData = {
            id_usuario: document.getElementById('nomeUser').value,
            descricao: document.getElementById('descricao').value,
            equipe: document.getElementById('equipe').value,
            prioridade: document.getElementById('prioridade').value
        }
        console.log(formData);

        if (!taskId) {
            axios.post(`${localStorage.getItem('ipAPI')}novaTarefa`, formData)
                .then(response => {
                    console.log(response.data);
                    alert(`Tarefa cadastrada com sucesso!`);
                }).catch(error => {
                    console.error(error);
                    alert("Ocorreu um erro ao cadastrar o usuário")
                })
        } else {
            axios.put(`${localStorage.getItem('ipAPI')}atualizarTarefa/${taskId}`, formData)
                .then(response => {
                    console.log(response.data);
                    alert(`Tarefa atualizada com sucesso!`);

                }).catch(error => {
                    console.error(error);
                    alert("Ocorreu um erro ao atualizar a tarefa")
                })
                sessionStorage.removeItem("taskId");
        }






    })
})