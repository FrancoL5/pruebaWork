const XLSX = require("xlsx");
const parseHours = require("./parseHours");

const checkHours = (dirFile) => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`${dirFile}`, e_opt)
    const nombreHojas = excel.SheetNames
    nombreHojas.forEach(e => {
        handdler(excel.Sheets[e])
    });
    return new Promise((resolve, reject) => {
        XLSX.writeFileAsync(`${dirFile}`,excel, e_opt, (err, result) =>{
            (err) ? reject(err) : resolve(result) 
        })
    })
}

const handdler = (data) => {
    let counter = 1;
    let loop = data[`A${counter}`] ? data[`A${counter}`].t !== "z": false;
    let number = false
    while (loop) {
        loop = data[`A${counter}`] ? data[`A${counter}`].t !== "z": false;
        if(loop){
            if(data[`E${counter}`].t !== "s" || data[`F${counter}`] !== "s"){
                number = false
            } else if ( data[`E${counter}`].t === "n" || data[`F${counter}`] === "n"){
                number = true
                console.log("En la fila "+ counter + "Uno de los horarios es un numero");
            } else { console.log("error dato desconocido en "+ counter); break}
    
            !number && (
                data[`E${counter}`] = {
                    v: parseHours(data[`E${counter}`].v),
                    t:"n",
                    z:"h:mm"
                },
                data[`F${counter}`] = {
                    v: parseHours(data[`F${counter}`].v),
                    t:"n",
                    z:"h:mm"
                }
            )
        }
        counter++
    }
}
module.exports = checkHours