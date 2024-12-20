import { UserPen } from "lucide-react";
import SquareButton from "../../../../components/buttons";
import { useNavigate } from "react-router-dom";

export default function CharacterEdit() {
    const navigate = useNavigate()
    const handleClickCharacterEdit = () =>{
        navigate('/character')
    }
    
    return (
        <SquareButton variant="default" size="lg" onClick={()=>handleClickCharacterEdit()}>
            <UserPen size={15} strokeWidth={1} />
            Editor de Personagens
        </SquareButton>
    )
}