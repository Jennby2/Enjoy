// login.js
// Este script é responsável por gerenciar o formulário de login
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const usuario = document.getElementById('usuario').value;
      const senha = document.getElementById('senha').value;

      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Salva o nome de usuário no localStorage após o login
          localStorage.setItem('usuarioLogado', usuario); 
          window.location.assign('perfil.html'); // ou outra página
        } else {
          alert(data.message || 'Usuário ou senha inválidos!');
        }
      })
      .catch(error => {
        alert('Erro ao fazer login!');
        console.error(error);
      });
    });
  }
});