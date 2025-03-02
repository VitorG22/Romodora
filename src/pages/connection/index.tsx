// import { createContext, useContext, useEffect, useState } from "react"
import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AppContext } from "../../AppContext"
import { Alert } from "../../components/toasters"
import convertMapJsonToClasses from "../maps/scripts/convertMapJsonToClasses"
import { ICharacterData, IPartyData, IPlayerData } from "../../interfaces"
import { Mob } from "../../classes/mobClasses"
import showSticker from "./board/playerCard/sticker/showSticker"

export default function Party() {
    const { partyData, setPartyData, socket } = useContext(AppContext)
    const navigate = useNavigate()


    useEffect(() => {

        socket?.off(`partyDeleted_${partyData?.partyCode}`)
        socket?.on(`partyDeleted_${partyData?.partyCode}`, () => {
            if (!setPartyData) return
            setPartyData(undefined)
            socket.removeAllListeners()
            navigate('/home')
            Alert({ message: 'Host Disconnected!' })
        })

        socket?.off(`partyStart_${partyData?.partyCode}`)
        socket?.on(`partyStart_${partyData?.partyCode}`, () => {
            navigate('/party/board')
        })

        socket?.off(`sendSticker_${partyData?.partyCode}`)
        socket?.on(`sendSticker_${partyData?.partyCode}`, (body) => {
            showSticker({
                playerId:body.playerId,
                stickerUrl: body.stickerUrl
            })
        })

    }, [])

    useEffect(() => {
        socket?.off(`setPartyData_${partyData?.partyCode}`)
        socket?.on(`setPartyData_${partyData?.partyCode}`, body => {
            if (!setPartyData) return
            console.log(body)
            console.log('setPartyData')

            let convertedPlayersList = convertAllPlayersCharactersToMobClass(body.partyData.players)
            if (body.partyData.mapData) {
                setPartyData?.({
                    ...body.partyData,
                    mapData: {
                        mapId: body.partyData.mapData.mapId,
                        mapName: body.partyData.mapData.mapName,
                        mapMatrix: convertMapJsonToClasses(body.partyData.mapData.mapMatrix)
                    },
                    players: convertedPlayersList
                })
            } else {
                setPartyData({
                    ...body.partyData,
                    players: convertedPlayersList
                })
            }
        })

        socket?.off(`requestPartyData_${partyData?.partyCode}`)
        socket?.on(`requestPartyData_${partyData?.partyCode}`, (body) => {
            socket.emit(`requestedPartyData/${body.subFunction}`, {
                partyData: partyData,
                data: body.data
            })
        })

        socket?.off(`setMapMatrix_${partyData?.partyCode}`)
        socket?.on(`setMapMatrix_${partyData?.partyCode}`, body => {
            if (!partyData) return
            setPartyData?.({
                ...partyData,
                mapData: {
                    mapId: body.newMapData.mapId,
                    mapName: body.newMapData.mapName,
                    mapMatrix: convertMapJsonToClasses(body.newMapData.mapMatrix)
                }
            })
        })

        socket?.off(`setSelectedCharacter_${partyData?.partyCode}`)
        socket?.on(`setSelectedCharacter_${partyData?.partyCode}`, ({ characterData, userId }: { characterData: ICharacterData, userId: string }) => {
            let newPlayersList = convertPlayersCharactersToMobClass({partyData, characterData, userId })
            if(!newPlayersList || !partyData)return

            setPartyData?.({
                ...partyData,
                players: newPlayersList
            })
        })

    }, [partyData])

    

    return (
        <section className='text-romo-100'>
            <Outlet />
        </section >
    )
}

function convertPlayersCharactersToMobClass({partyData, characterData, userId }: {partyData:IPartyData| undefined, characterData: ICharacterData, userId: string }) {
    {
        if (!partyData) return

        let playerIndex = partyData.players.findIndex((playerData) => playerData.id == userId)
        if (!playerIndex) return

        let playerToChange = partyData.players[playerIndex]
        if (!playerToChange) return

        console.log(characterData)

        let newCharacterData = new Mob({
            color: playerToChange.color,
            ownerId: userId,
            position: { X: -999, Y: -999 },
            paths: [{ name: characterData.name, path: [characterData.picture || ""] }],
            variant: 0,
            size: { X: 1, Y: 1 },
            rotate: 'top',
            canvaType: 'prop',
            status: 0,
            blockMatrix: [[1]],
            group: [{ X: -999, Y: -999 }],
            abilityScores: characterData.abilityScores,
            bag: characterData.bag,
            health: characterData.health,
            class: characterData.class,
            id: characterData.id,
            name: characterData.name,
            picture: characterData.picture,
            race: characterData.race,
            subClass: characterData.subClass,
            subRace: characterData.subRace
        })

        let newPlayersList = [...partyData.players]
        newPlayersList[playerIndex].characterData = newCharacterData

        return  newPlayersList
        
    }
}

function convertAllPlayersCharactersToMobClass(playersDataList: IPlayerData[]){
    let newPlayerDataList:IPlayerData[] = []
    playersDataList.forEach(playerData=> {
        if(!playerData.characterData) {
            newPlayerDataList.push(playerData)
            return
        }

        let convertedCharacterData = new Mob({
            color:playerData.color,
            ownerId: playerData.id,
            position: { X: -999, Y: -999 },
            paths: [{ name: playerData.characterData.name, path: [playerData.characterData.picture || ""] }],
            variant: 0,
            size: { X: 1, Y: 1 },
            rotate: 'top',
            canvaType: 'prop',
            status: 0,
            blockMatrix: [[1]],
            group: [{ X: -999, Y: -999 }],
            abilityScores: playerData.characterData.abilityScores,
            bag: playerData.characterData.bag,
            health: playerData.characterData.health,
            class: playerData.characterData.class,
            id: playerData.characterData.id,
            name: playerData.characterData.name,
            picture: playerData.characterData.picture,
            race: playerData.characterData.race,
            subClass: playerData.characterData.subClass,
            subRace: playerData.characterData.subRace
        })

        newPlayerDataList.push({
            ...playerData,
            characterData: convertedCharacterData    
        })
        
    })
    console.log(newPlayerDataList)
    return newPlayerDataList
}