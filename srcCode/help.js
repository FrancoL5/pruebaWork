"use strict"
const help = () =>{
    console.log(`comandos y ejemplos: 
            =>HsExtra [data/nombreArchivo.xlsx]
            | EJ: node app.js HsExtra miArchivo.xlsx
            | Importante: el archivo tiene que estar en data y va a ser modificado, se recomienda dejar una copia en dataBackUp 
            | Comment: evitar espacios en el nombre del archivo
            => checkHours [data/nombreArchivo.xlsx]
            | EJ: node app.js checkHours miArchivo.xlsx
            |Funcionalidad: Va a chequear si las horas en el archivo están en el formato adecuado y sino las corrige 
            |Importante: el archivo tiene que estar en data y va a ser modificado, se recomienda dejar una copia en dataBackUp 
            |Comment: evitar espacios en el nombre del archivo`
            
            );
}

module.exports = help