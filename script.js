const buttons =
    document.querySelectorAll(".answer-btn");

const result =
    document.getElementById("result");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.classList.contains("correct")) {

            result.textContent =
                "✅ Correto! A rotação de culturas ajuda a preservar o solo.";

            result.style.color =
                "#39FF88";

        } else {

            result.textContent =
                "❌ Resposta incorreta. Essa prática prejudica o meio ambiente.";

            result.style.color =
                "red";

        }

    });

});