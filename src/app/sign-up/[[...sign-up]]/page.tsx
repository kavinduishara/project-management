import { SignUp } from "@clerk/nextjs";

export default function SignUpPage(){
    return(
        <div className="flex justify-center items-center py-8">
            <SignUp
                path="/sign-Up"
                routing="path"        // important!
            />
        </div>
    );
}