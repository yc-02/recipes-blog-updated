import { Metadata } from "next";


export const metadata:Metadata={
  title:"About"
}

export default function AboutPage() {
  return (
    <div className="min-h-screen p-12">
     <p className="text-center">About Page</p>
    </div>
  )
}
