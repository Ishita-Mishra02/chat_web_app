# chat_web_app
A one to one text messaging system using MERN stack and socket.io

After downloading above files,
go to 'server' folder then open 'nodemon.json'
modify **'JWT_KEY'** to any other value

In variable named **'MONGO_ATLAS_PW'**, paste your Mongo ATLAS PASSWORD which you get on MongoDB website

Refer tutorial - https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database


**Now in folder 'database', edit connect.js file as follows-**

At this string ,replace the '<password>' part
mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority
=> const url='mongodb+srv://<username>:'+process.env.MONGO_ATLAS_PW+'@<your-cluster-url>/test?retryWrites=true&w=majority'
  
>Navigate folder 'server' and run the command 'npm install', this step will initiate installation of dependencies   
>Navigate to folder 'front-end' and run 'npm install' to get all dependencies at client side
>Go to folder 'server' at terminal and run the command 'npm start' to initiate server (port 5000)   
>Go to folder 'front-end' at another terminal and run the command 'npm start' (port 3000- client)   

run in different browsers

![Image Register](https://github.com/Ishita-Mishra02/chat_web_app/blob/main/ss/s1.png)

![Login](https://github.com/Ishita-Mishra02/chat_web_app/blob/main/ss/s2.png)

![User-1](https://github.com/Ishita-Mishra02/chat_web_app/blob/main/ss/s3.png)

![User-2](https://github.com/Ishita-Mishra02/chat_web_app/blob/main/ss/s4.png)
