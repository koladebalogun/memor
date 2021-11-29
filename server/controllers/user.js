import bcrypt from 'bcryptjs'; //For hashing passwords
import jwt from 'jsonwebtoken'; // This would enable us store the user in the browser for some period of time.

import User from '../models/user.js';

export const signin = async (req,res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "10h" }); //if the user exist in the data base and has a correct password, we'll get the users json web token that we'll send to the frontend

        res.status(200).json({ result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}

export const signup = async (req,res) => {
    const { email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({ email }); // we are finding the existing user because we don't want to create a new account if we have the exisiting user

        if(existingUser) return res.status(400).json({ message: "User already exists."}); 

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match"}); 

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` }); //creating a user

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn: "10h" });

        res.status(200).json({ result, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
} 

// //whenever you have a post request, you get all the data through the request.body (req.body)