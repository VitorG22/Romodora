import { IMapMatrix } from "../interfaces"
export interface ITile {
    blockId: string
    isDynamicTile: boolean
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
    rotate: 'top' | 'right' | 'left' | 'bottom'
}

export interface IIteractiveMenu {
    text: string,
    functionName: 'rotateRight' | 'rotateLeft' | 'teste' | 'tradeStatus' | 'selectThisTile'
}

export class Tile {
    position; paths; variant; size; rotate; canvaType; group; status; isVoidBlock; blockMatrix; blockId; isDynamicTile; dynamicGridPosition
    blockSize = 100
    imageElement = new Image();
    canvasId = ''

    constructor(data: ITile) {
        this.isDynamicTile = data.isDynamicTile
        this.blockId = data.blockId
        this.dynamicGridPosition = {
            X: -1,
            Y: -1
        }
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

        // define the Canva ID
        (() => {
            switch (data.canvaType) {
                case "prop":
                    this.canvasId = 'canvasProps'
                    break
                case "wall":
                    this.canvasId = 'canvasWall'
                    break
                case "floor":
                    this.canvasId = 'canvasFloor'
                    break
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


    renderTile() {
        switch (this.isDynamicTile) {
            case true:
                this.renderDynamic()
                break
            case false:
                this.renderNormal()
                break
        }
    }

    drawGhost({ MouseX, MouseY }: IDrawGhost) {
        const canvas: HTMLCanvasElement | null = document.getElementById(this.canvasId) as HTMLCanvasElement
        if (!canvas) return

        let canvasCtx = canvas.getContext("2d")
        if (!canvasCtx) return

        canvasCtx.clearRect(0, 0, this.size.X * this.blockSize, this.size.Y * this.blockSize)

        let ghostBlockWidth = this.size.X * this.blockSize
        let ghostBlockHeight = this.size.X * this.blockSize


        if (this.rotate == "top" || this.rotate == 'bottom') {
            canvasCtx.fillStyle = '#00d67d10'
            canvasCtx.fillRect(MouseX * this.blockSize, MouseY * this.blockSize, ghostBlockWidth, ghostBlockHeight)
            canvasCtx.strokeStyle = '#00d67d'
            canvasCtx.strokeRect(MouseX * this.blockSize, MouseY * this.blockSize, ghostBlockWidth, ghostBlockHeight)

        } else if (this.rotate == "left" || this.rotate == 'right') {
            canvasCtx.fillStyle = '#00d67d10'
            canvasCtx.fillRect(MouseX * this.blockSize, MouseY * this.blockSize, ghostBlockHeight, ghostBlockWidth)
            canvasCtx.strokeStyle = '#00d67d'
            canvasCtx.strokeRect(MouseX * this.blockSize, MouseY * this.blockSize, ghostBlockHeight, ghostBlockWidth)
        }
    }

    async eraseTile({ mapMatrix }: { mapMatrix?: IMapMatrix }) {
        const canvas: HTMLCanvasElement | null = document.getElementById(this.canvasId) as HTMLCanvasElement
        if (!canvas) return
        console.log(this)
        let canvasCtx = canvas.getContext("2d")
        if (!canvasCtx) return new Error('Canvas Not Exist')
        this.group?.forEach(elementInRow => {
            canvasCtx.clearRect(elementInRow.X * this.blockSize, elementInRow.Y * this.blockSize, this.blockSize, this.blockSize)
        })

        if(!mapMatrix || !this.isDynamicTile)return
        
        let thisLayerMapMatrix = mapMatrix[this.canvaType]
        let tilesInContactGrid: (Tile | null)[][] = [
            [thisLayerMapMatrix[this.position.Y - 1]?.[this.position.X - 1] || null, thisLayerMapMatrix[this.position.Y - 1]?.[this.position.X] || null, thisLayerMapMatrix[this.position.Y - 1]?.[this.position.X + 1] || null],
            [thisLayerMapMatrix[this.position.Y]?.[this.position.X - 1] || null, null, thisLayerMapMatrix[this.position.Y]?.[this.position.X + 1] || null],
            [thisLayerMapMatrix[this.position.Y + 1]?.[this.position.X - 1] || null, thisLayerMapMatrix[this.position.Y + 1]?.[this.position.X] || null, thisLayerMapMatrix[this.position.Y + 1]?.[this.position.X + 1] || null],
        ]
        tilesInContactGrid.flat().map(tile => tile?.setDynamicGridPosition({ mapMatrix }))

        return
    }

    renderNormal() {
        console.log('Rendering Tile')
        const canvas: HTMLCanvasElement | null = document.getElementById(this.canvasId) as HTMLCanvasElement
        if (this.isVoidBlock) { return console.log("returning because is void tile") }
        if (!canvas) {
            console.log("returning because canvas not existe")
            console.log(canvas)
            return
        }

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
        // canvasCtx.strokeStyle = "#00000050"
        // canvasCtx.strokeRect(tileLeft, tileTop, 100, 100)

    }

    deleteThisTile() {
            this.blockId = '',
            this.dynamicGridPosition = {
                X: -1,
                Y: -1
            },
            this.isDynamicTile = false,
            this.paths = [{ name: '', path: [''] }],
            this.position = this.position,
            this.rotate = 'top',
            this.size = { X: 1, Y: 1 },
            this.status = 0,
            this.variant = 0,
            this.group = [this.position]

        return this
    }

    // ----- Dynamic Tile Function ----- //


    renderDynamic() {
        const canvas: HTMLCanvasElement | null = document.getElementById(this.canvasId) as HTMLCanvasElement
        if (this.isVoidBlock) { return console.log("returning because is void tile") }
        if (!canvas) {
            console.log("returning because canvas not existe")
            console.log(canvas)
            return
        }

        let canvasCtx = canvas.getContext('2d')
        if (!canvasCtx) return

        let tileWidth = this.blockSize * this.size.X
        let tileHeight = this.blockSize * this.size.Y
        let tileLeft = this.position.X * this.blockSize
        let tileTop = this.position.Y * this.blockSize

        // console.log(this.imageElement.height)
        // console.log(this.imageElement.width)
        let gridBlockSize = this.imageElement.width / 3
        // console.log(gridBlockSize)
        let gridLeft = gridBlockSize * this.dynamicGridPosition.X
        let gridTop = gridBlockSize * this.dynamicGridPosition.Y
        console.log(this.dynamicGridPosition.X, this.dynamicGridPosition.Y)
        

        canvasCtx.clearRect(tileLeft, tileTop, tileWidth, tileHeight);

        canvasCtx.drawImage(this.imageElement, gridLeft, gridTop, gridBlockSize, gridBlockSize, tileLeft, tileTop, tileWidth, tileHeight);
        // canvasCtx.strokeStyle = "#00000050"
        // canvasCtx.strokeRect(tileLeft, tileTop, 100, 100)

    }

    setDynamicGridPosition({ mapMatrix }: { mapMatrix: IMapMatrix }) {
        if (!this.isDynamicTile) return
        let thisLayerMapMatrix = mapMatrix[this.canvaType]
        let tilesInContactGrid: (Tile | null)[][] = [
            [thisLayerMapMatrix[this.position.Y - 1]?.[this.position.X - 1] || null, thisLayerMapMatrix[this.position.Y - 1]?.[this.position.X] || null, thisLayerMapMatrix[this.position.Y - 1]?.[this.position.X + 1] || null],
            [thisLayerMapMatrix[this.position.Y]?.[this.position.X - 1] || null, null, thisLayerMapMatrix[this.position.Y]?.[this.position.X + 1] || null],
            [thisLayerMapMatrix[this.position.Y + 1]?.[this.position.X - 1] || null, thisLayerMapMatrix[this.position.Y + 1]?.[this.position.X] || null, thisLayerMapMatrix[this.position.Y + 1]?.[this.position.X + 1] || null],
        ]


        let IdsRelationsGrid = tilesInContactGrid.map(row => {
            return row.map(tile => {
                if (tile == null || tile.blockId != this.blockId) return false
                if (tile.blockId == this.blockId) return true
            })
        })
        console.log(IdsRelationsGrid)

        let newDynamicGridPosition = { X: 0, Y: 0 }

        switch (true) {
            case (IdsRelationsGrid[0][1] && IdsRelationsGrid[1][0] && IdsRelationsGrid[1][2] && IdsRelationsGrid[2][1]):
                newDynamicGridPosition = { X: 2, Y: 3 }
                break
            case (IdsRelationsGrid[1][0] && IdsRelationsGrid[1][2] && IdsRelationsGrid[2][1]):
                newDynamicGridPosition = { X: 2, Y: 4 }
                break
            case (IdsRelationsGrid[0][1] && IdsRelationsGrid[1][2] && IdsRelationsGrid[2][1]):
                newDynamicGridPosition = { X: 0, Y: 5 }
                break
            case (IdsRelationsGrid[0][1] && IdsRelationsGrid[1][0] && IdsRelationsGrid[2][1]):
                newDynamicGridPosition = { X: 1, Y: 5 }
                break
            case (IdsRelationsGrid[0][1] && IdsRelationsGrid[1][0] && IdsRelationsGrid[1][2]):
                newDynamicGridPosition = { X: 2, Y: 5 }
                break
            case (IdsRelationsGrid[1][2] && IdsRelationsGrid[2][1]):
                newDynamicGridPosition = { X: 0, Y: 0 }
                break
            case (IdsRelationsGrid[1][0] && IdsRelationsGrid[2][1]):
                newDynamicGridPosition = { X: 2, Y: 0 }
                break
            case (IdsRelationsGrid[0][1] && IdsRelationsGrid[1][2]):
                newDynamicGridPosition = { X: 0, Y: 2 }
                break
            case (IdsRelationsGrid[0][1] && IdsRelationsGrid[1][0]):
                newDynamicGridPosition = { X: 2, Y: 2 }
                break
            case (IdsRelationsGrid[1][0] && IdsRelationsGrid[1][2]):
                newDynamicGridPosition = { X: 1, Y: 0 }
                break
            case (IdsRelationsGrid[0][1] && IdsRelationsGrid[2][1]):
                newDynamicGridPosition = { X: 0, Y: 1 }
                break
            case (IdsRelationsGrid[2][1]):
                newDynamicGridPosition = { X: 0, Y: 3 }
                break
            case (IdsRelationsGrid[1][2]):
                newDynamicGridPosition = { X: 1, Y: 3 }
                break
            case (IdsRelationsGrid[1][0]):
                newDynamicGridPosition = { X: 0, Y: 4 }
                break
            case (IdsRelationsGrid[0][1]):
                newDynamicGridPosition = { X: 1, Y: 4 }
                break
            default:
                newDynamicGridPosition = { X: 1, Y: 1 }
                break
        }

        if (newDynamicGridPosition.X == this.dynamicGridPosition.X && newDynamicGridPosition.Y == this.dynamicGridPosition.Y) { return }
        else {
            this.dynamicGridPosition = newDynamicGridPosition
            this.renderTile()
            tilesInContactGrid.flat().map(tile => tile?.setDynamicGridPosition?.({ mapMatrix }))
        }

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

    rotateRight() {
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
    rotateLeft() {
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