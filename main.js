// $(document).ready(function () {
//   var tabla = $("#example").DataTable({});
// });
$(document).ready(function () {
  $.ajax({
    url: "https://gestor-reserva.herokuapp.com/api/reserva",
    success: function (data) {
      var o = data; //A la variable le asigno el json decodificado
      tabla = $("#example").DataTable({
        data: o,
        columns: [
          { data: "montoTotal" },
          { data: "ingreso" },
          { data: "egreso" },
          { data: "nombre" },
          { data: "dni" },
          { data: "unidad" },
        ],
      });
    },
  });
});
