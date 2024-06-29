import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function TopBar(){
    const navigate = useNavigate()
    return (
        <div className="py-2 px-24 flex justify-between border-b border-black">
            <div className="flex items-center text-xl">
                <img src="images.png" alt="logo" className="w-16 rounded-full" />
                <div>Medium </div>
            </div>
            <div className="flex items-center">
                <button className="mx-2 px-2 border rounded-lg "
                onClick={()=>{
                    navigate("/create")
                }}>Publish</button>
                <button className="mx-2 px-2 border rounded-lg "
                onClick={()=>{
                    localStorage.removeItem("token")
                    navigate("/")
                    toast.success("Logout")
                }}>Logout</button>
            </div>
        </div>
    )   
}

export function RootTopBar(){
const navigate = useNavigate()
return (
    <div className="py-2 px-24 flex justify-between border-b border-black">
        <div className="py-3 flex items-center font-bold text-3xl">
            <div>Medium </div>
        </div>
        <div className="flex items-center">
            <div className="mx-2 p-2 cursor-pointer border rounded-2xl "
            onClick={()=>{
                navigate("/signin")
            }}>Sign in</div>
            <div className="bg-black text-white mx-2 p-2 cursor-pointer border rounded-2xl "
            onClick={()=>{
                navigate("/signup")
            }}>Get Started</div>
        </div>
    </div>
)
}