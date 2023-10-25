const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const createUser = require('../controllers/userCtrl').createUser;
const loginUser = require('../controllers/userCtrl').loginUser;
const getAllUsers = require('../controllers/userCtrl').getAllUsers;
const getUser = require('../controllers/userCtrl').getUser;
const deleteUser = require('../controllers/userCtrl').deleteUser;
const updateUser = require('../controllers/userCtrl').updateUser;
const updatePassword = require('../controllers/userCtrl').updatePassword;
const forgotPassword = require('../controllers/userCtrl').forgotPassword;
const resetPassword = require('../controllers/userCtrl').resetPassword;

const multer = require("multer")
const path = require("path")

const userRouter = express.Router();



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userImages'),function(err,sucess){
            if(err) throw err
        });
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name,function(err,sucess){
            if(err) throw err
        });
    }
})

const upload = multer({storage : storage})

userRouter.post('/register',upload.single('image'),createUser)

userRouter.post('/login',loginUser);
userRouter.get("/all-users",authMiddleware, getAllUsers);
//userRouter.get('/:id',getUser);

//here we are deleting student by taking id from authmiddleware 
userRouter.get('/get-user',authMiddleware,getUser);

//here we are deleting student by taking id from user.
//userRouter.delete('/:id',deleteUser);

//here we are deleting student by taking id from authmiddleware 
userRouter.delete('/delete-user', authMiddleware, deleteUser);

//userRouter.put('/:id',updateUser);
userRouter.put('/edit-user', authMiddleware,upload.single('image'),updateUser);

userRouter.put('/update-password',authMiddleware,updatePassword);

userRouter.post('/forgot-password',forgotPassword);

userRouter.put('/reset-password',resetPassword);

module.exports = userRouter;