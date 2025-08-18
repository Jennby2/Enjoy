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
      if (!data.success || !data.ficha) {
        document.getElementById('perfilDados').innerHTML = '<p>Ficha não encontrada.</p>';
        return;
      }
      const ficha = data.ficha;
      document.getElementById('perfilDados').innerHTML = `
        <div style="text-align:center;">
          ${ficha.fotoPerfil ? `<img src="${ficha.fotoPerfil}" alt="Foto de Perfil" style="width:120px;height:120px;border-radius:50%;margin-bottom:12px;border:3px solid #8e24aa;">` : ''}
        </div>
        <p><strong>Nome:</strong> ${ficha.nome}</p>
        <p><strong>Gênero:</strong> ${ficha.genero}</p>
        <p><strong>Data de Nascimento:</strong> ${ficha.dataNascimento}</p>
        <p><strong>E-mail:</strong> ${ficha.email}</p>
        <p><strong>Peso:</strong> ${ficha.peso} kg</p>
        <p><strong>Altura:</strong> ${ficha.altura} cm</p>
        <p><strong>Objetivo:</strong> ${ficha.objetivo}</p>
      `;
    });
});