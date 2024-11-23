
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

        
        })
        .catch(error => {
            console.error(error)
          
        })
+

    $(document).off ('submit', '#formNovaTarefa');
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

        axios.post(`${localStorage.getItem('ipAPI')}novaTarefa`,formData)
        .then(response => {
            console.log(response.data);
            alert(`Tarefa cadastrada com sucesso!`);
        }).catch(error => {
            console.error(error);

        })



     
    })
})