"use strict"
const XLSX = require("xlsx");
// 0 domingo, 1 lunes, 2 martes, 3 miercoles, 4 jueves, 5 viernes, 6 sabado
// 0.88 === 21:00 0.21 === 05:00 0.54 === 13:00

const mostrarFecha = (dirFile) => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`./data/${dirFile}`, e_opt)
    const nombreHojas = excel.SheetNames;
    const data = excel.Sheets[nombreHojas[1]];

    calcHheeC(data);
    XLSX.writeFile(excel, `./data/${dirFile}`, e_opt);
}

const hheeC = (dia, horas, horasT, horasR) => {
    return dia >= 1 && dia <= 5 && horasR <= 0.88 && horasR >= 0.21
        ? (horas)
        : dia === 6 && horasR <= 0.54 && horasR >= 0.21 ? (horas)
            : dia >= 1 && dia <= 5 && horasR > 0.88 && horasR >= 0.21 ? (0.88 - horasT)
                : (console.log("error"), null)
}

const calcHheeC = (datos) => {
    let counter = 5;
    let loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z" : false;
    let origin = ""
    while (loop) {
        let resultado = `K${counter}`
        datos[resultado] = !datos[resultado] ? {t:"z"} : datos[resultado];
        let horasR = datos[`F${counter}`] || false
        let horasT = datos[`E${counter}`] || false
        let horasExtras = datos[`I${counter}`] || false
        let dia = datos[`D${counter}`] ? new Date(datos[`D${counter}`].w).getDay() : false
        loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z" : false;


        loop && dia && horasExtras
            ? 
            (XLSX.utils.sheet_add_aoa(datos,
                [[hheeC(dia, horasExtras.v, horasT.v, horasR.v)]], { origin: resultado })
                , datos[resultado].z = "h:mm"
                , console.log(datos[resultado])
            )
            : "";

        counter++;
    }
    
}
module.exports = mostrarFecha