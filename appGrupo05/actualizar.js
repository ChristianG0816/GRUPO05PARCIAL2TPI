/*  Grupo 05 Integrantes:
    Miguel Angel Amaya Rodriguez
    Christian Javier Ayala Guerra
    Diego José Ayala Guerra
    Luis Alonso Cornejo Jiménez
    Carolina Isabel Pineda Delgado
    José Gustavo Pineda Delgado
    William Enrique Vásquez Mancia
*/
let valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = urlParams.get("id");
console.log(id);
let url = `http://localhost:3000/productos/${id}`;
let nombre = document.querySelector("#nombre");
let descripcion = document.querySelector("#descripcion");
let precio = document.querySelector("#precio");
let imagen = document.querySelector("#lImagen");
let video = document.querySelector("#lVideo");
let categoria = document.querySelector("#categoria");

let obtenerComputadora = async (id) => {
  const actualProducto = await fetch(url).then((response) => response.json());
  nombre.value = actualProducto.Nombre;
  descripcion.value = actualProducto.Descripcion;
  precio.value = actualProducto.Precio;
  imagen.value = actualProducto.imagen;
  video.value = actualProducto.Video;
  categoria.value = actualProducto.Categoria;
  console.log(actualProducto.Categoria);
};
obtenerComputadora(id);
let actualizar = async () => {
  let computadora = {
    Nombre: nombre.value,
    Descripcion: descripcion.value,
    Precio: precio.value,
    imagen: imagen.value,
    Video: video.value,
    Categoria: categoria.value,
  };
  console.log(url);
  await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(computadora),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
  location.href = "index.html";
};
