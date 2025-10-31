import { drawInCanvas, eraseCanvas } from "./canvas"
import { RandomString } from "../../../scripts/random"
import type { ITile } from "./tileGallery"



export type TBlock = {
    x: number
    y: number
    type: 'void' | 'floor' | "wall"
    direction: 'top' | 'left' | 'bottom' | 'right'
    tileData: ITile | null
    linkData: {
        isMainTile: boolean
        mainTilePosition: { x: number, y: number }
        groupPositions: { x: number, y: number }[]
    }
}

export type TLayerMatrix = TBlock[][]

export type TLayer = {
    id: string;
    matrix: TLayerMatrix;
    name: string;
    show: boolean;
}
export interface ITableMap {
    image?: string
    id?: string
    description?: string
    name: string,
    lastModify?: Date
    sizeX: number
    sizeY: number
    layers?: TLayer[],
    selectedLayer?: string
    reRender?: (newObject: TableMap) => void
    setMapSize?: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>
}

export class TableMap {
    id; image; description; name; lastModify; sizeX; sizeY; layers; selectedLayer; setMapSize; reRender;

    constructor(data: ITableMap) {
        this.image = data.image || ''
        this.id = data.id || RandomString(40)
        this.description = data.description || " "
        this.name = data.name
        this.lastModify = data.lastModify || new Date()
        this.sizeX = data.sizeX
        this.sizeY = data.sizeY
        this.layers = data.layers || [this.createDefaultLayers(data.sizeX, data.sizeY)]
        this.selectedLayer = data.selectedLayer || ""
        this.setMapSize = data.setMapSize
        this.reRender = data.reRender

    }



    createDefaultLayers = (sizeX?: number, sizeY?: number): TLayer => {

        return {
            name: "Default Layer",
            show: true,
            id: RandomString(20),
            matrix: Array.from({ length: sizeY || this.sizeY }, (i, y) => (Array.from({ length: sizeX || this.sizeX }, (j, x) => {
                i = i //only to fix vercel error
                j = j //only to fix vercel error
                return ({
                    x: x,
                    y: y,
                    direction: 'top',
                    type: "void",
                    tileData: null,
                    linkData: {
                        isMainTile: true,
                        mainTilePosition: { x: x, y: y },
                        groupPositions: []
                    }
                })
            })))
        }
    }

    addGridColumn = () => {
        let newLayersData = [...this.layers]
        newLayersData.map(layerData => {
            layerData.matrix.map((row, Y) => row[row.length] = {
                x: row.length,
                y: Y,
                type: "void",
                direction: 'top',
                tileData: null,
                linkData: {
                    groupPositions: [],
                    isMainTile: true,
                    mainTilePosition: { x: row.length, y: Y }
                }
            })
        })
        this.sizeX = this.sizeX + 1
        this.layers = newLayersData
        this.reDrawAll()
        this.reRender?.(this)
    }
    deleteGridColumn = () => {
        if (this.sizeX <= 1) return
        let newLayersData = [...this.layers]
        newLayersData.map(layerData => layerData.matrix.map(row => row.pop()))

        this.sizeX = this.sizeX - 1
        this.layers = newLayersData
        this.reDrawAll()
        this.reRender?.(this)
    }
    addGridRow = () => {
        let newLayersData = [...this.layers]
        newLayersData.map(layerData => {
            layerData.matrix[layerData.matrix.length] = Array.from({ length: this.sizeX }, (i, x) => {
                i = i //only to fix vercel error
                return ({
                    x: x,
                    y: layerData.matrix.length,
                    type: "void",
                    direction: 'top',
                    tileData: null,
                    linkData: {
                        groupPositions: [],
                        isMainTile: true,
                        mainTilePosition: { x: x, y: layerData.matrix.length }
                    }
                })
            })
        })

        this.sizeY = this.sizeY + 1
        this.layers = newLayersData
        this.reDrawAll()
        this.reRender?.(this)
    }
    deleteGridRow = () => {
        if (this.sizeY <= 1) return

        let newLayersData = [...this.layers]
        newLayersData.map(layerData => layerData.matrix.pop())

        this.sizeY = this.sizeY - 1
        this.layers = newLayersData
        this.reDrawAll()
        this.reRender?.(this)
    }

