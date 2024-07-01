import { RootTopBar } from "../NavBars"
import { Footer } from "../Footer"
import { useNavigate } from "react-router-dom"

export function RootPage() {
    const navigate = useNavigate()
    return (
        <div className="h-screen">
            <RootTopBar />
            <div className="pl-4 md:pl-24 md:grid grid-cols-12">
                <div className="col-span-8 text-6xl md:text-8xl pt-16">
                    <div>
                        Human <br />
                        stories & ideas
                        <br />
                    </div>
                    <div className="mt-12 text-2xl">
                        A place to read, write, and deepen your understanding
                    </div>
                    <button className="bg-green-600 text-white text-xl px-4 py-2 rounded-full" onClick={()=>{
                        navigate("/all  ")
                    }}>Start reading</button>
                </div>
                <div className="col-span-4">
                <img src="main.webp" alt="main" className="invisible md:visible" />
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}