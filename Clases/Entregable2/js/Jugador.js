class Jugador {
  constructor(jugador) {
    this.canvas = document.getElementById('canvasMain');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.fichas = [];
    this.posPiloteY = 110;
    if (this.jugador == 'j1') {
      this.posPiloteX = 110;
    }else {
      this.posPiloteX = this.canvas.width-110;
    }
    this.startGame();
  }

  startGame(){
    for (var i = 0; i < 32; i++) {
      var ficha = new Ficha(this.jugador,this.jugador+i);
      this.fichas.push(ficha);
      ficha.dibujar(ctx,this.posPiloteX,this.posPiloteY);
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

  setTitulo(){
    if (this.jugador == "j1") {
      document.getElementById('J1').style.color = "#1a943f";
      document.getElementById('J2').style.color = 'white';
    }else{
      document.getElementById('J2').style.color = "#1a943f";
      document.getElementById('J1').style.color = 'white';
    }
  }
}
