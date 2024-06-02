import express from 'express'
const app = express();
import 'dotenv/config'
import mongoose from 'mongoose';
import userRouter from './routes/useroutes.js';
const port = process.env.PORT || 5000;
import cors from 'cors'
import cookieParser from "cookie-parser";
import messageRouter from './routes/messageroutes.js';
import { Server } from "socket.io";
import {createServer} from 'http'

const server = createServer(app);

const io= new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
        credentials:true
    }
})

io.on("connection", (socket) => {
    console.log("user Connected");
    console.log(socket.id); 
    
    socket.on("send_message", (data) => {
      io.emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("user Disconnected", socket.id);
    });
  });




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());



mongoose.connect('mongodb://127.0.0.1:27017/chatpulse').then(()=>{
  console.log('connected to db')  
}).catch(()=>{
    console.log('error connecting to db');
})

app.use(userRouter)
app.use(messageRouter)

server.listen(port, () => {
    console.log(`App is listening at port:${port}`);
});

app.get('/', (req, res) => {
    res.send('App is working well');
});