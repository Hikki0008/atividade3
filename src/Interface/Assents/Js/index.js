fetch("http://localhost:8080/api/imagens", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    })
.then(response => response.json())
.then(data => {
    addLinha(data);
})
.catch(error => {
    console.log(error);
});

function addLinha(dadosAPI){
    const tabela = document.getElementById("tabelaCorpo");
    dadosAPI.forEach(element => {
        const linha = document.createElement("tr");
        // Adicionando HTML
        linha.innerHTML = `
            <tr>
                <td class="px-4 py-2">${element.id}</td>
                <td class="px-4 py-2">${element.nome}</td>
                <td class="px-4 py-2">${element.url}</td>
                <td class="px-4 py-2"><button class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this)">remover</button></td>
            </tr>
        `;
        tabela.appendChild(linha);
    });

    function salvar() {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const url = document.getElementById("url").value;
        if (nome && url) {

            this.addLinha([{"nome": nome.trim(), "url": url.trim()}]);

            // Limpando os campos
            document.getElementById("nome").value = "";
            document.getElementById("url").value = "";

            // API POST
            fetch("http://localhost:8080/api/imagens", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"nome": nome, "url": url})
            })
            .then(response => response.json())
            .then(data => {
                console.log("Resposta da API:", data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    } function editar(dadosbotao) {
        const linha = dadosbotao.closest('tr');
        const id = linha.querySelector("td").innerText;
        const nomeAtual = linha.children[1].innerText;
        const urlAtual = linha.children[2].innerText;

        Swal.fire({
            title: 'Editar dados',
            html: `
      <input id="editNome" class="swal2-input" placeholder="Nome" value="${nomeAtual}">
      <input id="editUrl" class="swal2-input" placeholder="Url" value="${urllAtual}">
    `,
            confirmButtonText: 'Salvar',
            showCancelButton: true,
            preConfirm: () => {
                const nome = document.getElementById('editNome').value.trim();
                const url = document.getElementById('editUrl').value.trim();

                if (!nome || !url) {
                    Swal.showValidationMessage('Preencha todos os campos!');
                    return false;
                }

                return { nome, url };
            }
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:8080/api/alunos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result.value)
                })
                    .then(() => {

                        linha.children[1].innerText = result.value.nome;
                        linha.children[2].innerText = result.value.url;

                    })
            }
        });
    }


    function remover(dadosbotao){
        Swal.fire({
            icon: 'question',
            title: 'Você tem certeza?',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                const linharemover = dadosbotao.closest('tr');
                const id = linharemover.querySelector("td").innerText;

                fetch(`http://localhost:8080/api/alunos/${id}`, {
                    method: 'DELETE'
                })
                    .then(() => {
                        linharemover.remove();
                    })

            }
        });
    }
}
