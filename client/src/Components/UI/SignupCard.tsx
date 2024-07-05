import axios from "../axios/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function SignupCard() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/all")
    }
    },[])
  async function handle() {
    if (name === "" || email === "" || password === "") {
      toast.error("Fields cannot be empty");
      return
    }else if(password.length<6){
      toast.error("Password must be at least 6 characters")
      return
    }
    try {
      const res = await axios.post("/user/signup", {
        name,
        email,
        password
      });
      if (res.data) {
        toast.success("Account created successfully");
        const token = res.data.jwt;
        localStorage.setItem("token", token);
        navigate("/all")
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

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="space-y-4 bg-white rounded-lg p-4 hover:bg-slate-200">
        <div className="w-80 text-center space-y-4">
          <div className="text-3xl font-bold">Create an account</div>
          <div>
            Already have an account? <span className="underline cursor-pointer"
            onClick={()=>{
              navigate("/signin")
            }}>Login</span>
          </div>
        </div>
        <div>Username</div>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full"
          onChange={(e) => setName(e.target.value)}
        />
        <div>Email</div>
        <input
          type="text"
          placeholder="johndoe@email.com"
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>Password</div>
        <input
          type="password"
          placeholder="password"
          className="w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="cursor-pointer text-center bg-green-600 text-white rounded-lg p-2"
          onClick={handle}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}
