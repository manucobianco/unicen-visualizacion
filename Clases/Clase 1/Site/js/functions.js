var imagen_ejemplo = new Image();
// sets canvas
var canvasMain = document.getElementById("canvasMain");
var ctx = canvasMain.getContext("2d");
var ctxGris = document.getElementById("filtroGris").getContext("2d");
var ctxSepia = document.getElementById("filtroSepia").getContext("2d");
var ctxNegativo = document.getElementById("filtroNegativo").getContext("2d");
var ctxBinario = document.getElementById("filtroBinario").getContext("2d");
var ctxBrillo = document.getElementById("filtroBrillo").getContext("2d");
var ctxSaturacion = document.getElementById("filtroSaturacion").getContext("2d");

// sets mouse events
var xAnterior = 0;
var yAnterior = 0;

var mouseDown = 0;

document.onmousemove = (function(e){
  setPixelConMouse(e);
});
document.body.onmousedown = function(e) {
  xAnterior = getPosX(canvasMain,e);
  yAnterior = getPosY(canvasMain,e);
  mouseDown = 1;
}
document.body.onmouseup = function(e) {
  xAnterior = getPosX(canvasMain,e);
  yAnterior = getPosY(canvasMain,e);
  mouseDown = 0;
}

document.getElementById('filtrosButton').onclick = function(){
  document.getElementById('paleta').style.display = "none";
  document.getElementById('filtros').style.display = "block";
}
document.getElementById('paintButton').onclick = function(){
  document.getElementById('paleta').style.display = "block";
  document.getElementById('filtros').style.display = "none";
}

//loaf img
imagen_ejemplo.src = 'img-ejemplo.jpg';
imagen_ejemplo.onload = function(){
  dibujarImg(ctx,this);
  var img = ctx.getImageData(0, 0, this.width, this.height);

//   pintarPixel(img,1,ctxNegativo); // NEGATIVO
//   pintarPixel(img,2,ctxGris); // ESCALA DE NEGROS
//   pintarPixel(img,3,ctxSepia); // SEPIA
//   pintarPixel(img,4,ctxBinario); // BINARIZACION
//   pintarPixel(img,5,ctxBrillo); // BRILLO
//   pintarPixel(img,6,ctx7); // DESENFOQUE
}

//functions for draw imgs
function dibujarImg(contexto, imagen){
  contexto.drawImage(imagen,0,0,contexto.canvas.width,contexto.canvas.height); // hacer el reescalado a mano para no perder calidad
}

function pintarPixel (imageData,tipo,contexto){
  for (var eje_x = 0; eje_x < imageData.width; eje_x ++) {
    for (var eje_y = 0; eje_y < imageData.height; eje_y ++) {
      index = (eje_x + eje_y * imageData.width) * 4;

      switch (tipo) {
        case 1: // NEGATIVO
          imageData.data[index+0] = 255 - imageData.data[index+0]; //rojo
          imageData.data[index+1] = 255 - imageData.data[index+1]; //verde
          imageData.data[index+2] = 255 - imageData.data[index+2]; //azul
          //imageData.data[index+3] = a; //opacidad
        break;
        case 2: // ESCALA DE NEGROS
          imageData.data[index+0] = (imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2]) / 3;
          imageData.data[index+1] = imageData.data[index+0];
          imageData.data[index+2] = imageData.data[index+0];
        break;
        case 3: // SEPIA
          imageData.data[index+0] = 0.393 * imageData.data[index+0] + 0.769 * imageData.data[index+1] + 0.189 * imageData.data[index+2];
          imageData.data[index+1] = 0.349 * imageData.data[index+0] + 0.686 * imageData.data[index+1] + 0.168 * imageData.data[index+2];
          imageData.data[index+2] = 0.272 * imageData.data[index+0] + 0.534 * imageData.data[index+1] + 0.131 * imageData.data[index+2];
        break;
        case 4: // BINARIZACION
          var escala_negra = (imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2]) / 3;
          var punto_medio = 128;
          if (escala_negra >= punto_medio) {
            imageData.data[index+0] = 0;
            imageData.data[index+1] = 0;
            imageData.data[index+2] = 0;
          }else{
            imageData.data[index+0] = 255;
            imageData.data[index+1] = 255;
            imageData.data[index+2] = 255;
          }
        break;
        case 5: // BRILLO
          var brillo_actual = document.getElementById("points").value;
          imageData.data[index+0] = imageData.data[index+0] + brillo_actual; //rojo
          imageData.data[index+1] = imageData.data[index+1] + brillo_actual; //verde
          imageData.data[index+2] = imageData.data[index+2] + brillo_actual; //azul
        break;
        case 6: // DESENFOQUE
          imageData.data[index+0] = imageData.data[index+0];
          imageData.data[index+1] = imageData.data[index+1];
          imageData.data[index+2] = imageData.data[index+2];
        break;
      }
    }
  }
  contexto.putImageData(imageData,0,0);
}


//funcitos for draw with tools
function getPosX(canvas,e){
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  return Math.round((e.clientX - rect.width) * scaleX);
}
function getPosY(canvas,e){
  var rect = canvas.getBoundingClientRect();
  var scaleY = canvasMain.height / rect.height;
  return Math.round((e.clientY - rect.top) * scaleY);
}

function setPixelConMouse(e){
  if(mouseDown == 1){
    x = getPosX(canvasMain,e);
    y = getPosY(canvasMain,e);
    console.log(x,y);
    ctx.beginPath();
    ctx.moveTo(xAnterior, yAnterior);
    ctx.lineTo(x, y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(246, 111, 245)";
    ctx.stroke();
    xAnterior = x;
    yAnterior = y;
  }
}
