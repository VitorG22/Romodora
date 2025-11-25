import type { Socket } from "socket.io-client";
import type { Game, IPerson } from "../gameObject";
import { drawInCanvas, eraseCanvas } from "../../maps/editMap/canvas";
import { TableMapGame } from "../../maps/editMap/mapsClass";


export interface IPlayer extends IPerson {
    character?: Entity
    // character: ICharacter | null
}

interface ITableControl {
    players: IPlayer[],
    tableMap: TableMapGame | undefined
    socket: Socket | null
    lobbyId: string
    selectedObjectOrEntity?: {
        object?: any,
        entity?: Entity
    }
    setGameFunction?: ({ trigger, newGameData, newTableControlData }: { trigger: 'tableControl' | 'game', newGameData?: Game, newTableControlData?: TableControl }) => void
}

export class TableControl {
    players; tableMap; socket; lobbyId; setGameFunction; selectedObjectOrEntity;

    constructor(data: ITableControl) {
        this.lobbyId = data.lobbyId
        this.socket = data.socket
        this.players = data.players
        this.tableMap = data.tableMap
        this.selectedObjectOrEntity = data.selectedObjectOrEntity

        this.setGameFunction = data.setGameFunction
    }

    reset() {
        this.lobbyId = ""
        this.socket = null
        this.players = []
        this.tableMap = undefined
        this.setGameFunction = () => { }
    }

    activeListeners() {
        this.socket?.on("updateTableData", (body) => {
            console.log(body)

            switch (body.TypeToChange) {
                case "character":
                    this.changeCharacterData(body.data)
                    break
                case "player":
                    this.changePlayerData(body.data)
                    break
                case "tableMap":
                    this.changeTableMapData(body.data)
                    break
            }
        })
    }

    setGame(newData?: TableControl) {
        if (newData) {
            this.setGameFunction?.({ trigger: "tableControl", newTableControlData: new TableControl({ ...this, ...newData }) })
        } else {
            this.setGameFunction?.({ trigger: "tableControl", newTableControlData: this })
        }
    }

    changeTableMapData(newMapData: any) {
        console.log(newMapData)
        this.tableMap = new TableMapGame(newMapData)
        this.setGame()
    }

    changePlayerData({ playerData }: { playerData: IPlayer }) {
        let selectedPlayer = this.players.find(data => data.id == playerData.id)

        if (playerData.character) {
            selectedPlayer = { ...selectedPlayer, ...playerData, character: new Entity(playerData.character) }
        } else {
            selectedPlayer = { ...selectedPlayer, ...playerData }
        }
        this.setGame()

    }

    changeCharacterData({ userId, characterData }: { userId: string, characterData: IEntity }) {
        let playerIndex = this.players.findIndex(playerData => playerData.id == userId)

        if (playerIndex == -1) { console.log('return'); return }

        let socket = this.socket
        let lobbyId = this.lobbyId
        let characterOwnerId = this.players[playerIndex].id

        if (!this.players[playerIndex].character) {
            this.players[playerIndex].character = new Entity({
                ...characterData,
                emitSocket({ event, data }: { event: string, data: any }) {
                    data.gameId = lobbyId
                    data.characterOwnerId = characterOwnerId
                    socket?.emit(event, data)
                },
            })
        } else {
            this.players[playerIndex].character.name = characterData.name || this.players[playerIndex].character.name
            this.players[playerIndex].character.id = characterData.id || this.players[playerIndex].character.id
            this.players[playerIndex].character.picture = characterData.picture || this.players[playerIndex].character.picture
            this.players[playerIndex].character.class = characterData.class || this.players[playerIndex].character.class
            this.players[playerIndex].character.subClass = characterData.subClass || this.players[playerIndex].character.subClass
            this.players[playerIndex].character.race = characterData.race || this.players[playerIndex].character.race
            this.players[playerIndex].character.subRace = characterData.subRace || this.players[playerIndex].character.subRace
            this.players[playerIndex].character.attributes = characterData.attributes || this.players[playerIndex].character.attributes
            this.players[playerIndex].character.level = characterData.level || this.players[playerIndex].character.level
            this.players[playerIndex].character.life = characterData.life || this.players[playerIndex].character.life
            this.players[playerIndex].character.maxLife = characterData.maxLife || this.players[playerIndex].character.maxLife
            this.players[playerIndex].character.position = characterData.position || this.players[playerIndex].character.position
            this.players[playerIndex].character.lastPosition = characterData.lastPosition || this.players[playerIndex].character.lastPosition
        }

        this.setGame()
        this.players[playerIndex].character.render()

    }

