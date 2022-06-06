"use strict"
const calcHorasExtras = require("./calcHorasExtras")
const XLSX = require("xlsx");
const horasExtras = (dirFile) => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`./data/${dirFile}`, e_opt)
    const nombreHojas = excel.SheetNames;
    nombreHojas.forEach(e => calcHorasExtras(excel.Sheets[e]))
    XLSX.writeFile(excel, `./data/${dirFile}`, e_opt);
    console.log("horas extras calculadas con exito");
}

module.exports = horasExtras;