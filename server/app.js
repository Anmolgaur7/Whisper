const express = require('express');
const bycrypt=require('bcryptjs')
require('./db/connection')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("welcome")
})

app.post('/api/register',async (req,res,next)=>{
    try {
     const {fullname,email,password}=req.body   
     if (!fullname||!email||!password) 
     {
      res.status(400).send("Fill all fields")  
     }
     else
     {
    const alreadyexist=await Users.findOne({email})

    if (alreadyexist) 
    {
        res.status(400).send("User Already Exists")    
    }
    else{
        const newuser= new Users({fullname,email})
        bycrypt.hash(password,10,(err,hashedpassword)=>{
            newuser.set('password',hashedpassword)
            newuser.save();
            next()
        })
        return res.status(200).send("User Registered Successfully")
    }
     }
    } catch (error) {
        
    }

})
app.listen(8000, () => {
    console.log('Listining');
})