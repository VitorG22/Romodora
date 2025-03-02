interface IItem {
    id:string
    name: string,
    description: string,
    type: 'potion' | 'weapon' | 'money' | 'utility'
    usageCount: number | 'infinite'
    image: string,
}

export interface IWeapon extends IItem {
    launch: {
        isLaunchable: boolean,
        range?: number
    }
    ammunation: {
        needAmmunition: boolean,
        ammunationId?: string
    }
    damage: {
        diceType: number,
        diceAmount: number,
        damageType: 'physical' | 'fire' | 'ice' | 'poison' | 'electro'
        effectArea: number
    },

}

export interface IPotion extends IItem {
    launch: {
        isLaunchable: boolean,
        range?: number
    }
    damage?: {
        diceType: number,
        diceAmount: number,
        damageType: 'physical' | 'fire' | 'ice' | 'poison' | 'electro'
        effectArea: number
    },
    heal?: {
        diceType: number,
        diceAmount: number,
        effectArea: number
    }
}

class Item {

    name; description; type; usageCount; image;id

    constructor(data: IItem) {
        this.id = data.id
        this.name = data.name
        this.description = data.description.replace(/-ansi-/g, "\x1b[")
        this.type = data.type
        this.usageCount = data.usageCount
        this.image = data.image
    }
}

export class ItemPotion extends Item {
    launch; damage; heal;
    constructor(data: IPotion) {
        super(data)
        this.launch = data.launch
        this.damage = data.damage
        this.heal = data.heal
    }

    getActions() {
        let actions: string[] = []

        if (this.launch.isLaunchable == true) { actions.push('Throw') }
    }


    Throw({ tileCount }: { tileCount: { X: number, Y: number } }) {
        let canva: HTMLCanvasElement | null = document.getElementById('canvasCover') as HTMLCanvasElement
        if (canva == null) return

        const throwCallback = (e: MouseEvent) => {
            let {tileX, tileY} = handleGetCanvasMousePosition({e, tileCount})
            this.DoDamage({tileX, tileY})

            canva.removeEventListener("click", throwCallback)
        }

        canva.addEventListener("click", throwCallback)
        canva.addEventListener("mousemove", throwCallback)

    }

    DoDamage({tileX, tileY}: {tileX:number, tileY:number}){
        let areaEffect:{X:number,Y:number}[] = []
        if(!this.damage)return

        for(let rowPosition = tileY - this.damage.effectArea; rowPosition <= tileY + this.damage.effectArea ; rowPosition++ ){
            for(let columnPosition = tileX - this.damage.effectArea; columnPosition <= tileX + this.damage.effectArea ; columnPosition++ ){
                areaEffect.push({X:columnPosition, Y:rowPosition})
            }
        }
    }

    GhostDraw({color, area}:{color:string, area:{X:number, Y:number}[]}){
        let canva: HTMLCanvasElement | null = document.getElementById('canvasCover') as HTMLCanvasElement
        if (canva == null) return

        let canvaCtx = canva.getContext('2d')
        if(!canvaCtx)return

        canvaCtx.fillStyle = color
        canvaCtx.strokeStyle = color
        canvaCtx.lineWidth = 2
        area.forEach(blockInArea =>{
            canvaCtx.fillRect(blockInArea.X * 100, blockInArea.Y * 100, (blockInArea.X+1) * 100, (blockInArea.Y+1) * 100)
            canvaCtx.strokeRect(blockInArea.X * 100 , blockInArea.Y * 100, (blockInArea.X+1) * 100, (blockInArea.Y+1) * 100)
        })
    }
}

function handleGetCanvasMousePosition({ e, tileCount }: { e: MouseEvent, tileCount: { X: number, Y: number } }) {
    let canva: HTMLCanvasElement | null = document.getElementById('canvasCover') as HTMLCanvasElement
    if (canva == null) return ({ tileX: -1, tileY: -1 })

    const tilePercentWidth = 100 / tileCount.X
    const mousePositionXPercent = (e.offsetX / canva.offsetWidth) * 100
    const tileX = Math.floor(mousePositionXPercent / tilePercentWidth)

    const tilePercentHeight = 100 / tileCount.Y
    const mousePositionYPercent = (e.offsetY / canva.offsetHeight) * 100
    const tileY = Math.floor(mousePositionYPercent / tilePercentHeight)

    return ({ tileX, tileY })
}