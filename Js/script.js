const botaoTopo = document.getElementById("topo");

botaoTopo.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"
    });

});
