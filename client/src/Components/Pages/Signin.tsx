import { SigninCard } from "../SigninCard"
import { BesideCard } from "../BesideCard"

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