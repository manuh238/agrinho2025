// Variáveis do jogo
let jogadorX;
let jogadorY;
let caminhoInicioX;
let caminhoFimX;
let cidadeX;
let cidadeY;
let passo = 50; // Quanto o jogador avança a cada resposta correta

let perguntas = [
  {
    pergunta: "Qual animal é comum em fazendas?",
    opcoes: ["Leão", "Vaca", "Pinguim"],
    respostaCorreta: "Vaca"
  },
  {
    pergunta: "O que é um prédio alto, comum em cidades?",
    opcoes: ["Celeiro", "Arranhacéu", "Iglu"], // 'Arrancacéu' é uma forma mais poética para 'Arranha-céu'
    respostaCorreta: "Arranhacéu"
  },
  {
    pergunta: "Qual alimento vem do campo?",
    opcoes: ["Pizza", "Maçã", "Sushi"],
    respostaCorreta: "Maçã"
  },
  {
    pergunta: "Onde você encontra semáforos?",
    opcoes: ["Estrada de terra", "Centro da cidade", "Floresta"],
    respostaCorreta: "Centro da cidade"
  },
  {
    pergunta: "Qual o cheiro que se sente mais facilmente no campo?",
    opcoes: ["Fumaça de carro", "Flores e terra molhada", "Esgoto"],
    respostaCorreta: "Flores e terra molhada"
  },
  {
    pergunta: "Qual o tipo de transporte mais comum na cidade?",
    opcoes: ["Trator", "Metrô", "Carro de boi"],
    respostaCorreta: "Metrô"
  }
];

let perguntaAtual = 0;
let estadoDoJogo = "perguntando"; // Pode ser "perguntando", "respostaCorreta", "respostaErrada", "fimDeJogo"
let mensagemFeedback = "";
let corFeedback;

// Cores
let corCampo;
let corCidade;
let corJogador;
let corCaminho;
let corTexto;

function setup() {
  createCanvas(800, 600);

  // Inicializa as posições do jogador e do caminho
  caminhoInicioX = width * 0.1;
  caminhoFimX = width * 0.9;
  jogadorX = caminhoInicioX;
  jogadorY = height / 2;
  cidadeX = caminhoFimX;
  cidadeY = height / 2;

  // Define as cores
  corCampo = color(100, 200, 100); // Verde claro
  corCidade = color(150, 150, 150); // Cinza
  corJogador = color(255, 100, 100); // Vermelho
  corCaminho = color(150, 100, 50); // Marrom
  corTexto = color(0); // Preto
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(corCampo); // Fundo do campo

  // Desenha o caminho
  stroke(corCaminho);
  strokeWeight(10);
  line(caminhoInicioX, height / 2, caminhoFimX, height / 2);

  // Desenha a cidade
  fill(corCidade);
  noStroke();
  rect(cidadeX - 30, cidadeY - 50, 60, 100); // Edifício da cidade
  triangle(cidadeX - 30, cidadeY - 50, cidadeX, cidadeY - 80, cidadeX + 30, cidadeY - 50); // Telhado

  // Desenha o jogador
  fill(corJogador);
  noStroke();
  ellipse(jogadorX, jogadorY, 40, 40); // Desenha o jogador como um círculo

  // Desenha o progresso do jogador
  fill(0);
  textSize(16);
  text(`Progresso: ${nf(map(jogadorX, caminhoInicioX, caminhoFimX, 0, 100), 0, 0)}%`, width / 2, height - 30);


  // Lógica do jogo baseada no estado
  if (estadoDoJogo === "perguntando") {
    exibirPergunta();
  } else if (estadoDoJogo === "respostaCorreta" || estadoDoJogo === "respostaErrada") {
    exibirFeedback();
  } else if (estadoDoJogo === "fimDeJogo") {
    exibirTelaFinal();
  }
}

