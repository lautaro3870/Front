// $(document).ready(function () {
//   var tabla = $("#example").DataTable({});
// });

fetch("https://gestor-reserva.herokuapp.com/api/unidades")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    cargarComboUnidades(data);
  });

fetch("https://gestor-reserva.herokuapp.com/api/origenreserva")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    cargarComboOrigen(data);
  });

function cargarComboUnidades(datos) {
  var html = "<option value=''>Seleccione</option>";
  $("#txtUnidad").append(html);
  select = document.getElementById("txtUnidad");
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.value = datos[i].idUnidad;
    option.text = datos[i].nombre;
    select.add(option);
    //console.log(datos[i].area1);
  }
}

function cargarComboOrigen(datos) {
  var html = "<option value=''>Seleccione</option>";
  $("#txtOrigen").append(html);
  select = document.getElementById("txtOrigen");
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.value = datos[i].idOrigen;
    option.text = datos[i].origen;
    select.add(option);
    //console.log(datos[i].area1);
  }
}

var inputfocused = "";
var elements = document.querySelectorAll(
  "input[type='text'],input[type='number']"
);
// Por cada input field le añadimos una funcion 'onFocus'
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function () {
    // Guardamos la ID del elemento al que hacemos 'focus'
    inputfocused = this;
  });
}

function limipar() {
  //Utilizamos el elemento al que hacemos focus para borrar el campo.
  inputfocused.value = "";
}

let registrar = document.getElementById("registrar");
registrar.addEventListener("click", (e) => {
  var unidad = document.getElementById("txtUnidad");
  var unidadSeleccionada = unidad.options[unidad.selectedIndex].value;

  var origen = document.getElementById("txtOrigen");
  var origenSeleccionado = origen.options[origen.selectedIndex].value;

  var url = "https://gestor-reserva.herokuapp.com/api/reserva";

  var data = {
    montoTotal: document.getElementById("txtMonto").value,
    ingreso: document.getElementById("txtIngreso").value,
    egreso: document.getElementById("txtEgreso").value,
    senia: document.getElementById("txtSeña").value,
    nombre: document.getElementById("txtNombre").value,
    apellido: document.getElementById("txtApellido").value,
    dni: document.getElementById("txtDni").value,
    localidad: document.getElementById("txtLocalidad").value,
    edad: document.getElementById("txtEdad").value,
    email: document.getElementById("txtEmail").value,
    telefono: document.getElementById("txtTelefono").value,
    idUnidad: unidadSeleccionada,
    cantidadAcompaniantes: document.getElementById("txtAcompa").value,
    observaciones: document.getElementById("txtObs").value,
    idOrigen: origenSeleccionado,
    activo: true,
  };
  console.log(data);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Insercion Exitosa",
    showConfirmButton: false,
    timer: 1500,
  });

  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    //.catch((error) => console.error("Error:", error))
    .then((data) => {
      console.log(data);
    });
  getTabla();
  limipar();
});

$(document).ready(function () {
  getTabla();
});

function getTabla() {
  $.ajax({
    url: "https://gestor-reserva.herokuapp.com/api/reserva",
    success: function (data) {
      var o = data; //A la variable le asigno el json decodificado
      console.log(o);
      tabla = $("#example").DataTable({
        data: o,
        searching: true,
        columns: [
          { data: "montoTotal" },
          { data: "ingreso" },
          { data: "egreso" },
          { data: "nombre" },
          { data: "localidad" },
          { data: "dni" },
          { data: "email" },
          { data: "unidad" },
          { data: "origen" },
          { data: "observaciones" },
          {
            defaultContent: "<button>Mas info</button>",
          },
        ],
      });
      //tabla.destroy();
    },

    error: function (error) {
      alert("No hay Reservas");
    },
  });
}

const cantNoches = document.getElementById("txtEgreso");
// cantNoches.addEventListener("input", function (evt) {
//   something(this.value);
// });
cantNoches.addEventListener("input", () => {
  // log.textContent = e.srcElement.value;
  document.getElementById("txtCantNoches").innerHTML = "";
  var fecha1 = moment(document.getElementById("txtIngreso").value);
  var fecha2 = moment(document.getElementById("txtEgreso").value);
  var noches = fecha2.diff(fecha1, "days");

  console.log(noches);
  $("#txtCantNoches").append(noches);
  document.getElementById("txtCantNoches").innerHTML = noches;
});

let buscar = document.getElementById("buscar");
buscar.addEventListener("click", (e) => {
  e.preventDefault();
  var unidad = document.getElementById("txtUnidad2").value;
  $.ajax({
    url: `https://gestor-reserva.herokuapp.com/api/reserva?Unidad=${unidad}`,
    success: function (data) {
      var o = data; //A la variable le asigno el json decodificado
      console.log(o);
      tabla.destroy();
      tabla = $("#example").DataTable({
        fixedHeader: true,
        data: o,
        columns: [
          { data: "montoTotal" },
          { data: "ingreso" },
          { data: "egreso" },
          { data: "nombre" },
          { data: "localidad" },
          { data: "dni" },
          { data: "email" },
          { data: "unidad" },
          { data: "origen" },
          { data: "observaciones" },
          {
            defaultContent: "<button>Mas info</button>",
          },
        ],
      });
    },
    error: function (error) {
      alert("No hay Reservas");
    },
  });
});
