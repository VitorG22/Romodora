import { Ammo, MeleeWeapon, RangedWeapon, type TItems } from "./itemsClass";

export default function ParseItem(data: TItems, emitSocket?: ({ event, data }: { event: string, data: any }) => void){
    if(emitSocket){
        data.emitSocket = emitSocket
    }
    
    switch (data.type) {
        case "meleeWeapon":
            return new MeleeWeapon(data as any)
        case "rangedWeapon":
            return new RangedWeapon(data as any)
        // case "armor":
        //     break
        // case "shield":
        //     break
        // case "tool":
        //     break
        case "ammo":
            return new Ammo(data as any)
        // case "kit":
        //     break
        // case "accessories":
        //     break
        // case "consumable":
        //     break
        // case "catalysts":
        //     break
        // case "bag":
        //     break
        // case "materials":
        //     break
        default:
            return new MeleeWeapon(data as any)
    }
}

export function generateDefaultItem(type: "meleeWeapon" | "rangedWeapon" | "armor" | "shield" | "tool" | "ammo" | "kit" | "accessories" | "consumable" | "catalysts" | "bag" | "materials"): TItems {
    switch (type) {
        case "meleeWeapon":
            return new MeleeWeapon({
                id: '',
                amount: 1,
                damage: {
                    bonus: 0,
                    diceCount: 0,
                    diceValue: 0,
                    type: 'bludgeoning',
                },
                description: "",
                isMagic: false,
                maxStack: 1,
                name: "",
                price: 0,
                property: [],
                range: 0,
                rarity: "Common",
                type: "meleeWeapon",
                weight: 0,
                picture: ""
            })
        case "rangedWeapon":
            return new RangedWeapon({
                id: '',
                amount: 1,
                damage: {
                    bonus: 0,
                    diceCount: 0,
                    diceValue: 0,
                    type: 'piercing',
                },
                description: "",
                isMagic: false,
                maxStack: 1,
                name: "",
                price: 0,
                property: [],
                range: {
                    normal: 1,
                    long: 1
                },
                rarity: "Common",
                type: "rangedWeapon",
                weight: 0,
                picture: ""
            })
        // case "armor":
        //     return new
        // case "shield":
        //     return new
        // case "tool":
        //     return new
        case "ammo":
            return new Ammo({
                amount: 1,
                damage: {
                    bonus: 0,
                    diceCount: 1,
                    diceValue: 4,
                    fixedValue: 0
                },
                description:'',
                id: '',
                isMagic: false,
                maxStack:1,
                name: '',
                price: 0,
                rarity: "Common",
                type: "ammo",
                weight: 0,
                picture: ''

            })
        // case "kit":
        //     return new
        // case "accessories":
        //     return new
        // case "consumable":
        //     return new
        // case "catalysts":
        //     return new
        // case "bag":
        //     return new
        // case "materials":
        //     return new
        default:
            return new MeleeWeapon({
                id: '',
                amount: 1,
                damage: {
                    bonus: 0,
                    diceCount: 0,
                    diceValue: 0,
                    type: 'bludgeoning',
                },
                description: "",
                isMagic: false,
                maxStack: 1,
                name: "",
                price: 0,
                property: [],
                range: 0,
                rarity: "Common",
                type: "meleeWeapon",
                weight: 0,
                picture: ""
            })
    }
}