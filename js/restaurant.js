var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    var horarios = this.horarios;
    var horariosFiltrados = horarios.filter(h => h !== horarioReservado);
    this.horarios = horariosFiltrados;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

function sumatoria(numeros){
    var sumatoria = 0;
    for (var i = 0; i < numeros.length; i++) {
        sumatoria += numeros[i]
    }
    return sumatoria;
}

function promedio(numeros){
    var promedio = sumatoria(numeros) / numeros.length;
    return Math.round(promedio * 10) / 10;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    var puntuacion = 0;
    if(this.calificaciones.length !== 0){
        puntuacion = promedio(this.calificaciones)
    }
    return puntuacion;
}

