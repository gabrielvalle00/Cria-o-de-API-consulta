function carregarPagina(pagina) {
    const conteudoPrincipal = document.getElementById('conteudoPrincipal');

    const url = `${pagina}.html`;
    const script = `${pagina}.js`;

    fetch(url)
        .then(response => response.text())
        .then(html => { 
            conteudoPrincipal.innerHTML = html;

            const scriptNovo = document.createElement('script');
            scriptNovo.src = `../javascript/${script}`;
            document.body.appendChild(scriptNovo);
    })
}


localStorage.setItem(`ipAPI`, `http://10.0.10.152:3000/`);