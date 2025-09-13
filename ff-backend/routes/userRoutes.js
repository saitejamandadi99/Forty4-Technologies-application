const express = require('express');
const router = express.Router();
const {getAllUsers, createUser, getUserById, updateUserById, deleteUserById} = require('../controllers/userControllers');

router.get('/users',getAllUsers);
router.post('/users',createUser);
router.get('/users/:id',getUserById);
router.put('/users/:id',updateUserById);
router.delete('/users/:id',deleteUserById);

module.exports = router;