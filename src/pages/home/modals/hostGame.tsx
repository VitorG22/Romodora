import { useContext, useState } from "react";
import { TableControl } from "../../game/table/TableControlerClass";
import ModalBase from "../../../assets/modal/ModalBase";
import { GameContext } from "../../../scripts/socket";
import { useNavigate } from "react-router-dom";
import type { IGame } from "../../game/gameObject";
import * as Input from '../../../assets/inputs/inputs'
import * as Switch from '../../../assets/buttons/switchs'
import * as Button from '../../../assets/buttons/buttons'
import getFormValues from "../../../assets/forms/getFormValues";
import { Loader, LoaderContainer } from "../../../assets/loader/loader";

export default function HostGameOptionsModal({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const game = useContext(GameContext)
    const [needPassword, setNeedPassword] = useState<boolean>(false)


    const hostGame = (e: React.FormEvent<HTMLFormElement>) => {
        let gameSettings = getFormValues(e)

        setIsLoading(true)
        game?.socket?.emit('createGame', {
            name: gameSettings.GameName,
            onlyFriends: gameSettings.OnlyFriends || false,
            Password: gameSettings.password || undefined
        },
            ({ status, gameData }: { status: number, gameData: IGame }) => {
                setIsLoading(false)
                if (status != 200) {
                    return
                }
                game.isHost = true
                game.lobbyId = gameData.lobbyId
                game.users = gameData.users
                game.tableControl = new TableControl({ ...game.tableControl, ...gameData.tableControl })
                game.activeSocketListeners()

                navigate('/game/lobby')

            }

        )
    }


    return (
        <ModalBase setIsModalOpen={setIsModalOpen} modalTitle="Game Options">
            {isLoading && <LoaderContainer><Loader /></LoaderContainer>
            }
            <form className='flex flex-col gap-2 min-w-90' onSubmitCapture={(e) => hostGame(e)}>
                <Input.Container color="black">
                    <Input.Label inputId="GameName" >Name</Input.Label>
                    <Input.TextInput id="GameName" name="GameName" type="text" required />
                </Input.Container>
                <Switch.Primary id="HasPassword" label="Password" name="HasPassword" onChangeFunction={(value) => setNeedPassword(value)} />
                <Input.Container color="black">
                    {needPassword && <Input.PasswordInput id="password" name="password" />}
                </Input.Container>
                <Switch.Primary id="Only_Friends" label="Only Friends" name="OnlyFriends" />
                <div className='flex flex-row gap-2'>
                    <Button.Secondary color="black" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button.Secondary>
                    <Button.Primary color="black" type='submit'>Start</Button.Primary>
                </div>

            </form>
        </ModalBase>
    )
}