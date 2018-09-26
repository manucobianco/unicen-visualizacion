class Ficha {
  constructor(jugador,id) {
    this.canvas = document.getElementById('canvasMain');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.radio = 30;
    this.id = id;
    this.ruta="";
    if (jugador == 'j1') {
      this.ruta = "./img/imagen_jugador1.png";
    }else if (jugador == 'j2') {
      this.ruta = "./img/imagen_jugador2.png";
    }
    this.color = "rgb(29, 29, 29)";
    // this.pintar(document.getElementById('canvasMain').getContext('2d'),50,50
  }

  dibujar(ctx,posX,posY){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(posX,posY,this.radio,0,Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    if (this.ruta!="") {
      var img = new Image();
      img.src = this.ruta;
      // img.onload = function() { //tilda todo
      ctx.drawImage(img,posX-this.radio,posY-this.radio,60,60);
      // }
    }
  }

  getNombre(){
    return this.jugador;
  }

  ganadora(){
    this.ruta="";
    this.color = "rgb(204, 215, 4)";
  }

  start(ctx,posX,posY){
    var img = new Image();
    img.src = this.ruta;
    img.onload = function() {
      ctx.drawImage(img,posX-this.radio,posY-this.radio,60,60);
    }
  }
}
