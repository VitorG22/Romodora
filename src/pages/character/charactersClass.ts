export interface ICharacter {
    name: string,
    id: string,
    picture: string,
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
    level: number,
    life: number,
    maxLife: number,
    position: { x: number, y: number }
}