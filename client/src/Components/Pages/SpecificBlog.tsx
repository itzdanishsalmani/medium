import { useEffect, useState } from "react";
import { TopBar } from "../NavBars";
import axios from "../axios/axiosConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Blog } from "../commons/com";
import { formatDate } from "../commons/com";
import { toast } from "react-toastify";
import { Footer } from "../Footer";
export function SpecificBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Please signin")
      navigate("/signin")
      return
    }
    if (id) {
      axios.get(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
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
      <div className="flex mt-4 justify-center grid-col-2">
        <div className="pl-2 w-8/12 pr-2 md:pr-20">
          <div className="sections">
            {blogs.map((blog) => (
              <div key={blog.id} className="border-b">
                <div className="pb-2 w-full text-base md:text-3xl font-bold">{blog.title}</div>
                <div>Posted on {formatDate(blog.created_at)}</div>
                <div className="w-full whitespace-pre-wrap text-sm mt-8 mb-20">{blog.content}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {blogs.map((blog) => (
            <div key={blog.id} className="">Author
              <div className="flex items-center space-x-4 py-2 ">
                <div className="w-8 h-8 bg-green-600 text-slate-200 rounded-full flex items-center justify-center">
                  <div className="font-medium">{blog.author.name[0].toUpperCase()}</div>
                </div>
                <div className="font-medium">{blog.author.name}</div>
              </div>              
              </div>
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

