import { Outlet } from "react-router-dom";
import LateralNavBar from "../../components/navbar/lateral";

export default function ItemsPage() {


    return (
        <main className='text-romo-200 w-full h-full flex flex-row'>
            <LateralNavBar />
            <Outlet />
        </main>
    )
}