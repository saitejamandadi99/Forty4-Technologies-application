const mongoose = require('mongoose');
const User = require('../models/userModel');

// get all users 

const getAllUsers = async (req , res)=>{
    try {
        const users = await User.find(); 
        res.status(200).send({message:'Users fetched successfully', users:users});
        
    } catch (error) {
        res.status(500).send({message: error.message});
        console.log(error);
    }
}

//create user 
const createUser = async (req , res)=>{
    try{
        const {name, email, phone, company, address} = req.body; 
        if(!name || !email || !phone || !company || !address){
            return res.status(400).send({message: 'All fields are required'});
        }
        const {street, city, state, zipCode} = address;
        if(!street || !city || !state || !zipCode || !address.geo || address.geo.latitude === undefined || address.geo.longitude === undefined){
            return res.status(400).send({message: 'Address fields (street, city, state, zipCode) are required'});
        } // basic validation for address fields.

        const existingUser = await User.findOne({$or:[{email:email},{phone:phone}]});
        if(existingUser){
            return res.status(400).send({message: 'User with this email or phone number already exists'});
        }
        const user = new User({name, email, phone, company, address});
        await user.save();
        res.status(201).send({message: 'User created successfully', user:user});
    }
    catch(error){
        res.status(500).send({message: error.message});
    }
}

// return single user by id 

const getUserById = async (req , res)=>{
    try {
        const userId = req.params.id; 
        const user = await User.findById(userId); 
        if(!user){
            return res.status(404).send({message: 'User not found'});
        }
        res.status(200).send({message:'User details fetched successfully', user:user});
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

//delete a user by id
const deleteUserById = async (req , res)=>{
    try {
        const userId = req.params.id; 
        const user = await User.findByIdAndDelete(userId); // finds the user by id and deletes it returns user if there else null.
        if(!user){
            return res.status(404).send({message: 'User not found'});
        }
        res.status(200).send({message:'User deleted successfully', user:user});
        
    } catch (error) {
       res.status(500).send({message: error.message});
       console.log(error); 
    }
}



module.exports = {getAllUsers, deleteUserById, getUserById};
