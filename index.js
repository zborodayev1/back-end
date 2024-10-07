import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./server/validations/auth.js"
import { validationResult } from 'express-validator'
import UserModel from './server/models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const app = express();

mongoose
    .connect('mongodb+srv://root:pass@cluster0.r8mza.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>{console.log('DB connect!')})
    .catch((err)=>{console.log('DB error', err)})

app.use(express.json());

app.post('/auth/register',registerValidation, async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({_id: user._id},'key123',{expiresIn: '30d'},);

        const { passwordHash, ...userData } = user._doc

        res.json(
            ...userData, 
            token,
        );
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        });
    }
});
 
app.listen(4444, (err) => {
    if(err){
        return console.log(err);
    };
    console.log('Server OK');
});