    rollDice(DiceValue: number) {
        this.socket?.emit('rollDice', { DiceValue: DiceValue, gameId: this.lobbyId })
    }


    // emit change to backend
    emitChangeTableMap(mapId: string) {
        this.socket?.emit('changeSelectedMap', { gameId: this.lobbyId, mapId: mapId })
    }

    renderEntities() {
        this.players.forEach(playerData => {
            playerData.character?.render()
        });
    }

    setSelectedObjectOrEntity({ object, entity }: { object?: any, entity?: Entity }) {
        if (object) {
            this.selectedObjectOrEntity = { object: object, entity: undefined }
        } else if (entity) {
            this.selectedObjectOrEntity = { object: undefined, entity: entity }
        }
        this.setGame()
    }
    deleteSelectedObjectOrEntity() {
        this.selectedObjectOrEntity = undefined
        this.setGame()
    }

}

export interface IEntity {
    name: string,
    id: string,
    picture: string,
    class?: string,
    subClass?: string,
    race?: string,
    subRace?: string,
    attributes?: {
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
    }
    level?: number,
    life: number,
    maxLife: number,
    position: { x: number, y: number }
    lastPosition: { x: number, y: number }
    emitSocket?: ({ event, data }: { event: string, data: any }) => void
}
export class Entity {
    name; id; picture; class; subClass; race; subRace; attributes; level; life; maxLife; position; lastPosition; emitSocket;

    constructor(data: IEntity) {
        this.name = data.name
        this.id = data.id
        this.picture = data.picture
        this.class = data.class
        this.subClass = data.subClass
        this.race = data.race
        this.subRace = data.subRace
        this.attributes = data.attributes
        this.level = data.level
        this.life = data.life
        this.maxLife = data.maxLife
        this.position = data.position
        this.lastPosition = data.lastPosition || { x: -99999, y: -99999 }
        this.emitSocket = data.emitSocket
    }


    
    changeCharacterData({ CharacterData }: { CharacterData?: IEntity }) {
        if (CharacterData != undefined) {
            this.emitSocket?.({ event: 'changePlayerCharacterData', data: { newCharacterData: CharacterData } })
        } else {
            this.emitSocket?.({ event: 'changePlayerCharacterData', data: { newCharacterData: this } })
        }
    }
    
    changePosition(x: number, y: number ) {
        this.lastPosition = this.position
        this.position = {
            x:x,
            y:y
        }
        this.changeCharacterData({CharacterData:undefined})
        console.log(this.emitSocket)
    }

    heal(healValue:number){
        if(this.life +healValue >= this.maxLife){
            this.life = this.maxLife
        }else{
            this.life += healValue
        }
        this.changeCharacterData({CharacterData:undefined})
    }

    damage(damageValue:number){
        if(this.life - damageValue <= 0){
            this.life = 0
        }else{
            this.life -= damageValue
        }
        this.changeCharacterData({CharacterData:undefined})
    }

    render() {
        eraseCanvas({
            canvasId: `EntityCanvas`,
            sizeX: 1,
            sizeY: 1,
            x: this.lastPosition.x,
            y: this.lastPosition.y
        })

        drawInCanvas({
            canvasId: `EntityCanvas`,
            blockData: {
                direction: "top",
                linkData: {
                    mainTilePosition: this.position,
                    isMainTile: true,
                    groupPositions: [this.position]
                },
                tileData: {
                    group: 'player',
                    name: this.name,
                    path: this.picture,
                    size: { x: 1, y: 1 }
                },
                type: 'entity',
                x: this.position.x,
                y: this.position.y
            }
        })
    }

    getInteractionTableFunctionsAsPrimaryObject() {
        return {
            Title: this.name,
            list: [
                {
                    name: "Move To",
                    executableFunction:(data:any)=> this.changePosition(data.x, data.y)
                },
            ]
        }
    }

    getInteractionTableFunctionsAsSecondaryObject(){
        return {
            Title: this.name,
            list: [
                {
                    name: "Damage",
                    executableFunction:(data:any)=> this.damage(data.value || 0)
                },
            ]
        }
    }

}