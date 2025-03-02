import { Box } from "lucide-react";
import SquareButton from "../../../../components/buttons";
import { Link, useNavigate } from "react-router-dom";

export default function Items() {
    const navigate = useNavigate()
    
    return (
        <SquareButton variant="default" size="lg" onClick={()=>navigate('/item/gallery')}>
            <Box size={15} strokeWidth={1} />
            Items
        </SquareButton>
    )
}