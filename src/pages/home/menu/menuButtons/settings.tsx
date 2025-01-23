import { SettingsIcon } from "lucide-react";
import SquareButton from "../../../../components/buttons";
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const navigate = useNavigate()
        const handleClickSettings = () =>{
            navigate('/settings')
        }
    
    return (
        <SquareButton onClick={handleClickSettings} variant="default" size="lg">
            <SettingsIcon size={15} strokeWidth={1} />
            Settings
        </SquareButton>
    )
}