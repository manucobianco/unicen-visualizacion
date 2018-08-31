var imagen_ejemplo = new Image();
var ctx = document.getElementById("canvas").getContext("2d");
var ctx2 = document.getElementById("canvas2").getContext("2d");
var ctx3 = document.getElementById("canvas3").getContext("2d");
var ctx4 = document.getElementById("canvas4").getContext("2d");
var ctx5 = document.getElementById("canvas5").getContext("2d");
var ctx6 = document.getElementById("canvas6").getContext("2d");
var ctx7 = document.getElementById("canvas7").getContext("2d");

imagen_ejemplo.src = 'img-ejemplo.jpg';

imagen_ejemplo.onload = function(){
  dibujarImg(this);
  var img = ctx.getImageData(0, 0, this.width, this.height);

  // pintarPixel(img,1,ctx2); // NEGATIVO
  // pintarPixel(img,2,ctx3); // ESCALA DE NEGROS
  // pintarPixel(img,3,ctx4); // SEPIA
  // pintarPixel(img,4,ctx5); // BINARIZACION
  // pintarPixel(img,5,ctx6); // BRILLO
  pintarPixel(img,6,ctx7); // DESENFOQUE
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

function dibujarImg(imagen){
  ctx.drawImage(imagen,0,0,500,450);
}

function getRed(imageData,x,y){
  index = (x + y * imageData.width) * 4;
  return imageData.data[index+0]; //ese + nro condiciona el color
}

// manucobianco/github.io/asdasd
// gh-pages


// desenfoque: agarras un pixel y lo multiplicas o sumas por 0.5 de lo q tenes a tus lados
// deteccion de borders
// suavisado
// saturacion
//guardar imgLogo//
//lapiz , goma, tamaños de  la linea, colores

// fillrect para linea de canvas
    // es para no perder trazo entre los puntos.
