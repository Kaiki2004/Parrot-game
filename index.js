const img = [
  { id: 0, img: "./imagens/bobrossparrot.gif" },
  { id: 1, img: "./imagens/explodyparrot.gif" },
  { id: 2, img: "./imagens/fiestaparrot.gif" },
  { id: 3, img: "./imagens/metalparrot.gif" },
  { id: 4, img: "./imagens/revertitparrot.gif" },
  { id: 5, img: "./imagens/tripletsparrot.gif" },
  { id: 6, img: "./imagens/unicornparrot.gif" }
];

let qtdCartas;
let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueiaClique = false;
let jogadas = 0;
let acertos = 0;


function quantasCartas() {
  qtdCartas = parseInt(prompt("Quantas cartas você deseja jogar? (Escolha um número par entre 4 e 14)"));

  if (qtdCartas < 4 || qtdCartas > 14 || qtdCartas % 2 !== 0) {
    return quantasCartas();
  }
}

function criarCartas() {
  const selecionadas = img.sort(() => Math.random() - 0.5).slice(0, qtdCartas / 2);
  cartas = selecionadas.concat(selecionadas);
  cartas.sort(() => Math.random() - 0.5);
}


function mostrarCartas() {
  const lista = document.querySelector("ul");
  lista.innerHTML = "";

  for (let i = 0; i < cartas.length; i++) {
    const carta = cartas[i];
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="card" index="${i}" onclick="virarCarta(this)">
          <div class="card-inner">
            <div class="face">
              <img src="./imagens/back.png" />
            </div>
            <div class="back-face">
              <img src="${carta.img}" />
            </div>
          </div>
        </div>
      `;

    lista.appendChild(li);
  }
}

function virarCarta(card) {
  if (bloqueiaClique || card.classList.contains("flip")) return;

  card.classList.add("flip");
  jogadas++; 

  if (!primeiraCarta) {
    primeiraCarta = card;
  } else {
    segundaCarta = card;
    bloqueiaClique = true;

    const index1 = primeiraCarta.getAttribute("index");
    const index2 = segundaCarta.getAttribute("index");

    if (cartas[index1].img === cartas[index2].img) {
      primeiraCarta = null;
      segundaCarta = null;
      bloqueiaClique = false;
      acertos += 2;

      if (acertos === cartas.length) {
        setTimeout(() => {
          alert(`Você ganhou em ${jogadas} jogadas!`);
        }, 300); 
      }

    } else {
      setTimeout(() => {
        primeiraCarta.classList.remove("flip");
        segundaCarta.classList.remove("flip");
        primeiraCarta = null;
        segundaCarta = null;
        bloqueiaClique = false;
      }, 1000);
    }
  }
}

function iniciarJogo() {
  quantasCartas();
  criarCartas();
  mostrarCartas();
}

iniciarJogo();  