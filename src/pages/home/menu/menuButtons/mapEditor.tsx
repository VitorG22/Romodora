import { useNavigate } from "react-router-dom"
import SquareButton from "../../../../components/buttons"
import { Map } from "lucide-react"

export default function MapEditorButton() {

    const navigate = useNavigate()
    
    return (
            <SquareButton onClick={()=>navigate('/map')} variant="default" size="lg">
                <Map size={15} strokeWidth={1} />
                Maps
            </SquareButton>
    )
}