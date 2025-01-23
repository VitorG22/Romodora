import { Plus } from "lucide-react";
import SquareButton from "../../../../components/buttons";
import { useContext, useState } from "react";
import * as Modal from '../../../../components/modal'
import * as Form from '../../../../components/form'
import { PostData } from "../../../../scripts/api/postData";
import { AppContext } from "../../../../AppContext";
import { useNavigate } from "react-router-dom";
import hostParty from "../../../connection/host";
import { IPartyData } from "../../../../interfaces";

export default function NewJourney() {
    const [isCreateJourneyModalOpen, setIsCreateJourneyModalOpen] = useState<boolean>(false)
    return (
        <>
            <SquareButton variant="default" size="lg" onClick={() => setIsCreateJourneyModalOpen(true)}>
                <Plus size={15} strokeWidth={1} />
                New Journey
            </SquareButton>
            {isCreateJourneyModalOpen && <NewJourneyModal setIsCreateJourneyModalOpen={setIsCreateJourneyModalOpen} />}
        </>
    )
}

function NewJourneyModal({ setIsCreateJourneyModalOpen }: { setIsCreateJourneyModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [bannerPath, setBannerPath] = useState<string>('')
    const {mainUser,token,socket,setPartyData, partyData } = useContext(AppContext)
    const navigate = useNavigate()

    const handleSubmite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, banner } = Form.getFormData(e)
        try {
            const res = await PostData({
                route: '/createJourney',
                data: {
                    name: name,
                    banner: banner,
                    token: token
                }
            })
            if (res.data.status = 'success'){
                if(!socket || !setPartyData) throw new Error('socket or setPart undefined')
                hostParty({
                    journeyId:res.data.result.id,
                    mainUser: mainUser,
                    socket: socket,
                    token: token,
                    partyData:partyData,
                    callBack: (partyData:IPartyData)=>{
                        setPartyData(partyData)
                        navigate(`/party/lobby/${partyData.partyCode}`)
                    }
                })
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal.Container key='newJourneyModal' title="Nova Jornada" setIsModalOpen={setIsCreateJourneyModalOpen} >
            <Form.Container onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmite(e)}>
                <Form.InputText name='name' type="text" label="Nome da Jornada" />
                <div className="flex flex-row gap-2">
                    <Form.InputText name='banner' type="text" label="Banner" placeholder="Url da Imagem" onChange={(e) => setBannerPath(e.target.value)} />
                    <div className='flex justify-center items-center h-12 aspect-square overflow-hidden rounded-md'>
                        <img src={bannerPath} alt='' />
                    </div>
                </div>
                <section className='flex justify-end mt-4 gap-2'>
                    <SquareButton type='button' size="md" variant="ghost" >
                        Cancelar
                    </SquareButton>
                    <SquareButton type="submit" size="md" variant="secondary" >
                        Criar
                    </SquareButton>
                </section>
            </Form.Container>
        </Modal.Container >
    )
}