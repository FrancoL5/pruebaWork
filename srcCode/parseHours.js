const parseHours = (date) => {
    const hours = date.match(/\d*/g).filter((e) => e !== "")
    const hour = Number(hours[0])
    const min = Number(hours[1])
    return (hour / 24) + (min / 1440) 
}

module.exports = parseHours