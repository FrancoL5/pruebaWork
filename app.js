"use strict"

const horasExtras = require("./srcCode/HorasExtras")
const HHEE = require("./srcCode/HHEE")
const help = require("./srcCode/help");
const checkHours = require("./srcCode/checkHours");
const processIrr = require("./irregularidades/processIrr");

const command = process.argv[2];
const dirFile = process.argv[3];
const rows = Number (process.argv[4]);


switch (command){
    case "help":
        help()
        break;
    case "HsExtra":
        horasExtras(dirFile).then(() => {
            console.log("horas extras calculadas con exito")
        })
        .then(()=>{
            HHEE(dirFile)
            .then(() => console.log("HHEE al 50 y 100 calculadas con exito"))
            .catch(error => console.log(error + "\nError en el cálculo de HHEE al 50 y 100\nProbablemente el archivo estaba abierto o pasó algo"))
        })
        .catch(error =>{
            console.log(error + "\nError en el cálculo del total de horas extras\nProbablemente el archivo estaba abierto o pasó algo")
        })
        
        break;
    case "checkHours":
        checkHours(dirFile)
        .then(() => console.log("Chequeo de horas y su transformación a numeros completa"))
        .catch((err) => console.log(err))
        break;
    case "HHEET":
        checkHours(dirFile)
        .then(() => {
            console.log("Chequeo de horas y su transformación a numeros completa")
            
            horasExtras(dirFile).then(() => {
                console.log("horas extras calculadas con exito")
            })
            .then(()=>{
                HHEE(dirFile)
                .then(() => console.log("HHEE al 50 y 100 calculadas con exito"))
                .catch(error => console.log(error + "\nError en el cálculo de HHEE al 50 y 100\nProbablemente el archivo estaba abierto o pasó algo"))
            })
            .catch(error =>{
                console.log(error + "\nError en el cálculo del total de horas extras\nProbablemente el archivo estaba abierto o pasó algo")
            })
        })
        .catch((err) => console.log(err))

        break;
    case "generarIrr" :
        processIrr(dirFile, rows)
            .then(() => console.log("todo bien"))
            .catch((e) => console.log(e))
        break;
    default:
        console.log("error");
}