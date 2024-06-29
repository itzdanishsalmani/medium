import { RootTopBar } from "../NavBars"
import { Footer } from "../Footer"
import { useNavigate } from "react-router-dom"
export function RootPage() {
    const navigate = useNavigate()
    return (
        <div className="h-screen">
            <RootTopBar />
            <div className="pl-24 grid grid-cols-12">
                <div className="col-span-8 text-8xl pt-16">
                    <div>
                        Human <br />
                        stories & ideas
                        <br />
                    </div>
                    <div className="mt-12 text-2xl">
                        A place to read, write, and deepen your understanding
                    </div>
                    <button className="bg-black text-white text-xl p-2 rounded-full" onClick={()=>{
                        navigate("/all")
                    }}>Start reading</button>
                </div>
                <div className="col-span-4 ">
                <img src="main.webp" alt="main" />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full z-10 overflow:hidden">
                <Footer/>
            </div>
        </div>
    )
}