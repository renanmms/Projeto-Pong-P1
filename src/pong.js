var quadradoPrincipal = document.getElementById("meuQuadrado");
var square = quadradoPrincipal.getContext("2d");

var retangulo = {
  x: 130,
  y: 270,
  largura: 70,
  altura: 10
}

var bola = {
  x: 150,
  y: 150,
  raio: 8,
  senX: 1,
  senY: 1,
  veloc: 1
  
}

var obstaculo = {
  x: 16,
  y: 10,
  largura: 27,
  altura: 15
}

//Função que desenha cada frame
function desenhar()
{
  desenharCanvas();
  desenharBola();
  desenharRaquete();
  desenharObstaculos();
  
  colisao()
  
  bola.x += bola.veloc * bola.senX;
  bola.y += bola.veloc * bola.senY;
}

function desenharCanvas() {
  square.fillStyle = "black";
  square.fillRect(0, 0, quadradoPrincipal.width, quadradoPrincipal.height);
}

function desenharBola() {
  square.beginPath();
  square.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2);
  square.fillStyle = "red";
  square.fill();
  square.stroke();
}

function desenharRaquete() {
  square.fillStyle = "white";
  square.fillRect(retangulo.x, retangulo.y, retangulo.largura, retangulo.altura);
}

function desenharObstaculos() {
  for(var i = 0; i < quadradoPrincipal.width - (obstaculo.largura + 3); i += obstaculo.largura + 3)
  {
    for(var j = 0; j < quadradoPrincipal.height/3; j += obstaculo.altura + 4)
    {
      square.fillStyle = "blue";
      square.fillRect(obstaculo.x + i, obstaculo.y + j, obstaculo.largura, obstaculo.altura);
    }
  }
}

function colisao() {
   //Colisão da bolinha com o canvas
  if(bola.x <= 10)
  {
    bola.senX = 1;
  }
  else if (bola.y <= 10)
  {
    bola.senY = 1;
  }
  
  if(bola.y + bola.raio >= 300)
  {
    bola.senY = -1;
  }
  else if (bola.x + bola.raio >= 300)
  {
    bola.senX = -1;
  }

  //Colisão da bolinha com a raquete
  if((bola.x  >= retangulo.x && bola.x <= retangulo.x + retangulo.largura) && bola.y >= retangulo.y)
  {
    
    console.log("Bolinha\nX = " + bola.x + "\nY = " + bola.y + "\nRaquete\nX = " + retangulo.x + "\nY = " + retangulo.y);
    if(bola.x >= retangulo.x && bola.x <= (retangulo.x + retangulo.largura)/2)
    {    
      bola.senX = -1;
    }

    bola.senY = -1;
    bola.veloc += 0.2;
  }
  
  //Colisão da raquete com a parede
  if(retangulo.x >= quadradoPrincipal.width - retangulo.largura)
  {
    retangulo.x = quadradoPrincipal.width - retangulo.largura;
  }
  else if(retangulo.x <= 0)
  {
    retangulo.x = 0;
  }
}

function comecarJogo() 
{
  console.log("Entrou no jogo");
  intervaloAtualizacao();
}

function intervaloAtualizacao() {
  setInterval(desenhar, 20);
}
  
window.addEventListener("keydown",move )
function move(evento)
{
  var key = evento.keyCode;
  if (key == 39)
  {
    retangulo.x += 20
  }

  else if (key == 37)
  {
    retangulo.x -= 20
  }

  render();
}

function render(){
  console.log("Entrou no render");
  square.clearRect(0, 0, square.heigh, square.width)
  square.fillRect(0, 0, square.height, square.width)
}

/*O que falta:
-fazer colisão e a bolinha se movimentar - 1/2feito
-fazer o retangulo se movimentar - feito
-escrever a pontuação lá em cima - 
-fazer uma condição para que quando a bolinha passe do eixo y do retângulo o jogador perdeu e reiniciar o jogo
-colisão da bolinha com o retangulo
-deixar ela mais rápida conforme bate na parede
*/