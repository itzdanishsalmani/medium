import { SignupCard } from "../UI/SignupCard"
import { BesideCard } from "../UI/BesideCard"

export function Signup(){
    return(
        <div className="md:grid grid-cols-2">
            <div>
            <SignupCard /> 
            </div>
            <div className="hidden md:block">
            <BesideCard/>
            </div>
        </div>
    )
}