    AddTileInMatrix = (x: number, y: number, selectedTile: ITile, tileDirection: "top" | "left" | "bottom" | "right") => {
        console.log(tileDirection)
        let selectedLayerData = this.layers.find(layerData => layerData.id == this.selectedLayer)

        if (!selectedLayerData?.matrix[y]?.[x]) { return }
        let selectedTileCopy = { ...selectedTile }

        if (tileDirection == "left" || tileDirection == "right") {
            selectedTileCopy.size = {
                x: selectedTileCopy.size.y,
                y: selectedTileCopy.size.x
            }
        }
        console.log(selectedTileCopy)
        // group
        let groupList = []
        for (let i = y; i <= y + selectedTileCopy.size.y - 1; i++) {
            for (let j = x; j <= x + selectedTileCopy.size.x - 1; j++) {
                groupList.push({ x: j, y: i })
            }
        }

        this.deleteTileFromMatrix(x, y)
        groupList.forEach(tilePosition =>
            this.deleteTileFromMatrix(tilePosition.x, tilePosition.y)
        )

        // mainTile
        selectedLayerData.matrix[y][x] = {
            direction: tileDirection,
            linkData: {
                groupPositions: groupList,
                isMainTile: true,
                mainTilePosition: { x: x, y: y }
            },
            tileData: selectedTileCopy,
            type: "floor",
            x: x,
            y: y
        }

        groupList.forEach(groupElement => {
            if (groupElement.x == x && groupElement.y == y) return
            selectedLayerData.matrix[groupElement.y][groupElement.x] = {
                direction: "top",
                linkData: {
                    groupPositions: groupList,
                    isMainTile: false,
                    mainTilePosition: { x: x, y: y }
                },
                tileData: null,
                type: "floor",
                x: groupElement.x,
                y: groupElement.y
            }
        })

        drawInCanvas({
            canvasId: this.selectedLayer,
            blockData: selectedLayerData.matrix[y][x]
        })
        this.reRender?.(this)
    }

    deleteTileFromMatrix = (x: number, y: number) => {
        let selectedLayerData = this.layers.find(layerData => layerData.id == this.selectedLayer)
        if (!selectedLayerData) return

        let mainTilePosition = selectedLayerData?.matrix[y][x].linkData.mainTilePosition
        let tileToDelete = selectedLayerData?.matrix[mainTilePosition.y][mainTilePosition.x]
        if (!tileToDelete || !tileToDelete.tileData) return

        eraseCanvas({
            x: tileToDelete.x,
            y: tileToDelete.y,
            canvasId: this.selectedLayer,
            sizeX: tileToDelete.tileData.size.x,
            sizeY: tileToDelete.tileData.size.y,

        })

        tileToDelete.linkData.groupPositions.forEach(tileInGroup => {
            selectedLayerData.matrix[tileInGroup.y][tileInGroup.x] = {
                direction: "top",
                linkData: {
                    groupPositions: [],
                    isMainTile: true,
                    mainTilePosition: {
                        x: tileInGroup.x,
                        y: tileInGroup.y
                    }
                },
                tileData: null,
                type: "void",
                x: tileInGroup.x,
                y: tileInGroup.y
            }
        })

        selectedLayerData.matrix[y][x] = {
            direction: "top",
            linkData: {
                groupPositions: [],
                isMainTile: true,
                mainTilePosition: {
                    x: x,
                    y: y
                }
            },
            tileData: null,
            type: "void",
            x: x,
            y: y
        }
        this.reRender?.(this)

    }

    reDrawAll = () => {
        for (let layer of this.layers) {
            layer.matrix.forEach(row => {
                row.forEach(tileData => {
                    drawInCanvas({
                        blockData: tileData,
                        canvasId: layer.id
                    })
                })
            })
        }
    }

    setSelectedLayer = (layerId: string) => {
        console.log(layerId)
        this.selectedLayer = layerId
        this.reRender?.(this)
    }

    setLayer = (layerData: TLayer) => {
        console.log(layerData)
        let newLayersData = [...this.layers]

        let newLayerIndex = newLayersData.findIndex((layer) => layer.id == layerData.id)

        newLayersData[newLayerIndex] = layerData
        this.layers = newLayersData
        this.reRender?.(this)
    }


    addLayer = () => {
        let newLayersData = this.layers
        const newLayer = this.createDefaultLayers()
        newLayersData.push(newLayer)

        this.layers = newLayersData
        this.setSelectedLayer(newLayer.id)
    }

    deleteLayer = (layerId: string) => {
        let newLayersData = this.layers
        let layerIndex = newLayersData.findIndex(layerData => layerData.id == layerId)
        if (layerIndex == -1) return

        newLayersData.splice(layerIndex, 1)
        this.layers = newLayersData
        this.reRender?.(this)
    }

}