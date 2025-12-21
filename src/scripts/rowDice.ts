export default function rowDices(diceValue: number, diceCount: number = 1) {
    let valuesList = []
    let totalValue = 0

    for (let i = 0; i < diceCount; i++) {
        let currentValue = Math.floor(Math.random() * (diceValue - 1)) + 1
        console.log(currentValue)
        valuesList.push(currentValue)
        totalValue += currentValue
    }

    return { totalValue, valuesList }
}