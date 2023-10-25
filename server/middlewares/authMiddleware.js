const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware=async(req,res,next)=>{
    let token;
    
    //Note - this is working but we can not send bearer keyword from frotend.
    //console.log('co-',req.cookies.jwtToken)
    //console.log('-',req?.headers)

    if(req?.headers?.authorization?.startsWith("Bearer")){ 

        token = req?.headers?.authorization?.split(" ")[1];
        
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET)
            //console.log(decode)
            const user = await User.findById(decode?.id);
            req.user = user;
            next();

        }catch(err){
            res.status(422).send({sucess:false,msg:"Not authorized token, token is expired, Please login again"})
        }

    }else{
        res.status(422).send({sucess:false,msg:"There is not token attached to header"})
    }
}

module.exports = authMiddleware;