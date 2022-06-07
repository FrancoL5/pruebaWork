"use strict"

const horasExtras = require("./srcCode/HorasExtras")
const CalcHHEE = require("./srcCode/CalcHHEE")

const command = process.argv[2];
const dirFile = process.argv[3];


switch (command){
    case "help":
        console.log(`comandos y ejemplos: 
        =>HsExtra [nombreArchivo.xlsx]
        | EJ: node app.js HsExtra miArchivo.xlsx
        | Importante: el archivo tiene que estar en data y va a ser modificado, se recomienda dejar una copia en dataBackUp 
        | comment: evitar espacios en el nombre del archivo`);
        break;
    case "HsExtra":
        horasExtras(dirFile);
        break;
    case "calcHHEE":
        CalcHHEE(dirFile);
        break;
    default:
        console.log("error");
}