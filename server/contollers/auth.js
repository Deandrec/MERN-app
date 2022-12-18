import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTAR USER */
// has to be asyncronus
export const register = async(req, res)=>{
    try{
        const {
            fristName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions,
        } = req.body;
        // encrypt password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            fristName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err){
        res.status(500).json({error: err.message });
    }
}

/* LOGINNG IN */
export const login = async(req,res) =>{
    try{
        const {email, password} = req.body;
        // find user wits associated email
        const user = await User.findOne({email : email});
        if (!user) return res.status(400).json({msg: "User does not exist. "})

        // check entered password
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch) return res.status(400).json({msg: "Invalid credentials. "})

        // valid user assign token
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user})
    } catch (err){
        res.status(500).json({error: err.message });
    }
}