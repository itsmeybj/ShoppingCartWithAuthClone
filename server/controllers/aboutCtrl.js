const generateToken = require("../config/jsonToken")
const User = require("../models/userModel")

const showAbout = async (req, res) => {
    //this will only send data which is commin from authMiddlerware
    //if token not found then error message send throgh authMiddlewre
 
    let obj = {
        _id : req.user._id,
        username : req.user.username,
        email : req.user.email,
        mobile : req.user.mobile,
        gender : req.user.gender,
        profession : req.user.profession,
        term : req.user.term,
        image : req.user.image
    }
    res.status(200).send({sucess:true,msg:"Welcome to About",data : obj})
}



module.exports.showAbout = showAbout;
