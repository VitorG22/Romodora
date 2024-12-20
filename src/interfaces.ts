import React from "react";
import { Socket } from "socket.io-client";
import { ITileData } from "./pages/maps/newMap/updateMapMatrix";


export interface IAppProvider{
    token:string,
    mainUser:IMainUser,
    socket?: Socket
    partyData?: IPartyData,
    characters: ICharacterData[],
    setMainUser?:React.Dispatch<React.SetStateAction<IMainUser>>
    setToken?:React.Dispatch<React.SetStateAction<string>>
    setPartyData?:React.Dispatch<React.SetStateAction<IPartyData | undefined>>
    setCharacters?:React.Dispatch<React.SetStateAction<ICharacterData[]>>
    setSocket?:React.Dispatch<React.SetStateAction<Socket | undefined>>


}

export interface IMainUser{
    name:string,
    id: string,
    email:string,
    picture:string,
    token?:string,
    token_expire?:Date
}

export interface IPartyData {
    partyCode: string,
    hostId: string,
    players: IPlayerData[],
    journeyData: {
        id: string,
        name: string,
        owner: string,
        banner: string
    },
    mapMatrix: ITileData[][]
}

export interface IPlayerData{
    
        name: string,
        id: string,
        picture: string,
        email: string,
        permissionType: 'host' | 'player',
        characterData: ICharacterData | undefined
    
}

export interface ICharacterData{
    name:string,
    id:string,
    picture:string,
    class:string
    subClass?:string,
    race:string,
    subRace?:string,
    bag: any,
    health:{
        maxHealthTotal:number,
        maxHealthBase:number,
        maxHealthBonus:number,
        currentHealth:number,
        currentHealthBonus: number,
    },
    abilityScores:{
        strength:IAbilityScore,
        dexterity:IAbilityScore,
        constitution:IAbilityScore,
        intelligence:IAbilityScore,
        wisdom:IAbilityScore,
        charisma:IAbilityScore,
    }
}

export interface IAbilityScore{
    totalScore: number,
    modifier: number,
    baseScore: number,
    bonus: number,
    setScore:number,
    stackingBonus:number,
    
}