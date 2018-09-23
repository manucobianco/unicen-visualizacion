class Ficha {
  constructor(jugador,id) {
    this.canvas = document.getElementById('canvasMain');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.radio = 30;
    this.id = id;
    if (jugador == 'j1') {
      this.color= "rgb(157, 223, 255)";
    }else if (jugador == 'j2') {
      this.color = "rgb(217, 180, 211)";
    }else if (jugador == 'base') {
      this.color = "rgb(47, 87, 93)";
    }
    // this.pintar(document.getElementById('canvasMain').getContext('2d'),50,50);
  }

  dibujar(ctx,posX,posY){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(posX,posY,this.radio,0,Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  getNombre(){
    return this.jugador;
  }
  //
  // getRandomColor() {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }
}
