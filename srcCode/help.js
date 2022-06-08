"use strict"
const help = () =>{
    console.log(`comandos y ejemplos: 
            =>HsExtra [data/nombreArchivo.xlsx]
            | EJ: node app.js HsExtra miArchivo.xlsx
            | Importante: el archivo tiene que estar en data y va a ser modificado, se recomienda dejar una copia en dataBackUp 
            | comment: evitar espacios en el nombre del archivo
            
            =>calcHHEE [data/nombreArchivo.xlsx]
            |EJ: node app.js calcHHEE miArchivo.xlsx
            |Importante: primero se debe ejecutar el comando HsExtra para que éste funcione correctamente 
            |    el archivo tiene que estar en data y va a ser modificado, se recomienda dejar una copia en dataBackUp
            |comment: evitar espacios en el nombre del archivo`
            );
}

module.exports = help