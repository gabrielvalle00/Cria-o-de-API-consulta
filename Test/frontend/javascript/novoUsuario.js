
$(document).ready(function () {
    $(document).off ('submit', '#formUsuario');

    $(document).on('submit', '#formUsuario', async function (event) {
        event.preventDefault();

    

        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value
        }

        axios.post(`${localStorage.getItem('ipAPI')}novoUsuario`, formData)
        .then(response => {
            console.log(response)
            alert('Usuario criado com sucesso')
            })
            .catch(error => {
                console.error(error)
                alert('Erro ao criar usuario')
            })
    })
})