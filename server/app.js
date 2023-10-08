const express = require('express');
const bycrypt = require('bcryptjs');
const Users = require('./models/Users');
const Conversations = require('./models/Conversation');
const Messages = require('./models/Messages');
const jwt = require('jsonwebtoken')
const io = require('socket.io')(8080, {
    cors: {
        origin: 'http://localhost:3000',
    }
});
const cors = require('cors')

require('./db/connection')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000
let users = [];
io.on('connection', (socket) => {
    console.log('connection',socket.id);
    socket.on('adduser', (userid) => {
        const userexist = users.find(user => user.userid === userid);
        if (!userexist) {
            const user = { userid, socketid: socket.id }
            users.push(user)
            io.emit('getusers',users)  
        }
    })
    socket.on('disconnect', () => {
        // Remove disconnected user from the array
        users = users.filter(user => user.socketid !== socket.id);
        io.emit('getusers', users);
    });
    socket.on('sendmessage', async ({ senderid, receiverid, message, conversationid }) => {
        
        const receiver = users.find(user => user.userid === receiverid);
        const sender = users.find(user => user.userid === senderid);

        const user = await Users.findById(senderid);
        if (receiver) {
            io.to(receiver?.socketid).to(sender?.socketid).emit('getmessage', {
                senderid,
                message,
                conversationid,
                receiverid,
                user: { id: user.id, fullname: user.fullname, email: user.email }
            });
            }else {
                io.to(sender?.socketid).emit('getmessage', {
                    senderid,
                    message,
                    conversationid,
                    receiverid,
                    user: { id: user.id, fullname: user.fullname, email: user.email }
                });
            }
        });
    
})

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
                        return res.status(200).json({ user: { fullname: user.fullname, email: user.email, id: user._id }, token: token })
                    })
                }
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
            const recieverid = conversation.members.find((member) => member !== id)
            const user = await Users.findById(recieverid)
            return { user: { recieverId: user._id, fullName: user.fullname, email: user.email }, conversationid: conversation.id }
        }))
        res.status(200).json(await conversationUserData)
    } catch (error) {
        console.error(error)
    }
})
app.post('/api/message', async (req, res) => {
    try {
        const { conversationid, senderid, message, recieverid = '' } = req.body
        console.log(conversationid, senderid, message, recieverid);
        if (!senderid || !message) {
            return res.status(400).send("Please fill required feilds")
        }
        if (conversationid === 'new' && recieverid) {
            const newconversation = new Conversations({ members: [senderid, recieverid] })
            await newconversation.save()
            const newmessage = new Messages({ conversationid: newconversation._id, senderid, message })
            await newmessage.save()
            return res.status(200).send("message sent succesfully")
        }
        else if (!conversationid && !recieverid) {
            return res.status(400).send("Please fill all field")
        }
        const newmessage = new Messages({ conversationid, senderid, message })
        await newmessage.save()
        res.status(200).send("message sent succesfully")
    } catch (error) {
        console.error(error);
    }
})

app.get('/api/message/:conversationid', async (req, res) => {
    try {
        const checkmessages = async (conversationid) => {
            const messages = await Messages.find({ conversationid })
            const messageUserData = Promise.all(messages.map(async (message1) => {
                const User = await Users.findById(message1.senderid);
                return { user: { id: User._id, email: User.email, fullName: User.fullname }, message: message1.message }
            }))
            res.status(200).json(await messageUserData);
        }

        const conversationid = req.params.conversationid
        if (conversationid === 'new') {
            console.log(req.query.recieverId ,req.query.senderId);
            
            const checkconvo = await Conversations.find({ members: { $all: [req.query.senderId, req.query.recieverId] } })
            if (checkconvo.length > 0) {
                console.log(checkconvo.length[1]);
                checkmessages(checkconvo[0]._id)
            }
            else {
                return res.status(200).json([])
            }
        }
        else {
            checkmessages(conversationid)
        }

    } catch (error) {
        console.error(error)
    }
})

app.get('/api/users/:userid', async (req, res) => {
    try {
        const id = req.params.userid
        const users = await Users.find({ _id: { $ne: id } })
        const userdata = Promise.all(users.map((user) => {
        const rid=user._id.toString();
            return { user: { email: user.email, fullName: user.fullname, recieverId: rid } }
        }))
        res.status(200).json(await userdata)
    } catch (error) {
        console.error(error)
    }

})
app.listen(PORT, () => {
    console.log('Listining on port', PORT);
})