import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function TopBar(){
    const navigate = useNavigate()
    return (
        <div className="py-2 px-8 flex justify-between border-b">
            <div className="flex items-center text-xl">
                <img src="images.png" alt="logo" className="w-16 rounded-full" />
                <div>Medium </div>
            </div>
            <div className="flex items-center">
                <div className="mx-2 px-2 cursor-pointer border rounded-lg "
                onClick={()=>{
                    navigate("/blog")
                }}>Publish</div>
                <div className="mx-2 px-2 cursor-pointer border rounded-lg "
                onClick={()=>{
                    localStorage.removeItem("token")
                    navigate("/")
                    toast.success("Logout")
                }}>Logout</div>
            </div>
        </div>
    )
}