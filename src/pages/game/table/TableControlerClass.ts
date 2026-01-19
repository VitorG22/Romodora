import type { Socket } from "socket.io-client";
import type { Game, IPerson } from "../gameObject";
import { TableMapGame } from "../../maps/editMap/mapsClass";
import type { TItems } from "../../items/itemsClass";
import { Character, type ICharacter } from "./entitysClasses";
import ParseItem from "../../items/JsonToClassParser";

export interface IPlayer extends IPerson {
    character?: Character
}

interface ITableControl {
    players: IPlayer[],
    tableMap: TableMapGame | undefined
    socket: Socket | null
    lobbyId: string
    selectedEntityId?: string,
    selectedObjectId?: string

    setGameFunction?: ({ trigger, newGameData, newTableControlData }: { trigger: 'tableControl' | 'game', newGameData?: Game, newTableControlData?: TableControl }) => void
}

export class TableControl {
    players; tableMap; socket; lobbyId; setGameFunction; selectedEntityId; selectedObjectId;

    constructor(data: ITableControl) {
        this.lobbyId = data.lobbyId
        this.socket = data.socket
        this.players = data.players
        this.tableMap = data.tableMap
        this.selectedEntityId = data.selectedEntityId
        this.selectedObjectId = data.selectedObjectId

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
                case "item":
                    this.changeItemData(body.data)
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
            selectedPlayer = { ...selectedPlayer, ...playerData, character: new Character(playerData.character) }
        } else {
            selectedPlayer = { ...selectedPlayer, ...playerData }
        }
        this.setGame()

    }

    changeCharacterData({ userId, characterData }: { userId: string, characterData: ICharacter }) {
        let playerIndex = this.players.findIndex(playerData => playerData.id == userId)

        if (playerIndex == -1) { console.log('return'); return }

        let socket = this.socket
        let lobbyId = this.lobbyId
        let characterOwnerId = this.players[playerIndex].id

        if (!this.players[playerIndex].character) {
            this.players[playerIndex].character = new Character({
                ...characterData,
                emitSocket({ event, data }: { event: string, data: any }) {
                    data.gameId = lobbyId
                    data.characterOwnerId = characterOwnerId
                    data.entityId = characterData.id
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
            this.players[playerIndex].character.inventory = characterData.inventory.map(item => ParseItem(item,this.players[playerIndex].character?.emitSocket)) || this.players[playerIndex].character.lastPosition
        }

        this.setGame()
        this.players[playerIndex].character.render()

    }

    changeItemData(itemData: TItems ) {
        let item:TItems| undefined = this.getItemById(itemData.subSelectionId!)
        if(!item)return

        console.log(item)
        item.changeData(itemData)
        this.setGame()
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

    setSelectedEntity(entity: string) {
        this.selectedEntityId = entity
        this.setGame()
    }
    setSelectedObject(objectId?: string) {
        this.selectedObjectId = objectId
        this.setGame()
    }

    deleteSelectedEntity() {
        this.selectedEntityId = undefined
        this.setGame()
    }
    deleteSelectedObject() {
        this.selectedObjectId = undefined
        this.setGame()
    }

    getSelectedEntity() {
        // return this.players.find(playerData =>playerData.character?.id == this.selectedEntityId)?.character || undefined
        if (!this.selectedEntityId) return undefined

        return this.getEntityById(this.selectedEntityId)
    }

    getSelectedObject() {
        if(!this.selectedObjectId)return
        return this.getItemById(this.selectedObjectId)
    }

    getEntityById(EntityId: string) {
        let EntityToReturn = undefined

        this.players.forEach(playerData => {
            if (playerData.character?.id == EntityId) {
                EntityToReturn = playerData.character!
            }
        })

        return EntityToReturn
    }

    getItemById(ItemSubSelectionId: string) {
        let itemToReturn:TItems | undefined;

        for (let playerData of this.players) {
            playerData.character?.inventory.forEach(itemData => {
                if (itemData.subSelectionId == ItemSubSelectionId) {
                    itemToReturn = itemData
                }
            })
        }


        return itemToReturn
    }

}
