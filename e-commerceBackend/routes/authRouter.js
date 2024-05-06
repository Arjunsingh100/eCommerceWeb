const express=require('express')
const router=express.Router();
const {requireSignIn,isAdmin}=require('../middlewares/authMiddleware')
const {registerController,loginController, testController, forgotPasswordRoute, updateProfileController}=require('../controllers/authController')



router.post('/register', registerController);
router.post('/login',loginController);

router.get('/test',requireSignIn,isAdmin,testController);

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({Ok:true})
})

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({Ok:true})
})

router.post('forget-password',forgotPasswordRoute);

router.put('/profile',requireSignIn,updateProfileController);

module.exports=router;