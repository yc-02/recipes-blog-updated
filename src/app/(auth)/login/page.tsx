import { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata:Metadata={
  title:"Sign in"
}


export default async function LoginPage() {
  

  return (
    <LoginForm/>
  )
}