const express = require('express');
const router = express.Router();
const {Registration, Login, GetAllUsers, DeleteUsers} = require('../controller/User')

router.post('/register', Registration)
router.post('/login', Login)
router.get('/allgetusers', GetAllUsers) 
router.delete('/deleteuser/:id', DeleteUsers)

module.exports = router