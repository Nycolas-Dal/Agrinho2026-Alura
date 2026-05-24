const perguntas = [

    {

        pergunta: "Qual dessas culturas agrícolas é uma das mais produzidas no Brasil?",

        respostas: [
            "Soja",
            "Trigo",
            "Cevada",
            "Aveia"
        ],

        correta: 0
    },

    {

        pergunta: "Qual destas atividades pertence à pecuária?",

        respostas: [
            "Criação de bovinos",
            "Plantio de arroz",
            "Cultivo de café",
            "Produção de milho"
        ],

        correta: 0
    },

    {

        pergunta: "Qual equipamento é mais utilizado para preparo do solo agrícola?",

        respostas: [
            "Trator",
            "Colheitadeira",
            "Pulverizador",
            "Semeadeira"
        ],

        correta: 0
    },

    {

        pergunta: "A irrigação na agricultura tem como principal função:",

        respostas: [
            "Controlar a temperatura do solo",
            "Levar água para as plantações",
            "Aumentar a velocidade do vento",
            "Reduzir a luz solar"
        ],

        correta: 1
    },

    {

        pergunta: "Qual destas opções representa uma prática sustentável no campo?",

        respostas: [
            "Desmatamento excessivo",
            "Uso irresponsável da água",
            "Rotação de culturas",
            "Queimada ilegal"
        ],

        correta: 2
    },

    {

        pergunta: "O agrônomo é o profissional responsável por:",

        respostas: [
            "Projetar rodovias",
            "Administrar aeroportos",
            "Orientar a produção agrícola",
            "Controlar navios"
        ],

        correta: 2
    },

    {

        pergunta: "Qual destas tecnologias é utilizada no agronegócio moderno?",

        respostas: [
            "Drones agrícolas",
            "Máquinas de raio-x hospitalar",
            "Escâner submarino",
            "Radar meteorológico urbano"
        ],

        correta: 0
    },

    {

        pergunta: "A colheita acontece em qual etapa da produção agrícola?",

        respostas: [
            "Após o crescimento da plantação",
            "Antes do plantio",
            "Durante a irrigação",
            "Antes da preparação do solo"
        ],

        correta: 0
    },

    {

        pergunta: "Qual destes produtos é amplamente exportado pelo agronegócio brasileiro?",

        respostas: [
            "Soja",
            "Algodão",
            "Milho",
            "Café"
        ],

        correta: 0
    },

    {

        pergunta: "O uso de drones nas lavouras auxilia principalmente em:",

        respostas: [
            "Monitoramento das plantações",
            "Transporte de colheitadeiras",
            "Perfuração do solo",
            "Construção de silos"
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

function carregarPergunta() {

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

function verificar(index) {

    const correta =
        perguntas[atual].correta;

    const botoes =
        respostas.querySelectorAll("button");

    botoes.forEach((botao, i) => {

        botao.disabled = true;

        if (i === correta) {

            botao.style.background =
                "#4f8a4c";

        } else if (i === index) {

            botao.style.background =
                "#8a4c4c";
        }
    });

    if (index === correta) {

        pontos++;
    }
}

function atualizarBarra() {

    const progresso =
        ((atual) / perguntas.length) * 100;

    barra.style.width =
        `${progresso}%`;
}

proxima.onclick = () => {

    atual++;

    if (atual < perguntas.length) {

        carregarPergunta();

    } else {

        finalizarQuiz();
    }
};

function finalizarQuiz() {

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