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
                <button className="bg-green-600 text-white mx-2 py-2 px-4 border rounded-full "
                onClick={()=>{
                    navigate("/create")
                }}>Publish</button>
                <button className="bg-green-600 text-white mx-2 py-2 px-4  border rounded-full"
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
            <div className="bg-black text-white mx-2 py-2 px-4 cursor-pointer border rounded-full "
            onClick={()=>{
                navigate("/signin")
            }}>Sign in</div>
            <div className="bg-black text-white mx-2 py-2 px-4 cursor-pointer border rounded-full "
            onClick={()=>{
                navigate("/signup")
            }}>Get Started</div>
        </div>
    </div>
)
}