// --------- GENERAL --------- //
// --------- NAV --------- //
// --------- MENU --------- //
// --------- PANEL --------- //

//esconde la region de paletas y muestra la de filtros
document.getElementById('filtrosButton').onclick = function(){
  document.getElementById('paleta').style.display = "none";
  document.getElementById('filtros').style.display = "block";
}
//esconde la region de filtros y muestra la region de paletas
document.getElementById('paintButton').onclick = function(){
  document.getElementById('paleta').style.display = "block";
  document.getElementById('filtros').style.display = "none";
}
// --------- PALETA --------- //
var xAnterior = 0;
var yAnterior = 0;
var mouseDown = 0;

//dibuja por cada vez q el mouse se mueve
document.onmousemove = (function(e){
  setPixelConMouse(e);
});
//se fija q el mouse este apretado
document.body.onmousedown = function(e) {
  xAnterior = getPosX(canvasMain,e);
  yAnterior = getPosY(canvasMain,e);
  mouseDown = 1;
}
//se final q el mouse no este apretado
document.body.onmouseup = function(e) {
  xAnterior = getPosX(canvasMain,e);
  yAnterior = getPosY(canvasMain,e);
  mouseDown = 0;
}

//get de la pos x del mouse
//pero tomando en cuenta la pos del canvas y no de la pagina en si.
//Importante aclarar que se usa clientX/Y por lo que solo lee esos valores en firefox (creo)
//ademas hace un escalado para que los valores no los tome de mas y no se vaya la pos mal escalada
function getPosX(canvas,e){
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  return Math.round((e.clientX - rect.width) * scaleX);
}

//get de la pos y del mouse
function getPosY(canvas,e){
  var rect = canvas.getBoundingClientRect();
  var scaleY = canvasMain.height / rect.height;
  return Math.round((e.clientY - rect.top) * scaleY);
}

//si el mouse esta apretado, dibuja desde la pos anterior
//hasta la actual en al q esta el mouse
//luego la pos anterior se vuelve la pos actual del mouse para conseguir un trazo
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
// --------- FILTOS --------- //
var ctxGris = document.getElementById("filtroGris").getContext("2d");
var ctxSepia = document.getElementById("filtroSepia").getContext("2d");
var ctxNegativo = document.getElementById("filtroNegativo").getContext("2d");
var ctxBinario = document.getElementById("filtroBinario").getContext("2d");
var ctxBrillo = document.getElementById("filtroBrillo").getContext("2d");
var ctxSaturacion = document.getElementById("filtroSaturacion").getContext("2d");

// --------- CANVASMAIN --------- //
var imagen_ejemplo = new Image();
var ctxNoEditable = document.getElementById("canvasNoEditable").getContext("2d");
var canvasMain = document.getElementById("canvasMain");
var ctx = canvasMain.getContext("2d");

imagen_ejemplo.src = 'img-ejemplo.jpg'; // ruta de la img (aca tomar el valor de lo q suba el usuario)
//load de imagenes con input
// document.getElementById('file-input').addEventListener("input", function (e) {
//   var file = e.target.files[0],
//       imageType = /image.*/;
//
//   if (!file.type.match(imageType))
//       return;
//
//   var reader = new FileReader();
//   reader.onload = fileOnLoad(e);
//   reader.readAsDataURL(file);
// });
// function fileOnload(e) {
//   img = new Image();
//     img.src = e.target.result;
//     img.onload = function() {
//       alert(cargo);
//     }
// }

//ejecuta solo cuando la img esta cargada para dibujarla en el canvas principal
imagen_ejemplo.onload = function(){
  //cargo las imgs por defecto
  dibujarImg(ctx,this);
  dibujarImg(ctxNoEditable,this);
  var imgNoEditable = ctxNoEditable.getImageData(0, 0, this.width, this.height);

  //agrega el evento de ser clickeable a cafa canvas de filtro
  //hacer una uncica funcion y no repetir el codigo
  document.getElementById("filtroNegativo").addEventListener("click", function(){
    pintarPixel(imgNoEditable,1,ctx);
  });
  document.getElementById("filtroGris").addEventListener("click", function(){
    pintarPixel(imgNoEditable,2,ctx);
  });
  document.getElementById("filtroSepia").addEventListener("click", function(){
    pintarPixel(imgNoEditable,3,ctx);
  });
  document.getElementById("filtroBinario").addEventListener("click", function(){
    pintarPixel(imgNoEditable,4,ctx);
  });
  document.getElementById("filtroBrillo").addEventListener("click", function(){
    pintarPixel(imgNoEditable,5,ctx);
  });

//pinta los canvas de filtros
  pintarPixel(imgNoEditable,1,ctxNegativo); // NEGATIVO
  pintarPixel(imgNoEditable,2,ctxGris); // ESCALA DE NEGROS
  pintarPixel(imgNoEditable,3,ctxSepia); // SEPIA
  pintarPixel(imgNoEditable,4,ctxBinario); // BINARIZACION
  pintarPixel(imgNoEditable,5,ctxBrillo); // BRILLO
  // pintarPixel(imgNoEditable,6,ctx7); // DESENFOQUE
}

//dibuja la imagen dada, ajustandola al tamaño del canvas dado
function dibujarImg(contexto, imagen){
  contexto.drawImage(imagen,0,0,contexto.canvas.width,contexto.canvas.height); // hacer el reescalado a mano para no perder calidad
}
//recorre el canvas q se le pasan,
//y dependiendo el tipo de filtro q se le quiera aplicar,
//sete la imagen enviada con dicho filtro
function pintarPixel (imageData,tipo,contexto){
  for (var eje_x = 0; eje_x < imageData.width; eje_x ++) {
    for (var eje_y = 0; eje_y < imageData.height; eje_y ++) {
      index = (eje_x + eje_y * imageData.width) * 4; // ese *4 es por el rgba, SI tambien cuenta el a, por mas q no lo pongas

      switch (tipo) {
        case 1: // NEGATIVO
          imageData.data[index+0] = 255 - imageData.data[index+0]; //rojo
          imageData.data[index+1] = 255 - imageData.data[index+1]; //verde
          imageData.data[index+2] = 255 - imageData.data[index+2]; //azul
          //imageData.data[index+3] = a; //opacidad (no hace falta porque esta en el maximo por defecto)
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
        // deteccion de borders
          // pasamos a gris para saber la luminancia con el escala de grices
          //te paras en un pixel y preguntas y los lados y los de arribay los de abajo no son muuuy distintos ahi no es borde
          // imagen[x-1,y] * m[0,1]+
          // imagen[x+1,y] * m[2,1]
          // matriz de combolucion
          // cuenta<0 lo multiplicas por -1
          //
          // -1 | 0 | 1
          // -1 | x | 1
          // -1 | 0 | 1

          // blur es la misma matriz pero con 1/9 en casa pos
      }
    }
  }
  contexto.putImageData(imageData,0,0);
}
