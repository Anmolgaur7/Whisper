import React from 'react'
import User from "../images/usericon.png";
function Dashboard() {
    const contacts = [
        {
            name: "Prince",
            status: "Available",
            img: User
        },
        {
            name: "Aditi",
            status: "Available",
            img: User
        },
        {
            name: "Pranay",
            status: "Available",
            img: User
        },
        {
            name: "Aditi",
            status: "Available",
            img: User
        },
        {
            name: "Pranay",
            status: "Available",
            img: User
        }
        ,{
            name: "Aditi",
            status: "Available",
            img: User
        },
        {
            name: "Pranay",
            status: "Available",
            img: User
        }
    ]
    return (
        <div className='flex w-screen '>
            <div className='w-[25%] border bg-white border-black  h-screen'>
                <div className='flex justify-center border items-center  p-4 shadow-lg'>
                    <img src={User} alt="user" className='border border-1 p-[2px] border-black rounded-full bg-slate-100' />
                    <div className='ml-8'>
                        <h1 className='text-lg font-semibold'>Anmol</h1>
                        <p>My Account</p>
                    </div>
                </div>
                <hr />
                <div>
                    <h1 className='p-6 text-lg font-mono'>Messages</h1>
                    <div>
                        {
                            contacts.map(({name, status, img}) => {
                                return (
                                    <div className='flex m-2 items-center'>
                                        <img src={img} alt="img" className='w-[2rem] h-[2rem] border border-black border-1 rounded-full' />
                                        <div className='ml-3'>
                                        <h1 className='text-xl' >{name}</h1>
                                        <p>{status}</p>
                                        </div>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
            </div>
            <div className='w-[50%] border border-black h-screen'></div>
            <div className='w-[25%] border bg-white border-black h-screen'></div>
        </div>
    )
}

export default Dashboard
