const mongoose=require('mongoose')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

const User=require('../database/models/user')

exports.signup=(req,res,next)=>{
    User.find({email : req.body.email}).exec()
    .then((user)=>{
    if(user.length>=1){
        return res.status(201).json({message: 'A user with same email exists'})
    }
    else{
        User.find({username: req.body.email}).exec()
        .then((user)=>{
            if(user.length>=1){
                return res.status(201).json({message:'A user with same username exists'})
            }
            else{
                bcrypt.hash(req.body.password, 5, (err,hash)=>{
                    if(err){
                        return res.status(201).json({message: 'An error occurred'})
                    }
                    else{
                        const user1=new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email, password: hash,
                            username: req.body.username, firstname: req.body.firstname,
                            lastname: req.body.lastname
                        })
                        user1.save()
                        .then(result=> {
                            //console.log(result)
                            return res.status(201).json({message: 'Profile created'})
                        })
                    }
                })
            }
        })
        .catch((error)=>{
            return res.status(201).json({message:'An error occurred'})
        })
    }
    })
    .catch(error=>{
        return res.status(201).json({message: 'An error occurred'})
    })
}

exports.login=(req,res,next)=>{
    User.find({email: req.body.email}).exec()
    .then(user=>{
        if(user.length<1){
            return res.status(201).json({message: 'Email not registered'})
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                return res.status(201).json({message: 'An error occurred'})
            }
            if(result){
                const token= jwt.sign({
                    email: user[0].email, _id: user[0]._id,username: user[0].username
                }, process.env.JWT_KEY,{
                    expiresIn: '7d'
                })
                return res.cookie('token',token, {httpOnly: true}).json({message: 'login successful',  user: user[0]})
            }
            res.status(201).json({message:'wrong password'});
        })
    })
    .catch(err=>{
        console.log('error')
        return res.status(201).json({message: 'An error occurred'})
    })
}

exports.editpassword=(req,res,next)=>{
    var q={email: req.body.email}
    bcrypt.hash(req.body.password, 5, (err,hash)=>{
        if(err){
            return res.status(201).json({message: 'An error occurred'})
        }
    else{
    User.updateOne(q,{$set: {password: hash}}).then(result=>{
        if(result.length<1){
            return res.status(201).json({message: 'Email not registered'})
        }
        return res.status(201).json({message: 'Updated successfully'})
    })
    .catch(err=>{
        console.log(err)
        return res.status(201).json({message: 'An error occurred'})
    })
    }})
}

exports.list_all_users=(req,res,next)=>{
    User.find({_id: {$ne: req.headers.except}}).select('_id username firstname lastname')
    .exec()
    .then(docs=>{
        return res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        return res.status(200).json({message: 'An error occurred'})
    })
}

exports.fetchUser=(req,res,next)=>{
    //console.log(req.cookies.token)
    try{
        const decoded = jwt.verify(req.cookies.token , process.env.JWT_KEY)
        req.userData= decoded
        return res.status(200).json({user: decoded})
    }
    catch(error){
        return res.status(200).json({
            message: 'Login to access this page'
        })
    }
}