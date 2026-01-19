import type { TItems } from "../../items/itemsClass";
import ParseItem from "../../items/JsonToClassParser";
import { drawInCanvas, eraseCanvas } from "../../maps/editMap/canvas";

export type TEntity = Entity | Character

export interface IEntity {
    name: string,
    id: string,
    picture: string,
    life: number,
    maxLife: number,
    position: { x: number, y: number }
    lastPosition: { x: number, y: number }
    inventory: TItems[]
    emitSocket?: ({ event, data }: { event: string, data: any }) => void
}

export class Entity {
    name; id; picture; life; maxLife; position; lastPosition; inventory; emitSocket;

    constructor(data: IEntity) {
        this.name = data.name
        this.id = data.id
        this.picture = data.picture
        this.life = data.life
        this.maxLife = data.maxLife
        this.position = data.position
        this.lastPosition = data.lastPosition || { x: -99999, y: -99999 }
        this.inventory = data.inventory.map(item=> ParseItem(item, data.emitSocket))
        this.emitSocket = data.emitSocket
    }


    changePosition(x: number, y: number) {
        this.emitSocket?.({
            event:"entity_move",
            data: {position:{x: x,y: y}}
        })
    }

    heal(healValue: number) {
        this.emitSocket?.({
            event:'entity_heal',
            data: {healValue: healValue}
        })
    }

    damage(damageValue: number) {
        this.emitSocket?.({
            event:'entity_damage',
            data: {healValue: damageValue}
        })
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
            },
            needProxy: false
        })
    }

    getInteractionTableFunctionsAsPrimaryObject() {
        return {
            Title: this.name,
            list: [
                {
                    name: "Move To",
                    executableFunction: (data: any) => this.changePosition(data.x, data.y)
                },
            ]
        }
    }

    getInteractionTableFunctionsAsSecondaryObject() {
        return {
            Title: this.name,
            list: [
                {
                    name: "Damage",
                    executableFunction: (data: any) => this.damage(data.value || 0)
                },
            ]
        }
    }

}


export interface ICharacter extends IEntity {
    level:number
    class: string,
    subClass: string,
    race: string,
    subRace: string,
    attributes: {
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
    }
}

export class Character extends Entity{
    class;subClass;race;subRace;attributes;level;
    constructor(data:ICharacter){
        super(data)
        this.level =  data.level
        this.class =  data.class
        this.subClass =  data.subClass
        this.race =  data.race
        this.subRace =  data.subRace
        this.attributes = data.attributes
    }

    changeAttribute({attribute, value}:{attribute:"strength"|"dexterity"|"constitution"|"intelligence"|"wisdom"|"charisma", value: number}){
        this.emitSocket?.({
            event:'entity_changeAttribute',
            data:{attribute:attribute,value:value}
        })
    }
    
}