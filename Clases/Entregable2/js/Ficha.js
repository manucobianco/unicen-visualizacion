class Ficha {
  constructor(id) {
    this.width = 20;
    this.height = 20;
    this.radio = 10;
    this.id = id;
    this.color = "rgb(226, 21, 205)";
    this.pintar(document.getElementById('canvasMain').getContext('2d'),50,50);
  }

  pintar(ctx,posX,posY){
    console.log('X: '+posX+"| Y: "+posY);
    ctx.beginPath();
    ctx.arc(posX,posY,this.radio,0,Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  getId(){
    return this.id;
  }
}
