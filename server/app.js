const express = require('express');
const bycrypt = require('bcryptjs');
const Users = require('./models/Users');
const Conversations = require('./models/Conversation');
const Messages = require('./models/Messages');
const jwt = require('jsonwebtoken')

require('./db/connection')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("welcome")
})
app.post('/api/register', async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        if (!fullname || !email || !password) {
            res.status(400).send("Fill all fields")
        }
        else {
            const alreadyexist = await Users.findOne({ email })

            if (alreadyexist) {
                res.status(400).send("User Already Exists")
            }
            else {
                const newuser = new Users({ fullname, email })
                bycrypt.hash(password, 10, (err, hashedpassword) => {
                    newuser.set('password', hashedpassword)
                    newuser.save();
                    next()
                })
                return res.status(200).send("User Registered Successfully")
            }
        }
    } catch (error) {
        console.error(error)
    }
})
app.post('/api/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).send("Fill all fields")
        }
        else {
            const user = await Users.findOne({ email })
            if (!user) {
                res.status(400).send("User or password is wrong")
            }
            else {
                const validateuser = await bycrypt.compare(password, user.password)
                if (!validateuser) {
                    res.status(400).send("User or password is wrong")
                }
                else {
                    const payload = {
                        userId: user._id,
                        userEmail: user.email
                    }
                    const jwtkey = 'this_is_a_secret_key_which_doesnt_need_to_be_exposed'
                    jwt.sign(payload, jwtkey, {
                        expiresIn: 84600
                    }, async (err, token) => {
                        await Users.updateOne({ _id: user.id, }, {
                            $set: { token }
                        })
                        user.save()
                        next()
                    })
                }
                res.status(200).json({ user: { fullname: user.fullname, email: user.email }, token: user.token })
            }
        }

    } catch (error) {
        console.error(error)
    }
})
app.post('/api/conversation', async (req, res) => {
    try {
        const { senderid, recieverid } = req.body
        const newconversation = new Conversations({ members: [senderid, recieverid] })
        await newconversation.save()
        res.status(200).send("conversation created successfully")
    } catch (error) {
        console.error(error)
    }
})
app.get('/api/conversation/:userid', async (req, res) => {
    try {
        const id = req.params.userid
        const conversations = await Conversations.find({ members: { $in: [id] } })
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const recieverId = conversation.members.find((member) => member !== id)
            const user = await Users.findById(recieverId)

            return { user: { fullname: user.fullname, email: user.email }, conversationid: conversation._id }
        }))
        res.status(200).json(await conversationUserData)
    } catch (error) {
        console.error(error)
    }
})
app.post('/api/message', async (req, res) => {
    try {
        const { conversationId, senderId, message } = req.body
        const newmessage = new Messages({ conversationId, senderId, message })
        await newmessage.save()
        res.status(200).send("message sent succesfully")
    } catch (error) {
        console.error(error);
    }
})

app.get('/api/message/:conversationId', async ( req, res ) => {
    try {
        const conversationId = req.params.conversationId
        const messages = await Messages.find({ conversationId })
        const messageUserData=Promise.all(messages.map( async(message1)=>{
            const User=await Users.findById(message1.senderId);
            return {user:{email:User.email,fullName:User.fullname},message:message1.message}
        }))
            res.status(200).json( await messageUserData); 
    } catch (error) {
        console.error(error)
    }

})
app.get('/api/users',async (req,res)=>{
    try {
        
        const users=await Users.find()
        const userdata= Promise.all(users.map((user)=>{
            return {user:{email:user.email,fullName:user.fullname},userID:user._id}
        }))
        res.status(200).json(await userdata)
    } catch (error) {
        console.error(error)
    }

})
app.listen(8000, () => {
    console.log('Listining');
})