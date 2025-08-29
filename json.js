/* ==========================================================================
   INICIALIZAÇÃO DO SCRIPT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CONTROLE DO MENU MOBILE
     ========================================================================== */
  const menu = document.getElementById("menuPrincipal");
  const botaoMenu = document.getElementById("botaoMenu");

  // Verifica se os elementos do menu existem para evitar erros
  if (menu && botaoMenu) {
    
    /**
     * Alterna a visibilidade do menu mobile e o ícone do botão.
     */
    const toggleMenu = () => {
      menu.classList.toggle("menu-visivel");
      const estaVisivel = menu.classList.contains("menu-visivel");
      
      // Atualiza o atributo ARIA para acessibilidade
      botaoMenu.setAttribute('aria-expanded', estaVisivel);

      // Altera o ícone do botão (Hambúrguer vs. X)
      botaoMenu.innerHTML = estaVisivel ? "&times;" : "&#9776;";
    };

    // Adiciona o evento de clique ao botão do menu
    botaoMenu.addEventListener('click', toggleMenu);
  }

  /* ==========================================================================
     2. CONFIGURAÇÃO DO EFEITO DE PARTÍCULAS (tsParticles)
     ========================================================================== */
  // Verifica se a biblioteca tsParticles está carregada antes de a usar
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
      // Configurações principais das partículas
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ["#8b5cf6", "#a78bfa", "#ddd6fe"] }, // Tons de roxo
        shape: { type: "circle" },
        size: { value: { min: 1, max: 4 } },
        move: { enable: true, speed: 0.5, direction: "none", out_mode: "out" },
        opacity: { value: { min: 0.2, max: 0.7 } }
      },
      // Configurações de interatividade (efeitos com o rato)
      interactivity: {
        events: {
          onHover: { enable: true, mode: "bubble" },
          onClick: { enable: false } // Desativado para não interferir com links
        },
        modes: {
          bubble: { distance: 100, size: 6, duration: 2, opacity: 1 }
        }
      },
      detectRetina: true, // Melhora a qualidade em ecrãs de alta resolução
    });
  }
});
