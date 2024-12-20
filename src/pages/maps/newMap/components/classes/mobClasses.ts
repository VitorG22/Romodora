interface IMobConstructor {
    position: { X: number, Y: number },
    name: string
}


export class Mob {
    name;
    position;

    constructor({ position, name }: IMobConstructor) {
        this.name = name
        this.position = position
    }

    showMobName() {
        console.log('Mob Name: ', this.name)
        console.log('Mob Position: ', this.position)
    }

    moveTo({ X, Y }: { X: number, Y: number }) {
        this.position = { X: X, Y: Y }
        console.log(`${this.name} moved to ${this.position.X}x${this.position.Y}`)
    }
}

