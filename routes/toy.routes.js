const express=require('express');
const { getToyByCategory,getToys,getToyByNameOrInfo,addToy,setToy,deleteToy,getToyById } = require('../controllers/toy.controller');
const { auth } = require('../middleware/auth');

const router=express.Router();
router.get("/",auth(),getToys);
router.get('/search',getToyByNameOrInfo);
router.get('/category/:catName',getToyByCategory);
router.post('/',auth(),addToy); //after login
router.get('/single/:id',getToyById)
router.put('/:editid',auth(),setToy);  //after login
router.delete('/:delid',auth(),deleteToy)  //after login
//bonus min-max
module.exports=router;