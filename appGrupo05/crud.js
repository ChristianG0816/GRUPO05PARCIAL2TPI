/*  Grupo 05 Integrantes:
    Miguel Angel Amaya Rodriguez
    Christian Javier Ayala Guerra
    Diego José Ayala Guerra
    Luis Alonso Cornejo Jiménez
    Carolina Isabel Pineda Delgado
    José Gustavo Pineda Delgado
    William Enrique Vásquez Mancia
*/

var fila="<tr><td class='id'></td><td class='Nombre'></td><td class='Descripcion'></td><td class='price'></td> <td class='imagen'></td><td class='Video'></td><td class='Categoria'></td><td class='Opciones'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "Dell":code="c1";break;
	    case "HP":code="c2";break;
		case "Lenovo":code="c3";break;
		case "Apple":code="c4";break;
	}
	return code;
}   
var orden=0;
	  
function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,nombres,price,descripcion,categoria,imagen,video;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  nombres=document.getElementsByClassName("Nombre");
      descripcion=document.getElementsByClassName("Descripcion"); 
	  price=document.getElementsByClassName("price");
	  imagen=document.getElementsByClassName("imagen");  
      video=document.getElementsByClassName("Video");  
      categoria=document.getElementsByClassName("Categoria"); 
	  borrar=document.getElementsByClassName("Opciones");
	  if(orden===0) {
		  orden=-1;precio.innerHTML="Precio"
		}
	  else{
	     if(orden==1) {
			 ordenarAsc(productos,"Precio");
			 precio.innerHTML="Precio Ascendente";
			 precio.style.color="darkgreen";
			}
	     else{
			if(orden==-1) {
				ordenarDesc(productos,"Precio");
				precio.innerHTML="Precio Descendente";
				precio.style.color="blue";
				}
			}
	  }
		listado.style.display="block";
        for(nfila=0;nfila<num;nfila++) {

                ids[nfila].innerHTML=productos[nfila].id;
                nombres[nfila].innerHTML=productos[nfila].Nombre;
                descripcion[nfila].innerHTML=productos[nfila].Descripcion;
                categoria[nfila].innerHTML= productos[nfila].Categoria;
                catcode=codigoCat(productos[nfila].Categoria);
                tr=categoria[nfila].parentElement;
                tr.setAttribute("class",catcode);
                price[nfila].innerHTML="$"+productos[nfila].Precio;
                imagen[nfila].innerHTML="<img src='"+productos[nfila].imagen+"'>";
                //video[nfila].innerHTML="<iframe src='https://www.youtube.com/embed/Hlr2KIbm4Y0'></iframe>";
				video[nfila].innerHTML="<a href='"+productos[nfila].Video+"' target='_blank'>"+ productos[nfila].Video +"</a>";
				borrar[nfila].innerHTML = "<button>Eliminar</button>";
				borrar[nfila].firstChild.setAttribute(
				"onclick",
				"eliminar('" + productos[nfila].id + "');"
		);
            }
	}

function obtenerProductos() {
	  fetch('http://localhost:3000/productos')
            .then(res=>res.json())
			.then(data=>{
				productos=data;
				productos.forEach(
					function(producto){
						producto.Precio=parseFloat(producto.Precio)
					}
				);
				listarProductos(data)
			})
            

}

//Agregar una nueva computadora a la base de datos
window.addEventListener("load", function(){
	document.getElementById("nombre").focus();
});
function agregar(){
	var nombre=document.getElementById('nombre').value.toString().trim();
	var descripcion=document.getElementById('descripcion').value.toString().trim();
	var precio=document.getElementById('precio').value.toString().trim();
	var imagen=document.getElementById('lImagen').value.toString().trim();
	var video=document.getElementById('lVideo').value.toString().trim();
	var categoria=document.getElementById('categoria').value.toString().trim();
	if(nombre==""){
		alert("No se permiten campos vacíos");
		document.getElementById('nombre').value="";
		document.getElementById("nombre").focus();
	}else if(descripcion==""){
		alert("No se permiten campos vacíos");
		document.getElementById('descripcion').value="";
		document.getElementById("descripcion").focus();
	}else if(imagen==""){
		alert("No se permiten campos vacíos");
		document.getElementById('precio').value="";
		document.getElementById("precio").focus();
	}else if(video==""){
		alert("No se permiten campos vacíos");
		document.getElementById('lImagen').value="";
		document.getElementById("lImagen").focus();
	}else if(video==""){
		alert("No se permiten campos vacíos");
		document.getElementById('lVideo').value="";
		document.getElementById("lVideo").focus();
	}else if(categoria==""){
		alert("No se permiten campos vacíos");
		document.getElementById('categoria').value="Dell";
		document.getElementById("categoria").focus();
	}else{
		if(document.getElementById('precio').value>=0){
			var producto={
				Nombre:nombre,
				Descripcion:descripcion,
				Precio:precio,
				imagen:imagen,
				Video:video,
				Categoria:categoria
			}
			fetch('http://localhost:3000/productos',
			{ method:"POST",
				body: JSON.stringify(producto),
				headers: {
					'Accept': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',	   
				 }
			})
			.then(res=>res.json())
			.then(data=>data);
			document.getElementById('nombre').value="";
			document.getElementById('descripcion').value="";
			document.getElementById('precio').value="";
			document.getElementById('lImagen').value="";
			document.getElementById('lVideo').value="";
			document.getElementById('categoria').value="Dell";
			orden*=0;
			alert("Se agregó la computadora personal: "+nombre);
			window. location. reload();
		}else{
			alert("El precio debe ser un número positivo");
		}
	}
}

function ordenarPre(){
	let btnquitarordenar=document.getElementById("quitarOrdenarbtn");
	orden*= -1;
	listarProductos(productos);
	btnquitarordenar.style.display="inline";
}

function quitarOrdenar(){
	let btnquitarordenar=document.getElementById("quitarOrdenarbtn");
	var precio=document.getElementById("price"); 
	orden = 0;
	precio.style.color="black";
	btnquitarordenar.style.display="none";
	obtenerProductos();
}

var id;
function eliminar(id) {
	fetch('http://localhost:3000/productos/'+id, { method: "DELETE" }).then(response => response.json()).then(data => productos = data);
			obtenerProductos();
			alert("Se ha eliminado la computadora N° " + id);
}

function ordenarDesc(p_array_json, p_key) {
	p_array_json.sort(function (a, b) {
	   if(a[p_key] > b[p_key]) return -1;
 if(a[p_key] < b[p_key]) return 1;
 return 0;
	});
 }
 
 function ordenarAsc(p_array_json, p_key) {
	p_array_json.sort(function (a, b) {
	   if(a[p_key] > b[p_key]) return 1;
 if(a[p_key] < b[p_key]) return -1;
 return 0;
	});
 }

