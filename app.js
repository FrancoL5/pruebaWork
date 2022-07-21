"use strict"

const horasExtras = require("./srcCode/HorasExtras")
const HHEE = require("./srcCode/HHEE")
const help = require("./srcCode/help")

const command = process.argv[2];
const dirFile = process.argv[3];


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
            .catch(error => console.log(error + "\nError en HHEE\nProbablemente el archivo estaba abierto o pasó algo"))
        })
        .catch(error =>{
            console.log(error + "\nError en HorasExtras\nProbablemente el archivo estaba abierto o pasó algo")
        })
        
        break;
    default:
        console.log("error");
}