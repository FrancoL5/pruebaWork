"use strict"
const XLSX = require("xlsx");
// 0 domingo, 1 lunes, 2 martes, 3 miercoles, 4 jueves, 5 viernes, 6 sabado
const mostrarFecha = (dirFile) => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`./data/${dirFile}`, e_opt)
    const nombreHojas = excel.SheetNames;
    const data = excel.Sheets[nombreHojas[1]];
    console.log(new Date(data["D5"].w).getDay());
    console.log(data["F5"]);
}
module.exports= mostrarFecha