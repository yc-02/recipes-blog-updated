
import { Metadata } from "next";
import SignUpClient from "./SignUpClient";

export const metadata:Metadata={
  title:"Sign up"
}


export default function SignUpPage() {
  return(
    <div>
      <SignUpClient/>
    </div>
  )
}
