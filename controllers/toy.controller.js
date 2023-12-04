const { Toy } = require("../models/Toy.model");
const Joi = require('joi');
exports.getToys = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        console.log('page ' + page);
        const userId = res.locals.userId;
        console.log("userid"+userId);
        const toys = await Toy.find({ user_id: userId }).limit(10).skip((page - 1) * 10);
        res.json(toys);
    }
    catch (error) {
        next(error);
    }


}
exports.getToyByNameOrInfo = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        let queryS = req.query.s;
        let searchReg = new RegExp(queryS, "i")
        let data = await Toy.find({ $or: [{ name: searchReg }, { info: searchReg }] })
            .sort({ _id: -1 }).limit(10).skip((page - 1) * 10)
        res.json(data);
    }
    catch (err) {
        next(err)
    }
}
exports.getToyByCategory = async (req, res, next) => {
    const page = req.query.page || 1;
    try {
        let catN = req.params.catName;
        let catReg = new RegExp(catN, "i")
        let data = await Toy.find({ category: catReg })
            .limit(10)
            .skip((page - 1) * 10)
            .sort({ _id: -1 })
        res.json(data);
    }
    catch (err) {
        next(err)
    }
}
exports.getToyById = async (req, res, next) => {
    try {

        const id = req.params.id;
        const toy = await Toy.findOne({ _id: id });
        if (!toy)
            throw new Error("invalid toy id")
        res.json(toy);

    }
    catch (error) {
        next(error);
    }
}
exports.addToy = async (req, res, next) => {
    const body = req.body;
    try {
        const valid = joiSchema.toyStructure.validate(body);
        if (valid.error)
            throw Error(valid.error);
        const newToy = new Toy(body);
        console.log(newToy.user_id);
        const userId = res.locals.userId;
        newToy.user_id = userId;
        console.log("user id :" + userId);
        // newToy.user_id.populate();
        await newToy.save();
        res.status(201).send(newToy);
    } catch (err) {
        next(err);
    }
}
exports.setToy = async (req, res, next) => {
    const id = req.params.editid;
    console.log(id);
    const details = req.body;
    try {
        if (!isExist(id))
            throw new Error('invalid toy id');
        await Toy.updateMany({ _id: id }, { $set: details }, { upsert: true });
        res.status(201).send('updated');
    }
    catch (err) {
        next(error);
    }
}
exports.deleteToy = async (req, res, next) => {
    const id = req.params.delid;
    try {
        if (!await isExist(id))
            throw new Error('invalid toy id');
        await Toy.deleteOne({ _id: id });
        res.status(201).send('deleted');
    }
    catch (err) {
        next(err);
    }
}

const joiSchema = {
    toyStructure: Joi.object().keys({
        name: Joi.string().min(4).max(100),
        info: Joi.string().min(4).max(100),
        category: Joi.string().min(4).max(100),
        img_url: Joi.string(),
        price: Joi.number().min(1).max(9999),
        user_id: Joi.string(),
        date_created: Joi.date()
    })
}
const isExist = async (id) => {
    const toy = await Toy.findOne({ _id: id });
    if (toy)
        return true;
    return false;

}