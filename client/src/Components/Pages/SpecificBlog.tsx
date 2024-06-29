import { useEffect, useState } from "react";
import { TopBar } from "../NavBars";
import axios from "../axios/axiosConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Blog } from "../commons/com";
import { formatDate } from "../commons/com";
import { toast } from "react-toastify";

export function SpecificBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate()

  useEffect(() => {
      const token = localStorage.getItem("token")
  if(!token){
      toast.error("Signup")
      navigate("/signup")
      return
  }
    if (id) {
      axios.get(`/blog/${id}`,{
        headers:{
          Authorization :`Bearer + ${localStorage.getItem("token")}`
        }
      })
        .then(res => {
          setBlogs([res.data.blog]);
        })
        .catch(error => {
          console.error("Error fetching the blog:", error);
        });
    }
  }, [id]);

  return (
    <div>
      <TopBar />
      <div className="flex justify-center border">
        <div className="w-8/12">
          <div className="sections">
            {blogs.map((blog) => (
              <div key={blog.id} className="border-b">
                <div className="flex">{formatDate(blog.created_at)}</div>
                <div className="pb-4 w-full text-3xl font-bold">{blog.title}</div>
                <div className="w-full text-xl">{blog.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
