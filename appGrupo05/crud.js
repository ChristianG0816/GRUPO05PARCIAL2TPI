/*  Grupo 05 Integrantes:
    Miguel Angel Amaya Rodriguez
    Christian Javier Ayala Guerra
    Diego José Ayala Guerra
    Luis Alonso Cornejo Jiménez
    Carolina Isabel Pineda Delgado
    José Gustavo Pineda Delgado
    William Enrique Vásquez Mancia
*/

var fila="<tr><td class='id'></td><td class='Nombre'></td><td class='Descripcion'></td><td class='Precio'></td> <td class='imagen'></td><td class='Video'></td><td class='Categoria'></td><td class='Opciones'></td></tr>";
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
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
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
	  price=document.getElementsByClassName("Price");
	  imagen=document.getElementsByClassName("imagen");  
      video=document.getElementsByClassName("Videos");  
      categoria=document.getElementsByClassName("Categoria"); 
	  if(orden===0) {orden=-1;price.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");price.innerHTML="Precio A";price.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");price.innerHTML="Precio D";price.style.color="blue"}
	
		  
	  	  listado.style.display="block";
        for(nfila=0;nfila<num;nfila++) {

                ids[nfila].innerHTML=productos[nfila].id;
                nombres[nfila].innerHTML=productos[nfila].Nombre;
                descripcion[nfila].innerHTML=productos[nfila].Descripcion;
                categoria[nfila].innerHTML= productos[nfila].Categoria;
                catcode=codigoCat(productos[nfila].Categoria);
                tr=categoria[nfila].parentElement;
                tr.setAttribute("class",catcode);
                imagen[nfila].innerHTML="<img src='"+productos[nfila].imagen+"'>";

                /*Estos dos dan problemas porque al intentar no se logran capturar bien 
                    y al intentar poner el video hace que solo aparezca 1 fila 
                */

                //price[nfila].innerHTML="$"+productos[nfila].Precio;
                //video[nfila].innerHTML="<video src='"+productos[nfila].Video+"'></video>";
                
                
                
            }
	}

function obtenerProductos() {
	  fetch('http://localhost:3000/productos')
            .then(res=>res.json())
			.then(data=>{
				productos=data;
				productos.forEach(
					function(producto){
						producto.price=parseFloat(producto.price)
					}
				);
				listarProductos(data)
			})
            

}

function nombre(){
	var texto=document.getElementById('nombre').value;
	return texto;
}
function descripcion(){
	var texto=document.getElementById('descripcion').value;
	return texto;
}
function precio(){
	var texto=document.getElementById('precio').value;
	return texto;
}
function imagen(){
	var texto=document.getElementById('lImagen').value;
	return texto;
}
function video(){
	var texto=document.getElementById('lVideo').value;
	return texto;
}
function categoria(){
	var texto=document.getElementById('categoria').value;
	return texto;
}

function agregar(nombre, descripcion, precio, imagen,video,categoria){
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
	document.getElementById('categoria').value="";
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
