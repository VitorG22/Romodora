import { ICharacterData } from "../interfaces";
import { IIteractiveMenu, ITile, Tile } from "./tileClasses";

interface IMob extends ITile, ICharacterData {
    ownerId: string,
    color: string
}

export interface IIteractiveMobMenu {
    text: string,
    functionName: 'rotateRight' | 'rotateLeft' | 'teste' | 'tradeStatus' | 'selectThisTile' | 'moveTo' | 'ChangeScore' | 'ChangeHealth'
}

export class Mob extends Tile {
    ownerId; health; name; id; picture; class; subClass; race; subRace; bag; abilityScores; color;
    blockSize = 100;
    canvasId = 'canvasMob'

    imageElement = new Image();
    constructor(data: IMob) {
        super(data)
        this.color = data.color
        this.ownerId = data.ownerId
        this.health = data.health
        this.name = data.name
        this.id = data.id
        this.picture = data.picture
        this.class = data.class
        this.subClass = data.subClass || null
        this.race = data.race
        this.subRace = data.subRace || null
        this.bag = data.bag
        this.canvaType = 'prop'
        this.abilityScores = data.abilityScores
        this.imageElement.src = this.picture

    }

    renderTile() {
        const canvas: HTMLCanvasElement | null = document.getElementById(this.canvasId) as HTMLCanvasElement
        if (this.isVoidBlock || canvas == null) return

        let canvasCtx = canvas.getContext('2d')
        if (!canvasCtx) return

        let tileWidth = this.blockSize * this.size.X
        let tileHeight = this.blockSize * this.size.Y
        let tileLeft = this.position.X * this.blockSize
        let tileTop = this.position.Y * this.blockSize

        canvasCtx.save();
        switch (this.rotate) {
            case 'top':
                canvasCtx.clearRect(tileLeft, tileTop, tileWidth, tileHeight)
                canvasCtx.translate(tileLeft + tileWidth / 2, tileTop + tileHeight / 2);
                canvasCtx.rotate(0 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(this.imageElement, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'right':
                canvasCtx.clearRect(tileLeft, tileTop, tileHeight, tileWidth)
                canvasCtx.translate(tileLeft + tileHeight / 2, tileTop + tileWidth / 2);
                canvasCtx.rotate(90 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(this.imageElement, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'left':
                canvasCtx.clearRect(tileLeft, tileTop, tileHeight, tileWidth)
                canvasCtx.translate(tileLeft + tileHeight / 2, tileTop + tileWidth / 2);
                canvasCtx.rotate(270 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(this.imageElement, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'bottom':
                canvasCtx.clearRect(tileLeft, tileTop, tileWidth, tileHeight)
                canvasCtx.translate(tileLeft + tileWidth / 2, tileTop + tileHeight / 2);
                canvasCtx.rotate(180 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(this.imageElement, tileLeft, tileTop, tileWidth, tileHeight);
                break
        }
        canvasCtx.restore();
        canvasCtx.strokeStyle = this.color
        canvasCtx.lineWidth = 6
        canvasCtx.strokeRect(tileLeft + 3, tileTop + 3, this.blockSize - 6, this.blockSize -6)

    }

    moveTo({ newPosition }: { newPosition: { X: number, Y: number } }) {

        this.eraseTile()
        let newGroup: { X: number; Y: number; }[] = []
        // this.group.forEach(position => {
        //     if (position.X < 0 || position.Y < 0) {
        //         newGroup.push({
        //             X: (position.X + position.X) + newPosition.X,
        //             Y: (position.Y + position.Y) + newPosition.Y
        //         })
        //     } else {
        //         newGroup.push({
        //             X: (position.X - this.position.X) + newPosition.X,
        //             Y: (position.Y - this.position.Y) + newPosition.Y
        //         })
        //     }
        // }
        // )
        this.group = newGroup
        this.group = [{
            X: newPosition.X,
            Y: newPosition.Y
        }]

        this.position = newPosition
        this.renderTile()
        return { newTile: this }
    }

    rotateRight() {
        let rotateArray: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
        let rotateIndex: number = rotateArray.findIndex(element => element == this.rotate)

        this.eraseTile()

        if (rotateIndex >= 3) {
            this.rotate = 'top'
        } else {
            this.rotate = rotateArray[rotateIndex + 1]
        }

        if (this.blockMatrix) {
            this.group = rotateMatrix(this.blockMatrix, this.rotate, { X: this.position.X, Y: this.position.Y })
        }
        this.renderTile()

        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
    }
    rotateLeft() {
        let rotateArray: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
        let rotateIndex: number = rotateArray.findIndex(element => element == this.rotate)

        this.eraseTile()

        if (rotateIndex <= 0) {
            this.rotate = 'left'
        } else {
            this.rotate = rotateArray[rotateIndex - 1]
        }
        if (this.blockMatrix) {
            this.group = rotateMatrix(this.blockMatrix, this.rotate, { X: this.position.X, Y: this.position.Y })
        }
        this.renderTile()

        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
    }


    getIteractiveMenuData(permissionType: "player" | "host") {
        let iteractiveMenuData: Array<IIteractiveMenu> = []

        if (permissionType == 'host') {
            iteractiveMenuData.push({ text: `teste ${this.canvaType}`, functionName: 'teste' });
        }

        this.isVoidBlock == false && iteractiveMenuData.push({ text: `Rotate ${this.name} right`, functionName: 'rotateRight' });
        this.isVoidBlock == false && iteractiveMenuData.push({ text: `Rotate ${this.name} left`, functionName: 'rotateLeft' });
        iteractiveMenuData.push({ text: `Select ${this.name}`, functionName: 'selectThisTile' });


        return iteractiveMenuData
    }

    ChangeHealth({ operator, type }: { operator: "plus" | "minus", type: 'currentHealth' | 'currentHealthBonus' | 'maxHealthBase' | 'maxHealthBonus' }) {
        
        if (type == "currentHealth") {
            switch (operator) {
                case "plus":
                    if (this.health.currentHealth < this.health.maxHealthTotal) {
                        this.health.currentHealth += 1
                    }
                    break
                case "minus":
                    if (this.health.currentHealth > 0) {
                        this.health.currentHealth -= 1
                    }
                    break
            }
        } else {
            switch (operator) {
                case "plus":
                    this.health[type] += 1
                    break
                case "minus":
                    this.health[type] -= 1
                    break
            }
            this.health.maxHealthTotal == this.health.maxHealthBonus + this.health.maxHealthBase
        }

        return { newTile: this }
    }

    ChangeScore({ AbilityScoreName, operator, type }: { AbilityScoreName: "charisma" | "constitution" | "dexterity" | "intelligence" | "strength" | "wisdom", operator: "plus" | "minus", type: 'totalScore' | 'modifier' | 'baseScore' | 'bonus' | 'setScore' | 'stackingBonus' }) {
        console.log('change score')
        switch (operator) {
            case "plus":
                this.abilityScores[AbilityScoreName][type] += 1
                break
            case "minus":
                this.abilityScores[AbilityScoreName][type] -= 1
                break
        }

        this.abilityScores[AbilityScoreName].totalScore = this.abilityScores[AbilityScoreName].baseScore + this.abilityScores[AbilityScoreName].bonus
        return { newTile: this }
    }

}


const rotateMatrix = (blockMatrix: number[][], rotateDirection: 'top' | 'left' | 'right' | 'bottom', position: { X: number, Y: number }) => {
    let newBlockMatrix: number[][] = []

    switch (rotateDirection) {
        case "top":
            newBlockMatrix = blockMatrix
            break
        case "right":
            newBlockMatrix = blockMatrix[0].map((val, index) => {
                val = val
                return blockMatrix?.map(row => row[index]).reverse()
            })
            break
        case "bottom":
            newBlockMatrix = blockMatrix[0].map((val, index) => {
                val = val
                return blockMatrix?.map(row => row[index]).reverse()
            })
            newBlockMatrix = newBlockMatrix[0].map((val, index) => {
                val = val
                return newBlockMatrix.map(row => row[index]).reverse()
            })
            break
        case "left":
            newBlockMatrix = blockMatrix[0].map((val, index) => {
                val = val
                return blockMatrix.map(row => row[row.length - 1 - index])
            });
            break
    }

    let group = []
    for (let i = 0; i < newBlockMatrix.length; i++) {
        for (let z = 0; z < newBlockMatrix[0].length; z++) {
            if (newBlockMatrix[i][z] == 1) {
                group.push({ X: z + position.X, Y: i + position.Y })
            }
        }
    }
    return group
}