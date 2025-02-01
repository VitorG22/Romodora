import { MutableRefObject } from "react"

export interface ITile {
    position: {
        X: number,
        Y: number
    }
    paths: Array<{
        name: string,
        path: string[]
    }>
    variant: number
    size: {
        X: number
        Y: number
    }
    rotate: 'top' | 'right' | 'bottom' | 'left'
    canvaType: 'prop' | 'wall' | 'floor'
    status: number
    blockMatrix?: number[][]
    group?: {
        X: number;
        Y: number;
    }[]
}


interface IDrawGhost {
    MouseX: number,
    MouseY: number,
    canvas: HTMLCanvasElement,
    blockSize: number,
    rotate: 'top' | 'right' | 'left' | 'bottom'
}

export interface IIteractiveMenu {
    text: string,
    functionName: 'rotateRight' | 'rotateLeft' | 'teste' | 'tradeStatus' | 'selectThisTile'
}

export class Tile {
    position; paths; variant; size; rotate; canvaType; group; status; isVoidBlock; blockMatrix;

    imageElement = new Image();

    constructor(data: ITile) {
        this.paths = data.paths
        this.variant = data.variant
        this.size = data.size
        this.rotate = data.rotate
        this.status = data.status
        this.canvaType = data.canvaType
        this.position = data.position
        this.imageElement.src = this.paths[this.variant].path[this.status],

            // define the tile group 
            (() => {
                if (data.blockMatrix) {
                    this.blockMatrix = data.blockMatrix
                    this.group = rotateMatrix(data.blockMatrix, data.rotate, { X: data.position.X, Y: data.position.Y })
                } else if (data.group && data.group.length >= 1) {
                    this.group = data.group
                } else {
                    this.group = [{ X: data.position.X, Y: data.position.Y }]
                }

            })();

        // define if the block is a void tile(dont have a tile on it) based in if he have a images paths or not
        (() => {
            if (this.paths[0].path[0] == '') {
                this.isVoidBlock = true
            } else {
                this.isVoidBlock = false
            }
        })();

    }

    // updateTile({ data, canvas, blockSize }: { data: ITile, canvas: React.MutableRefObject<HTMLCanvasElement | null>, blockSize: number }) {
    //     this.eraseTile({ canvas, blockSize })
    //     console.log('teste set Tile', data)
    //     this.paths = data.paths
    //     this.variant = data.variant
    //     this.size = data.size
    //     this.rotate = data.rotate
    //     this.status = data.status
    //     this.canvaType = data.canvaType
    //     this.position = data.position
    //     this.imageElement.src = this.paths[this.variant].path[this.status],
    //         // define the tile group 
    //         (() => {
    //             if (data.blockMatrix) {

    //                 let newBlockMatrix: number[][] = rotateMatrix(data.blockMatrix, this.rotate)
    //                 console.log(newBlockMatrix)

    //                 let group = []
    //                 for (let i = 0; i < newBlockMatrix.length - 1; i++) {
    //                     for (let z = 0; z < newBlockMatrix[0].length - 1; z++) {
    //                         if (newBlockMatrix[i][z] == 1) {
    //                             group.push({ X: z + this.position.X, Y: i + this.position.Y })
    //                         }
    //                     }
    //                 }
    //                 this.group = group
    //             } else if (data.group) { this.group = data.group }

    //         })();

    //     // define if the block is a void tile(dont have a tile on it) based in if he have a images paths or not
    //     (() => {
    //         if (this.paths[0].path[0] == '') {
    //             this.isVoidBlock = true
    //         } else {
    //             this.isVoidBlock = false
    //         }
    //     })();
    //     this.renderTile({ blockSize, canvas })
    // }



    drawGhost({ MouseX, MouseY, canvas, blockSize }: IDrawGhost) {
        let canvasCtx = canvas.getContext("2d")
        if (!canvasCtx) return

        canvasCtx.clearRect(0, 0, this.size.X * blockSize, this.size.Y * blockSize)

        let ghostBlockWidth = this.size.X * blockSize
        let ghostBlockHeight = this.size.X * blockSize


        if (this.rotate == "top" || this.rotate == 'bottom') {
            canvasCtx.fillStyle = '#00d67d10'
            canvasCtx.fillRect(MouseX * blockSize, MouseY * blockSize, ghostBlockWidth, ghostBlockHeight)
            canvasCtx.strokeStyle = '#00d67d'
            canvasCtx.strokeRect(MouseX * blockSize, MouseY * blockSize, ghostBlockWidth, ghostBlockHeight)

        } else if (this.rotate == "left" || this.rotate == 'right') {
            canvasCtx.fillStyle = '#00d67d10'
            canvasCtx.fillRect(MouseX * blockSize, MouseY * blockSize, ghostBlockHeight, ghostBlockWidth)
            canvasCtx.strokeStyle = '#00d67d'
            canvasCtx.strokeRect(MouseX * blockSize, MouseY * blockSize, ghostBlockHeight, ghostBlockWidth)
        }
    }

