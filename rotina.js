document.addEventListener('DOMContentLoaded', () => {
  // Enjoy Rotina - Script Moderno

  // 1. Frase motivacional
  const frases = [
    'Cada passo conta! Continue se movendo. 💚',
    'Seu corpo agradece cada escolha saudável!',
    'Persistência hoje, resultado amanhã!',
    'Você é mais forte do que imagina!',
    'A saúde é o maior presente. Cuide dela!',
    'Movimente-se, sorria e vença o dia!',
    'Pequenas vitórias diárias geram grandes conquistas.'
  ];
  function mostrarFraseMotivacional() {
    const el = document.querySelector('.motivacional');
    if (el) el.textContent = frases[Math.floor(Math.random() * frases.length)];
  }
  mostrarFraseMotivacional();

  // 2. Resumo dos dados pessoais
  function exibirResumo() {
    const ficha = JSON.parse(localStorage.getItem('ficha')) || {};
    const resumo = document.getElementById('resumoDados');
    if (resumo) {
      resumo.innerHTML = `
        <strong>Nome:</strong> ${ficha.nome || '-'}<br>
        <strong>Idade:</strong> ${ficha.idade || '-'}<br>
        <strong>Sexo:</strong> ${ficha.sexo || '-'}<br>
        <strong>Peso:</strong> ${ficha.peso || '-'} kg<br>
        <strong>Altura:</strong> ${ficha.altura || '-'} cm<br>
        <strong>Objetivo:</strong> ${ficha.objetivo || '-'}<br>
        <strong>Biotipo:</strong> ${ficha.biotipo || '-'}<br>
      `;
    }
    return ficha;
  }
  const ficha = exibirResumo();

  // 3. Dicas alimentares e de saúde
  function gerarDicas(objetivo) {
    const dicas = [];
    if (objetivo === 'Emagrecer') {
      dicas.push('Prefira alimentos integrais e naturais.');
      dicas.push('Evite açúcar e frituras.');
      dicas.push('Beba bastante água ao longo do dia.');
    } else if (objetivo === 'Fortalecer Musculatura') {
      dicas.push('Inclua proteínas magras em todas as refeições.');
      dicas.push('Faça pequenas refeições a cada 3 horas.');
      dicas.push('Durma bem para recuperação muscular.');
    } else {
      dicas.push('Mantenha uma alimentação equilibrada.');
      dicas.push('Inclua frutas e verduras diariamente.');
      dicas.push('Evite excesso de sal e açúcar.');
    }
    dicas.push('Pratique atividade física regularmente.');
    dicas.push('Faça pausas para alongamento.');
    return dicas;
  }
  function exibirDicas() {
    const lista = document.getElementById('listaDicas');
    if (!lista) return;
    lista.innerHTML = '';
    gerarDicas(ficha.objetivo).forEach(dica => {
      const li = document.createElement('li');
      li.textContent = dica;
      lista.appendChild(li);
    });
  }
  exibirDicas();

  // 4. Atividades físicas sugeridas
  const atividadesLinks = {
    'Caminhada': { youtube: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U' },
    'Alongamento': { youtube: 'https://www.youtube.com/watch?v=JJv3Z0q5l1w' },
    'Corrida leve': { youtube: 'https://www.youtube.com/watch?v=QJp5QKzF4pY' },
    'HIIT': { youtube: 'https://www.youtube.com/watch?v=ml6cT4AZdqI' },
    'Musculação': { youtube: 'https://www.youtube.com/watch?v=U0bhE67HuDY' },
    'Funcional': { youtube: 'https://www.youtube.com/watch?v=2pLT-olgUJs' },
    'Yoga': { youtube: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    'Meditação': { youtube: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
    'Mobilidade': { youtube: 'https://www.youtube.com/watch?v=2L2lnxIcNmo' }
  };
  function getYouTubeId(url) {
    const match = url.match(/[?&]v=([^&#]+)/);
    if (match) return match[1];
    const alt = url.match(/youtu\.be\/([^?&#]+)/);
    if (alt) return alt[1];
    return null;
  }
  function atividadesPorObjetivo(objetivo) {
    if (objetivo === 'Emagrecer') {
      return {
        manha: ['Caminhada', 'Alongamento', 'Corrida leve'],
        tarde: ['HIIT', 'Funcional', 'Musculação'],
        noite: ['Alongamento', 'Yoga', 'Meditação']
      };
    } else if (objetivo === 'Fortalecer Musculatura') {
      return {
        manha: ['Alongamento', 'Caminhada', 'Mobilidade'],
        tarde: ['Musculação', 'Funcional', 'HIIT'],
        noite: ['Caminhada', 'Alongamento', 'Yoga']
      };
    } else {
      return {
        manha: ['Caminhada', 'Alongamento', 'Mobilidade'],
        tarde: ['Funcional', 'Musculação', 'Yoga'],
        noite: ['Alongamento', 'Meditação', 'Caminhada']
      };
    }
  }
  function renderAtividades(lista, id) {
    const span = document.getElementById(id);
    if (!span) return;
    span.innerHTML = '';
    lista.forEach((nome, idx) => {
      const linkYt = atividadesLinks[nome]?.youtube || '';
      const ytId = getYouTubeId(linkYt);
      const bloco = document.createElement('div');
      bloco.style.marginBottom = '18px';
      bloco.style.background = '#f8fff9';
      bloco.style.borderRadius = '8px';
      bloco.style.padding = '8px 4px';
      bloco.style.boxShadow = '0 1px 4px #25d36611';
      const titulo = document.createElement('div');
      titulo.textContent = nome;
      titulo.style.fontWeight = 'bold';
      titulo.style.color = '#128c7e';
      bloco.appendChild(titulo);
      if (ytId) {
        const player = document.createElement('iframe');
        player.width = '100%';
        player.height = '220';
        player.style.borderRadius = '8px';
        player.style.margin = '8px 0';
        player.src = `https://www.youtube.com/embed/${ytId}`;
        player.frameBorder = '0';
        player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        player.allowFullscreen = true;
        bloco.appendChild(player);
      }
      // Botão de concluir tarefa física
      const btnConcluir = document.createElement('button');
      btnConcluir.textContent = 'Concluir Atividade';
      btnConcluir.style.marginTop = '8px';
      btnConcluir.style.background = 'linear-gradient(90deg, #25d366 60%, #128c7e 100%)';
      btnConcluir.style.color = '#fff';
      btnConcluir.style.border = 'none';
      btnConcluir.style.borderRadius = '6px';
      btnConcluir.style.padding = '8px 14px';
      btnConcluir.style.fontWeight = 'bold';
      btnConcluir.style.cursor = 'pointer';
      btnConcluir.style.transition = 'background 0.2s, box-shadow 0.2s';
      btnConcluir.style.boxShadow = '0 2px 8px #25d36622';
      // Checar se já foi concluída hoje
      const key = `atividadeConcluida_${id}_${idx}`;
      const concluidaHoje = (() => {
        const dataSalva = localStorage.getItem(key + '_data');
        const hoje = new Date().toDateString();
        return dataSalva === hoje;
      })();
      if (concluidaHoje) {
        btnConcluir.disabled = true;
        btnConcluir.textContent = 'Atividade concluída hoje!';
        btnConcluir.style.opacity = '0.7';
      }
      btnConcluir.addEventListener('click', function() {
        // Marca como concluída hoje
        localStorage.setItem(key + '_data', new Date().toDateString());
        btnConcluir.disabled = true;
        btnConcluir.textContent = 'Atividade concluída hoje!';
        btnConcluir.style.opacity = '0.7';
        // Atualiza histórico de progresso: soma +1 no dia
        let historico = JSON.parse(localStorage.getItem('historicoProgresso')) || Array(7).fill(0);
        const hoje = new Date().getDay();
        historico[hoje] = (historico[hoje] || 0) + 1;
        localStorage.setItem('historicoProgresso', JSON.stringify(historico));
        renderGraficoProgresso && renderGraficoProgresso();
      });
      bloco.appendChild(btnConcluir);
      span.appendChild(bloco);
    });
  }
  const atividades = atividadesPorObjetivo(ficha.objetivo);
  renderAtividades(atividades.manha, 'atividadeManha');
  renderAtividades(atividades.tarde, 'atividadeTarde');
  renderAtividades(atividades.noite, 'atividadeNoite');

  // 5. Lembretes automáticos (notificações)
  function pedirPermissaoNotificacao() {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }
  function mostrarNotificacao(mensagem) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Lembrete de Saúde', { body: mensagem });
    }
    // Pop-up na página
    const popup = document.createElement('div');
    popup.textContent = mensagem;
    popup.style.position = 'fixed';
    popup.style.bottom = '30px';
    popup.style.right = '30px';
    popup.style.background = '#25d366';
    popup.style.color = '#fff';
    popup.style.padding = '18px 28px';
    popup.style.borderRadius = '12px';
    popup.style.fontSize = '1.1rem';
    popup.style.fontWeight = 'bold';
    popup.style.boxShadow = '0 4px 16px #25d36655';
    popup.style.zIndex = 9999;
    document.body.appendChild(popup);
    setTimeout(() => { popup.remove(); }, 7000);
  }
  function agendarLembretes() {
    const lembretes = [
      { hora: 8, min: 0, msg: 'Hora de cuidar da sua saúde! Beba água e movimente-se.' },
      { hora: 13, min: 0, msg: 'Pausa saudável: alongue-se e faça uma refeição equilibrada.' },
      { hora: 20, min: 0, msg: 'Relaxe, respire fundo e prepare-se para uma boa noite de sono.' }
    ];
    const agora = new Date();
    lembretes.forEach(l => {
      const proximo = new Date();
      proximo.setHours(l.hora, l.min, 0, 0);
      if (proximo < agora) proximo.setDate(proximo.getDate() + 1);
      const ms = proximo - agora;
      setTimeout(function lembreteRecorrente() {
        mostrarNotificacao(l.msg);
        setTimeout(lembreteRecorrente, 24 * 60 * 60 * 1000);
      }, ms);
    });
  }
  pedirPermissaoNotificacao();
  agendarLembretes();

  // 6. Tarefas editáveis, barra de progresso e conquistas
  const listaTarefas = document.getElementById('listaTarefas');
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || Array(10).fill({ texto: '', done: false });
  function atualizarProgresso() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t && t.done).length;
    const barra = document.getElementById('barraProgresso');
    const texto = document.getElementById('textoProgresso');
    if (barra && texto) {
      const pct = total ? Math.round((concluidas / total) * 100) : 0;
      barra.style.width = pct + '%';
      texto.textContent = `${concluidas} de ${total} tarefas concluídas (${pct}%)`;
    }
    salvarHistoricoProgresso(concluidas);
    renderMedalhas();
    renderGraficoProgresso();
  }
  function renderTarefas() {
    listaTarefas.innerHTML = '';
    tarefas.forEach((tarefa, i) => {
      const li = document.createElement('li');
      li.style.opacity = tarefa.done ? '0.6' : '1';
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = !!tarefa.done;
      check.style.marginRight = '8px';
      check.addEventListener('change', function() {
        tarefas[i].done = check.checked;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        atualizarProgresso();
        renderTarefas();
      });
      const input = document.createElement('input');
      input.type = 'text';
      input.value = tarefa.texto || '';
      input.placeholder = `Tarefa ${i+1}`;
      input.style.textDecoration = tarefa.done ? 'line-through' : 'none';
      input.addEventListener('input', function() {
        tarefas[i].texto = input.value;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
      });
      li.appendChild(check);
      li.appendChild(input);
      listaTarefas.appendChild(li);
    });
    atualizarProgresso();
  }
  renderTarefas();
  document.getElementById('adicionarTarefa').addEventListener('click', function() {
    if (tarefas.length < 10) {
      tarefas.push({ texto: '', done: false });
      renderTarefas();
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
  });

  // Barra de progresso visual
  (function criarBarraProgresso() {
    const barraContainer = document.createElement('div');
    barraContainer.style.width = '100%';
    barraContainer.style.background = '#f0f4f8';
    barraContainer.style.borderRadius = '8px';
    barraContainer.style.margin = '18px 0 10px 0';
    barraContainer.style.height = '18px';
    barraContainer.style.overflow = 'hidden';
    const barra = document.createElement('div');
    barra.id = 'barraProgresso';
    barra.style.height = '100%';
    barra.style.width = '0%';
    barra.style.background = 'linear-gradient(90deg, #25d366 60%, #128c7e 100%)';
    barra.style.transition = 'width 0.5s';
    barraContainer.appendChild(barra);
    const textoProgresso = document.createElement('div');
    textoProgresso.id = 'textoProgresso';
    textoProgresso.style.textAlign = 'center';
    textoProgresso.style.marginTop = '4px';
    textoProgresso.style.color = '#128c7e';
    textoProgresso.style.fontWeight = 'bold';
    const tarefasSection = document.getElementById('tarefas');
    if (tarefasSection && listaTarefas) {
      tarefasSection.insertBefore(barraContainer, listaTarefas);
      tarefasSection.insertBefore(textoProgresso, listaTarefas);
    }
  })();

  // 7. Medalhas/conquistas
  function renderMedalhas() {
    const el = document.getElementById('medalhasUsuario');
    if (!el) return;
    let conquistas = [];
    const concluidas = tarefas.filter(t => t && t.done).length;
    if (concluidas >= 10) conquistas.push('🏅 10 tarefas em 1 dia!');
    if (concluidas >= 7) conquistas.push('🥇 7 tarefas em 1 dia!');
    if (concluidas >= 5) conquistas.push('🥈 5 tarefas em 1 dia!');
    if (concluidas >= 3) conquistas.push('🥉 3 tarefas em 1 dia!');
    if (conquistas.length === 0) conquistas.push('Complete tarefas para ganhar medalhas!');
    el.innerHTML = conquistas.map(m => `<div style="margin-bottom:6px;">${m}</div>`).join('');
  }

  // 8. Histórico de progresso (gráfico)
  function salvarHistoricoProgresso(concluidas) {
    let historico = JSON.parse(localStorage.getItem('historicoProgresso')) || Array(7).fill(0);
    const hoje = new Date().getDay();
    historico[hoje] = concluidas;
    localStorage.setItem('historicoProgresso', JSON.stringify(historico));
  }
  function renderGraficoProgresso() {
    const canvas = document.getElementById('graficoProgresso');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let historico = JSON.parse(localStorage.getItem('historicoProgresso'));
    if (!historico || historico.length !== 7) {
      historico = Array(7).fill(0).map(() => Math.floor(Math.random()*11));
      localStorage.setItem('historicoProgresso', JSON.stringify(historico));
    }
    const max = 10;
    const w = canvas.width, h = canvas.height;
    ctx.strokeStyle = '#25d366';
    ctx.lineWidth = 2;
    ctx.beginPath();
    historico.forEach((val, i) => {
      const x = 20 + i*(w-40)/6;
      const y = h-20 - (val/max)*(h-40);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      ctx.fillStyle = '#128c7e';
      ctx.beginPath(); ctx.arc(x, y, 5, 0, 2*Math.PI); ctx.fill();
    });
    ctx.stroke();
    ctx.strokeStyle = '#b2dfdb';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(20, h-20); ctx.lineTo(w-20, h-20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(20, h-20); ctx.stroke();
    ctx.fillStyle = '#128c7e';
    ctx.font = '12px Segoe UI';
    for (let i=0; i<7; i++) {
      ctx.fillText(['D','S','T','Q','Q','S','S'][i], 16 + i*(w-40)/6, h-5);
    }
    ctx.fillText('Tarefas', 2, 16);
  }

  // 9. Calendário semanal
  function renderCalendarioSemanal() {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const hoje = new Date();
    const semana = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(hoje.getDate() - hoje.getDay() + i);
      semana.push({
        dia: dias[i],
        data: d.getDate(),
        mes: d.getMonth() + 1,
        ano: d.getFullYear(),
        hoje: d.toDateString() === hoje.toDateString()
      });
    }
    const el = document.getElementById('calendarioSemanal');
    if (el) {
      el.innerHTML = '';
      semana.forEach((dia, idx) => {
        const div = document.createElement('div');
        div.textContent = `${dia.dia} ${dia.data}/${dia.mes}`;
        div.style.display = 'inline-block';
        div.style.margin = '0 6px';
        div.style.padding = '8px 10px';
        div.style.borderRadius = '8px';
        div.style.background = dia.hoje ? 'linear-gradient(90deg, #25d366 60%, #128c7e 100%)' : '#eafff1';
        div.style.color = dia.hoje ? '#fff' : '#128c7e';
        div.style.fontWeight = dia.hoje ? 'bold' : 'normal';
        el.appendChild(div);
      });
    }
  }
  renderCalendarioSemanal();

  // 10. Personalização de tema
  const temas = {
    padrao: {
      '--cor-bg': 'linear-gradient(120deg, #e0ffe7 0%, #f0f4f8 100%)',
      '--cor-container': '#fff',
      '--cor-titulo': '#25d366',
      '--cor-secundaria': '#128c7e',
      '--cor-btn': 'linear-gradient(90deg, #25d366 60%, #128c7e 100%)',
      '--cor-txt': '#128c7e',
    },
    escuro: {
      '--cor-bg': 'linear-gradient(120deg, #232526 0%, #414345 100%)',
      '--cor-container': '#232526',
      '--cor-titulo': '#25d366',
      '--cor-secundaria': '#fff',
      '--cor-btn': 'linear-gradient(90deg, #128c7e 60%, #25d366 100%)',
      '--cor-txt': '#fff',
    },
    claro: {
      '--cor-bg': 'linear-gradient(120deg, #fff 0%, #e0ffe7 100%)',
      '--cor-container': '#fff',
      '--cor-titulo': '#25d366',
      '--cor-secundaria': '#128c7e',
      '--cor-btn': 'linear-gradient(90deg, #25d366 60%, #128c7e 100%)',
      '--cor-txt': '#128c7e',
    },
    colorido: {
      '--cor-bg': 'linear-gradient(120deg, #f8ffae 0%, #43c6ac 100%)',
      '--cor-container': '#fffbe7',
      '--cor-titulo': '#43c6ac',
      '--cor-secundaria': '#ff6f61',
      '--cor-btn': 'linear-gradient(90deg, #43c6ac 60%, #ff6f61 100%)',
      '--cor-txt': '#ff6f61',
    }
  };
  const seletorTema = document.getElementById('seletorTema');
  if (seletorTema) {
    seletorTema.addEventListener('change', function() {
      const tema = temas[seletorTema.value] || temas.padrao;
      for (const k in tema) {
        document.body.style.setProperty(k, tema[k]);
      }
      // Salva preferência
      localStorage.setItem('temaSelecionado', seletorTema.value);
    });
    // Aplica tema salvo ao carregar
    const temaSalvo = localStorage.getItem('temaSelecionado');
    if (temaSalvo && temas[temaSalvo]) {
      seletorTema.value = temaSalvo;
      const tema = temas[temaSalvo];
      for (const k in tema) {
        document.body.style.setProperty(k, tema[k]);
      }
    }
  }

  // Botão modo escuro
  const btnModoEscuro = document.getElementById('btnModoEscuro');
  if (btnModoEscuro) {
    btnModoEscuro.addEventListener('click', function() {
      if (seletorTema) {
        seletorTema.value = 'escuro';
        seletorTema.dispatchEvent(new Event('change'));
      } else {
        // fallback: aplica direto
        const tema = temas.escuro;
        for (const k in tema) {
          document.body.style.setProperty(k, tema[k]);
        }
      }
    });
  }

  // 11. Alertas sonoros/vibração
  const btnAlerta = document.getElementById('testarAlerta');
  if (btnAlerta) {
    btnAlerta.addEventListener('click', function() {
      // Som
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = 880;
      o.connect(ctx.destination);
      o.start();
      setTimeout(()=>{o.stop();ctx.close();}, 300);
      // Vibração
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    });
  }

  // 12. Upload de fotos de progresso
  const uploadFoto = document.getElementById('uploadFoto');
  const galeriaFotos = document.getElementById('galeriaFotos');
  function renderFotos() {
    if (!galeriaFotos) return;
    galeriaFotos.innerHTML = '';
    const fotos = JSON.parse(localStorage.getItem('fotosProgresso') || '[]');
    fotos.forEach((foto, idx) => {
      const img = document.createElement('img');
      img.src = foto;
      img.style.width = '80px';
      img.style.height = '80px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '8px';
      img.style.border = '2px solid #25d366';
      img.title = `Foto ${idx+1}`;
      galeriaFotos.appendChild(img);
    });
  }
  if (uploadFoto) {
    uploadFoto.addEventListener('change', function(e) {
      const files = Array.from(e.target.files);
      const fotos = JSON.parse(localStorage.getItem('fotosProgresso') || '[]');
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(evt) {
          fotos.push(evt.target.result);
          localStorage.setItem('fotosProgresso', JSON.stringify(fotos));
          renderFotos();
        };
        reader.readAsDataURL(file);
      });
    });
    renderFotos();
  }

  // 13. Receitas saudáveis do dia
  const receitas = [
    { nome: 'Salada Colorida', desc: 'Alface, tomate, cenoura, pepino e azeite.' },
    { nome: 'Omelete Proteico', desc: 'Ovos, espinafre, tomate e queijo branco.' },
    { nome: 'Smoothie Verde', desc: 'Couve, banana, maçã, água de coco e chia.' },
    { nome: 'Iogurte com Frutas', desc: 'Iogurte natural, morango, banana e granola.' },
    { nome: 'Frango Grelhado com Legumes', desc: 'Frango, abobrinha, cenoura e brócolis.' },
    { nome: 'Panqueca de Aveia', desc: 'Aveia, banana, ovo e canela.' },
    { nome: 'Wrap Integral', desc: 'Pão integral, peito de peru, alface e tomate.' }
  ];
  function renderReceitas() {
    const lista = document.getElementById('listaReceitas');
    if (!lista) return;
    lista.innerHTML = '';
    const indices = [];
    while (indices.length < 2) {
      const idx = Math.floor(Math.random()*receitas.length);
      if (!indices.includes(idx)) indices.push(idx);
    }
    indices.forEach(i => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${receitas[i].nome}:</strong> ${receitas[i].desc}`;
      lista.appendChild(li);
    });
  }
  renderReceitas();

  // 14. Compartilhamento WhatsApp
  const btnCompartilhar = document.createElement('button');
  btnCompartilhar.textContent = 'Compartilhar Conquistas no WhatsApp';
  btnCompartilhar.style.width = '100%';
  btnCompartilhar.style.marginTop = '18px';
  btnCompartilhar.style.background = 'linear-gradient(90deg, #25d366 60%, #128c7e 100%)';
  btnCompartilhar.style.color = '#fff';
  btnCompartilhar.style.border = 'none';
  btnCompartilhar.style.borderRadius = '6px';
  btnCompartilhar.style.padding = '12px';
  btnCompartilhar.style.fontSize = '1.08rem';
  btnCompartilhar.style.fontWeight = 'bold';
  btnCompartilhar.style.cursor = 'pointer';
  btnCompartilhar.style.transition = 'background 0.2s, box-shadow 0.2s';
  btnCompartilhar.style.boxShadow = '0 2px 8px #25d36622';
  btnCompartilhar.style.letterSpacing = '1px';
  btnCompartilhar.onclick = function() {
    const concluidas = tarefas.filter(t => t.done).length;
    const total = tarefas.length;
    const pct = total ? Math.round((concluidas / total) * 100) : 0;
    const msg = `Hoje completei ${concluidas} de ${total} tarefas (${pct}%) na minha rotina saudável! #VidaSaudável`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
  };
  document.getElementById('tarefas').appendChild(btnCompartilhar);

  // 15. Relatório semanal simples
  const relatorio = document.createElement('div');
  relatorio.style.marginTop = '18px';
  relatorio.style.background = '#eafff1';
  relatorio.style.borderRadius = '8px';
  relatorio.style.padding = '10px 12px';
  relatorio.style.color = '#128c7e';
  relatorio.style.fontWeight = 'bold';
  relatorio.style.textAlign = 'center';
  relatorio.textContent = 'Continue completando tarefas para ver seu progresso semanal!';
  document.getElementById('tarefas').appendChild(relatorio);

  // Inicialização de progresso, medalhas e gráfico
  atualizarProgresso();
  renderMedalhas();
  renderGraficoProgresso();
});

function mostrarAba(aba) {
  document.getElementById('aba-rotina').style.display = aba === 'rotina' ? 'block' : 'none';
  document.getElementById('aba-dieta').style.display = aba === 'dieta' ? 'block' : 'none';
}

// Dieta personalizada: salvar e exibir
document.addEventListener('DOMContentLoaded', function() {
  // Exibe aba rotina por padrão ao carregar
  mostrarAba('rotina');

  const form = document.getElementById('formDieta');
  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const dieta = {
        objetivo: document.getElementById('objetivoDieta').value,
        preferencias: document.getElementById('preferencias').value,
        restricoes: document.getElementById('restricoes').value,
        calorias: document.getElementById('calorias').value,
        refeicoes: document.getElementById('refeicoes').value
      };
      localStorage.setItem('dietaPersonalizada', JSON.stringify(dieta));
      mostrarDietaSalva();
    });
    mostrarDietaSalva();
  }

  function mostrarDietaSalva() {
    const dieta = JSON.parse(localStorage.getItem('dietaPersonalizada'));
    const div = document.getElementById('dietaSalva');
    if(dieta) {
      div.innerHTML = `
        <h4>Dieta Salva:</h4>
        <ul>
          <li><strong>Objetivo:</strong> ${dieta.objetivo}</li>
          <li><strong>Preferências:</strong> ${dieta.preferencias}</li>
          <li><strong>Restrições:</strong> ${dieta.restricoes}</li>
          <li><strong>Calorias:</strong> ${dieta.calorias}</li>
          <li><strong>Refeições:</strong> ${dieta.refeicoes}</li>
        </ul>
      `;
    } else {
      div.innerHTML = '';
    }
  }
});
