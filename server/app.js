const express = require('express');
const bycrypt = require('bcryptjs');
const Users = require('./models/Users');
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
                    }, async (err,token) => {
                        await Users.updateOne({ _id: user.id, }, {
                            $set: { token }
                        })
                        user.save()
                        next()
                    })
                }
                res.status(200).json({ user:{fullname:user.fullname,email:user.email},token:user.token})
            }
        }

    } catch (error) {
        console.error(error)
    }
})
app.listen(8000, () => {
    console.log('Listining');
})