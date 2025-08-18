document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const senha = document.getElementById('senha').value;
            
            fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, senha })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Usuário cadastrado com sucesso! Prossiga para preencher sua ficha.');
                    window.location.assign('index.html'); // ou 'cadastro-ficha.html' se for essa a página de ficha
                } else {
                    alert(data.message || 'Erro ao registrar!');
                }
            })
            .catch(error => {
                alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
                console.error(error);
            });
        });
    }
});