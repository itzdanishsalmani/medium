import { useEffect, useState } from "react";
import { TopBar } from "../TopBar";
import axios from "../axios/axiosConfig";
import { useSearchParams } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  content: string;
}

export function SpecificBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      axios.get(`/blog/${id}`)
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
