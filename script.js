/*
POR QUÊ: O evento 'DOMContentLoaded' garante que todo o código JavaScript
só será executado DEPOIS que a página HTML for completamente carregada.
Isso evita erros comuns onde o JS tenta encontrar um elemento que ainda
não foi renderizado pelo navegador. É uma prática de segurança essencial.
*/

document.addEventListener('DOMContentLoaded', () => {

/* 1. CONTROLE DO MENU MOBILE */

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
}

/* 2. CONFIGURAÇÃO DO EFEITO DE PARTÍCULAS (tsParticles) */

/*
POR QUÊ: Esta função inicializa a biblioteca tsParticles. Ao colocá-la dentro do
'DOMContentLoaded', garantimos que o elemento '#tsparticles' já existe na página
antes de tentarmos usá-lo. */

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
});