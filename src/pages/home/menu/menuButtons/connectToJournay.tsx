import { useContext, useState } from "react"
import * as Modal from '../../../../components/modal'
import * as Form from '../../../../components/form'
import SquareButton from "../../../../components/buttons"
import { Component, LogIn } from "lucide-react"
import { AppContext } from "../../../../AppContext" 
import { useNavigate } from "react-router-dom"
import { TransparentLoader } from "../../../../components/loaders/loader"

export default function ConnectToJourney() {
    const [isConnectionModalOpen, setIsConnectionModalOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <>
            <SquareButton variant="default" size="lg" onClick={() => setIsConnectionModalOpen(true)}>
                <Component size={15} strokeWidth={1} />
                Connect to Journey
            </SquareButton>
            {isConnectionModalOpen && <ConnectionModal setIsLoading={setIsLoading} setIsConnectionModalOpen={setIsConnectionModalOpen} />}
            {isLoading && <TransparentLoader />}

        </>
    )
}

function ConnectionModal({ setIsConnectionModalOpen, setIsLoading }: { setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>, setIsLoading:React.Dispatch<React.SetStateAction<boolean>> }) {
    const [partyCode, setPartyCode] = useState<string>('')
    const { socket, mainUser, setPartyData } = useContext(AppContext)
    const navigate = useNavigate()

    const handleSubmite = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!socket || !setPartyData) return
        setIsLoading(true)
        socket.emit('connectionRequest', {
            partyCode: partyCode
        })
        socket.off(`connectionRequestAccepted_${mainUser.id}`)
        socket.on(`connectionRequestAccepted_${mainUser.id}`, (data) => {
            setPartyData(data.partyData)
            setIsLoading(false)
            setIsConnectionModalOpen(false)
            navigate(`/party/lobby/${data.partyData.partyCode}`)
            socket.emit('setPlayer', {
                userId: mainUser.id,
                partyCode: data.partyData.partyCode
            })
        })
        socket.off(`connectionRequestRejected_${mainUser.id}`)
        socket.on(`connectionRequestRejected_${mainUser.id}`,()=>{
            setIsLoading(false)
        })
    }

    return (
            <Modal.Container title="Conecte-se a uma Jornada" setIsModalOpen={setIsConnectionModalOpen}>
                <Form.Container onSubmit={(e) => handleSubmite(e)} className='flex flex-row items-end p-4 '>
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
