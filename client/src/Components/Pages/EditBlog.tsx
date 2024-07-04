import { useState, useEffect } from "react";
import { TopBar } from "../UI/NavBars";
import { toast } from "react-toastify";
import axios from "../axios/axiosConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Skeleton } from "../UI/Skeleton";

export function EditBlog() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please Sign in");
            navigate("/signin");
            return;
        }
        if (id) {
            axios.get(`/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                const blog = res.data.blog;
                setTitle(blog.title);
                setContent(blog.content);
                setLoading(false); // Data has been fetched
            })
            .catch(error => {
                console.error("Error fetching the blog:", error);
                setLoading(false); // Data fetch failed
            });
        }
    }, [id, navigate]);

    async function handle() {
        if (title === "" || content === "") {
            toast.error("Fields cannot be empty");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`/blog/${id}`, {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data) {
                toast.success("Blog Edited Successfully");
                navigate("/my");
            } else {
                toast.error(res.data.error);
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error(error.message);
            }
        }
    }

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
            </div>
        )
    }

    return (
        <div>
            <TopBar />
            <div className="flex justify-center grid-col-2">
                <div className=" w-8/12 p-4 rounded-lg">
                    <input type="text" placeholder=" |Title" className="text-3xl mb-2 w-full  " value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                    <textarea placeholder="Tell your story..." className="p-2 w-full h-screen whitespace-pre" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
                    <div className="flex justify-center">
                </div>
                </div>
                <div>
                  <button className="mt-4 bg-green-600 text-white py-2 px-4 border rounded-full" onClick={handle}>Edit</button>
                </div>
            </div>
            </div>
    );
}
