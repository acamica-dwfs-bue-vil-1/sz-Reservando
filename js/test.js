const expect = chai.expect;

describe('Eliminar horario reservado', function(){
    let restaurant = listado.buscarRestaurante(1);    
    it('Elimina el horario del arreglo.',function(){
        restaurant.horarios = ['14:30', '12:30', '16:00']   
        restaurant.reservarHorario('12:30');
        let h = restaurant.horarios
          expect(h).to.be.an('array').that.does.not.include('12:30');      
    })
    it('No hay cambios si lo que se pasa no es un str.',function(){   
        restaurant.horarios = ['14:30', '12:30', '16:00']   
        let h = restaurant.horarios
        restaurant.reservarHorario(1);
          expect(h).to.be.an('array').to.eql(h);      
    })
    it('No hay cambios si no existe el horario enviado.',function(){   
        restaurant.horarios = ['14:30', '12:30', '16:00']  
        let h = restaurant.horarios 
        restaurant.reservarHorario('15:30');
          expect(h).to.be.an('array').to.eql(h);      
    })
    it('No hay cambios si no se envia nada.',function(){   
        restaurant.horarios = ['14:30', '12:30', '16:00']  
        let h = restaurant.horarios 
        restaurant.reservarHorario();
          expect(h).to.be.an('array').to.eql(h);      
    })
    it('La cantidad disminute en 1.',function(){   
        let horariosAntes = restaurant.horarios;
        restaurant.horarios = ['14:30', '12:30', '16:00'] 
        restaurant.reservarHorario('12:30');
        h = restaurant.horarios 
          expect(h.length).to.be.equal(horariosAntes.length - 1);      
    })
  });

describe('Calcular el promedio de calificaciones', function(){
    let restaurant = listado.buscarRestaurante(1);
    restaurant.calificaciones = [2, 3, 4, 5];       
    it('Calculo promedio correcto',function(){
        expect(restaurant.obtenerPuntuacion()).to.be.equal(3.5);
    })
    it('Para un restaurant sin calificaciones devuelve 0',function(){
      restaurant.calificaciones = [];
        expect(restaurant.obtenerPuntuacion()).to.be.equal(0);    
    })
  });

describe('Calificar restaurant', function(){
    let restaurant = listado.buscarRestaurante(1);
    describe('Validar que la calificacion este entre 0 y 10', function(){
      restaurant.calificaciones = [1, 2, 3];         
      it('Calificacion igual a 0', function(){
        let cAntes = restaurant.calificaciones;
        restaurant.calificar(0);
        let c = restaurant.calificaciones;
          expect(c).to.be.an('array').to.eql(cAntes);
      })
      it('Calificacion es mayor a 10', function(){
        let cAntes = restaurant.calificaciones;
        restaurant.calificar(15);
        let c = restaurant.calificaciones;
          expect(c).to.be.an('array').to.eql(cAntes);
      })
      it('Calificacion es menor a 0', function(){
        let cAntes = restaurant.calificaciones;
        restaurant.calificar(-3);
        let c = restaurant.calificaciones;
          expect(c).to.be.an('array').to.eql(cAntes);
      }) 
      it('No hay cambios si no se envia nada.',function(){   
        let cAntes = restaurant.calificaciones;       
        restaurant.calificar();
        let c = restaurant.calificaciones
          expect(c).to.be.an('array').to.eql(cAntes);      
      })
      it('No hay cambios si lo que se pasa no es un Integer',function(){   
        let cAntes = restaurant.calificaciones;       
        restaurant.calificar('abc');
        let c = restaurant.calificaciones
          expect(c).to.be.an('array').to.eql(cAntes);      
      })        
    })
    describe('Agregar calificacion', function(){
      it('Se agregue la calificaciona al array', function(){
        restaurant.calificaciones = [1, 2, 3];         
        restaurant.calificar(4);
          expect(restaurant.calificaciones).to.be.an('array').to.eql([1, 2, 3, 4]);
      })
      it('La cantidad aumenta en 1', function(){
        restaurant.calificaciones = [1, 2, 3];  
        let cAntes = restaurant.calificaciones;       
        restaurant.calificar(4);
          expect(restaurant.calificaciones.length).to.be.equal(cAntes.length + 1);
      })
    })
  });
describe('Buscar un restaurant', function(){
  let listado = new Listado(listadoDeRestaurantes);
  let restaurantTest = new Restaurant(26, "Maison kk", "Almuerzo", "Munro City", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [1, 2, 3, 4, 5]);
    it('Buscar un restaurant por id existente', function(){
      let restaurant = listado.buscarRestaurante(26);
        expect(restaurant).to.be.eql(restaurant);
    })
    it('Buscar un restaurant por id no existente', function(){
      let err = listado.buscarRestaurante(100);
      expect(err).to.be.equal('No se ha encontrado ningún restaurant')
    })
    it('Buscar un restaurant sin pasar el id', function(){
      let err = listado.buscarRestaurante();
      expect(err).to.be.equal('No se ha encontrado ningún restaurant')
    })
    it('Buscar un restaurant con un String como id', function(){
      let err = listado.buscarRestaurante('abc');
      expect(err).to.be.equal('No se ha encontrado ningún restaurant')
    })
  });

describe('Obtener restaurantes filtrados', function(){
  it('Devuelve un array con los restaurantes filtrados por lugar',function(){
    let restaurnatesFiltrados = listado.obtenerRestaurantes(null, 'Nueva York', null);    
    expect(restaurnatesFiltrados.length).to.be.equal(7);    
      restaurnatesFiltrados.forEach(function(element){
      expect(element['ubicacion']).to.include('Nueva York');          
    });
  });
  it('Devuelve un array con todos los restaurantes filtrados por rubro.',function(){
    let restaurnatesFiltrados = listado.obtenerRestaurantes('Pasta', null, null);    
    expect(restaurnatesFiltrados.length).to.be.equal(5);    
      restaurnatesFiltrados.forEach(function(element){
        expect(element['rubro']).to.include('Pasta');
      });
  });
  it('Devuelve un array con los restaurantes con el horario especificado',function(){
    let restaurnatesFiltrados = listado.obtenerRestaurantes(null, null, '14:30');    
      restaurnatesFiltrados.forEach(function(element){
        expect(element.horarios).to.be.an('array').that.includes('14:30');
      });
  });   
  it('Debe devolver un arreglo con todos los restaurantes del listado en caso de no haber ningún filtro aplicado.',function(){
    let restaurnatesFiltrados = listado.obtenerRestaurantes(null, null, null);        
    expect(restaurnatesFiltrados).to.be.an('array');    
    expect(restaurnatesFiltrados.length).to.be.equal(25);    
  });
});

describe('Nueva Reserva', function(){
  it('Calcular precio base de la reserva', function(){
    let reserva = new Reserva (new Date(2018, 4, 19, 13, 30), 5, 200, "DES1")
      expect(reserva.calcularPrecioBase()).to.be.equal(1000);    
  })
  it('Calcular precio final de la reserva', function(){
    let reserva = new Reserva (new Date(2018, 4, 19, 13, 30), 5, 200, 'DES1')
      expect(reserva.calcularPrecioFinal()).to.be.equal(950);
  })
});

