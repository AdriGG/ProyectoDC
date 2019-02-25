var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var c = {}
var cw = canvas.width = 300;
c.x = cw / 2;
var ch = canvas.height = 300;
c.y = ch / 2;

var rad = Math.PI / 180;

var frames = 0;

function Particula() {
  this.x = -this.r;
  this.y = -this.r;
  this.r = 15;

  this.historial = [];
  //define la longitud máxima del historial
  this.maxLongitudHistorial = this.r;

  this.dibujar = function() {
    ctx.fillStyle = "#6ab150";
   

    //Para cada posición del historial dibuja un nuevo circulo cuyo radio es 1+i
    for (var i = 0; i < this.historial.length; i++) {
      var pos = this.historial[i];
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 1 + i, 0, 2 * Math.PI);
      ctx.fill();
      //ctx.stroke();

    }
  }

  this.actualizar = function(momento, frames) { //53, 59, 61, 67 números primos!
    this.x = c.x + Math.cos(momento / 23 + Math.cos(momento / 29 + frames * rad)) * (c.x - 2 * this.r);
    this.y = c.y + Math.sin(momento / 31 + Math.cos(momento / 37 + frames * rad)) * (c.y - 2 * this.r);
// guarda la posición actual en un objeto
    var posicion = {
      x: this.x,
      y: this.y
    }
    // añade un nuevo objeto al final del array historial
    this.historial.push(posicion);
    // si el historial es más largo que this.maxLongitudHistorial tenemos que eliminar los elementos que sobran. 
    if (this.historial.length > this.maxLongitudHistorial) {
      // elimina un elemento situado al inicio del array
      this.historial.splice(0, 1)
    }
  }
}

particula = new Particula();
particula.dibujar();

function Animar() {
  elId = window.requestAnimationFrame(Animar);
  frames++;
  ctx.clearRect(0, 0, cw, ch);
  momento = new Date().getTime() / 30;
  particula.actualizar(momento, frames);
  particula.dibujar();
}

requestId = window.requestAnimationFrame(Animar);