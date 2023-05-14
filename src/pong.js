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
  //beginPath() - begins a path
  /*arc(x,y,r,startangle,endangle) - creates an arc/curve. To create a circle with arc(): Set start angle to 0 and end angle to 2*Math.PI. The x and y parameters define the x- and y-coordinates of the center of the circle. The r parameter defines the radius of the circle.*/

  desenharCanvas();
  
  desenharBola();
  
  //Desenha a raquete
  square.fillStyle = "white";
  square.fillRect(retangulo.x, retangulo.y, retangulo.largura, retangulo.altura);

  //Desenha os obstaculos
  for(var i = 0; i < quadradoPrincipal.width - (obstaculo.largura + 3); i += obstaculo.largura + 3)
  {
    for(var j = 0; j < quadradoPrincipal.height/3; j += obstaculo.altura + 4)
    {
      square.fillStyle = "blue";
      square.fillRect(obstaculo.x + i, obstaculo.y + j, obstaculo.largura, obstaculo.altura);
    }
  }
  
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
    
    //console.log("Bolinha\nX = " + bola.x + "\nY = " + bola.y + "\nRaquete\nX = " + retangulo.x + "\nY = " + retangulo.y);
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

//Começa o jogo
function comecarJogo() 
{
  console.log("Entrou no jogo");
  //Atualiza a cada 20 milisegundos
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
  //console.log("Entrou no render");
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