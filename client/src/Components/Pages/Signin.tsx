import { SigninCard } from "../UI/SigninCard"
import { BesideCard } from "../UI/BesideCard"

export function Signin(){
    return(
        <div className="md:grid grid-cols-2">
            <div>
            <SigninCard /> 
            </div>
            <div className="hidden md:block">
            <BesideCard/>
            </div>
        </div>
    )
}