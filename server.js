const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Caminho do "banco de dados"
const DB_FILE = "./db.json";

// Função para ler o banco
function lerDB() {
  const raw = fs.readFileSync(DB_FILE);
  return JSON.parse(raw);
}

// Função para salvar no banco
function salvarDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Rota para buscar itens já selecionados
app.get("/itens-selecionados", (req, res) => {
  const db = lerDB();
  res.json(db.itensSelecionados);
});

// Rota para salvar novos itens
app.post("/selecionar-itens", (req, res) => {
  const novosItens = req.body.itens; // deve ser um array de strings
  if (!Array.isArray(novosItens)) {
    return res.status(400).json({ error: "Formato inválido" });
  }

  const db = lerDB();
  const jaSelecionados = db.itensSelecionados;

  const duplicados = novosItens.filter((item) => jaSelecionados.includes(item));
  if (duplicados.length > 0) {
    return res
      .status(409)
      .json({ error: "Alguns itens já foram escolhidos", duplicados });
  }

  db.itensSelecionados.push(...novosItens);
  salvarDB(db);

  res.json({ sucesso: true, selecionados: novosItens });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
