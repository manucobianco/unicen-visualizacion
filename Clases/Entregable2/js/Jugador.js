class Jugador {
  constructor(jugador) {
    this.canvas = document.getElementById('canvasMain');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.fichas = [];
    this.posPiloteY = 87;
    if (this.jugador == 'j1') {
      this.posPiloteX = 87;
    }else {
      this.posPiloteX = this.canvas.width-87;
    }
    this.startGame();
  }

  startGame(){
    for (var i = 0; i < 32; i++) {
      var ficha = new Ficha(this.jugador,this.jugador+i);
      ficha.dibujar(ctx,this.posPiloteX,this.posPiloteY);
      this.fichas.push(ficha);
    }
  }

  getCantFichas(){
    return this.fichas.length-1;
  }

  getFicha(){
    if (this.fichas.length>-1) {
      return this.fichas.pop();
    }
  }

  getNombre(){
    return this.jugador;
  }

  pintar(jugadorActual){
    var cant = 0;
    if (this.jugador == jugadorActual) {
      cant = this.fichas.length-1;
    }else{
      cant = this.fichas.length;
    }

    for (var i = 0; i < cant; i++) {
      this.fichas[i].dibujar(this.ctx,this.posPiloteX,this.posPiloteY);
    }
  }
}
