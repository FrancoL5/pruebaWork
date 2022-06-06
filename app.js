"use strict"
const XLSX = require("xlsx");



const horasExtras = () => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`./data/${process.argv[2]}.xlsx`, e_opt)
    const nombreHojas = excel.SheetNames;
    nombreHojas.forEach(e => calcHorasExtras(excel.Sheets[e]))
    XLSX.writeFile(excel, `./data/${process.argv[2]}.xlsx`, e_opt);
}

const calcHorasExtras = (datos) => {
    let counter = 5;
    let loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z": false;
    while (loop) {
        let F = datos[`F${counter}`] || false
        let E = datos[`E${counter}`] || false
        loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z": false;
        loop && F.t === "n"
        ? F.v > E.v 
            ? XLSX.utils.sheet_add_aoa(datos, [[F.v - E.v]], { origin: `I${counter}` })
            : XLSX.utils.sheet_add_aoa(datos, [[(F.v + 1)- E.v]], { origin: `I${counter}` })
        : "";
        counter++;
    }
}
horasExtras();