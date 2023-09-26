import React from 'react'
import User from "../images/usericon.png";
import phone from "../images/phone.svg";
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
        {
            name: "Maa",
            status: "Available",
            img: User
        },
        {
            name: "Papa",
            status: "Available",
            img: User
        }
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
                <h1 className='p-2 text-xl font-semibold font-mono mt-4  ml-4 text-blue-500'>Messages</h1>
                <div className=' h-[75%] overflow-y-scroll'>
                    <div>
                        {
                            contacts.map(({ name, status, img }) => {
                                return (
                                    <div className='flex ml-6 m-4 bg-blue-200 cursor-pointer items-center p-2 rounded-xl shadow-lg '>
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
            <div className='w-[50%]  bg-chatbg bg-contain  h-screen flex flex-col justify-center items-center'>
                <div className='w-[75%] bg-slate-100 h-[4rem]  rounded-full flex items-center justify-evenly px-14 p-2'>
                    <div className='flex justify-center items-center'>
                        <img src={User} alt="img" className='w-[2.5rem] h-[2.5rem] border border-black border-1 rounded-full' />
                        <div className='flex justify-center items-center flex-col ml-6'>
                            <h1 className='text-lg font-medium ' >Aditi</h1>
                            <p className='text-sm'>online</p>
                        </div>
                    </div>
                    <img src={phone} className='w-[1.5rem] h-1.5rem ml-72 cursor-pointer' />
                </div>
                <div className='h-[75%]  w-full mt-4 '>
                    <div className='h-[85%] p-4 overflow-y-scroll '>
                        <div className=' max-w-[40%] bg-green-200  rounded-b-2xl shadow-lg  rounded-tr-2xl p-2 mb-2'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, eligendi.
                        </div>
                        <div className=' max-w-[40%] bg-slate-100 rounded-b-2xl shadow-lg  rounded-tl-2xl ml-auto p-2 mb-2'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, odio.
                        </div>
                        <div className=' max-w-[40%] bg-green-200  rounded-b-2xl shadow-lg  rounded-tr-2xl p-2 mb-2'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, eligendi.
                        </div>
                        <div className=' max-w-[40%] bg-slate-100 rounded-b-2xl shadow-lg  rounded-tl-2xl ml-auto p-2 mb-2'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, odio.
                        </div>
                        <div className=' max-w-[40%] bg-green-200  rounded-b-2xl shadow-lg  rounded-tr-2xl p-2 mb-2'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, eligendi.
                        </div>
                        <div className=' max-w-[40%] bg-slate-100 rounded-b-2xl shadow-lg  rounded-tl-2xl ml-auto p-2 mb-2'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, odio.
                        </div>
                        <div className=' max-w-[40%] bg-green-200  rounded-b-2xl shadow-lg  rounded-tr-2xl p-2 mb-2'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, eligendi.
                        </div>
                        <div className=' max-w-[40%] bg-slate-100 rounded-b-2xl shadow-lg  rounded-tl-2xl ml-auto p-2 mb-2'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, odio.
                        </div>
                    </div>
                </div>
                <div className=' w-full flex  items-center'>
                    <input type="text" className=' w-[75%] h-[2.65rem] rounded-full p-3 ml-6 mr-1 focus:ring-2 focus:border-0 outline-none shadow-lg' placeholder='Type a message' />
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send bg-white rounded-full p-1 cursor-pointer " width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 14l11 -11" />
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus bg-white rounded-full p-1 cursor-pointer ml-1" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M9 12h6" />
                        <path d="M12 9v6" />
                    </svg>
                </div>
            </div>
            <div className='w-[25%]  bg-white h-screen'>

            </div>
        </div>
    )
}

export default Dashboard
