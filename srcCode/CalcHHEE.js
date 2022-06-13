"use strict"
const XLSX = require("xlsx");
// 0 domingo, 1 lunes, 2 martes, 3 miercoles, 4 jueves, 5 viernes, 6 sabado
// 0.875 === 21:00 0.2083 === 05:00 0.54 === 13:00
const veintiuno = 0.875;
const cinco = 0.2083;
const CalcHHEE = (datos) => {
    aplyHHEEC(datos);
    console.log("HHEE Calculadas correctamente")
}

const hheeC = (dia, horasT, horasR) => {
    return dia >= 1 && dia <= 5 && horasT < veintiuno && horasT >= cinco && horasR <= veintiuno && horasR > cinco
        ? horasR - horasT
        : dia >= 1 && dia <= 5 && horasT < veintiuno && horasT >= cinco && horasR > veintiuno
            ? veintiuno - horasT
            : dia >= 1 && dia <= 5 && horasT < cinco && horasR <= veintiuno && horasR > cinco
                ? horasR - cinco
                : dia >= 1 && dia <= 5 && horasT < veintiuno && horasR <= cinco
                    ? veintiuno - horasT
                    : dia >= 1 && dia <= 5 && horasT < cinco && horasR > veintiuno
                        ? veintiuno - cinco
                        : "-"
}
const hheeCI = (dia, horas, horasT, horasR) => {
    const horasExtra = dia >= 1 && dia <= 5 && horasT > horasR && horasR <= cinco && horasT >= veintiuno
        ? (horasR + 1) - horasT
        : dia >= 1 && dia <= 5 && horasT > horasR && horasR >= cinco && horasT >= veintiuno
            ? (cinco + 1) - horasT
            : dia >= 1 && dia <= 5 && horasT > horasR && horasR >= cinco && horasT <= veintiuno
                ? (cinco + 1) - veintiuno
                : dia >= 1 && dia <= 5 && horasT > horasR && horasR <= cinco && horasT <= veintiuno
                    ? (horasR + 1) - veintiuno
                    : dia >= 1 && dia <= 5 && horasT >= veintiuno
                        ? horasR - horasT
                        : dia >= 1 && dia <= 5 && horasT < veintiuno && horasR > veintiuno
                            ? horasR - veintiuno
                            : dia === 0
                                ? horas
                                : "-"
    return horasExtra
}

const aplyHHEEC = (datos) => {
    let counter = 5;
    let loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z" : false;

    while (loop) {
        let resultadoC = `G${counter}`
        let resultadoCI = `H${counter}`
        let horasR = datos[`F${counter}`] || false
        let horasT = datos[`E${counter}`] || false
        let horasExtras = datos[`I${counter}`] || false
        let dia = datos[`D${counter}`] ? new Date(datos[`D${counter}`].w).getDay() : false
        datos[resultadoC] = !datos[resultadoC] ? { t: "z" } : datos[resultadoC];
        datos[resultadoCI] = !datos[resultadoCI] ? { t: "z" } : datos[resultadoCI];
        loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z" : false;

        loop && horasExtras
            ?
            (
                XLSX.utils.sheet_add_aoa(datos,
                    [[
                        hheeC(dia, horasT.v, horasR.v)
                        ,hheeCI(dia, horasExtras.v, horasT.v, horasR.v)
                    ]]
                    , { origin: resultadoC }
                )
                , datos[resultadoC].z = "h:mm"
                , datos[resultadoCI].z = "h:mm"
            )
            : "";

        counter++;
    }

}
module.exports = CalcHHEE