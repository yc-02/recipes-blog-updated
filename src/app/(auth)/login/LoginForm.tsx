import Link from "next/link";
import { login, signup } from "../../action";


export default function LoginForm() {
  return (
    <div className='flex justify-center p-13'>
    <form className='w-full max-w-xs p-10 rounded text-base; bg-neutral-100'>
      <div className='inputContainer'>
      <label htmlFor="email" className='inputLabel'>Email</label>
      <input id="email" name="email" type="email" required  className='input'/>
      </div>
      <div className='inputContainer'>
      <label htmlFor="password" className='inputLabel'>Password</label>
      <input id="password" name="password" type="password" required  className='input'/>
      </div>
    <div className='my-3'>
    <button formAction={login} className='button'>Log in</button>
    </div>
    <div>
      <Link className="inline-block font-bold" href="#">Forgot Password?</Link>
      </div>
      <div className="mt-4 border-t-2 border-neutral-200 pt-2">
        <h3>Don&apos;t have an account?</h3>
        <Link href="/signup" className="font-bold">Sign up</Link>
      </div>
  </form>
  </div>
  )
}
