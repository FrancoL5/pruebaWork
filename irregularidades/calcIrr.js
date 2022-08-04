const XLSX = require("xlsx");
const { llegTard, salAnti } = require("./genIrr");

const calcIrr = (data, rows = 1) => {
    let counter = rows;
    let loop = data[`A${counter}`] ? data[`A${counter}`].t !== "z": false;
    while (loop) {
        loop = data[`A${counter}`] ? data[`A${counter}`].t !== "z": false;
        if(loop){
            let entT = data["D" + counter]
            let salT = data["E" + counter]
            let entR = data["F" + counter]
            let salR = data["G" + counter]

            if(typeof (entT.v) !== "string" && typeof(salT.v) !== "string"){
                XLSX.utils.sheet_add_aoa(data,[[
                    llegTard(entT.v, salT.v, entR.v),
                    salAnti(entT.v, salT.v, salR.v)
                ]], {origin: "H" + counter})
            }
        }
        counter++
    }
}

module.exports = calcIrr