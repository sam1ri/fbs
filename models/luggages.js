const luggage = [
    {
        id: 1,
        max: 5
    },
    {
        id: 2,
        max: 10
    },
    {
        id: 3,
        max: 15
    },
    {
        id: 4,
        max: 20
    },
]

const calcLuggage = (weight) => {
    let result = -1;
    luggage.forEach(element => {
        // console.log(Number.parseFloat(element.max) + ' < ' +  Number.parseFloat(weight))
        if (Number.parseFloat(element.max) < Number.parseFloat(weight)) {
            console.log(element.id);
            result = element.id
        }
    });
    return result
}

module.exports = calcLuggage;