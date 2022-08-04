const XLSX = require("xlsx");
const calcIrr = require("./calcIrr");
const formater = require("./formater");

const processIrr = (dirFile, rows) => {
    let e_opt = { bookType: 'xlsx', cellStyles: true, sheetStubs: true }
    const excel = XLSX.readFile(`${dirFile}`, e_opt)
    const nombreHojas = excel.SheetNames
    nombreHojas.forEach(e => {
        formater(excel.Sheets[e], rows)
        calcIrr(excel.Sheets[e], rows)
    });
    return new Promise((resolve, reject) => {
        XLSX.writeFileAsync(`${dirFile}`,excel, e_opt, (err, result) =>{
            (err) ? reject(err) : resolve(result) 
        })
    })
}

module.exports = processIrr