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
    ctx.fillStyle = "rgb(54, 54, 54)";
    ctx.fillRect(220,30,560,560);

    for (var i = 0; i < this.tablero.length; i++) {
      for (var j = 0; j < 8; j++) {

        this.tablero[i][j].dibujar(ctx,(255)+(70*i),(590-35)-(70*j));
      }
    }
  }

  add(x,ficha){
    var columna;
    if (x>220 && x<=290) { // seguro hay alguna manera mejor, pero
      columna = 0;
    }else if(x>290 && x<=360){
      columna = 1;
    }else if(x>360 && x<=430){
      columna = 2;
    }else if(x>430 && x<=500){
      columna = 3;
    }else if(x>500 && x<=570){
      columna = 4;
    }else if(x>570 && x<=640){
      columna = 5;
    }else if(x>640 && x<=710){
      columna = 6;
    }else if(x>710&& x<=780){
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

  gane(ultimo){
    var fichasGanadoras = [];
    var actual;
    var verticalActual;
    var horizontalActual;

    for (var i = 0; i < this.tablero.length; i++) {
      for (var j = 0; j < 8; j++) {
        if (ultimo.getNombre() == this.tablero[i][j].getNombre()) { // si estoy parado en una ficha del tipo q quiero buscar
          //--Validacion vertical --//
          actual = this.tablero[i][j];
          fichasGanadoras.push(actual);
          verticalActual = j;

          if ((verticalActual+1) < 7) {
            while(actual.getNombre()==this.tablero[i][verticalActual+1].getNombre()){
              verticalActual++;
              fichasGanadoras.push(this.tablero[i][verticalActual]);
              if (fichasGanadoras.length == 4) {
                return fichasGanadoras;
              }
              actual = this.tablero[i][verticalActual];
            }
          }
          fichasGanadoras = [];
          //no encontro nada verticalmente

          //--Validacion Horizontal --//
          actual = this.tablero[i][j];
          fichasGanadoras.push(actual);
          horizontalActual = i;

          while(((horizontalActual+1) < 8) && actual.getNombre()==this.tablero[horizontalActual+1][j].getNombre()){
            horizontalActual++;
            fichasGanadoras.push(this.tablero[horizontalActual][j]);
            if (fichasGanadoras.length == 4) {
              return fichasGanadoras;
            }
            actual = this.tablero[horizontalActual][j];
          }
          fichasGanadoras = [];
          //no encontro nada horizontalmente


          //--Validacion diagonal arriba --//
          actual = this.tablero[i][j];
          fichasGanadoras.push(actual);
          horizontalActual = i;
          verticalActual = j;

          while((((horizontalActual+1) < 8) && ((verticalActual+1) < 8))&&actual.getNombre()==this.tablero[horizontalActual+1][verticalActual+1].getNombre()){
            horizontalActual++;
            verticalActual++;
            fichasGanadoras.push(this.tablero[horizontalActual][verticalActual]);
            if (fichasGanadoras.length == 4) {
              return fichasGanadoras;
            }
            actual = this.tablero[horizontalActual][verticalActual];
          }
          fichasGanadoras = [];
          //no encontro nada en diagonal arriba

          //--Validacion diagonal abajo --//
          actual = this.tablero[i][j];
          fichasGanadoras.push(actual);
          horizontalActual = i;
          verticalActual = j;

          while((((horizontalActual+1) < 8) && ((verticalActual-1) > -1)) && actual.getNombre()==this.tablero[horizontalActual+1][verticalActual-1].getNombre()){
            horizontalActual++;
            verticalActual--;
            fichasGanadoras.push(this.tablero[horizontalActual][verticalActual]);
            if (fichasGanadoras.length == 4) {
              return fichasGanadoras;
            }
            actual = this.tablero[horizontalActual][verticalActual];
          }
          fichasGanadoras = [];
          //no encontro nada en diagonal arriba

        }
      }
    }
    return fichasGanadoras;
  }
}
