import SquareButton from "../../../../components/buttons";
import * as Modal from '../../../../components/modal'
import { useState, useEffect, useContext } from "react";
import { Map } from "lucide-react";
import { IJourney, JourneyCard } from '../journeys/index'
import { PostData } from "../../../../scripts/api/postData";
import { AppContext } from "../../../../AppContext";

export default function ResumeJourney() {
    const [isJourneysModalOpen, setIsJourneysModalOpen] = useState<boolean>(false)
    const [journeyList, setJourneyList] = useState<IJourney[]>([])
    const {token} = useContext(AppContext)

    useEffect(() => {
        getJourneys()
    }, [])

    const getJourneys = async() =>{
        const res = await PostData({
            route: '/myJourney',
            data: {token: token}
        }) 

        if(res.data.status == 'fail') return

        setJourneyList(res.data.result)
    }

    

    return (
        <>
            <SquareButton variant="secondary" onClick={() => setIsJourneysModalOpen(true)} size="lg">
                <Map size={15} strokeWidth={1} />
                Start Journey
            </SquareButton>
            {isJourneysModalOpen&&
                <JourneyModal journeyList={journeyList} setIsJourneysModalOpen={setIsJourneysModalOpen}/>
            }
        </>
    )
}


function JourneyModal({ journeyList, setIsJourneysModalOpen }: {journeyList:IJourney[], setIsJourneysModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    
    return (
        <Modal.Container title={'Jornadas'} setIsModalOpen={setIsJourneysModalOpen}>
            {journeyList.map(element => <JourneyCard journeyData={element} />)}
        </Modal.Container>
    )
}