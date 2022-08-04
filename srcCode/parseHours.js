const parseHours = (date) => {
    const hours = date.match(/\d+/g)
    const hour = hours && ! Number.isNaN(hours[0]) ? Number(hours[0]) : null
    const min = hours && ! Number.isNaN(hours[1])  ? Number(hours[1]) : null
    return typeof(hour) === "number" && typeof(min) === "number" ? (hour / 24) + (min / 1440) : "---"
}

module.exports = parseHours