import { TopBar } from "../TopBar"
export function CreateBlog(){
    return(
        <div>
            <TopBar/>
            <div className="flex justify-center">
        <div className=" w-10/12 p-4">
                <input type="text" placeholder=" |Title" className="text-3xl w-full" />
                <textarea placeholder="Tell your story..." className="p-2 w-full h-screen"/>
        </div>
        </div></div>

    )
}