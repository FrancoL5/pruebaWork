"use strict"
const XLSX = require("xlsx");
// 0 domingo, 1 lunes, 2 martes, 3 miercoles, 4 jueves, 5 viernes, 6 sabado
// 0.88 === 21:00 0.21 === 05:00 0.54 === 13:00

const CalcHHEE = (dirFile) => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`./data/${dirFile}`, e_opt)
    const nombreHojas = excel.SheetNames;
    const data = excel.Sheets[nombreHojas[3]];

    // let horasR = data[`F98`] || false
    // let horasT = data[`E98`] || false
    // let horasExtras = data[`I98`] || false
    // let dia = data[`D98`] ? new Date(data[`D98`].w).getDay() : false
    // let resultadoCI = `L98`
    // data[resultadoCI] = !data[resultadoCI] ? {t:"z"} : data[resultadoCI];
    // console.log(hheeCI(dia, horasExtras.v, horasT.v, horasR.v))
    // XLSX.utils.sheet_add_aoa(data,
    //     [[hheeCI(dia, horasExtras.v, horasT.v, horasR.v)]], { origin: resultadoCI })
    //     data[resultadoCI].z = "h:mm"
    // console.log(data[resultadoCI])
    aplyHHEEC(data);
    XLSX.writeFile(excel, `./data/${dirFile}`, e_opt);
}

const hheeC = (dia, horas, horasT, horasR) => {
    return dia >= 1 && dia <= 5 && horasR <= 0.88 && horasR >= 0.21
        ? (horas)
        : dia >= 1 && dia <= 5 && horasR > 0.88 && horasT < 0.88
            ? (0.88 - horasT)
            : ("-")
}
const hheeCI = (dia, horas, horasT, horasR) => {
    const horasExtra = dia >= 1 && dia <= 5 && horasT > horasR && horasR <= 0.21 && horasT >= 0.88
        ? (horasR + 1) - horasT
        : dia >= 1 && dia <= 5 && horasT > horasR && horasR >= 0.21 && horasT >= 0.88
            ? (0.21 + 1) - horasT
            : dia >= 1 && dia <= 5 && horasT > horasR && horasR >= 0.21 && horasT <= 0.88
                ? (0.21 + 1) - 0.88
                : dia >= 1 && dia <= 5 && horasT > horasR && horasR <= 0.21 && horasT <= 0.88
                    ? (horasR + 1) - 0.88
                    : dia >= 1 && dia <= 5 && horasT >= 0.88
                        ? horasR - horasT
                        : dia >= 1 && dia <= 5 && horasT < 0.88
                            ? horasR - 0.88
                            : dia === 0
                                ? horas
                                : "-"
    return horasExtra
}

const aplyHHEEC = (datos) => {
    let counter = 5;
    let loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z" : false;
    while (loop) {
        let resultadoC = `K${counter}`
        let resultadoCI = `L${counter}`
        datos[resultadoC] = !datos[resultadoC] ? { t: "z" } : datos[resultadoC];
        datos[resultadoCI] = !datos[resultadoCI] ? { t: "z" } : datos[resultadoCI];
        let horasR = datos[`F${counter}`] || false
        let horasT = datos[`E${counter}`] || false
        let horasExtras = datos[`I${counter}`] || false
        let dia = datos[`D${counter}`] ? new Date(datos[`D${counter}`].w).getDay() : false
        loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z" : false;

        loop && horasExtras
            ?
            (
                XLSX.utils.sheet_add_aoa(datos,
                    [[
                        hheeC(dia, horasExtras.v, horasT.v, horasR.v),
                        hheeCI(dia, horasExtras.v, horasT.v, horasR.v)]], { origin: resultadoC })
                , datos[resultadoC].z = "h:mm"
                , datos[resultadoCI].z = "h:mm"
            )
            : "";

        counter++;
    }

}
module.exports = CalcHHEE