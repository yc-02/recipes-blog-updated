import { Metadata } from "next"

export const metadata:Metadata={
  title:"not-found"
}

export default function NotFound() {
  return (
    <main className="pt-10 text-center">
      <h2 className="text-4xl">Oh No!</h2>
      <p>Page not found.</p>
    </main>
  )
}