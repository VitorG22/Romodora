import { useContext, useState } from "react"
import * as Modal from '../../../../components/modal'
import * as Form from '../../../../components/form'
import SquareButton from "../../../../components/buttons"
import { Component, LogIn } from "lucide-react"
import { AppContext } from "../../../../AppContext" 
import { useNavigate } from "react-router-dom"

export default function ConnectToJourney() {
    const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false)

    return (
        <>
            <SquareButton variant="default" size="lg" onClick={() => setIsConnectionModalOpen(true)}>
                <Component size={15} strokeWidth={1} />
                Conectar a Jornada
            </SquareButton>
            {isConnectionModalOpen && <ConnectionModal setIsConnectionModalOpen={setIsConnectionModalOpen} />}
        </>
    )
}

function ConnectionModal({ setIsConnectionModalOpen }: { setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [partyCode, setPartyCode] = useState<string>('')
    const { socket, mainUser, setPartyData } = useContext(AppContext)
    const navigate = useNavigate()

    const handleSubmite = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!socket || !setPartyData) return
        socket.emit('connectionRequest', {
            partyCode: partyCode
        })
        socket.off(`connectionRequestAccepted_${mainUser.id}`)
        socket.on(`connectionRequestAccepted_${mainUser.id}`, (data) => {
            setPartyData(data.partyData)
            navigate(`/party/lobby/${data.partyData.partyCode}`)
            socket.emit('setPlayer', {
                userId: mainUser.id,
                partyCode: data.partyData.partyCode
            })
        })
    }

    return (
            <Modal.Container title="Conecte-se a uma Jornada" setIsModalOpen={setIsConnectionModalOpen}>
                <Form.Container onSubmit={(e) => handleSubmite(e)}>
                    <Form.InputText
                        type='text'
                        label='Codigo da Sala'
                        onChange={(e) => setPartyCode(e.target.value)}
                    />
                    <SquareButton variant='secondary' size='md' type="submit" className=''>
                        <LogIn size={15} strokeWidth={1} />
                    </SquareButton>
                </Form.Container>
            </Modal.Container>
    )
}
