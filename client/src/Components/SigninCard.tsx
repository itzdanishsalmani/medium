export function SigninCard() {
    return (
      <div className=" flex flex-col justify-center items-center h-screen">
        <div className="space-y-4 bg-white rounded-lg p-4 ">
          <div className="w-80 text-center space-y-4">
            <div className="text-3xl font-bold">Login to an account</div>
            <div>Don't have an account? <span className="underline">Register</span></div>
          </div>
          <div>Email</div>
          <input type="text" placeholder="johndoe@email.com" className="w-full" />
          <div>Password</div>
          <input type="text" placeholder="password" className="w-full" />
          <div className="cursor-pointer text-center bg-black text-white rounded p-2">Sign In</div>
        </div>
      </div>
    );
  }
  