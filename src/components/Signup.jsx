import React, { useState } from 'react'
import { Fade } from "react-awesome-reveal";
function Signup() {

  const [nam, setname] = useState("")
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Fade> 
        <form className='flex-col bg-white flex justify-center items-center p-20 shadow-lg rounded-lg'>
          <h1 className='text-4xl font-mono font-bold'>Welcome</h1>
          <h1 className='text-lg font-mono font-normal mb-16'>Sign up to get Started</h1>
          <label className='text-lg font-mono font-normal'>First Name</label>
          <input type="text" name='Fullname' placeholder='Enter your  Name' onChange={(e) => setname(e.target.value)} className=' p-2 m-2 border bg-slate-100 border-black ' />
          <label className='text-lg font-mono font-normal' onChange={(e) => setemail(e.target.value)}>Email</label>
          <input type="email" name='email' placeholder='Enter your email' className=' p-2 m-2 border bg-slate-100 border-black ' />
          <label className='text-lg font-mono font-normal'>Password</label>
          <input type="password" name='password' placeholder='Enter you password' onChange={(e) => setpassword(e.target.value)} className=' p-2 m-2 bg-slate-100 border border-black ' />
          <button className='bg-blue-500 text-lg w-[6rem]  h-[3rem] p-1 font-bold text-white rounded-2xl mt-10 hover:bg-blue-400' type='submit'>Sign Up</button>
          <div className='mt-8 font-medium font-mono'>Already have an account? <span className='text-blue-400'><a href="/users /login">Sign In</a></span></div>
        </form>
      </Fade>
    </div>
  )
}

export default Signup
