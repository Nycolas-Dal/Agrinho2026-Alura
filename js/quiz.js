const perguntas = [
    {
        pergunta: "Qual dessas culturas agrícolas é uma das mais produzidas no Brasil?",
        respostas: ["Soja", "Trigo", "Cevada", "Aveia"],
        correta: 0
    },
    {
        pergunta: "Qual destas atividades pertence à pecuária?",
        respostas: ["Criação de bovinos", "Plantio de arroz", "Cultivo de café", "Produção de milho"],
        correta: 0
    },
    {
        pergunta: "Qual equipamento é mais utilizado para preparo do solo agrícola?",
        respostas: ["Trator", "Colheitadeira", "Pulverizador", "Semeadeira"],
        correta: 0
    },
    {
        pergunta: "A irrigação na agricultura tem como principal função:",
        respostas: ["Controlar a temperatura do solo", "Levar água para as plantações", "Aumentar a velocidade do vento", "Reduzir a luz solar"],
        correta: 1
    },
    {
        pergunta: "Qual destas opções representa uma prática sustentável no campo?",
        respostas: ["Desmatamento excessivo", "Uso irresponsável da água", "Rotação de culturas", "Queimada ilegal"],
        correta: 2
    },
    {
        pergunta: "O agrônomo é o profissional responsável por:",
        respostas: ["Projetar rodovias", "Administrar aeroportos", "Orientar a produção agrícola", "Controlar navios"],
        correta: 2
    },
    {
        pergunta: "Qual destas tecnologias é utilizada no agronegócio moderno?",
        respostas: ["Drones agrícolas", "Máquinas de raio-x hospitalar", "Escâner submarino", "Radar meteorológico urbano"],
        correta: 0
    },
    {
        pergunta: "A colheita acontece em qual etapa da produção agrícola?",
        respostas: ["Após o crescimento da plantação", "Antes do plantio", "Durante a irrigação", "Antes da preparação do solo"],
        correta: 0
    },
    {
        pergunta: "Qual destes produtos é amplamente exportado pelo agronegócio brasileiro?",
        respostas: ["Soja", "Algodão", "Milho", "Café"],
        correta: 0
    },
    {
        pergunta: "O uso de drones nas lavouras auxilia principalmente em:",
        respostas: ["Monitoramento das plantações", "Transporte de colheitadeiras", "Perfuração do solo", "Construção de silos"],
        correta: 0
    }
];

const pergunta = document.getElementById("pergunta");
const respostas = document.getElementById("respostas");
const proxima = document.getElementById("proxima");
const resultado = document.getElementById("resultado");
const barra = document.getElementById("barra");
const acoes = document.querySelector(".acoes-finais");
const reiniciar = document.getElementById("reiniciar");

// Novos elementos para o ranking profissional
const listaRanking = document.getElementById("lista-ranking");
const containerRanking = document.getElementById("container-ranking");

let atual = 0;
let pontos = 0;
let respondeu = false; // Impede passar sem responder

function carregarPergunta() {
    respondeu = false;
    proxima.style.opacity = "0.5"; // Visual desabilitado até responder
    respostas.innerHTML = "";
    pergunta.innerText = perguntas[atual].pergunta;
    atualizarBarra();

    perguntas[atual].respostas.forEach((resposta, index) => {
        const button = document.createElement("button");
        button.innerText = resposta;
        button.className = "btn-resposta";
        button.onclick = () => verificar(index);
        respostas.appendChild(button);
    });
}

function verificar(index) {
    if (respondeu) return; // Evita clicar em múltiplos botões
    respondeu = true;
    proxima.style.opacity = "1";

    const correta = perguntas[atual].correta;
    const botoes = respostas.querySelectorAll("button");

    botoes.forEach((botao, i) => {
        botao.disabled = true;
        if (i === correta) {
            botao.style.background = "#4f8a4c"; // Verde
            botao.style.color = "#ffffff";
        } else if (i === index) {
            botao.style.background = "#8a4c4c"; // Vermelho
            botao.style.color = "#ffffff";
        }
    });

    if (index === correta) {
        pontos++;
    }
}

function atualizarBarra() {
    const progresso = ((atual) / perguntas.length) * 100;
    barra.style.width = `${progresso}%`;
}

proxima.onclick = () => {
    if (!respondeu) {
        alert("Por favor, selecione uma resposta antes de continuar!");
        return;
    }

    atual++;
    if (atual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarQuiz();
    }
};

function finalizarQuiz() {
    pergunta.innerText = "🏆 Quiz Finalizado!";
    respostas.innerHTML = "";
    proxima.style.display = "none";
    barra.style.width = "100%";

    // Mensagens limpas, a cor verde/vermelha já é controlada pelas classes do CSS
    let feedbackTema = "";
    if (pontos >= 8) {
        feedbackTema = "<br><strong>Incrível! Você é um verdadeiro Embaixador do Agro Sustentável! 🌱</strong>";
    } else if (pontos >= 5) {
        feedbackTema = "<br><strong>Bom trabalho! Você compreende o equilíbrio entre campo e meio ambiente. 🚜</strong>";
    } else {
        feedbackTema = "<br><strong>Continue estudando! O futuro do nosso planeta depende do conhecimento agroecológico. 📚</strong>";
    }

    resultado.innerHTML = `<h3>Você acertou ${pontos} de ${perguntas.length} perguntas!</h3>${feedbackTema}`;
    acoes.style.display = "flex";

    setTimeout(() => {
        const nomeUsuario = prompt("Digite seu nome para o Quadro de Líderes do Agrinho:");
        if (nomeUsuario) {
            salvarPontuacao(nomeUsuario, pontos);
        }
    }, 1200);
}

function salvarPontuacao(nome, score) {
    let ranking = JSON.parse(localStorage.getItem("rankingAgrinho")) || [];
    ranking.push({ nome: nome, pontos: score, data: new Date().toLocaleDateString('pt-BR') });
    
    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 5);
    
    localStorage.setItem("rankingAgrinho", JSON.stringify(ranking));
    exibirRanking();
}

function exibirRanking() {
    let ranking = JSON.parse(localStorage.getItem("rankingAgrinho")) || [];
    listaRanking.innerHTML = "";
    
    if(ranking.length > 0) {
        containerRanking.style.display = "block";
        ranking.forEach((jogador, i) => {
            const li = document.createElement("li");
            li.innerHTML = `<span><strong>${i+1}º</strong> ${jogador.nome}</span> <span>${jogador.pontos}/${perguntas.length} pts</span>`;
            listaRanking.appendChild(li);
        });
    }
}

reiniciar.onclick = () => {
    atual = 0;
    pontos = 0;
    resultado.innerHTML = "";
    proxima.style.display = "inline-block";
    acoes.style.display = "none";
    containerRanking.style.display = "none";
    carregarPergunta();
};

carregarPergunta();

// Faz o ranking carregar fixo na tela assim que abre o site
exibirRanking();
