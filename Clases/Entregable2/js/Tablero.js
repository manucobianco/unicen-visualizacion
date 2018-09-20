class Tablero {
  constructor() {
    this.canvas = document.getElementById('canvasMain');
    this.ctx = canvas.getContext('2d');
    this.tablero = [];
    for (var i = 0; i < 32; i++) {
      new Ficha('j1',i).dibujar(ctx,10, 10+(i*10));
    }
  }
}
