/*
POR QUÊ: O evento 'DOMContentLoaded' garante que todo o código JavaScript
só será executado DEPOIS que a página HTML for completamente carregada.
Isso evita erros comuns onde o JS tenta encontrar um elemento que ainda
não foi renderizado pelo navegador. É uma prática de segurança essencial.
*/

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CONTROLE DO MENU MOBILE (PARA TODAS AS PÁGINAS)
     ========================================================================== */

  /*
  POR QUÊ: Guardamos os elementos do HTML em variáveis. Isso torna o código
  mais organizado e rápido, pois o navegador não precisa procurar os mesmos
  elementos na página toda vez que uma função é chamada.
  */
  const menu = document.getElementById("meuMenu");
  const botaoMenu = document.getElementById("botaoMenu");
  const linksDoMenu = document.querySelectorAll("#meuMenu a"); // Pega TODOS os links dentro do menu.

  /*
  POR QUÊ: Esta é uma verificação de segurança. Se, por algum motivo, os elementos
  não existirem na página, o resto do código do menu não será executado,
  evitando erros no console do navegador.
  */
  if (menu && botaoMenu && linksDoMenu) {

    /**
    * O QUE FAZ: Alterna a visibilidade do menu mobile.
    * POR QUÊ: Esta função centraliza toda a lógica de abrir e fechar o menu.
    */
    const toggleMenu = () => {
      // A função classList.toggle é como um interruptor: se a classe 'menu-visivel'
      // existe, ela a remove; se não existe, ela a adiciona.
      menu.classList.toggle("menu-visivel");

      // Verifica se o menu agora está visível para atualizar o ícone do botão.
      const estaVisivel = menu.classList.contains("menu-visivel");
      // Altera o ícone do botão com base na visibilidade do menu.
      botaoMenu.innerHTML = estaVisivel ? "&times;" : "&#9776;"; // Se estiver visível, mostra "X", senão, mostra "☰"
    };

    /*
    O QUE FAZ: Garante que o menu seja fechado.
    POR QUÊ: Melhora a experiência do usuário, fechando o menu automaticamente
    após clicar em um link para navegar.
    */
    const fecharMenu = () => {
      menu.classList.remove("menu-visivel");
      botaoMenu.innerHTML = "&#9776;"; // Garante que o ícone volte ao normal.
    };

    // --- REGISTRO DOS EVENTOS ---
    // POR QUÊ: Esta é a forma moderna de lidar com eventos. Em vez de 'onclick' no HTML,
    // nós dizemos ao JavaScript para "escutar" por um evento de 'click' no botão.
    // Isso separa completamente o comportamento (JS) da estrutura (HTML).
    botaoMenu.addEventListener('click', toggleMenu);

    // POR QUÊ: Nós passamos por cada um dos links do menu e adicionamos um "escutador"
    // de clique em cada um deles. Quando qualquer um for clicado, a função fecharMenu é chamada.
    linksDoMenu.forEach(link => {
      link.addEventListener('click', fecharMenu);
    });

    // --- [NOVA FUNCIONALIDADE] FECHAR MENU AO CLICAR FORA ---
    /*
    POR QUÊ: Adiciona um "escutador" de clique ao documento inteiro para
    detectar cliques fora do menu, melhorando a usabilidade.
    */
    document.addEventListener('click', (event) => {
      // Checa se o menu está visível
      const estaVisivel = menu.classList.contains("menu-visivel");
      
      // Checa se o clique foi no botão (event.target) ou em algo dentro do botão
      // .contains() verifica se o elemento clicado (event.target) é o botão ou um filho dele.
      const cliqueNoBotao = botaoMenu.contains(event.target);
      
      // Checa se o clique foi no menu (event.target) ou em algo dentro do menu
      const cliqueNoMenu = menu.contains(event.target);

      // Se o menu está visível E o clique NÃO foi no menu E NÃO foi no botão...
      if (estaVisivel && !cliqueNoMenu && !cliqueNoBotao) {
        // ...então fecha o menu.
        fecharMenu();
      }
    });

  } // Fim do 'if' de segurança do menu

  
  /* ==========================================================================
     2. CONTROLE DO SLIDER (APENAS PARA A PÁGINA 'tratos-maus.html')
     ========================================================================== */
  
  // Procura pelos botões do slider
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const slideContainer = document.querySelector('.slide'); // Procura o contêiner

  /*
  POR QUÊ: Esta é a VERIFICAÇÃO DE SEGURANÇA.
  Este código só vai ser executado se os botões E o contêiner do slide
  existirem nesta página. Em todas as outras páginas, este 'if'
  será falso e o código será ignorado, evitando o erro.
  */
  if (nextButton && prevButton && slideContainer) {

    nextButton.addEventListener('click', () => {
      let items = document.querySelectorAll('.item');
      // Pega o primeiro item e move-o para o final da lista
      slideContainer.appendChild(items[0]);
    });

    prevButton.addEventListener('click', () => {
      let items = document.querySelectorAll('.item');
      // Pega o último item e move-o para o início da lista
      slideContainer.prepend(items[items.length - 1]);
    });

  } // Fim do 'if' de segurança do slider


  /* ==========================================================================
     3. CONFIGURAÇÃO DO EFEITO DE PARTÍCULAS (tsParticles)
     ========================================================================== */

  /*
  POR QUÊ: Esta função inicializa a biblioteca tsParticles. Ao colocá-la dentro do
  'DOMContentLoaded', garantimos que o elemento '#tsparticles' já existe na página
  antes de tentarmos usá-lo. 
  
  NOTA: Se a página 'tratos-maus.html' não tiver o div #tsparticles,
  esta função pode dar um aviso no console, mas NÃO vai "quebrar" o script
  como o addEventListener.
  */
  if (document.getElementById("tsparticles")) {
    tsParticles.load("tsparticles", {
      // --- Configurações principais das partículas ---
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: ["#8b5cf6", "#4c1d95", "#1f2937"] },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 4 } },
        move: { enable: true, speed: 0.5, direction: "none", out_mode: "out" },
        opacity: { value: { min: 0.3, max: 0.9 } }
      },
      // --- Configurações de interatividade ---
      interactivity: {
        events: {
          onHover: { enable: true, mode: "bubble" },
          onClick: { enable: true, mode: "push" }
        },
        modes: {
          bubble: { distance: 100, size: 6, duration: 2, opacity: 1 },
          push: { quantity: 5 } // -- Quantidade de bolinhas que irão aparecer quando clicar.
        }
      }
    });
  } // Fim do 'if' de segurança do tsParticles

});

