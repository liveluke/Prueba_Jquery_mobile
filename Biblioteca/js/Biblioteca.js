$(document).ready(function(){
  crear_BD_Biblioteca();
  
  $("#botonGuardar").click(function(){
     ejecutarTransacion(1);    
  });
  
  $("#botonListar").click(function(){
     ejecutarTransacion(2);    
  });
  
});

function crear_BD_Biblioteca(){
     MiBiblioteca=openDatabase("BDBiblioteca","1.0","MiBiblioteca",2*1024);
        if(MiBiblioteca != null){
          MiBiblioteca.transaction(crearLibros,errorcrearLibros);    
        }
        else{
          alert("Error al crear la base da datos");    
        }
}

function crearLibros(txt){
    txt.executeSql("CREATE TABLE IF NOT EXISTS Libros(autor TEXT NOT NULL, titulo TEXT NOT NULL, resumen TEXT)");
}

function errorcrearLibros(err){
    alert("Error al ejecutar la consulta "+err.code);
}

function ejecutarTransacion(numero){
  switch(numero){
    case 1:
      MiBiblioteca.transaction(guardaLibro,errorcrearLibros);
      break;
    case 2:
      MiBiblioteca.transaction(listarLibro,errorcrearLibros);
      break;
     
  }
}

function guardaLibro(txt){
  var MiTitulo = $("#titulo").val();
  var MiAutor = $("#autor").val();
  var MiResumen = $("#resumen").val();
  
  txt.executeSql("INSERT INTO Libros (autor, titulo, resumen) VALUES (?,?,?)",[MiAutor,MiTitulo,MiResumen]);
  alert("Libro Guardado");
}

function listarLibro(txt){
  txt.execute("SELECT autor, titulo, resumen FROM Libros",[],function(txt,resultado){
              var nlibros = resultado.rows.length;
              $("#listaLibros").listview();
                for (var i=0;i<nlibros;i++)
                  {
                    var libro = resultado.rows.item(i);
                    $("#listaLibros").append("<li><a><p>"+libro["Titulo"]+"</p><br><label>"+Libro["autor"]+"</label></a></li>")
                  }
              $("#listaLibros").listview("refresh");
              })
}



