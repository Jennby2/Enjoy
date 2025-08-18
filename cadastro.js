document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const fichaContent = document.getElementById('fichaContent');
    const fichaForm = document.getElementById('fichaForm');
    const feedbackRegistro = document.getElementById('feedbackRegistro');
    const feedbackFicha = document.getElementById('feedbackFicha');
    
    let usuarioLogado = null;

    // Lida com o registro de usuário
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
                    feedbackRegistro.textContent = 'Usuário cadastrado com sucesso! Prossiga para preencher sua ficha.';
                    feedbackRegistro.style.color = 'green';
                    usuarioLogado = usuario;
                    registerForm.style.display = 'none';
                    fichaContent.style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    feedbackRegistro.textContent = data.message || 'Erro ao registrar!';
                    feedbackRegistro.style.color = 'red';
                }
            })
            .catch(error => {
                feedbackRegistro.textContent = 'Erro de conexão com o servidor.';
                feedbackRegistro.style.color = 'red';
                console.error(error);
            });
        });
    }

    // Lida com o preenchimento e salvamento da ficha
    if (fichaForm) {
        // Pré-visualização da foto de perfil
        document.getElementById('fotoPerfil').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('fotoPreview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Foto de Perfil" class="foto-perfil">`;
                };
                reader.readAsDataURL(file);
            }
        });
        
        fichaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const ficha = {
                usuario: usuarioLogado
            };

            const formElements = fichaForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                if (element.id && element.type !== 'submit' && element.type !== 'file') {
                    if (element.type === 'checkbox') {
                         ficha[element.id] = element.checked;
                    } else {
                         ficha[element.id] = element.value;
                    }
                }
            }

            const fotoInput = document.getElementById('fotoPerfil');
            const file = fotoInput.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    ficha.fotoPerfil = event.target.result;
                    enviarFicha(ficha);
                };
                reader.onerror = error => {
                    console.error('Erro ao ler a imagem:', error);
                    alert('Erro ao ler a imagem.');
                };
                reader.readAsDataURL(file);
            } else {
                enviarFicha(ficha);
            }
        });
    }

    function enviarFicha(fichaData) {
        feedbackFicha.textContent = 'Salvando ficha...';
        feedbackFicha.style.color = 'black';
        fetch('http://localhost:3000/api/ficha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fichaData),
        })
        .then(response => {
             if (!response.ok) {
                 throw new Error(`Erro do servidor: ${response.status}`);
             }
             return response.json();
         })
        .then(data => {
            if (data.success) {
                feedbackFicha.textContent = data.message;
                feedbackFicha.style.color = 'green';
                setTimeout(() => window.location.assign('perfil.html'), 2000);
            } else {
                feedbackFicha.textContent = data.message || 'Erro ao salvar a ficha.';
                feedbackFicha.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            feedbackFicha.textContent = 'Ocorreu um erro ao salvar a ficha.';
            feedbackFicha.style.color = 'red';
        });
    }
});
