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
var colorLapiz = "#000000";
var colorAnterior = "#000000";
var tamaño = 2;
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
    ctx.beginPath();
    ctx.moveTo(xAnterior, yAnterior);
    ctx.lineTo(x, y);
    ctx.lineWidth = tamaño;
    ctx.strokeStyle = colorLapiz;
    ctx.stroke();
    xAnterior = x;
    yAnterior = y;
  }
}
function setearColor(color,tipo){
  if (tipo =='c') {
    colorAnterior = color;
  }
  colorLapiz = color;
}
function setColorAnterior(){
  colorLapiz = colorAnterior;
}
function setTamaño(tam){
  tamaño = tam
}
// --------- FILTOS --------- //
var ctxNegativo = document.getElementById("filtroNegativo").getContext("2d");
var ctxGris = document.getElementById("filtroGris").getContext("2d");
var ctxSepia = document.getElementById("filtroSepia").getContext("2d");
var ctxBinario = document.getElementById("filtroBinario").getContext("2d");
var ctxBrillo = document.getElementById("filtroBrillo").getContext("2d");
var ctxDetBordes = document.getElementById("filtroDeteccionBordes").getContext("2d");

// --------- CANVASMAIN --------- //
// var imagen_ejemplo = new Image();
var ctxNoEditable = document.getElementById("canvasNoEditable").getContext("2d");
var canvasMain = document.getElementById("canvasMain");
var ctx = canvasMain.getContext("2d");

// imagen_ejemplo.src = 'img-ejemplo.jpg'; // ruta de la img (aca tomar el valor de lo q suba el usuario)

//load de imagenes con input
document.getElementById('file-input').addEventListener("input", function (e) {
  var file = e.target.files[0],
      imageType = /image.*/;

  if (!file.type.match(imageType))
      return;

  var reader = new FileReader();
  reader.onload = fileOnload;
  reader.readAsDataURL(file);
});

function fileOnload(e) {
    img = new Image();
    img.src = e.target.result;
    img.onload = function() {
    //cargo las imgs por defecto
    dibujarImg(ctx,this,canvasMain.width,canvasMain.height);
    dibujarImg(ctxNoEditable,this,canvasMain.width,canvasMain.height);
    var img = ctx.getImageData(0, 0, this.width, this.height);
    var imgNoEditable = ctxNoEditable.getImageData(0, 0, this.width, this.height);

    //agrega funcionalidad a cada canvas
    document.getElementById("filtroNegativo").addEventListener("click", function(){
      document.getElementById("points").style.display = "none";
      document.getElementById("detectorBordes").style.display = "none";

      pintarPixel(img,1,ctx,imgNoEditable);
    });
    document.getElementById("filtroGris").addEventListener("click", function(){
      document.getElementById("points").style.display = "none";
      document.getElementById("detectorBordes").style.display = "none";

      pintarPixel(img,2,ctx,imgNoEditable);
    });
    document.getElementById("filtroSepia").addEventListener("click", function(){
      document.getElementById("points").style.display = "none";
      document.getElementById("detectorBordes").style.display = "none";

      pintarPixel(img,3,ctx,imgNoEditable);
    });
    document.getElementById("filtroBinario").addEventListener("click", function(){
      document.getElementById("points").style.display = "none";
      document.getElementById("detectorBordes").style.display = "none";

      pintarPixel(img,4,ctx,imgNoEditable);
    });
    document.getElementById("filtroBrillo").addEventListener("click", function(){
      pintarPixel(img,5,ctx,imgNoEditable);
      document.getElementById("points").style.display = "block";
      document.getElementById("detectorBordes").style.display = "none";

    });
    document.getElementById("points").addEventListener("input", function(){
      pintarPixel(img,5,ctx,imgNoEditable);
    });
    document.getElementById("filtroDeteccionBordes").addEventListener("click", function(){
      document.getElementById("points").style.display = "none";
      document.getElementById("detectorBordes").style.display = "block";
      document.getElementById("btnVerticales").style.boxShadow  = "4px 4px #888888";
      pintarPixel(img,7,ctx,imgNoEditable);
    });
    document.getElementById("btnHorizontales").addEventListener("click", function(){
      document.getElementById("btnHorizontales").style.boxShadow  = "4px 4px #888888";
      document.getElementById("btnVerticales").style.boxShadow  = "none";

      pintarPixel(img,6,ctx,imgNoEditable);
    });
    document.getElementById("btnVerticales").addEventListener("click", function(){
      document.getElementById("btnHorizontales").style.boxShadow  = "none";
      document.getElementById("btnVerticales").style.boxShadow  = "4px 4px #888888";

      pintarPixel(img,7,ctx,imgNoEditable);
    });

    //pinta los canvas de filtros
    pintarPixel(img,1,ctxNegativo,imgNoEditable); // NEGATIVO
    pintarPixel(img,2,ctxGris,imgNoEditable); // ESCALA DE NEGROS
    pintarPixel(img,3,ctxSepia,imgNoEditable); // SEPIA
    pintarPixel(img,4,ctxBinario,imgNoEditable); // BINARIZACION
    pintarPixel(img,5,ctxBrillo,imgNoEditable); // BRILLO
    pintarPixel(img,6,ctxDetBordes,imgNoEditable); // DETECCION DE BORDES (por defecto el horizontales)
  };
}

