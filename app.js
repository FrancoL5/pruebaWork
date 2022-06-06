"use strict"

const horasExtras = require("./srcCode/HorasExtras")

const command = process.argv[2];
const dirFile = process.argv[3];


switch (command){
    case "HsExtra":
        horasExtras(dirFile);
        break;
    default:
        console.log("error");
}