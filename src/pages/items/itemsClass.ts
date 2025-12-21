import rowDices from "../../scripts/rowDice"
import type { Entity } from "../game/table/entitysClasses"

export type TItems = MeleeWeapon | RangedWeapon | Ammo

interface IItem {
    id: string
    name: string
    picture?: string
    amount: number
    maxStack: number
    rarity: "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary"
    price: number
    description: string
    weight: number
    type: "meleeWeapon"| "rangedWeapon" | "armor" | "shield" | "tool" | "ammo" | "kit" | "accessories" | "consumable" | "catalysts" | "bag" | "materials"
}

export class Item {
    id;name; picture; amount; maxStack; rarity; price; description; weight;type;
    constructor(data: IItem) {
        this.id = data.id || ""
        this.name = data.name
        this.picture = data.picture
        this.amount = data.amount
        this.maxStack = data.maxStack
        this.rarity = data.rarity
        this.price = data.price
        this.description = data.description
        this.weight = data.weight
        this.type = data.type
    }

    getInteractionTableFunctionsAsPrimaryObject(){}
    getInteractionTableFunctionsAsSecondaryObject(){}
}

// ----- Weapons ----- //


interface IWeapon extends IItem {
    isMagic: boolean
    damage: {
        diceCount: number,
        diceValue: number,
        versatileDiceValue?: number
        type: "slashing" | "bludgeoning" | "piercing"
        bonus: number
    },


}

class Weapon extends Item {
    isMagic; damage
    constructor(data: IWeapon) {
        super(data)
        this.isMagic = data.isMagic
        this.damage = data.damage

    }


}


type TMeleeWeaponProperty = "light" | "finesse" | "heavy" | "two-handed" | "versatile" | "reach" | "thrown" | "loading"
interface IMeleeWeapon extends IWeapon {
    range: number
    property: TMeleeWeaponProperty[]
}

export class MeleeWeapon extends Weapon {
    range; property;
    constructor(data: IMeleeWeapon) {
        super(data)
        this.type = "meleeWeapon"
        this.range = data.range || 1.5
        this.property = data.property || []
    }

    private Attack(entity: Entity, useVersatileDamage: boolean = false) {
        let totalValue = 0

        if (useVersatileDamage == true && this.damage.versatileDiceValue) {
            let diceRowResult = rowDices(this.damage.versatileDiceValue, this.damage.diceCount)
            totalValue = diceRowResult.totalValue
        } else {
            let diceRowResult = rowDices(this.damage.diceValue, this.damage.diceCount)
            totalValue = diceRowResult.totalValue
        }

        entity.damage(totalValue + this.damage.bonus)
    }


    getInteractionTableFunctionsAsPrimaryObject() {
        let interactionsList = []

        // Attack logic
        if (this.property.includes('versatile')) {
            interactionsList.push({
                name: "Attack (With one Hand)",
                executableFunction: (data: any) => this.Attack(data.secondaryEntity, false),
                disable: false

            }, {
                name: "Attack (With two Hands)",
                executableFunction: (data: any) => this.Attack(data.secondaryEntity, true),
                disable: false
            })
        } else {
            interactionsList.push({
                name: "Attack",
                executableFunction: (data: any) => this.Attack(data.secondaryEntity, false),
                disable: false
            })
        }


        return {
            Title: this.name,
            list: interactionsList
        }
    }

    getInteractionTableFunctionsAsSecondaryObject() {
        return {
            Title: this.name,
            list: [
                // {
                //     name: "Damage",
                //     executableFunction: (data: any) => { }
                // },
            ]
        }
    }

}


type TRangedWeaponProperty = "light" | "finesse" | "heavy" | "two-handed" | "ammunition" | "loading"
interface IRangedWeapon extends IWeapon {
    range: {
        normal: number,
        long?: number
    }
    property: TRangedWeaponProperty[]
}

export class RangedWeapon extends Weapon {
    linkedAmmo?: Ammo;
    range; property;

    constructor(data: IRangedWeapon) {
        super(data)
        this.type = 'rangedWeapon'
        this.range = data.range
        this.property = data.property || []
        this.linkedAmmo = undefined
    }

    linkAmmo(ammo: Ammo) {
        this.linkedAmmo = ammo
    }

    private Attack(entity: Entity) {
        let diceRowResult = rowDices(this.damage.diceValue, this.damage.versatileDiceValue)

        if (this.property.includes('ammunition')) {
            if (this.linkedAmmo && this.linkedAmmo.amount > 0) {
                entity.damage(diceRowResult.totalValue + this.damage.bonus + this.linkedAmmo!.Attack())
            }
        } else {
            entity.damage(diceRowResult.totalValue + this.damage.bonus)
        }
    }


    getInteractionTableFunctionsAsPrimaryObject() {
        let interactionsList = []

        // Attack logic
        interactionsList.push({
            name: "Attack",
            executableFunction: (data: any) => this.Attack(data.secondaryEntity),
            disable: (() => {
                if (!this.property.includes("ammunition")) return false
                if (this.linkedAmmo && this.linkedAmmo.amount > 0) return false
                return true
            })()

        })



        return {
            Title: this.name,
            list: interactionsList
        }
    }

    getInteractionTableFunctionsAsSecondaryObject() {
        return {
            Title: this.name,
            list: [
                // {
                //     name: "Damage",
                //     executableFunction: (data: any) => { }
                // },
            ]
        }
    }

}

// -------------------- //

interface IAmmo extends IItem {
    isMagic: boolean
    damage: {
        fixedValue: number
        diceCount: number
        diceValue: number
        bonus: number
    }
}

export class Ammo extends Item {
    isMagic; damage;
    constructor(data: IAmmo) {
        super(data)
        this.type = 'ammo'
        this.isMagic = data.isMagic
        this.damage = data.damage
    }


    remove(value: number = 1) {
        if (this.amount - value < 0) {
            this.amount = 0
        } else {
            this.amount -= value
        }
    }
    add(value: number = 1) {
        if (this.amount + value > this.maxStack) {
            this.amount - this.maxStack
        } else {
            this.amount += value
        }
    }

    Attack() {
        let rowsResult = rowDices(this.damage.diceValue, this.damage.diceCount)
        this.remove()

        return (this.damage.fixedValue + rowsResult.totalValue + this.damage.bonus)
    }

}