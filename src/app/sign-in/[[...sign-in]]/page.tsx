import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){
    return(
        <div className="flex justify-center items-center py-8">
            <SignIn
                path="/sign-in"
                routing="path"        // important!
            />
        </div>
    );
}