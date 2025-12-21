import type { Socket } from "socket.io-client";
import type { Game, IPerson } from "../gameObject";
import { TableMapGame } from "../../maps/editMap/mapsClass";
import type { Ammo, MeleeWeapon, RangedWeapon, TItems } from "../../items/itemsClass";
import {Character, type  ICharacter, type TEntity } from "./entitysClasses";


export interface IPlayer extends IPerson {
    character?: Character
    // character: ICharacter | null
}

interface ITableControl {
    players: IPlayer[],
    tableMap: TableMapGame | undefined
    socket: Socket | null
    lobbyId: string
    selectedEntity?: TEntity,
    selectedObject?: TItems | undefined

    setGameFunction?: ({ trigger, newGameData, newTableControlData }: { trigger: 'tableControl' | 'game', newGameData?: Game, newTableControlData?: TableControl }) => void
}

export class TableControl {
    players; tableMap; socket; lobbyId; setGameFunction; selectedEntity; selectedObject;

    constructor(data: ITableControl) {
        this.lobbyId = data.lobbyId
        this.socket = data.socket
        this.players = data.players
        this.tableMap = data.tableMap
        this.selectedEntity = data.selectedEntity
        this.selectedObject = data.selectedObject

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

    setSelectedEntity(entity: TEntity) {
        this.selectedEntity = entity
        this.setGame()
    }
    setSelectedObject(object: MeleeWeapon | RangedWeapon | Ammo | undefined) {
        this.selectedObject = object
        this.setGame()
    }

    deleteSelectedEntity() {
        this.selectedEntity = undefined
        this.setGame()
    }
    deleteSelectedObject() {
        this.selectedObject = undefined
        this.setGame()
    }

}
