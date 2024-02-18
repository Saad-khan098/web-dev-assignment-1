import bcrypt from 'bcrypt';
import User from "../Models/User.js";
import express from 'express';
import jwt from 'jsonwebtoken';
import Form from '../Models/Form.js'

var router = express.Router();


router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const form = await Form.findOne({_id: id}).populate('user');
        res.json(form).end();
    }
    catch(e){
        console.log(e);
        res.json({msg: 'some error occured'})
    }
})
router.put('/:id', async (req,res)=>{
    const {name} = req.body;
    const {id} = req.params;
    try{
        await Form.updateOne(
            {_id: id},
            {$set: {name: name}}
        )
        res.json({msg: 'form updated sucessfullly'})
    }
    catch(e){
        console.log(e);
        res.json({msg: 'some error occured'})
    }
})

router.post('/create', async (req,res)=>{

    const {name} = req.body;
    console.log(req.body);

    const form = new Form({
        name: name,
        user: req.user.id
    })
    console.log(form);
    console.log(req.user)
    await form.save();
    res.json({msg: 'form created successfully'});
})

export default router
