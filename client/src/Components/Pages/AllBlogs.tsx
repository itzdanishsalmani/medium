import { useEffect, useState } from "react"
import { TopBar } from "../TopBar"
import axios from "../axios/axiosConfig";

export function AllBlogs() {
    const [blogs,setBlogs] = useState("");

    useEffect(()=>{
        axios.get("/blog/bulk")
        .then(res=>{
            setBlogs(res.data.blogs);
        })
    })
     return (
        <div>
            <TopBar/>
            <div className=" flex justify-center border">
            <div className="w-9/12">

            </div>
            </div>
        </div>
     )
}