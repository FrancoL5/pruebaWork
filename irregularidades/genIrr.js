const llegTard = (eT, sT, eR) => {
    if (typeof (eR) === "string") { return "falta entrada" }

    const value =
        eT > sT
            ? eR < eT && eR < sT
                ? (eR + 1) - eT
                : eR > eT && eR > sT
                    ? eR - eT
                    : "---"
            : eR > eT && (eR < sT || eR > sT)
                ? eR - eT
                : "---"
    return ({
        v: value,
        t: typeof (value) === "number" ? "n" : "s",
        z: "h:mm"
    })
}

const salAnti = (eT, sT, sR) => {
    if (typeof (sR) === "string") { return "falta salida" }

    const value = 
        eT > sT 
            ? sR < eT && sR < sT
                ? sT - sR 
                : sR > eT 
                    ? sT - sR
                    : "---"
            : sR > eT && sR < sT
                ? sT - sR
                : "---" 

    return ({
        v: value,
        t: typeof (value) === "number" ? "n" : "s",
        z: "h:mm"
    })
}

module.exports = { llegTard, salAnti }