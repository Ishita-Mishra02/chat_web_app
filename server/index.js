const express=require('express');
const http=require('http');
const cors= require('cors')
const cookieParser= require('cookie-parser')
require('./database/connect')

//const morgan=require('morgan');
const bodyParser=require('body-parser');

const app=express();
const server =http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
    }
  });
app.use(cors())
app.use(cookieParser())

//app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const userRoutes= require('./routes/user')

app.use('/user',userRoutes)

/*app.use(cors())
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method==='METHOD'){
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({});
  }
})*/

//Socket connections corresponding to each user id are stored as key-value pairs
let dict={}
io.on('connection', function(socket) {
    socket.on('INIT_CONNECTION',function(user_id){
      //console.log(user_id)
      dict[user_id]=socket
    })
    //console.log('A user connected');
    socket.on('sendMessage', function(data){
      if(dict[data.to]!==undefined){
      dict[data.to].emit('receive'+data.to,{message: data.message,from: data.from})
    }})
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      // console.log('A user disconnected');
    });
 });

app.get('/',(req,res)=>{
    res.send('hii')
})

server.listen(5000,function(){
    console.log('http:://localhost:5000');
})