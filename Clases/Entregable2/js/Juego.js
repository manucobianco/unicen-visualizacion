var canvas = document.getElementById('canvasMain');
var ctx = canvas.getContext('2d');
var ficha = new Ficha();
var clicked = false;

canvas.onmousemove = function (e){
  if (clicked) {
    ficha.pintar(ctx,e.layerX,e.layerY);
  }
}
canvas.onmousedown = function(e){
  clicked = true;
}
canvas.onmouseup = function(e){
  clicked = false;
}
