const perguntas = [

    {

        pergunta: "Qual alimento vem do campo?",

        respostas: [
            "Celular",
            "Soja",
            "Televisão",
            "Controle"
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
    }
];

const pergunta = document.getElementById("pergunta");

const respostas = document.getElementById("respostas");

const proxima = document.getElementById("proxima");

let atual = 0;

function carregarPergunta(){

    respostas.innerHTML = "";

    pergunta.innerText =
    perguntas[atual].pergunta;

    perguntas[atual].respostas.forEach((resposta, index) => {

        const button =
        document.createElement("button");

        button.innerText = resposta;

        button.classList.add("btn");

        button.style.margin = "10px";

        button.onclick = () => verificar(index);

        respostas.appendChild(button);
    });
}

function verificar(index){

    if(index === perguntas[atual].correta){

        alert("Resposta correta!");

    }else{

        alert("Resposta errada!");
    }
}

proxima.onclick = () => {

    atual++;

    if(atual < perguntas.length){

        carregarPergunta();

    }else{

        pergunta.innerText =
        "Quiz Finalizado!";

        respostas.innerHTML = "";

        proxima.style.display = "none";
    }
}

carregarPergunta();