const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Importar bcrypt para hashing de senhas
const saltRounds = 10; // Nível de segurança do hash

const app = express();
const PORT = 3000; // Alterado para uma porta comum de servidor web

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2005',
  database: 'mydb', // Verifique se o nome do banco está correto
  port: 3306,
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Rota de registro de usuário
app.post('/api/register', (req, res) => {
  const { usuario, senha } = req.body;
  if (!usuario || !senha) {
    return res.json({ success: false, message: 'Usuário e senha são obrigatórios.' });
  }

  // Primeiro, verifica se o usuário já existe
  connection.query(
    'SELECT * FROM usuarios WHERE usuario = ?',
    [usuario],
    (err, results) => {
      if (err) {
        console.error('Erro na consulta de usuário:', err);
        return res.json({ success: false, message: 'Erro no banco de dados.' });
      }

      if (results.length > 0) {
        return res.json({ success: false, message: 'Nome de usuário já cadastrado.' });
      }

      // Se o usuário não existe, faz o hash da senha
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        if (err) {
          console.error('Erro ao fazer hash da senha:', err);
          return res.json({ success: false, message: 'Erro ao processar a senha.' });
        }

        // Insere o novo usuário com a senha hasheada
        connection.query(
          'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
          [usuario, hash], // Salva o hash da senha
          (err2) => {
            if (err2) {
              console.error('Erro ao cadastrar usuário:', err2);
              return res.json({ success: false, message: 'Erro ao cadastrar usuário.' });
            }
            res.json({ success: true, message: 'Usuário cadastrado com sucesso!' });
          }
        );
      });
    }
  );
});

// Rota de login de usuário
app.post('/api/login', (req, res) => {
  const { usuario, senha } = req.body;
  
  if (!usuario || !senha) {
    return res.json({ success: false, message: 'Usuário e senha são obrigatórios.' });
  }

  connection.query(
    'SELECT * FROM usuarios WHERE usuario = ?',
    [usuario],
    (err, results) => {
      if (err) {
        console.error('Erro na consulta de login:', err);
        return res.json({ success: false, message: 'Erro no banco de dados.' });
      }
      
      if (results.length === 0) {
        return res.json({ success: false, message: 'Usuário ou senha inválidos.' });
      }

      const user = results[0];
      // Compara a senha fornecida com o hash salvo no banco de dados
      bcrypt.compare(senha, user.senha, (err, result) => {
        if (err) {
          console.error('Erro ao comparar senhas:', err);
          return res.json({ success: false, message: 'Erro no servidor.' });
        }
        
        if (result) {
          res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
          res.json({ success: false, message: 'Usuário ou senha inválidos.' });
        }
      });
    }
  );
});

// Rota de cadastro de ficha
app.post('/api/ficha', (req, res) => {
  const ficha = req.body;
  if (!ficha.usuario) {
    return res.json({ success: false, message: 'ID do usuário é obrigatório.' });
  }

  connection.query(
    'SELECT * FROM fichas WHERE usuario = ?',
    [ficha.usuario],
    (err, results) => {
      if (err) {
        console.error('Erro na consulta de ficha existente:', err);
        return res.json({ success: false, message: 'Erro no banco de dados.' });
      }

      const fichaExistente = results.length > 0;
      let sql;
      let values;

      if (fichaExistente) {
        // Atualiza a ficha existente
        const campos = Object.keys(ficha).filter(k => k !== 'usuario');
        const valores = campos.map(k => ficha[k]);
        sql = `UPDATE fichas SET ${campos.map(c => `${c}=?`).join(', ')} WHERE usuario=?`;
        values = [...valores, ficha.usuario];
      } else {
        // Insere uma nova ficha
        sql = 'INSERT INTO fichas SET ?';
        values = [ficha];
      }

      connection.query(sql, values, (err2) => {
        if (err2) {
          console.error('Erro ao salvar/atualizar ficha:', err2);
          return res.json({ success: false, message: 'Erro ao salvar/atualizar ficha.' });
        }
        res.json({ success: true, message: 'Ficha salva com sucesso!' });
      });
    }
  );
});

// Rota de busca de ficha do usuário
app.get('/api/ficha/:usuario', (req, res) => {
  connection.query(
    'SELECT * FROM fichas WHERE usuario = ?',
    [req.params.usuario],
    (err, results) => {
      if (err) {
        console.error('Erro na busca de ficha:', err);
        return res.json({ success: false, message: 'Erro no banco de dados.' });
      }

      if (results.length > 0) {
        res.json({ success: true, ficha: results[0] });
      } else {
        res.json({ success: false, message: 'Ficha não encontrada.' });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

});
