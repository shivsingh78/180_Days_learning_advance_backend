import express from 'express'

const app = express()
const PORT = process.env.PORT ?? 8000;

app.get("/", (req,res)=>{
    return res.json({msg:"hello from server shiv singh baghel v2"})
})
app.listen(PORT,()=>{
    console.log("server is listening on http://localhost:8080"); 
    
    
    
})
