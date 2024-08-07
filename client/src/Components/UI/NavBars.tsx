import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function TopBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate()
    
    return (
        <div>
            <div className="z-0	 p-2 md:px-24 flex justify-between border-b border-black">
                <div className="flex items-center text-xl">
                <a href="https://x.com/itzzdanish" target="_blank">
                    <img src="logo.png" alt="logo" className="w-16 rounded-full" /> </a>
                    <div><a href="https://x.com/itzzdanish" target="_blank">Medium</a></div>
                    
                </div>
                <div className=" flex items-center cursor-pointer">
                    <div className="hidden md:block p-2 ml-2 md:mx-2 md:py-2 md:px-4 "
                        onClick={() => {
                            navigate("/all")
                        }}>Read</div>
                    <div className="hidden md:block p-2 ml-2 md:mx-2 md:py-2 md:px-4 "
                        onClick={() => {
                            navigate("/create")
                        }}>Publish</div>
                    <div className="hidden md:block p-2 ml-2 md:mx-2 md:py-2 md:px-4 "
                        onClick={() => {
                            navigate("/myblogs")
                        }}>My Blogs</div>
                    <div className="hidden md:block p-2 ml-2 md:mx-2 md:py-2 md:px-4 "
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/")
                            toast.success("Logout")
                        }}>Logout</div>
                     <div className="block md:hidden p-2 ml-2 md:mx-2 md:py-2 md:px-4 "
                        onClick={() => setIsMenuOpen(true)}>
                        <img src="menu.svg" alt="Menu" />
                </div>
                </div>

            </div>

            {isMenuOpen && (
                <div className="phone z-10 p-2 fixed top-0 right-0 bg-white border-black w-6/12 h-screen font-medium text-lg">
                    <div className="flex justify-end ">
                        <img src="close.svg" alt="Closcursor-pointer"
                            onClick={() => setIsMenuOpen(false)} />
                    </div>
                    <div className="flex flex-col items-center space-y-4 cursor-pointer">
                        <div className="mt-8 p-3 "
                            onClick={() => {
                                navigate("/all");
                                setIsMenuOpen(false);
                            }}>Read</div>
                        <div className="p-3 "
                            onClick={() => {
                                navigate("/create");
                                setIsMenuOpen(false);
                            }}>Publish</div>
                        <div className="p-3 "
                            onClick={() => {
                                navigate("/myblogs");
                                setIsMenuOpen(false);
                            }}>My Blogs</div>
                        <div className="p-3 "
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/");
                                toast.success("Logout");
                                setIsMenuOpen(false);
                            }}>Logout</div>
                    </div>
                </div>
            )}
        </div>
    );
}
export function RootTopBar() {
    const navigate = useNavigate()
    return (
        <div className="py-2 pl-4 md:px-24 flex justify-between border-b border-black">
            <div className="py-3 flex items-center font-bold text-2xl md:text-3xl">
                <div>Medium </div>
            </div>
            <div className="flex items-center">
                <div className="bg-black text-white p-2 ml-2 md:mx-2 md:py-2 md:px-4 cursor-pointer border rounded-full "
                    onClick={() => {
                        navigate("/signin")
                    }}>Sign in</div>
                <div className="bg-black text-white p-2 ml-2 md:mx-2 md:py-2 md:px-4 cursor-pointer border rounded-full "
                    onClick={() => {
                        navigate("/signup")
                    }}>Get Started</div>
            </div>
        </div>
    )
}