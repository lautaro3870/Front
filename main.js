// $(document).ready(function () {
//   var tabla = $("#example").DataTable({});
// });

fetch("https://gestor-reserva.herokuapp.com/api/unidades")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    cargarComboUnidades(data, "txtUnidad");
    cargarComboUnidades(data, "txtUnidad3");
  });

fetch("https://gestor-reserva.herokuapp.com/api/origenreserva")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    cargarComboOrigen(data, "txtOrigen");
    cargarComboOrigen(data, "txtOrigen3");
  });

function cargarComboUnidades(datos, idCombo) {
  var html = "<option value=''>Seleccione</option>";
  $(`#${idCombo}`).append(html);
  select = document.getElementById(idCombo);
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.value = datos[i].idUnidad;
    option.text = datos[i].nombre;
    select.add(option);
    //console.log(datos[i].area1);
  }
}

function cargarComboOrigen(datos, idCombo) {
  var html = "<option value=''>Seleccione</option>";
  $(`#${idCombo}`).append(html);
  select = document.getElementById(idCombo);
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
    saldo: document.getElementById("txtSaldo").value,
    cochera: document.getElementById("txtCochera").checked,
    activo: true,
  };
  console.log(data);

  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    .then((data) => {
      if (data.status != 200) {
        Swal.fire({
          icon: "error",
          title: "No se pudo insertar",
          timer: 1500,
        });
        return false;
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Insercion Exitosa",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(data);
        getTabla2();
        document.getElementById("formulario").reset();
        //$("#exampleModal").modal("hide");
      }
    });
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
          { data: "unidad" },
          { data: "saldo" },
          { data: "nombre" },
          { data: "observaciones" },
          {
            data: null,
            defaultContent:
              "<button id='btnInfo' value='idReserva' data-toggle='modal' data-target='#exampleModalInfo' class='btn btn-secondary'><box-icon name='info-circle'></button>" +
              "<button id='btnEliminar' value='idReserva' class='btn btn-danger'><box-icon name='trash'></box-icon></button>" +
              "<button id='btnEditar' data-toggle='modal' data-target='#exampleModalEditar' class='btn btn-primary'><box-icon name='edit'></box-icon></button>",
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
          { data: "unidad" },
          { data: "saldo" },
          { data: "nombre" },
          { data: "observaciones" },
          {
            data: null,
            defaultContent:
              "<button id='btnInfo' value='idReserva' data-toggle='modal' data-target='#exampleModalInfo' class='btn btn-secondary'><box-icon name='info-circle'></button>" +
              "<button id='btnEliminar' value='idReserva' class='btn btn-danger'><box-icon name='trash'></box-icon></button>" +
              "<button id='btnEditar' data-toggle='modal' data-target='#exampleModalEditar' class='btn btn-primary'><box-icon name='edit'></box-icon></button>",
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
  var entradaConvertida = dayjs(entrada).format("MM%2FDD%2FYYYY");
  var salida = document.getElementById("fechaEgreso").value;
  var salidaConvertida = dayjs(salida).format("MM%2FDD%2FYYYY");

  // `https://gestor-reserva.herokuapp.com/api/reserva?Unidad=${unidad}&Entrada=${entradaConvertida}&Salida=${salidaConvertida}`,
  fetch("https://gestor-reserva.herokuapp.com/api/reserva?Unidad=1", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  // $.ajax({
  //   //url: `https://localhost:44365/api/Reserva?Unidad=${unidad}&Entrada=${entradaConvertida}&Salida=${salidaConvertida}`,
  //   url: `https://gestor-reserva.herokuapp.com/api/reserva?Unidad=${unidad}&Entrada=${entradaConvertida}&Salida=${salidaConvertida}`,
  //   type: "GET",
  //   crossDomain: true,
  //   dataType: "jsonp",
  //   success: function (data) {
  //     var o = data; //A la variable le asigno el json decodificado
  //     console.log(o);
  //     tabla.destroy();
  //     tabla = $("#example").DataTable({
  //       fixedHeader: true,
  //       data: o,
  //       columns: [
  //         { data: "idReserva" },
  //         { data: "montoTotal" },
  //         { data: "ingreso" },
  //         { data: "egreso" },
  //         { data: "unidad" },
  //         { data: "saldo" },
  //         { data: "nombre" },
  //         { data: "observaciones" },
  //         {
  //           data: null,
  //           defaultContent:
  //             "<button id='btnInfo' value='idReserva' data-toggle='modal' data-target='#exampleModalInfo' class='btn btn-secondary'><box-icon name='info-circle'></button>" +
  //             "<button id='btnEliminar' value='idReserva' class='btn btn-danger'><box-icon name='trash'></box-icon></button>" +
  //             "<button id='btnEditar' data-toggle='modal' data-target='#exampleModalEditar' class='btn btn-primary'><box-icon name='edit'></box-icon></button>",
  //         },
  //       ],
  //     });
  //   },
  //   error: function (error) {
  //     alert("No hay Reservas");
  //   },
  // });
});

let editar = document.getElementById("btnEditar");

$(document).on("click", "#btnEditar", function (e) {
  e.preventDefault();
  idEditar = $(this).parent().parent().children().first().text();

  fetch(`https://gestor-reserva.herokuapp.com/api/reserva/${idEditar}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("txtNombre3").value = data.nombre;
      document.getElementById("txtApellido3").value = data.apellido;
      document.getElementById("txtMonto3").value = data.montoTotal;
      let ingreso = data.ingreso;
      let ingresoConvertido = dayjs(ingreso).format("YYYY-MM-DD");
      let egreso = data.egreso;
      let egresoConvertido = dayjs(egreso).format("YYYY-MM-DD");
      document.getElementById("txtIngreso3").value = ingresoConvertido;
      document.getElementById("txtEgreso3").value = egresoConvertido;
      document.getElementById("txtDni3").value = data.dni;
      document.getElementById("txtSeña3").value = data.senia;
      document.getElementById("txtLocalidad3").value = data.localidad;
      document.getElementById("txtEdad3").value = data.edad;
      document.getElementById("txtEmail3").value = data.email;
      document.getElementById("txtTelefono3").value = data.telefono;
      document.getElementById("txtUnidad3").value = data.idUnidad;
      document.getElementById("txtOrigen3").value = data.idOrigen;
      document.getElementById("txtAcompa3").value = data.cantidadAcompaniantes;
      document.getElementById("txtObs3").value = data.observaciones;
      document.getElementById("txtCantNoches3").value = data.noches;
      document.getElementById("txtSaldo3").value = data.saldo;
      if (data.cochera) {
        document.getElementById("txtCochera3").checked = true;
      } else {
        document.getElementById("txtCochera3").checked = false;
      }
    });

  let editar = document.getElementById("editar");
  editar.addEventListener("click", (e) => {
    e.preventDefault();

    var unidad = document.getElementById("txtUnidad3");
    var unidadSeleccionada = unidad.options[unidad.selectedIndex].value;

    var origen = document.getElementById("txtOrigen3");
    var origenSeleccionado = origen.options[origen.selectedIndex].value;

    var datos = {
      idReserva: idEditar,
      montoTotal: document.getElementById("txtMonto3").value,
      ingreso: document.getElementById("txtIngreso3").value,
      egreso: document.getElementById("txtEgreso3").value,
      senia: document.getElementById("txtSeña3").value,
      nombre: document.getElementById("txtNombre3").value,
      apellido: document.getElementById("txtApellido3").value,
      dni: document.getElementById("txtDni3").value,
      localidad: document.getElementById("txtLocalidad3").value,
      edad: document.getElementById("txtEdad3").value,
      email: document.getElementById("txtEmail3").value,
      telefono: document.getElementById("txtTelefono3").value,
      idUnidad: unidadSeleccionada,
      cantidadAcompaniantes: document.getElementById("txtAcompa3").value,
      observaciones: document.getElementById("txtObs3").value,
      idOrigen: origenSeleccionado,
      noches: document.getElementById("txtCantNoches3").value,
      saldo: document.getElementById("txtSaldo3").value,
      cochera: document.getElementById("txtCochera3").checked,
      activo: true,
    };
    console.log(datos);

    var url = "https://gestor-reserva.herokuapp.com/api/reserva/";
    fetch(url, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(datos), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res)
      //.catch((error) => console.error("Error:", error))
      .then((data) => {
        if (data.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Modificacion Exitosa",
            showConfirmButton: false,
            timer: 1500,
          });
          getTabla2();
        } else {
          Swal.fire({
            icon: "error",
            title: "Complete los campos",
          });
          return false;
        }
        //console.log("Success:", response)
      });
  });
});

var diff_in_days2;
const cantNoches2 = document.getElementById("txtEgreso3");
cantNoches2.addEventListener("input", () => {
  var date_1 = new Date(document.getElementById("txtIngreso3").value);
  var date_2 = new Date(document.getElementById("txtEgreso3").value);

  var day_as_milliseconds = 86400000;
  var diff_in_millisenconds = date_2 - date_1;
  diff_in_days2 = diff_in_millisenconds / day_as_milliseconds;

  console.log(diff_in_days2);
  document.getElementById("txtCantNoches3").innerHTML = diff_in_days2;
  document.getElementById("txtCantNoches3").value = diff_in_days2;
});
