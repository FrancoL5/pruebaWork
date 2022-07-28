const parseHours = (date) => {
    const hours = date.match(/\d+/g)
    const hour = Number.isNaN(hours[0]) || !hours[0] ? "error" : Number(hours[0])
    const min = Number.isNaN(hours[1]) || !hours[1] ? "error" : Number(hours[1])
    return typeof(hour) === "number" && typeof(min) === "number" ? (hour / 24) + (min / 1440) : "error"
}

module.exports = parseHours