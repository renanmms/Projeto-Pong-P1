//Eu //Eu quero fazer um retângulo se movimentar na tela quando eu apertar as teclas do teclado.
//retangulo que se movimenta quando eu aperto as teclas do teclado
/*
retangulo()
retangulo.direçãoX() //retangulo se movimenta right and left
retangulo.direçãoX().onkeypress()
*/
var quadradoPrincipal = document.getElementById("meuQuadrado");
var square = quadradoPrincipal.getContext("2d");

//Objeto retangulo
var objRet = {
  x: 130,
  y: 270,
  largura: 70,
  altura: 10
}

//bolinha
var objCir = {
  x: 150,
  y: 150,
  raio: 8,
  senX: 1,
  senY: 1,
  veloc: 1
  
}

var objObstaculo = {
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

  //Desenha o canvas
  square.fillStyle = "black";
  square.fillRect(0, 0, quadradoPrincipal.width, quadradoPrincipal.height);
  
  //Desenha a bola
  square.beginPath();
  square.arc(objCir.x, objCir.y, objCir.raio, 0, Math.PI * 2);
  square.fillStyle = "red";
  square.fill();
  square.stroke();
  
  //Desenha a raquete
  square.fillStyle = "white";
  square.fillRect(objRet.x, objRet.y, objRet.largura, objRet.altura);

  //Desenha os obstaculos
  for(var i = 0; i < quadradoPrincipal.width - (objObstaculo.largura + 3); i += objObstaculo.largura + 3)
  {
    for(var j = 0; j < quadradoPrincipal.height/3; j += objObstaculo.altura + 4)
    {
      square.fillStyle = "blue";
      square.fillRect(objObstaculo.x + i, objObstaculo.y + j, objObstaculo.largura, objObstaculo.altura);
    }
  }
  
  //Colisão da bolinha com o canvas
  if(objCir.x <= 10)
  {
    objCir.senX = 1;
  }
  else if (objCir.y <= 10)
  {
    objCir.senY = 1;
  }
  
  if(objCir.y + objCir.raio >= 300)
  {
    objCir.senY = -1;
  }
  else if (objCir.x + objCir.raio >= 300)
  {
    objCir.senX = -1;
  }

  //Colisão da bolinha com a raquete
  if((objCir.x  >= objRet.x && objCir.x <= objRet.x + objRet.largura) && objCir.y >= objRet.y)
  {
    
    //console.log("Bolinha\nX = " + objCir.x + "\nY = " + objCir.y + "\nRaquete\nX = " + objRet.x + "\nY = " + objRet.y);
    if(objCir.x >= objRet.x && objCir.x <= (objRet.x + objRet.largura)/2)
    {    
      objCir.senX = -1;
    }

    objCir.senY = -1;
    objCir.veloc += 0.2;
  }
  
  //Colisão da raquete com a parede
  if(objRet.x >= quadradoPrincipal.width - objRet.largura)
  {
    objRet.x = quadradoPrincipal.width - objRet.largura;
  }
  else if(objRet.x <= 0)
  {
    objRet.x = 0;
  }
  
  
  objCir.x += objCir.veloc * objCir.senX;
  objCir.y += objCir.veloc * objCir.senY;
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
    objRet.x += 20
  }

  else if (key == 37)
  {
    objRet.x -= 20
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