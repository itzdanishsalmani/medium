import { useEffect, useState } from "react";
import { TopBar } from "../UI/NavBars";
import axios from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Footer } from "../UI/Footer";
import { Blogs } from "../commons/commons";
import { Skeleton } from "../UI/Skeleton";

export function MyBlogs() {
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please Sign in");
            navigate("/signin");
            return;
        }

        axios.get("/user/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setBlogs(res.data);
            setLoading(false)
        })
 
    }, []);


    if(loading){
        return(
            <div>
                <TopBar/>
                <div className="flex justify-center">
                    <div className="w-8/12">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    return (
        <div>
            <TopBar />
            <div className="flex justify-center">
                <div className="w-8/12">
                {blogs.length === 0 ? (
                        <div className="text-center text-lg md:text-3xl font-medium ">
                            You have no blogs Let's publish
                        </div>
                    ) : (
                    <div className="sections mb-4 md:mb-20">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="border-b md:pb-4" onClick={
                                    ()=>{
                                        navigate("/edit?id="+blog.id)
                                    }
                                }>
                                    <div className="w-full h-12 text-lg md:text-3xl font-bold overflow-hidden pb-2 line-clamp-2">
                                        {blog.title}
                                    </div>
                                    <div className="w-full text-base md:h-20 md:text-xl overflow-hidden line-clamp-3">
                                        {blog.content}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
