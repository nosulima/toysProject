const { User } = require("../models/User.model");
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const Joi = require("joi");

exports.login=async(req,res,next)=>{
  //validate the body
    //check if exist
    try {
        const body = req.body;
        const valid = joiSchema.login.validate(body);
        if(valid.error)
        throw Error(valid.error);
        if (! await isExist(body.email))
            throw new Error('user does not exists');
        //check if password match
        const user =await User.findOne({ email: body.email });
        if (! await bcrypt.compare(body.password, user.password))
            throw new Error('invalid email address or password');
        //response to client
        //generate token
        const token=generateToken(user);
        res.status(200).send({user,token});
    }
    catch (error) {
        next(error);
    }
}

exports.register=async(req,res,next)=>{
     //validate the body
    //check if exist
    try {
        const body = req.body;
        const valid = joiSchema.register.validate(body);
        if(valid.error)
        throw Error(valid.error);
        if (await isExist(body.email))
            throw new Error('user already exist');
        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;
        const newUser = new User(body);
        await newUser.save();   //add to db
        res.status(201).send(newUser);
    }

  

    catch (error) {
        next(error);
    }
}
exports.getUsers=async(req,res,next)=>{
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}

exports.deleteUser = async(req,res,next)=>{
    try{
        if(! await User.findOne({_id:req.params.idDel}))
        throw new Error("user does not exists")
        await User.deleteOne({_id:req.params.idDel});
        res.status(200).send("deleted");

    }
    catch(err){
        next(err);
    }
}

exports.updateUser = async(req,res,next)=>{
    const body=req.body;
    const valid = joiSchema.register.validate(body);
    if(valid.error)
    throw Error(valid.error);
    try{
        if(! await User.findOne({_id:req.params.idDel}))
        throw new Error("user does not exist");
        await User.updateOne({_id:req.params.idEdit}, req.body);
        res.status(200).send('updated');

    }
    catch(err){
      next(err);
    }
}
const isExist = async (email) => {
    const user = await User.findOne({ email });
    if (user)
        return true;
    return false;

}
const joiSchema={
    login: Joi.object().keys({
        password: Joi.string().min(4).max(20),
        email: Joi.string().email({tlds:{allow:['com']}}).error(()=>Error('invalid email address'))
    }),
    register: Joi.object().keys({
        fullName: Joi.string().required().max(25),
        email: Joi.string().required().email({tlds:{allow:['com']}}).error(()=>Error('invalid email address')),
        date_created:Joi.date(),
        password: Joi.string().min(4).max(20).required(),
        role:Joi.string().valid('user', 'admin')
    })
}
