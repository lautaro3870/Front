// restaFechas = function (f1, f2) {
//   var aFecha1 = f1.split("/");
//   var aFecha2 = f2.split("/");
//   var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
//   var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
//   var dif = fFecha2 - fFecha1;
//   var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
//   return dias;
// };

// var f1 = "15/10/2014";
// var f2 = "15/11/2014";
// console.log(restaFechas(f1, f2));

var date_1 = new Date("2015-3-11");
var date_2 = new Date("2015-3-13");

var day_as_milliseconds = 86400000;
var diff_in_millisenconds = date_2 - date_1;
var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

console.log(diff_in_days);
