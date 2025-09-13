const mongoose = require('mongoose');
const User = require('../models/userModel');

// get all users 

const getAllUsers = async (req , res)=>{
    try {
        const users = await User.find({}); 
        res.status(200).send({message:'Users fetched successfully', users:users});
        
    } catch (error) {
        res.status(500).send({message: error.message});
        console.log(error);
    }
}

//delete a user by id
const deleteUserById = async (req , res)=>{
    try {
        const userId = req.params.id; 
        const user = await user.findByIdAndDelete(userId); // finds the user by id and deletes it returns user if there else null.
        if(!user){
            return res.status(404).send({message: 'User not found'});
        }
        res.status(200).send({message:'User deleted successfully', user:user});
        
    } catch (error) {
       res.status(500).send({message: error.message});
       console.log(error); 
    }
}



module.exports = {getAllUsers};
