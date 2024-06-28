import axios from "../Components/axios/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";


export function SigninCard() {
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");

  async function handle() {
    if (email === "" || password === "") {
      toast.error("Fields cannot be empty");
      return;
    }
    try {
      const res = await axios.post("/user/signin", {
        email,
        password
      });
      if (res.data) {
        toast.success("Signin successfully");
        const token = res.data.jwt;
        localStorage.setItem("token", token);
      } else {
        toast.error(res.data.error);
      }
    } catch (error: any) {
        toast.error(error.data.error);
    }
  }
    return (
      <div className=" flex flex-col justify-center items-center h-screen">
        <div className="space-y-4 bg-white rounded-lg p-4 ">
          <div className="w-80 text-center space-y-4">
            <div className="text-3xl font-bold">Login to an account</div>
            <div>Don't have an account? <span className="underline">Register</span></div>
          </div>
          <div>Email</div>
          <input type="text" name="email" placeholder="johndoe@email.com" className="w-full" onChange={e=>{setEmail(e.target.value)}} />
          <div>Password</div>
          <input type="text" name="password" placeholder="password" className="w-full" onChange={e=>{setPassword(e.target.value)}} />
          <div className="cursor-pointer text-center bg-black text-white rounded p-2 " onClick={handle}>Sign In</div>
        </div>
      </div>
    );
  }
  