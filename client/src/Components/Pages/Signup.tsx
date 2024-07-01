import { SignupCard } from "../SignupCard"
import { BesideCard } from "../BesideCard"

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