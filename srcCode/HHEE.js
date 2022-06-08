"use strict"
const CalcHHEE = require("./CalcHHEE")
const XLSX = require("xlsx");

const HHEE = (dirFile) => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`${dirFile}`, e_opt)
    const nombreHojas = excel.SheetNames;
    nombreHojas.forEach(e => CalcHHEE(excel.Sheets[e]))
    XLSX.writeFile(excel, `${dirFile}`, e_opt);
    console.log("HHEE al 50 y 100 calculadas con exito");
}

module.exports = HHEE