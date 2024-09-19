let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = []; // Nueva lista para las descripciones
let posicionEdicion = null; // Variable para identificar si estamos editando un gasto



function clickBoton () {

    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = document.getElementById("valorGasto").value;
    let descripcionGasto = document.getElementById("descripcionGasto").value; // Captura la descripción

    console.log(nombreGasto);
    console.log(valorGasto);

    // Verificar si el campo de descripción está vacío
    if (!descripcionGasto) {
        alert("Por favor, agrega una descripción del gasto.");
        return; // Evitar que continúe si falta la descripción
    }

    // Verificar si el gasto es mayor a 150
    if (valorGasto > 150) {
        alert("¡Atencion! Has registrado un gasto mayor a 150 dólares.");
    }

    if (posicionEdicion !== null) {
        // Si estamos editando, actualizar los valores
        listaNombresGastos[posicionEdicion] = nombreGasto;
        listaValoresGastos[posicionEdicion] = valorGasto;
        listaDescripcionesGastos[posicionEdicion] = descripcionGasto;
        posicionEdicion = null; // Resetear el modo de edición
        document.getElementById("botonFormulario").innerText = "Agregar Gasto"; // Cambiar el texto de vuelta
    } else {
        // Si no estamos editando, agregar un nuevo gasto
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionesGastos.push(descripcionGasto);
    }

    //lo agrego dentro del else
   // listaNombresGastos.push(nombreGasto);
    //listaValoresGastos.push(valorGasto);
    //listaDescripcionesGastos.push(descripcionGasto); // Añadir descripción a la lista

    console.log(listaNombresGastos);
    console.log(listaValoresGastos);
    //alert("click de usuario");

    actualizarListaGastos ();

}

function actualizarListaGastos () {
   const listaElementos = document.getElementById("listaDeGastos");
   const totalElementos = document.getElementById("totalGastos");
    let htmlLista = " ";
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento,posicion) => {
        const valorGasto = Number(listaValoresGastos [posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion]; // Obtener la descripción

        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} 
        <br><strong>Descripción:</strong> ${descripcionGasto}
         <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        <button onclick="editarGasto(${posicion});" class="modificar">Modificar</button>
        </li>`;    

         totalGastos += Number(valorGasto);
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar ();
}

function limpiar () {
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("descripcionGasto").value = ""; // Limpiar el campo de descripción

}

function eliminarGasto (posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1); // Eliminar también la descripción
    actualizarListaGastos ();

}

function editarGasto(posicion) {
    // Cargar el gasto seleccionado en los campos de entrada
    document.getElementById("nombreGasto").value = listaNombresGastos[posicion];
    document.getElementById("valorGasto").value = listaValoresGastos[posicion];
    document.getElementById("descripcionGasto").value = listaDescripcionesGastos[posicion];

    // Guardar la posición del gasto que estamos editando
    posicionEdicion = posicion;

   }

   function limpiarCampos() {
    listaNombresGastos = [];
    listaValoresGastos = [];
    listaDescripcionesGastos = [];
    document.getElementById("listaDeGastos").innerHTML = "";
    document.getElementById("totalGastos").innerHTML = "0.00";
    limpiar(); 
    posicionEdicion = null; 
}