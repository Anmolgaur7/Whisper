import React, { useState } from 'react'
import { Fade } from "react-awesome-reveal";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const [data, setdata] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (res.status === 400) {
            toast.error(`Invalid Credentials`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
        }
        else{
        const resdata = await res.json()
        toast.success("Login Successfully")
        if (resdata.token) {
            localStorage.setItem('user:token', resdata.token)
            localStorage.setItem('user:detail', JSON.stringify(resdata.user) )
            navigate("/")
        }
    }
    }
    return (
            <div className=' w-screen h-screen flex justify-center items-center'>
            <ToastContainer />
                <Fade>
                    <form onSubmit={(e) => handlesubmit(e)} className=' m-5  md: bg-white flex-col flex justify-center items-center p-20 shadow-lg rounded-lg'>
                        <h1 className='text-4xl font-mono font-bold'>Welcome Back</h1>
                        <h1 className='text-lg font-mono font-normal mb-16'>Sign in to explore</h1>
                        <label className='text-lg font-mono font-normal'>Email</label>
                        <input type="email" name='email' placeholder='Enter your email' onChange={(e) => setdata({ ...data, email: e.target.value })} className=' p-2 m-2  border bg-slate-100 border-black ' />
                        <label className='text-lg font-mono font-normal'>Password</label>
                        <input type="password" name='password' placeholder='Enter you password' onChange={(e) => setdata({ ...data, password: e.target.value })} className=' p-2 m-2 border bg-slate-100 border-black' />
                        <button className='bg-blue-500 text-lg w-[6rem]  h-[3rem] p-1 font-bold text-white rounded-2xl mt-8 hover:bg-blue-400' type='submit'>Sign In</button>
                        <div className='mt-4 font-medium font-mono'>Did'nt have an account? <span className='text-blue-400'><a href="/users/signup">Sign Up</a></span></div>
                    </form>
                </Fade>
            </div>
    )
}

export default Login
