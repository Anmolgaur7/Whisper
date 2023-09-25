import React from 'react'

function Login() {
  return (
    <div className='w-1/3 bg-white shadow-lg rounded-lg flex-col flex justify-center items-center p-16'> 
     <h1 className='text-4xl font-mono font-bold'>Welcome</h1>
     <h1 className='text-lg font-mono font-normal mb-16'>Sign up to get Started</h1>
      <form className='flex-col flex justify-center items-center'>
        <label className='text-lg font-mono font-normal'>First Name</label>
        <input type="text" name='Firstname' placeholder='Enter your first name'  className=' p-2 m-2 border border-black '/>
        <label className='text-lg font-mono font-normal'>Last Name</label>
        <input type="text" name='lastname' placeholder='Enter your last name' className=' p-2 m-2 border border-black ' />  
        <label className='text-lg font-mono font-normal'>Email</label>
        <input type="email" name='email' placeholder='Enter you email'className=' p-2 m-2 border border-black ' />

        <button className='bg-blue-500 text-lg w-[6rem]  h-[3rem] p-1 font-bold text-white rounded-2xl mt-10 hover:bg-blue-400'>Sign Up</button>
      </form>

      <div className='mt-4 font-medium font-mono'>Already have an account? <span className='text-blue-400'>Sign In</span></div>

    </div>
  )
} 

export default Login
