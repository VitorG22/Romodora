import { useContext } from "react";
import DicesTab from "./dices";
import { GameContext } from "../../../../../../scripts/socket";
import { useNavigate } from "react-router-dom";
import * as Button from '../../../../../../assets/buttons/buttons'
import { LogOutIcon } from "lucide-react";

export default function Personal() {
    const game = useContext(GameContext)
    const navigate = useNavigate()

    const quitGame = () => {
        game!.quitGame();
        navigate('/home')
    }

    return (
        <section className='flex flex-row justify-between h-full w-full items-end'>
            <DicesTab />

            <div className='m-2 w-40'>
                <Button.Primary color="white" onClick={quitGame} className="flex flex-row justify-center gap-2">
                    <LogOutIcon strokeWidth={1} />
                    Quit
                </Button.Primary>
            </div>

        </section>

    )
}