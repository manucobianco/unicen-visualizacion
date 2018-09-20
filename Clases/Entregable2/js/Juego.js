var canvas = document.getElementById('canvasMain');
var ctx = canvas.getContext('2d');
var ficha ;
var clicked = false;
var id = 0;
var tablero = new Tablero();



function tomarFicha(jugador){
  ficha = new Ficha(jugador,id++);
}

canvas.onmousemove = function (e){
  if (clicked) {
    console.log('X: '+e.layerX+"| Y: "+e.layerY);

    ficha.dibujar(ctx,e.layerX,e.layerY);
  }
}
canvas.onmousedown = function(e){
  clicked = true;
}
canvas.onmouseup = function(e){
  clicked = false;
}
