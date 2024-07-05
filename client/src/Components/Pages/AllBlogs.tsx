import { useEffect, useState } from "react"
import { TopBar } from "../UI/NavBars"
import axios from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Blog } from "../commons/commons";
import { formatDate } from "../commons/commons";
import { toast } from "react-toastify";
import { Footer } from "../UI/Footer";
import { Skeleton } from "../UI/Skeleton";

export function AllBlogs() {

    
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();

    
    useEffect(() => { 
        const token = localStorage.getItem("token")
    if(!token){
        toast.error("Please Signin")
        navigate("/signin")
        return
    }
        axios.get("/blog/bulk",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setBlogs(res.data.blogs);
                setLoading(false)
            })

    },[])

    if (loading) {
        return (
            <div>
                <TopBar />
                <div className="flex justify-center">
                    <div className="w-8/12">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    return (
        <div>
            <TopBar />
            <div className=" flex justify-center" >
                <div className="w-8/12">
                    <div className="sections mb-4 md:mb-20">
                                {blogs.map((blog) => (
                                    <div key={blog.id} className="border-b md:pb-4" onClick={()=>{
                                        navigate("/blogs?id="+blog.id)
                                    }}>
                                        <div className="flex items-center space-x-4 py-2 ">
                                        <div className="w-8 h-8 bg-green-600 text-slate-200 rounded-full flex items-center justify-center">
                                        <div className="font-medium">{blog.author.name[0].toUpperCase() } </div>
                                            </div>
                                            <div className="font-medium">{blog.author.name}</div>
                                            <div>{formatDate(blog.created_at)}</div>
                                        </div>
                                        <div className="w-full h-12 text-lg md:text-3xl font-bold overflow-hidden pb-2 line-clamp-2 ">{blog.title}</div>
                                        <div className="w-full text-base md:h-20 md:text-xl overflow-hidden line-clamp-3">{blog.content}</div>
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

