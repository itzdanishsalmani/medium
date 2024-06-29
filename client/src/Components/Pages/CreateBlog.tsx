import { useState } from "react"
import { TopBar } from "../TopBar"
import { toast } from "react-toastify";
import axios from "../axios/axiosConfig";

export function CreateBlog() {

const [title,setTitle] = useState<string>("");
const [content,setContent] = useState<string>("");

async function handle(){

    if(title=="" || content==""){
        toast.error("Fields canno be empty");
        return
    }
    try {
        await axios.post("/blog/",{
            title,
            content
        })
        .then((response)=>{
            if(response.data){
                toast.success("Blog Created Successfully")
            }else{
                toast.error(response.data.error);
            }
        })
    } catch (error:any) {
        toast.error(error)
    }
}

    return (
        <div>
            <TopBar />
            <div className="flex justify-center ">
                <div className=" w-8/12 p-4 rounded-lg">
                    <input type="text" placeholder=" |Title" className="text-3xl mb-2 w-full  "onChange={(e)=>{setTitle(e.target.value)}} />
                    <textarea placeholder="Tell your story..." className="p-2 w-full h-screen "onChange={(e)=>{setContent(e.target.value)}}/>
                    <div className="flex justify-center">
                    <div className="bg-red-500 px-2 cursor-pointer border rounded-lg "onClick={handle}>Create</div>
                </div>
                </div>
            </div>
            </div>

    )
}