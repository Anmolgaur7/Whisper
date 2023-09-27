const express=require('express');
const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send("welcome")
})

app.listen(8000,()=>{
    console.log('Listining');
})