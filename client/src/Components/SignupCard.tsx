import axios from "../Components/axios/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";

export function SignupCard() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handle() {
    if (name === "" || email === "" || password === "") {
      toast.error("Fields cannot be empty");
      return;
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
      <div className="space-y-4 bg-white rounded-lg p-4">
        <div className="w-80 text-center space-y-4">
          <div className="text-3xl font-bold">Create an account</div>
          <div>
            Already have an account? <span className="underline">Login</span>
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
          className="cursor-pointer text-center bg-black text-white rounded p-2"
          onClick={handle}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}
