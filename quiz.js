const perguntas = [

    {

        pergunta: "Qual alimento vem do campo?",

        respostas: [
            "Celular",
            "Soja",
            "Computador",
            "Televisão"
        ],

        correta: 1
    },

    {

        pergunta: "O agronegócio ajuda na:",

        respostas: [
            "Produção de alimentos",
            "Queda da internet",
            "Falta de energia",
            "Poluição digital"
        ],

        correta: 0
    },

    {

        pergunta: "Qual máquina é comum no agronegócio?",

        respostas: [
            "Trator",
            "Geladeira",
            "Drone militar",
            "Impressora"
        ],

        correta: 0
    }
];

const pergunta =
document.getElementById("pergunta");

const respostas =
document.getElementById("respostas");

const proxima =
document.getElementById("proxima");

const resultado =
document.getElementById("resultado");

const barra =
document.getElementById("barra");

const acoes =
document.querySelector(".acoes-finais");

const reiniciar =
document.getElementById("reiniciar");

let atual = 0;

let pontos = 0;

function carregarPergunta(){

    respostas.innerHTML = "";

    pergunta.innerText =
    perguntas[atual].pergunta;

    atualizarBarra();

    perguntas[atual].respostas.forEach((resposta, index) => {

        const button =
        document.createElement("button");

        button.innerText = resposta;

        button.onclick = () => verificar(index);

        respostas.appendChild(button);
    });
}

function verificar(index){

    const correta =
    perguntas[atual].correta;

    const botoes =
    respostas.querySelectorAll("button");

    botoes.forEach((botao, i) => {

        botao.disabled = true;

        if(i === correta){

            botao.style.background =
            "#4f8a4c";

        }else if(i === index){

            botao.style.background =
            "#8a4c4c";
        }
    });

    if(index === correta){

        pontos++;
    }
}

function atualizarBarra(){

    const progresso =
    ((atual) / perguntas.length) * 100;

    barra.style.width =
    `${progresso}%`;
}

proxima.onclick = () => {

    atual++;

    if(atual < perguntas.length){

        carregarPergunta();

    }else{

        finalizarQuiz();
    }
};

function finalizarQuiz(){

    pergunta.innerText =
    "Quiz Finalizado!";

    respostas.innerHTML = "";

    proxima.style.display = "none";

    barra.style.width = "100%";

    resultado.innerHTML =

    `Você acertou
    ${pontos} de
    ${perguntas.length} perguntas!`;

    acoes.style.display = "flex";
}

reiniciar.onclick = () => {

    atual = 0;

    pontos = 0;

    resultado.innerHTML = "";

    proxima.style.display = "inline-block";

    acoes.style.display = "none";

    carregarPergunta();
};

carregarPergunta();
