
export function Footer(){
    return (
        <div className="fixed bottom-0 left-0 w-full z-10 overflow:hidden">
        <div className="bg-white py-4 border-t border-black ">
            <div className="flex justify-center space-x-2 cursor-pointer">
            <div>Help</div>
            <div>Status</div>
            <div>About</div>
            <div>Careers</div>
            <div className="hidden md:block">Press</div>
          <div className="hidden md:block">Blog</div>
          <div className="hidden md:block">Privacy</div>
          <div className="hidden md:block">Terms</div>
          <div className="hidden md:block">Text to Speech</div>
          <div className="hidden md:block">Teams</div>
            </div>
        </div>
        </div>
    )   
}
