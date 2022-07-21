"use strict"
const calcHorasExtras = require("./calcHorasExtras")
const XLSX = require("xlsx");
const horasExtras = (dirFile) => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`${dirFile}`, e_opt)
    const nombreHojas = excel.SheetNames;
    nombreHojas.forEach(e => calcHorasExtras(excel.Sheets[e]))
    return new Promise((resolve, reject) => {
        XLSX.writeFileAsync(`${dirFile}`,excel, e_opt, (err, result) =>{
            (err) ? reject(err) : resolve(result) 
        })
    })
    // console.log("horas extras calculadas con exito");
}

module.exports = horasExtras;