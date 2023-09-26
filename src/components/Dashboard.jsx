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
        , {
            name: "Aditi",
            status: "Available",
            img: User
        },
        {
            name: "Pranay",
            status: "Available",
            img: User
        },
        // {
        //     name: "Maa",
        //     status: "Available",
        //     img: User
        // },
        // {
        //     name: "Papa",
        //     status: "Available",
        //     img: User
        // }
    ]
    return (
        <div className='flex w-screen '>
            <div className='w-[25%] border bg-white border-black h-screen'>
                <div className='flex justify-center border items-center  p-4 shadow-lg'>
                    <img src={User} alt="user" className='border border-1 p-[2px] border-black rounded-full bg-slate-100' />
                    <div className='ml-8'>
                        <h1 className='text-lg font-semibold'>Anmol</h1>
                        <p>My Account</p>
                    </div>
                </div>
                <hr />
                <div>
                    <h1 className='p-2 text-xl font-semibold font-mono mt-4  ml-4 text-blue-500'>Messages</h1>
                    <div>
                        {
                            contacts.map(({ name, status, img }) => {
                                return (
                                    <div className='flex ml-6 m-4 bg-blue-200 cursor-pointer items-center p-2 rounded-xl shadow-lg'>
                                        <img src={img} alt="img" className='w-[2rem] h-[2rem] border border-black border-1 rounded-full' />
                                        <div className='ml-3'>
                                            <h1 className='text-lg font-medium' >{name}</h1>
                                            <p>{status}</p>
                                        </div>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
            </div>
            <div className='w-[50%] border bg-chatbg bg-contain border-black h-screen flex justify-center'>
                <div className='w-[75%] bg-slate-100 h-[4rem] mt-8 rounded-full flex items-center px-14'>
                    <img src={User} alt="img" className='w-[2.5rem] h-[2.5rem] border border-black border-1 rounded-full' />
                    <div className='flex justify-center items-center flex-col ml-10'>
                    <h1 className='text-lg font-medium ' >Aditi</h1>
                    <p className='text-sm'>online</p>
                    </div>


                </div>
            </div>
            <div className='w-[25%] border border-black h-screen'></div>
        </div>
    )
}

export default Dashboard
