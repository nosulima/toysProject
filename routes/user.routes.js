const express=require('express');
const { getUsers,register ,login,deleteUser, updateUser} = require('../controllers/user.controller');
const router=express.Router();
router.get('/',getUsers);
router.post('/',register);
router.post('/login',login);
router.delete("/:idDel",deleteUser);
router.put("/:idEdit",updateUser );
module.exports=router;