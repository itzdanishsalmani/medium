import { SignupCard } from "../SignupCard"
import { BesideCard } from "../BesideCard"

export function Signup(){
    return(
        <div className="grid grid-cols-2">
            <div>
            <SignupCard /> 
            </div>
            <div>
            <BesideCard/>
            </div>
        </div>
    )
}