import express from "express"

const app=express()
const PORT=3000;

app.get("/",(req,res)=>{
res.send("hello from docker + pnpm ")
})

app.listen(PORT,()=>{
     console.log("server is running on port no." , PORT)
})