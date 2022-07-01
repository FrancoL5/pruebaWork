"use strict"
const XLSX = require("xlsx");
const calcHorasExtras = (datos) => {
    let counter = 1;
    let loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z": false;
    let origin = ""
    while (loop) {
        origin = `I${counter}`
        let F = datos[`F${counter}`] || false
        let E = datos[`E${counter}`] || false
        loop = datos[`A${counter}`] ? datos[`A${counter}`].t !== "z": false;
        loop && F.t === "n"
        ? F.v > E.v 
            ? (XLSX.utils.sheet_add_aoa(datos, [[F.v - E.v]], { origin: origin }), 
            datos[origin].z = "h:mm")
            : (XLSX.utils.sheet_add_aoa(datos, [[(F.v + 1)- E.v]], { origin: origin }), 
            datos[origin].z = "h:mm")
        : "";
        counter++;
    }
}
module.exports = calcHorasExtras;