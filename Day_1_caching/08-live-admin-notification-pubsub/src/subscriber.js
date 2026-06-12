import Redis from 'ioredis'

const subscriber=new Redis("redis://localhost:6379")

subscriber.subscribe("notifications", (err)=>{
    if(err){
    console.error("Failed to subscribe :", err.message);
    }
})

subscriber.subscribe("notification",(err)=>{
    if(err){
    console.error("Failed to subscribe :", err.message);
    }
})

subscriber.on("message", (channel, message)=> {
    console.log(("Recevied on ", channel , ":", JSON.parse(message)));
    
})

subscriber.subscribe("email",(err)=>{
    if(err){
        console.log("failed to subscribe", err);
        
    }
})