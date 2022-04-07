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
    noches: document.getElementById("txtCantNoches").value,
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
  getTabla2();
  document.getElementById("formulario").reset();
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
          { data: "idReserva" },
          { data: "montoTotal" },
          { data: "ingreso" },
          { data: "egreso" },
          { data: "nombre" },
          { data: "localidad" },
          { data: "dni" },
          { data: "email" },
          { data: "unidad" },
          { data: "origen" },
          {
            data: null,
            defaultContent:
              "<button id='btnInfo' value='idReserva' data-toggle='modal' data-target='#exampleModalInfo' class='btn btn-primary'><box-icon name='info-circle'></button>" +
              "<button id='btnEliminar' value='idReserva' class='btn btn-danger'><box-icon name='trash'></box-icon></button>",
          },
        ],
      });
    },
    error: function (error) {
      alert("No hay Reservas");
    },
  });
}

function getTabla2() {
  $.ajax({
    url: "https://gestor-reserva.herokuapp.com/api/reserva",
    success: function (data) {
      var o = data; //A la variable le asigno el json decodificado
      console.log(o);
      tabla.destroy();
      tabla = $("#example").DataTable({
        data: o,
        searching: true,
        columns: [
          { data: "idReserva" },
          { data: "montoTotal" },
          { data: "ingreso" },
          { data: "egreso" },
          { data: "nombre" },
          { data: "localidad" },
          { data: "dni" },
          { data: "email" },
          { data: "unidad" },
          { data: "origen" },
          {
            data: null,
            defaultContent:
              "<button id='btnInfo' value='idReserva' data-toggle='modal' data-target='#exampleModalInfo' class='btn btn-primary'><box-icon name='info-circle'></button>" +
              "<button id='btnEliminar' value='idReserva' class='btn btn-danger'><box-icon name='trash'></box-icon></button>",
          },
        ],
      });
    },
    error: function (error) {
      alert("No hay Reservas");
    },
  });
}

$(document).on("click", "#btnEliminar", function (e) {
  e.preventDefault();
  idEliminado = $(this).parent().parent().children().first().text();

  Swal.fire({
    title: "¿Desea Eliminar la Reserva?",
    showDenyButton: true,
    confirmButtonText: "Eliminar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `https://gestor-reserva.herokuapp.com/api/Reserva/${idEliminado}`,
        type: "DELETE",
        dataType: "json",
        success: function (result) {
          console.log(result);
          if (result) {
            getTabla2();
          } else {
            //Swal.fire(result.error);
            console.log(result.error);
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
      Swal.fire("Eliminado!", "", "success");
      // getTabla();
    } else if (result.isDenied) {
      Swal.fire("Ficha no eliminada", "", "info");
      getTabla2();
    }
  });
});

$(document).on("click", "#btnInfo", function (e) {
  e.preventDefault();
  idInfo = $(this).parent().parent().children().first().text();

  fetch(`https://gestor-reserva.herokuapp.com/api/reserva?idReserva=${idInfo}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("txtNombre2").value = data[0].nombre;
      document.getElementById("txtApellido2").value = data[0].apellido;
      document.getElementById("txtMonto2").value = data[0].montoTotal;
      // document.getElementById("txtIngreso2").value = data[0].ingreso;
      // document.getElementById("txtEgreso2").value = data[0].egreso;
      document.getElementById("txtDni2").value = data[0].dni;
      document.getElementById("txtSeña2").value = data[0].senia;

      document.getElementById("txtLocalidad2").value = data[0].localidad;
      document.getElementById("txtEdad2").value = data[0].edad;
      document.getElementById("txtEmail2").value = data[0].email;
      document.getElementById("txtTelefono2").value = data[0].telefono;

      // document.getElementById("txtUnidad").value = data[0].idUnidad;
      // document.getElementById("txtOrigen").value = data[0].idOrigen;
      document.getElementById("txtAcompa2").value =
        data[0].cantidadAcompaniantes;
      document.getElementById("txtObs2").value = data[0].observaciones;
      document.getElementById("txtCantNoches2").value = data[0].noches;
    });

  $("#exampleModalInfo").modal("show");
});

var diff_in_days;

const cantNoches = document.getElementById("txtEgreso");
cantNoches.addEventListener("input", () => {
  var date_1 = new Date(document.getElementById("txtIngreso").value);
  var date_2 = new Date(document.getElementById("txtEgreso").value);

  var day_as_milliseconds = 86400000;
  var diff_in_millisenconds = date_2 - date_1;
  diff_in_days = diff_in_millisenconds / day_as_milliseconds;

  console.log(diff_in_days);
  document.getElementById("txtCantNoches").innerHTML = diff_in_days;
  document.getElementById("txtCantNoches").value = diff_in_days;
});

function formato(fecha) {
  return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");
}

let buscar = document.getElementById("buscar");
buscar.addEventListener("click", (e) => {
  e.preventDefault();
  var unidad = document.getElementById("txtUnidad2").value;
  var entrada = document.getElementById("fechaIngreso").value;
  var entradaConvertida = formato(entrada);
  var salida = document.getElementById("fechaEgreso").value;
  var salidaConvertida = formato(salida);
  $.ajax({
    url: `https://gestor-reserva.herokuapp.com/api/reserva?Unidad=${unidad}&Entrada=${entradaConvertida}&Salida=${salidaConvertida}`,
    success: function (data) {
      var o = data; //A la variable le asigno el json decodificado
      console.log(o);
      tabla.destroy();
      tabla = $("#example").DataTable({
        fixedHeader: true,
        data: o,
        columns: [
          { data: "idReserva" },
          { data: "montoTotal" },
          { data: "ingreso" },
          { data: "egreso" },
          { data: "nombre" },
          { data: "localidad" },
          { data: "dni" },
          { data: "email" },
          { data: "unidad" },
          { data: "origen" },
          {
            data: null,
            defaultContent:
              "<button id='btnInfo' value='idReserva' data-toggle='modal' data-target='#exampleModalInfo' class='btn btn-primary'><box-icon name='info-circle'></button>" +
              "<button id='btnEliminar' value='idReserva' class='btn btn-danger'><box-icon name='trash'></box-icon></button>",
          },
        ],
      });
    },
    error: function (error) {
      alert("No hay Reservas");
    },
  });
});