    async eraseTile({ canvas, blockSize }: { canvas: React.MutableRefObject<HTMLCanvasElement | null>, blockSize: number }) {
        let canvasCtx = canvas.current?.getContext("2d")
        if (!canvasCtx) return new Error('Canvas Not Exist')
        this.group?.forEach(elementInRow => {
            canvasCtx.clearRect(elementInRow.X * blockSize, elementInRow.Y * blockSize, blockSize, blockSize)
        })

        return
    }

    renderTile({ canvas, blockSize }: { canvas: React.MutableRefObject<HTMLCanvasElement | null>, blockSize: number }) {
        if (this.isVoidBlock) return

        let canvasCtx = canvas.current?.getContext('2d')
        if (!canvasCtx) return

        let tileWidth = blockSize * this.size.X
        let tileHeight = blockSize * this.size.Y
        let tileLeft = this.position.X * blockSize
        let tileTop = this.position.Y * blockSize

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
        // canvasCtx.strokeStyle = "#00000050"
        // canvasCtx.strokeRect(tileLeft, tileTop, blockSize, blockSize)

    }

    deleteThisTile() {
        this.paths = [{ name: '', path: [''] }],
            this.position = this.position,
            this.rotate = 'top',
            this.size = { X: 1, Y: 1 },
            this.status = 0,
            this.variant = 0,
            this.group = [this.position]

        return this
    }

    // ----- Iteractive Menu Functions ----- //

    tradeStatus() {
        let MaxStatusCount = this.paths[this.variant].path.length
        if (this.status + 1 >= MaxStatusCount) {
            this.status = 0
        } else {
            this.status += 1
        }
        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
    }

    teste() {
        console.log(this)
        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: false }
    }

    rotateRight({ canvaRef }: { canvaRef?: MutableRefObject<HTMLCanvasElement | null> }) {
        canvaRef = canvaRef
        let rotateArray: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
        let rotateIndex: number = rotateArray.findIndex(element => element == this.rotate)
        if (rotateIndex >= 3) {
            this.rotate = 'top'
        } else {
            this.rotate = rotateArray[rotateIndex + 1]
        }

        if (this.blockMatrix) {
            this.group = rotateMatrix(this.blockMatrix, this.rotate, { X: this.position.X, Y: this.position.Y })
        }
        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
    }
    rotateLeft({ canvaRef }: { canvaRef?: MutableRefObject<HTMLCanvasElement | null> }) {
        canvaRef = canvaRef
        let rotateArray: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
        let rotateIndex: number = rotateArray.findIndex(element => element == this.rotate)
        if (rotateIndex <= 0) {
            this.rotate = 'left'
        } else {
            this.rotate = rotateArray[rotateIndex - 1]
        }
        if (this.blockMatrix) {
            this.group = rotateMatrix(this.blockMatrix, this.rotate, { X: this.position.X, Y: this.position.Y })
        }
        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: true }
    }

    selectThisTile() {
        console.log('selectThisTile')
        return { newTile: this, lastPosition: { X: this.position.X, Y: this.position.Y }, nedRefreshMap: false }
    }

    getIteractiveMenuData(permissionType: "player" | "host") {
        let iteractiveMenuData: Array<IIteractiveMenu> = []

        if (permissionType == 'host') {
            this.paths[this.variant].path.length > 1 && iteractiveMenuData.push({ text: `Change ${this.canvaType} status`, functionName: 'tradeStatus' });
            // iteractiveMenuData.push({ text: `teste ${this.canvaType}`, functionName: 'teste' });

            switch (this.canvaType) {
                case "prop":
                    this.isVoidBlock == false && iteractiveMenuData.push({ text: `Rotate ${this.canvaType} right`, functionName: 'rotateRight' });
                    this.isVoidBlock == false && iteractiveMenuData.push({ text: `Rotate ${this.canvaType} left`, functionName: 'rotateLeft' });
                    break
                case "wall":
                    iteractiveMenuData.push({ text: `teste ${this.canvaType}`, functionName: 'teste' });
                    break
                case "floor":
                    iteractiveMenuData.push({ text: `teste ${this.canvaType}`, functionName: 'teste' });
                    break
            }
        }
        switch (this.canvaType) {
            case "prop":
                break
            case "wall":
                break
            case "floor":
                break
        }


        return iteractiveMenuData
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
                return blockMatrix.map(row => row[index]).reverse()
            })
            break
        case "bottom":
            newBlockMatrix = blockMatrix[0].map((val, index) => {
                val = val
                return blockMatrix.map(row => row[index]).reverse()
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