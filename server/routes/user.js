const express= require('express')
const router =express.Router()
const userController= require('../controllers/user')
const checkAuth = require('../middleware/check-auth')

router.post('/signup', userController.signup)

router.post('/login',userController.login)

router.post('/editpassword',userController.editpassword)

router.get('/list',checkAuth, userController.list_all_users)

router.get('/fetchuser',userController.fetchUser)
//in fetch user details are fetched by auth token itself, middleware not needed here

module.exports=router