const mongoose= require('mongoose')
const checkAuth=require('../../middleware/check-auth')

const userSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true}, 
    password: {type: String,required: true},
    username: {type: String, required:true},
    firstname: {type: String, required: true},
    lastname: {type: String, default: ''},
    online: {type: Boolean, default: false}
});

module.exports= mongoose.model('User',userSchema);