import { useEffect, useState } from "react"
import { TopBar } from "../NavBars"
import axios from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Blog } from "../commons/com";
import { formatDate } from "../commons/com";
import { toast } from "react-toastify";
import { Footer } from "../Footer";

export function AllBlogs() {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => { 
        const token = localStorage.getItem("token")
    if(!token){
        toast.error("Please Signup")
        navigate("/signup")
        return
    }
        axios.get("/blog/bulk",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setBlogs(res.data.blogs);
                console.log(res.data.blogs);
            })
    },[])
    return (
        <div>
            <TopBar />
            <div className=" flex justify-center ">
                <div className="w-8/12">
                    <div className="sections mb-20">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="border-b pb-4" onClick={()=>{
                                    navigate("/blogs?id="+blog.id)
                                }}>
                                    <div className="flex items-center space-x-4 py-2 ">
                                    <div className="w-8 h-8 bg-green-600 text-slate-200 rounded-full flex items-center justify-center">
                                    <div className="font-medium">{blog.author.name[0].toUpperCase()}</div>
                                        </div>
                                        <div className="font-medium">{blog.author.name}</div>
                                        <div>{formatDate(blog.created_at)}</div>
                                    </div>
                                    <div className="w-full h-12 text-3xl font-bold overflow-hidden ">{blog.title}</div>
                                    <div className="w-full h-20 text-xl overflow-hidden line-clamp-3">{blog.content}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
