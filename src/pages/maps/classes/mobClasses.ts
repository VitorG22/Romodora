import { MutableRefObject } from "react";
import { ICharacterData } from "../../../interfaces";
import { IIteractiveMenu, ITile, Tile } from "./tileClasses";

interface IMob extends ITile, ICharacterData {
    ownerId: string,
}

export interface IIteractiveMobMenu {
    text: string,
    functionName: 'rotateRight' | 'rotateLeft' | 'teste' | 'tradeStatus' | 'selectThisTile' | 'moveTo' | 'HealthPlus' | 'HealthMinus'
}

export class Mob extends Tile {
    ownerId; health; name; id; picture; class; subClass; race; subRace; bag; abilityScores;


    imageElement = new Image();
    constructor(data: IMob) {
        super(data)
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


    moveTo({ newPosition, canvaRef }: { newPosition: { X: number, Y: number }, canvaRef: MutableRefObject<HTMLCanvasElement | null> }) {

        this.eraseTile({ canvas: canvaRef, blockSize: 100 })


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

        this.renderTile({ canvas: canvaRef, blockSize: 100 })
        return { newTile: this }
    }

    rotateRight({ canvaRef }: { canvaRef?: MutableRefObject<HTMLCanvasElement | null> }) {
        let rotateArray: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
        let rotateIndex: number = rotateArray.findIndex(element => element == this.rotate)

        if (!canvaRef) return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
        this.eraseTile({ blockSize: 100, canvas: canvaRef })

        if (rotateIndex >= 3) {
            this.rotate = 'top'
        } else {
            this.rotate = rotateArray[rotateIndex + 1]
        }

        if (this.blockMatrix) {
            this.group = rotateMatrix(this.blockMatrix, this.rotate, { X: this.position.X, Y: this.position.Y })
        }
        this.renderTile({ blockSize: 100, canvas: canvaRef })

        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
    }
    rotateLeft({ canvaRef }: { canvaRef?: MutableRefObject<HTMLCanvasElement | null> }) {
        let rotateArray: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
        let rotateIndex: number = rotateArray.findIndex(element => element == this.rotate)

        if (!canvaRef) return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
        this.eraseTile({ blockSize: 100, canvas: canvaRef })

        if (rotateIndex <= 0) {
            this.rotate = 'left'
        } else {
            this.rotate = rotateArray[rotateIndex - 1]
        }
        if (this.blockMatrix) {
            this.group = rotateMatrix(this.blockMatrix, this.rotate, { X: this.position.X, Y: this.position.Y })
        }
        this.renderTile({ blockSize: 100, canvas: canvaRef })

        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
    }


    getIteractiveMenuData(permissionType: "player" | "host") {
        let iteractiveMenuData: Array<IIteractiveMenu> = []

        if (permissionType == 'host') {
            // this.paths[this.variant].path.length > 1 && iteractiveMenuData.push({ text: `Change ${this.canvaType} status`, functionName: 'tradeStatus' });
            // iteractiveMenuData.push({ text: `teste ${this.canvaType}`, functionName: 'teste' });

            iteractiveMenuData.push({ text: `teste ${this.canvaType}`, functionName: 'teste' });
        }

        this.isVoidBlock == false && iteractiveMenuData.push({ text: `Rotate ${this.name} right`, functionName: 'rotateRight' });
        this.isVoidBlock == false && iteractiveMenuData.push({ text: `Rotate ${this.name} left`, functionName: 'rotateLeft' });
        iteractiveMenuData.push({ text: `Select ${this.name}`, functionName: 'selectThisTile' });


        return iteractiveMenuData
    }

    HealthPlus() {
        console.log('MOB: vida mais')
        if (this.health.currentHealth < this.health.maxHealthTotal) {
            this.health.currentHealth += 1
        }
        return { newTile: this }
    }

    HealthMinus() {
        console.log('MOB: vida menos')
        if (this.health.currentHealth > 0) {
            this.health.currentHealth -= 1
        }
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