function exibirPergunta() {
  let p = perguntas[perguntaAtual];

  // Exibe a pergunta
  fill(corTexto);
  textSize(24);
  text(p.pergunta, width / 2, height / 4);

  // Exibe as opções de resposta como botões
  textSize(20);
  for (let i = 0; i < p.opcoes.length; i++) {
    let x = width / 2;
    let y = height / 2 + i * 50;
    let w = 200;
    let h = 40;

    // Desenha o "botão"
    fill(200, 200, 200); // Cinza claro para o botão
    rect(x - w / 2, y - h / 2, w, h, 10); // Retângulo arredondado

    // Se o mouse estiver sobre o botão, muda a cor
    if (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2) {
      fill(170, 170, 170); // Cinza mais escuro
      rect(x - w / 2, y - h / 2, w, h, 10);
    }

    fill(corTexto);
    text(p.opcoes[i], x, y);
  }
}

function exibirFeedback() {
  background(corCampo); // Limpa a tela para o feedback
  fill(corFeedback);
  textSize(32);
  text(mensagemFeedback, width / 2, height / 2);

  // Mensagem para continuar
  fill(corTexto);
  textSize(18);
  text("Clique para continuar...", width / 2, height / 2 + 50);
}

function exibirTelaFinal() {
  background(corCidade); // Fundo de cidade para o final
  fill(255); // Branco
  textSize(48);
  text("Você chegou à cidade!", width / 2, height / 2 - 50);
  textSize(24);
  text("Parabéns!", width / 2, height / 2 + 20);
}

function mousePressed() {
  if (estadoDoJogo === "perguntando") {
    let p = perguntas[perguntaAtual];
    for (let i = 0; i < p.opcoes.length; i++) {
      let x = width / 2;
      let y = height / 2 + i * 50;
      let w = 200;
      let h = 40;

      // Verifica se o clique foi em uma das opções
      if (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2) {
        // Verifica a resposta
        if (p.opcoes[i] === p.respostaCorreta) {
          jogadorX += passo; // Avança o jogador
          mensagemFeedback = "Resposta Correta! Avance!";
          corFeedback = color(0, 200, 0); // Verde
          estadoDoJogo = "respostaCorreta";

          // Verifica se o jogador chegou à cidade
          if (jogadorX >= cidadeX) {
            jogadorX = cidadeX; // Garante que não passe da cidade
            estadoDoJogo = "fimDeJogo";
          }
        } else {
          mensagemFeedback = "Resposta Errada. Tente novamente!";
          corFeedback = color(200, 0, 0); // Vermelho
          estadoDoJogo = "respostaErrada";
        }
        break; // Sai do loop depois de encontrar a opção clicada
      }
    }
  } else if (estadoDoJogo === "respostaCorreta" || estadoDoJogo === "respostaErrada") {
    // Passa para a próxima pergunta se houver ou termina o jogo
    perguntaAtual++;
    if (perguntaAtual < perguntas.length && jogadorX < cidadeX) {
      estadoDoJogo = "perguntando";
    } else if (jogadorX >= cidadeX) {
      estadoDoJogo = "fimDeJogo"; // Já chegou à cidade
    } else {
      // Se não houver mais perguntas e não chegou à cidade, exibe uma mensagem e pode adicionar lógica para reiniciar
      mensagemFeedback = "Fim das perguntas! Você não chegou à cidade.";
      corFeedback = color(200, 100, 0); // Laranja
      estadoDoJogo = "respostaErrada"; // Um tipo de feedback de "game over" por falta de perguntas
      // Para reiniciar o jogo, você poderia adicionar:
      // perguntaAtual = 0;
      // jogadorX = caminhoInicioX;
      // estadoDoJogo = "perguntando";
    }
  }
}

// Para dispositivos móveis ou toque, o touchStarted pode ser usado de forma semelhante ao mousePressed
function touchStarted() {
  // Chamada para mousePressed para compatibilidade de clique/toque
  mousePressed();
}