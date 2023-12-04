//נשתמש באפ בשביל הראוטינג
const express=require('express');
const app=express();
const cors=require('cors');
app.use(express.json());
app.use(cors());
const userRouter=require('./routes/user.routes');
const toysRouter=require('./routes/toy.routes');
const { routesInit } = require('./routes/routers.routes');
app.get('/test',(req,res)=>{
    res.send('works properly');
})
// app.use("/users",userRouter);
// app.use("/toys",toysRouter);
routesInit(app);

app.all('*',(req,res,next)=>{
    return next(new Error(404,'The requested resource not exists on this server'));
})
//global error handler
app.use((error,req,res,next)=>{
    res.status(400).send({msg:error.message})
})
module.exports.app=app;