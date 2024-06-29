import { useEffect, useState } from "react"
import { TopBar } from "../TopBar"
import axios from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Blog } from "../commons/com";
import { formatDate } from "../commons/com";

export function AllBlogs() {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState<Blog[]>([]);
    
    useEffect(() => { 
        axios.get("/blog/bulk")
            .then(res => {
                setBlogs(res.data.blogs);
                console.log(res.data.blogs);
            })
    },[])
    return (
        <div>
            <TopBar />
            <div className=" flex justify-center border">
                <div className="w-8/12">
                    <div className="sections mb-20">
                            {blogs.map((blog) => (
                                <div className="border-b pb-4" onClick={()=>{
                                    navigate("/blogs?id="+blog.id)
                                }}>
                                    <div className="flex space-x-4 pb-2">
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
        </div>
    )
}