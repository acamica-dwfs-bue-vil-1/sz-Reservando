var Reserva = function(horario, personas, precio, descuento){
    this.horario = horario;
    this.personas = personas;
    this.precio = precio;
    this.descuento = descuento;
}

Reserva.prototype.calcularPrecioBase = function(){
    var base = this.precio * this.personas;
    return base;
}

Reserva.prototype.calcularPrecioFinal = function(){
    var base = this.calcularPrecioBase();
    var adicionales = this.calcularAdicionales(base);
    var descuento = this.calcularDescuentos(base);
    var final = base + adicionales - descuento;
    return final;
}

Reserva.prototype.calcularAdicionales = function(precioBase) {
    var adicionalA = 0;
    var adicionalB = 0;
      if ((this.horario.getHours() === 13 || this.horario.getHours() === 20 )) {
        adicionalA = precioBase * 0.05; 
      }
      if (this.horario.getDay() === 0 || this.horario.getDay() === 5 || this.horario.getDay() === 6) {
        adicionalB = precioBase * 0.1;
      }
    return adicionalA + adicionalB;
}

Reserva.prototype.calcularDescuentos = function(precioBase) {
    var primerDescuento = 0;
    var segundoDescuento = 0;
    if (this.cantidad >= 4 && this.cantidad < 6) {
      primerDescuento = precioBase * 0.05;
      }else if (this.cantidad >= 6 && this.cantidad < 8) {
        primerDescuento = precioBase * 0.1;      
      }else if (this.cantidad >= 8) {
        primerDescuento = precioBase * 0.15;      
      }
    
    switch (this.descuento) {
      case 'DES15':
        segundoDescuento = precioBase * 0.15;
        break;
      case 'DES200':
        segundoDescuento = 200;        
        break;      
      case 'DES1':
        segundoDescuento = this.precio;        
        break;      
      default:
        segundoDescuento = 0; 
        break;
    }
    return primerDescuento + segundoDescuento;   
}