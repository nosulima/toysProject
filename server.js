const {app}= require ("./app");
const dotenv=require('dotenv');
const mongoose=require('mongoose');
dotenv.config();
const mongoUrl=process.env.MONGO_URL;
mongoose.connect(mongoUrl)
.then(()=>console.log("db connected to "+mongoUrl))
.catch((err)=>console.log(err));
const PORT=process.env.PORT ||2000;
console.log('Hi'+PORT)
app.listen(PORT,()=>{
    console.log("listening on port "+PORT);
})
