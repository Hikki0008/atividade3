document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById("tabelaCorpo");
    const form = document.getElementById("formCadastro");

    // Carrega as imagens ao iniciar
    fetch("http://localhost:8080/api/imagens", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            addLinhas(data);
        })
        .catch(error => {
            console.log(error);
        });

    // Evento de envio do formulário
    form.addEventListener('submit', salvar);

    function salvar(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const url = document.getElementById("url").value.trim();

        if (nome && url) {
            // POST na API
            fetch("http://localhost:8080/api/imagens", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, url })
            })
                .then(response => response.json())
                .then(data => {
                    addLinhas([data]); // Adiciona a nova linha
                    form.reset();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    function addLinhas(dadosAPI) {
        dadosAPI.forEach(element => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td class="px-4 py-2">${element.id}</td>
                <td class="px-4 py-2">${element.nome}</td>
                <td class="px-4 py-2"><a href="${element.url}" target="_blank" class="text-blue-500 underline">${element.url}</a></td>
                <td class="px-4 py-2 flex gap-2">
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editar(this)">Editar</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this)">Remover</button>
                </td>
            `;

            tabela.appendChild(linha);
        });
    }
});

// Função editar
function editar(botao) {
    const linha = botao.closest('tr');
    const id = linha.children[0].innerText;
    const nomeAtual = linha.children[1].innerText;
    const urlAtual = linha.children[2].innerText;

    Swal.fire({
        title: 'Editar dados',
        html: `
            <input id="editNome" class="swal2-input" placeholder="Nome" value="${nomeAtual}">
            <input id="editUrl" class="swal2-input" placeholder="Url" value="${urlAtual}">
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
            fetch(`http://localhost:8080/api/imagens/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result.value)
            })
                .then(() => {
                    linha.children[1].innerText = result.value.nome;
                    linha.children[2].innerHTML = `<a href="${result.value.url}" target="_blank" class="text-blue-500 underline">${result.value.url}</a>`;
                });
        }
    });
}

// Função remover
function remover(botao) {
    Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {
            const linha = botao.closest('tr');
            const id = linha.children[0].innerText;

            fetch(`http://localhost:8080/api/imagens/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    linha.remove();
                });
        }
    });
}
