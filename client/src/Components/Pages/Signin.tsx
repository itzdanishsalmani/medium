import { SigninCard } from "../SigninCard"
import { BesideCard } from "../BesideCard"

export function Signin(){
    return(
        <div className="grid grid-cols-2">
            <div>
            <SigninCard /> 
            </div>
            <div>
            <BesideCard/>
            </div>
        </div>
    )
}