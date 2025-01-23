import { Outlet } from "react-router-dom";
import LateralNavBar from "../../components/navbar/lateral";

export default function SettingsPage() {
    
    
    return (
        <main className='text-white w-full h-full flex flex-row'>
            <LateralNavBar />
            <Outlet />
        </main>
    )
}