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
        horasExtras(dirFile);
        break;
    case "calcHHEE":
        HHEE(dirFile);
        break;
    default:
        console.log("error");
}