document.addEventListener('DOMContentLoaded', function() {
  const usuario = localStorage.getItem('usuarioLogado');
  if (!usuario) {
    alert('Faça login para acessar o perfil.');
    window.location.assign('login.html');
    return;
  }
  fetch('http://localhost:3000/api/ficha/' + usuario)
    .then(res => res.json())
    .then(data => {
      const perfilDados = document.getElementById('perfilDados');
      const fichaContent = document.getElementById('fichaContent');
      if (!data.success || !data.ficha) {
        perfilDados.innerHTML = '<p>Ficha não encontrada. Preencha sua ficha abaixo:</p>';
        fichaContent.style.display = 'block'; // Mostra o formulário
      } else {
        // Exibe os dados da ficha
        perfilDados.innerHTML = `
          <div style="text-align:center;">
            ${data.ficha.fotoPerfil ? `<img src="${data.ficha.fotoPerfil}" alt="Foto de Perfil" style="width:120px;height:120px;border-radius:50%;margin-bottom:12px;border:3px solid #8e24aa;">` : ''}
          </div>
          <p><strong>Nome:</strong> ${data.ficha.nome}</p>
          <p><strong>Gênero:</strong> ${data.ficha.genero}</p>
          <p><strong>Data de Nascimento:</strong> ${data.ficha.dataNascimento}</p>
          <p><strong>E-mail:</strong> ${data.ficha.email}</p>
          <p><strong>Peso:</strong> ${data.ficha.peso} kg</p>
          <p><strong>Altura:</strong> ${data.ficha.altura} cm</p>
          <p><strong>Objetivo:</strong> ${data.ficha.objetivo}</p>
        `;
        fichaContent.style.display = 'none'; // Esconde o formulário
      }
    });
});
