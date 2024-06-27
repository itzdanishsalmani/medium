import { useEffect, useState } from "react"
import { TopBar } from "../TopBar"
import axios from "../axios/axiosConfig";

interface Blog {
    id: string
    title: string
    content: string
}
export function AllBlogs() {
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
                    <div className="sections">
                            {blogs.map((blog) => (
                                <div className="border-b ">
                                    <div className="w-full h-12 text-3xl font-bold">{blog.title}</div>
                                    <div className="w-full h-20 text-xl">{blog.content}</div>
                                    </div>
                            ))}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}