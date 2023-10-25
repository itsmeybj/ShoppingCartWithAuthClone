const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
    },
    mobile : {
        type : String,
        require : true,
    }, 
    password : {
        type : String,
        require : true,
    },
    repassword : {
        type : String,
        require : true,
    },
    gender : {
        type : String,
        require : true,
    },
    profession : {
        type : String,
        require : true,
    },
    term : {
        type : Boolean,
        require : true,
    },
    link:{
        type:String
    },
    image:{
        type:String,
    },
    messages : [{
        username : {
            type : String,
            require : true
        },
        email : {
            type : String,
            require : true,
        },
        mobile : {
            type : String,
            require : true,
        },
        message : {
            type:String
        }  
    }],
},{timestamps: true})

userSchema.pre("save",async function(next){
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
    this.repassword = bcrypt.hashSync(this.repassword,salt)
    next();
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.addMessage = async function(username,email,mobile,message){

    try{
        this.messages = this.messages.concat({username,email,mobile,message})
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err)
    }
}

module.exports = new mongoose.model("User",userSchema)