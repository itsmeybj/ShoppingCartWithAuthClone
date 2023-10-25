const {default:mongoose} = require("mongoose")

const dbConnect=()=>{
    try{
        const db = mongoose.connect(process.env.DATABASE_URL)
        console.log('connected');
    }catch(err){
        console.log(err);
        console.log('not connected');
    }
}

module.exports = dbConnect;