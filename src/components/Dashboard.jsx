import React, { useEffect, useState } from 'react'
import User from "../images/usericon.png";
import phone from "../images/phone.svg";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Dashboard() {

    const [messages, setmessages] = useState([])
    const [loggedinuser, setuser] = useState(JSON.parse(localStorage.getItem('user:detail')))
    const [message,setmessage]=useState("")
    const [users,setusers]=useState([])
      const [conversations, setconversations] = useState([])
      console.log("users=>",users);
      console.log("conversations:",conversations)
    useEffect(() => {
        const loggedinuser = JSON.parse(localStorage.getItem('user:detail'))
        const fetchconversations = async () => {
            const res = await fetch(`http://localhost:8000/api/conversation/${loggedinuser.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const resdata = await res.json()
            setconversations(resdata)
        }
        fetchconversations()
        
    }, [])
    useEffect(()=>{
    const fetchusers= async()=>{
        const res = await fetch(`http://localhost:8000/api/users/${loggedinuser.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const resdata = await res.json()
        setusers(resdata)
    }    
    fetchusers()
    },[])
    const fetchmessages = async (conversationid,user) => {
        const res = await fetch(`http://localhost:8000/api/message/${conversationid}?senderId=${loggedinuser.id}&&recieverId=${user.recieverId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const resdata = await res.json()
        setmessages({messages:resdata, reciever:user,conversationid})
        console.log(resdata);
    }
    const sendmessage = async(e)=>{
        e.preventDefault()
     const res = await fetch(`http://localhost:8000/api/message`,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
                conversationId:messages?.conversationid,
                senderId:loggedinuser?.id,
                message:message,
                recieverId:messages?.reciever?.recieverId
        })
    })
    setmessage('')
    }
    return (
        <div className='flex w-screen '>
            <ToastContainer />
            <div className='w-[25%] border bg-white h-screen'>
                <div className='flex justify-center border items-center  p-4 shadow-lg'>
                    <img src={User} alt="user" className='border border-1 p-[2px] border-black rounded-full bg-slate-100' />
                    <div className='ml-8'>
                        <h1 className='text-lg font-semibold'>{loggedinuser.fullname}</h1>
                        <p>My Account</p>
                    </div>
                </div>
                <hr/>
                <h1 className='p-2 text-xl font-semibold font-mono mt-4  ml-4 text-blue-500'>Messages</h1>
                <div className=' h-[75%] overflow-y-scroll'>
                    <div>
                        {
                            conversations.length > 0 ?
                                conversations.map(({ conversationid,user }) => {
                                    return (
                                        <div className='flex ml-6 m-4 bg-blue-200 cursor-pointer items-center p-2 rounded-xl shadow-lg ' onClick={() => {
                                            fetchmessages( conversationid,user)
                                        }}>
                                            <img src={User} alt="img" className='w-[2rem] h-[2rem] border border-black border-1 rounded-full' />
                                            <div className='ml-3'>
                                                <h1 className='text-lg font-medium' >{user.fullName}</h1>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div className='text-center text-xl m-3 font-semibold'> No conversations</div>
                        }
                    </div>
                </div>
            </div>
            <div className='w-[50%]  bg-chatbg bg-contain  h-screen flex flex-col justify-center items-center'>
                   {
                    messages.reciever?.fullName&&
                    <div className='w-[75%] bg-slate-100 h-[4rem]  rounded-full flex items-center justify-evenly px-14 p-2'>
                    <div className='flex justify-center items-center'>
                        <img src={User} alt="img" className='w-[2.5rem] h-[2.5rem] border border-black border-1 rounded-full' />
                        <div className='flex justify-center items-center flex-col ml-6'>
                            <h1 className='text-lg font-medium ' >{ messages.reciever?.fullName}</h1>
                            <p className='text-sm0'>{messages.reciever?.email}</p>
                        </div>
                    </div>
                    <img src={phone} className='w-[1.5rem] h-1.5rem ml-72 cursor-pointer' />
                   </div>
                   }
                
                <div className='h-[75%]  w-full mt-4 '>
                    <div className='h-[85%] p-4 overflow-y-scroll '>
                        {
                            messages?.messages?.length > 0 ? messages.messages.map(({message,user:{id}={}}) => {
                                    return (
                                        <div className={` max-w-[40%] rounded-b-2xl h-[2rem] shadow-lg  pl-2 p-1 mb-2 ${id===loggedinuser.id?'bg-green-200 rounded-tl-2xl  ml-auto':' bg-slate-100   rounded-tr-2xl'} `}>
                                            {message}
                                        </div>
                                    )
                            }) : <div className=' flex justify-center items-center'>
                                <div className='text-center text-xl m-3 font-semibold p-3 rounded-2xl bg-slate-100 w-fit'> No conversations</div>
                            </div>
                        }
                    </div>
                </div>
                <div className=' w-full flex  items-center'>
                    <input type="text" className=' w-[75%] h-[2.65rem] rounded-full p-3 ml-6 mr-1 focus:ring-2 focus:border-0 outline-none shadow-lg' placeholder='Type a message'value={message} onChange={(e)=>setmessage(e.target.value)} />
                    <div className={`${!message&&'pointer-events-none'}`} onClick={(e)=>sendmessage(e)} >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-send  bg-white rounded-full p-1 cursor-pointer`}  width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 14l11 -11" />
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                    </svg>
                    </div>
                    <div className={`${!message&&'pointer-events-none'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus bg-white rounded-full p-1 cursor-pointer ml-1" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M9 12h6" />
                        <path d="M12 9v6" />
                    </svg>
                    </div>
                </div>
            </div>
            <div className='w-[25%]  bg-white h-screen'>
            <h1 className='p-2 text-xl font-semibold font-mono mt-6  ml-4 text-blue-500'>People</h1>
            {
                            users.length > 0 ?
                                users.map(({ recieverId,user }) => {
                                    return (
                                        <div className='flex ml-6 m-4 bg-blue-200 cursor-pointer items-center p-2 rounded-xl shadow-lg ' onClick={() => {
                                            fetchmessages('new',user)
                                        }}>
                                            <img src={User} alt="img" className='w-[2rem] h-[2rem] border border-black border-1 rounded-full' />
                                            <div className='ml-3'>
                                                <h1 className='text-lg font-medium' >{user.fullName}</h1>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div className='text-center text-xl m-3 font-semibold'> No People</div>
                        }

            </div>
        </div>
    )
}

export default Dashboard