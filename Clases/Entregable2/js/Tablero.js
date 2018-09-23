class Tablero {
  constructor() {
    this.canvas = document.getElementById('canvasMain');
    this.ctx = canvas.getContext('2d');
    this.tablero = [[],[],[],[],[],[],[],[]];
    // for (var i = 0; i < 32; i++) {
    //   new Ficha('j1',i).dibujar(ctx,100,100);
    // }
    this.startGame();
  }

  startGame(){
    for (var i = 0; i < this.tablero.length; i++) {
      for (var j = 0; j < 8; j++) {
        this.tablero[i][j] = new Ficha('base',i);
      }
    }
    this.dibujar();
  }

  dibujar(){
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(520,240,560,560);

    for (var i = 0; i < this.tablero.length; i++) {
      for (var j = 0; j < 8; j++) {

        this.tablero[i][j].dibujar(ctx,(555)+(70*i),(800-35)-(70*j));
      }
    }
  }

  add(x,ficha){
    var columna;
    if (x>520 && x<=590) { // seguro hay alguna manera mejor, pero
      columna = 0;
    }else if(x>590 && x<=660){
      columna = 1;
    }else if(x>660 && x<=730){
      columna = 2;
    }else if(x>730 && x<=800){
      columna = 3;
    }else if(x>800 && x<=870){
      columna = 4;
    }else if(x>870 && x<=940){
      columna = 5;
    }else if(x>940 && x<=1010){
      columna = 6;
    }else if(x>1010&& x<=1080){
      columna = 7;
    }else{
      return false;
    }

    for (var i = 0; i < this.tablero.length; i++) {
      if (this.tablero[columna][i].getNombre() == 'base') {
        this.tablero[columna][i] = ficha;
        return true;
      }
    }
    return false;
  }
}
