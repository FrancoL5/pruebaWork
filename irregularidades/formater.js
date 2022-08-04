const parseHours = require("../srcCode/parseHours");

const formater = (data, rows = 1, colums = ["D","E","F","G"]) => {
    let counter = rows;
    let loop = data[`A${counter}`] ? data[`A${counter}`].t !== "z": false;
    while (loop) {
        loop = data[`A${counter}`] ? data[`A${counter}`].t !== "z": false;
        if(loop){
                colums.forEach(cell => {
                    if(!(data[cell + counter].t === "n")){
                        let value = parseHours(data[cell + counter].v)
                        data[cell + counter] = typeof (value) === "number" ? {
                            v: value,
                            t: "n",
                            z: "h:mm"
                        } : {
                            v: value,
                            t: "s",
                        }
                    }
                })
        }
        counter++
    }
}

module.exports = formater