//dibuja la imagen dada, ajustandola al tamaño del canvas dado
function dibujarImg(contexto, imagen, x,y){
  contexto.drawImage(imagen,0,0,x,y);
}
//recorre el canvas q se le pasan,
//y dependiendo el tipo de filtro q se le quiera aplicar,
//sete la imagen enviada con dicho filtro
function pintarPixel (imageData,tipo,contexto,imgNoEditable){

  if (tipo < 6) {
    for (var eje_x = 0; eje_x < imageData.width; eje_x ++) {
      for (var eje_y = 0; eje_y < imageData.height; eje_y ++) {
        index = (eje_x + eje_y * imageData.width) * 4; // ese *4 es por el rgba, SI tambien cuenta el a, por mas q no lo pongas

        switch (tipo) {
          case 1: // NEGATIVO
            imageData.data[index] = 255 - imgNoEditable.data[index]; //rojo
            imageData.data[index+1] = 255 - imgNoEditable.data[index+1]; //verde
            imageData.data[index+2] = 255 - imgNoEditable.data[index+2]; //azul
            //imageData.data[index+3] = a; //opacidad (no hace falta porque esta en el maximo por defecto)
          break;
          case 2: // ESCALA DE NEGROS
            imageData.data[index] = (imgNoEditable.data[index] + imgNoEditable.data[index+1] + imgNoEditable.data[index+2]) / 3;
            imageData.data[index+1] = (imgNoEditable.data[index] + imgNoEditable.data[index+1] + imgNoEditable.data[index+2]) / 3;
            imageData.data[index+2] = (imgNoEditable.data[index] + imgNoEditable.data[index+1] + imgNoEditable.data[index+2]) / 3;
          break;
          case 3: // SEPIA
            imageData.data[index] = 0.393 * imgNoEditable.data[index] + 0.769 * imgNoEditable.data[index+1] + 0.189 * imgNoEditable.data[index+2];
            imageData.data[index+1] = 0.349 * imgNoEditable.data[index] + 0.686 * imgNoEditable.data[index+1] + 0.168 * imgNoEditable.data[index+2];
            imageData.data[index+2] = 0.272 * imgNoEditable.data[index] + 0.534 * imgNoEditable.data[index+1] + 0.131 * imgNoEditable.data[index+2];
          break;
          case 4: // BINARIZACION
            var escala_negra = (imgNoEditable.data[index] + imgNoEditable.data[index+1] + imgNoEditable.data[index+2]) / 3;
            var punto_medio = 128;
            if (escala_negra >= punto_medio) {
              imageData.data[index] = 0;
              imageData.data[index+1] = 0;
              imageData.data[index+2] = 0;
            }else{
              imageData.data[index] = 255;
              imageData.data[index+1] = 255;
              imageData.data[index+2] = 255;
            }
          break;
          case 5: // BRILLO
            var brillo_actual = parseInt(document.getElementById("points").value);
            imageData.data[index] = imgNoEditable.data[index] + brillo_actual; //rojo
            imageData.data[index+1] = imgNoEditable.data[index+1] + brillo_actual; //verde
            imageData.data[index+2] = imgNoEditable.data[index+2] + brillo_actual; //azul
          break;
        }
      }
    }
  }
  else {
    var matriz = [[-1,-1,1],[-1,0,1],[-1,1,1]];

    for (var x = 0; x < imgNoEditable.width; x ++) {
      for (var y = 0; y < imgNoEditable.height; y ++) {
        var index = (x + y * imgNoEditable.width) * 4;
        //tambien se puede hacer con la img en blanco en negro para conseguir un solo color.
        for (var j = x-1; j < x+1; j++) {
          for (var k = y-1; k < y+1; k++) {
            if (tipo == 6) { //DETECCION DE BORDES VERTICALES
              imageData.data[index] = (imgNoEditable.data[index - (imgNoEditable.width * 4)] * matriz[1][0]) + (imgNoEditable.data[index + (imgNoEditable.width * 4)] * matriz[1][2]);
              imageData.data[index+1] = (imgNoEditable.data[index - (imgNoEditable.width * 4) +1] * matriz[1][0]) + (imgNoEditable.data[index + (imgNoEditable.width * 4) +1] * matriz[1][2]);
              imageData.data[index+2] = (imgNoEditable.data[index - (imgNoEditable.width * 4) +2] * matriz[1][0]) + (imgNoEditable.data[index + (imgNoEditable.width * 4) +2] * matriz[1][2]);
            }
            else if (tipo == 7) { //DETECCION DE BORDES HORIZONTALES
              imageData.data[index] = (imgNoEditable.data[index - 4] * matriz[1][0]) + (imgNoEditable.data[index + 4] * matriz[1][2]);
              imageData.data[index+1] = (imgNoEditable.data[index - 4] * matriz[1][0]) + (imgNoEditable.data[index + 4] * matriz[1][2]);
              imageData.data[index+2] = (imgNoEditable.data[index - 4] * matriz[1][0]) + (imgNoEditable.data[index + 4] * matriz[1][2]);
            }
          }
        }
      }
    }
  }

  contexto.putImageData(imageData,0,0);
}
function copiarImg(original, copia){
  for (var x = 0; x < original.width; x++) {
    for (var y = 0; y < original.height; y++) {
      index = (x + y * original.width) * 4;
      copia.data[index] = original.data[index];
    }
  }
}

function descargarImg(){
  var url = document.getElementById("canvasMain").toDataURL("image/png");
  document.getElementById("btnDescargar").setAttribute("href",url);;
}
