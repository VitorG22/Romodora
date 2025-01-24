import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { IAbilityScore, ICharacterData } from "../../../../interfaces"

export default function AbilityPoints({ label, AbilityKey, characterData, setCharacterData }: { label: string, characterData: ICharacterData, setCharacterData: React.Dispatch<React.SetStateAction<ICharacterData>>, AbilityKey: "strength" | "charisma" | "wisdom" | "intelligence" | "dexterity" | "constitution" }) {
    const [thisAbilityValues, setThisAbilityValues] = useState<IAbilityScore>(characterData.abilityScores[AbilityKey])

    const handleClickBaseScorePlus = () => {
        setModifier({ baseScore: thisAbilityValues.baseScore + 1 })
    }
    const handleClickBaseScoreMinus = () => {
        setModifier({ baseScore: thisAbilityValues.baseScore - 1 })
    }


    // define o valor do modificador de atributo apartir do valor base do atributo
    const setModifier = ({ baseScore }: { baseScore: number }) => {
        let modifierValue = 0
        switch (true) {
            case (baseScore <= 1): modifierValue = -5; break
            case (baseScore <= 3): modifierValue = -4; break
            case (baseScore <= 5): modifierValue = -3; break
            case (baseScore <= 7): modifierValue = -2; break
            case (baseScore <= 9): modifierValue = -1; break
            case (baseScore <= 11): modifierValue = 0; break
            case (baseScore <= 13): modifierValue = 1; break
            case (baseScore <= 15): modifierValue = 2; break
            case (baseScore <= 17): modifierValue = 3; break
            case (baseScore <= 19): modifierValue = 4; break
            case (baseScore <= 21): modifierValue = 5; break
            case (baseScore <= 23): modifierValue = 6; break
            case (baseScore <= 25): modifierValue = 7; break
            case (baseScore <= 27): modifierValue = 8; break
            case (baseScore <= 29): modifierValue = 9; break
            case (baseScore >= 30): modifierValue = 10; break

        }

        setThisAbilityValues({
            ...thisAbilityValues,
            baseScore: baseScore,
            modifier: modifierValue
        })
    }


    useEffect(() => {

        setThisAbilityValues({
            ...thisAbilityValues,
            totalScore: thisAbilityValues.baseScore + thisAbilityValues.bonus + thisAbilityValues.setScore + thisAbilityValues.stackingBonus
        })
    }, [thisAbilityValues.modifier, thisAbilityValues.baseScore])

    useEffect(() => {
        // define os valores dos atributos no objeto principal do personagem
        setCharacterData({
            ...characterData,
            abilityScores: {
                ...characterData.abilityScores,
                [AbilityKey]: thisAbilityValues
            }
        })
    }, [thisAbilityValues.totalScore])

    return (
        <div className='flex flex-row justify-between items-center gap-3 w-full'>
            <label
                htmlFor={label}
                className="text-romo-200 font-thin text-xs text-nowrap w-fit min-w-16"
            >{label} :</label>
            <div className="flex flex-row items-center">
                <button type='button' onClick={handleClickBaseScoreMinus} className='p-[2px] rounded-sm text-romo-100 hover:bg-romo-200/10 mt-1'>
                    <ChevronLeft size={10} strokeWidth={1} />
                </button>
                <input type="text" disabled value={thisAbilityValues.baseScore} className='w-8 flex flex-row bg-transparent text-center py-1 outline-none text-romo-200 ' />
                <button type='button' onClick={handleClickBaseScorePlus} className='p-[2px] rounded-sm text-romo-100 hover:bg-romo-200/10 mt-1'>
                    <ChevronRight size={10} strokeWidth={1} />
                </button>
            </div>
            <div className='relative flex h-full p-2 justify-center items-center text-xs text-romo-200 font-thin aspect-square'>
                <p className='z-10'>{thisAbilityValues.modifier}</p>
                <div className="absolute z-0 h-6 rotate-45  aspect-square border border-romo-200 "></div>
            </div>
        </div>
    )
}