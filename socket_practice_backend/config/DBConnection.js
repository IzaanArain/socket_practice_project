const mongoose=require("mongoose");

const Connect=async()=>{
    try{
        const conn=await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Connected to ${conn.connection.host}/${conn.connection.name}`.cyan)
    }catch(err){
        console.error("Error",err.message.red);
        process.exit(1);
    }
}

module.exports=Connect;