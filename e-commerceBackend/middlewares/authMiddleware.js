const JWT=require('jsonwebtoken');
const userModel=require('../models/userModel');

module.exports.requireSignIn=(req,res,next)=>{
    try{
        const decode=JWT.verify(req.headers.authorization,process.env.SECRET_KEY);
        req.user=decode;
        next();
    }
    catch(error){
        console.log(error)
    }
}
module.exports.isAdmin = async (req,res,next)=>{
    const user = await userModel.findById(req.user._id);
   
    if(user.roll!=1){
        return res.status(401).send({
            success:false,
            message:'UnAuthorized Acess'
        })
    }else{
        next();
    }
}