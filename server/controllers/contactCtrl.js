const User = require("../models/userModel")

const showContact = async (req, res) => {
    //this will only send data which is commin from authMiddlerware
    //if token not found then error message send throgh authMiddlewre
    let obj = {
        _id : req.user._id,
        username : req.user.username,
        email : req.user.email,
        mobile : req.user.mobile,
        gender : req.user.gender,
        profession : req.user.profession,
        term : req.user.term
    }
    res.status(200).send({sucess:true,msg:"Welcome to Contact",data : obj})
}

const submitContact=async(req,res)=>{

    const {username,email,mobile,message} = req.body;

    //console.log(req.body)

    if(!username || !email || !mobile || !message){
        return res.status(422).send({sucess:false,msg:"Please Fill All Fields"})
    }

    const userContact = await User.findOne({_id : req.user._id})

    if(userContact){

        const userMessage = await userContact.addMessage(username,email,mobile,message)
        if(userMessage){
            await userContact.save();
        res.status(200).send({sucess:true,msg:"User Contact Submited!!!"})
        }else{
            confirm.log("messages not added")
        }

    }else{
        res.status(422).send({sucess:false,msg:"User Not Found"})  
    }

   // res.status(200).send({sucess:true,msg:"Welcome to Contact",data : req.user})
        
    
}


module.exports.showContact = showContact;
module.exports.submitContact = submitContact;