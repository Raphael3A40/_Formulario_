fetch("http://localhost:3000/itens-selecionados")
  .then((res) => res.json())
  .then((itensSelecionados) => {
    criarCheckboxes("cozinha", "cozinha", itensSelecionados);
    criarCheckboxes("quarto", "quarto", itensSelecionados);
    criarCheckboxes("banheiro", "banheiro", itensSelecionados);
    criarCheckboxes("lavanderia", "lavanderia", itensSelecionados);
    criarCheckboxes("eletro", "eletro", itensSelecionados);
  });

function criarCheckboxes(categoria, containerId, itensSelecionados) {
  // mesmo conteúdo que antes, mas com filtro vindo da API
}

fetch("http://localhost:3000/selecionar-itens", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ itens: selecionados }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.sucesso) {
      alert("Itens salvos com sucesso!");
      location.reload(); // Atualiza a página para esconder os itens já escolhidos
    } else if (data.duplicados) {
      alert("Itens já foram escolhidos: " + data.duplicados.join(", "));
    }
  });
