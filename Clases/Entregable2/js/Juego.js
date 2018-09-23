var canvas = document.getElementById('canvasMain');
var ctx = canvas.getContext('2d');
var clicked = false;
var tablero = new Tablero();
var j1 = new Jugador('j1');
var j2 = new Jugador('j2');
var jugadorActual = j1;
var fichaActual;




canvas.onmousemove = function (e){
  console.log('X: '+e.layerX+"| Y: "+e.layerY);
  if (clicked) {
    var x = e.layerX;
    var y = e.layerY;


    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.dibujar();
    fichaActual.dibujar(ctx,x,y);
    j1.pintar(jugadorActual.getNombre());
    j2.pintar(jugadorActual.getNombre());
  }
}
canvas.onmousedown = function(e){
  if (canGetFicha(jugadorActual.getNombre(),e.layerX,e.layerY)) {
    // console.log(jugadorActual.getCantFichas());
    clicked = true;
    fichaActual = jugadorActual.getFicha();
  }
}
canvas.onmouseup = function(e){
  if(clicked){
    if (tablero.add(e.layerX,fichaActual)) {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      tablero.dibujar();
      j1.pintar(jugadorActual.getNombre());
      j2.pintar(jugadorActual.getNombre());
      clicked = false;
      fichaActual = null;
      j1 = [j2, j2=j1][0];//toggle entre jugadores
      jugadorActual = j1;
    }
  }
}

function canGetFicha(jugador,x,y){
  if (jugador == 'j1') {
    if (x<170&&y<170) {
      return true;
    }else{
      return false;
    }
  }else if (jugador == 'j2') {
    if (x>1430&&y<170) {
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
}
