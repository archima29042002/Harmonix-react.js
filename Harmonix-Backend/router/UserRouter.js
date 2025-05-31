const express = require('express');
const router = express.Router();
const {Registration, Login, GetAllUsers, DeleteUsers,getLikedSongs,GetUserById} = require('../controller/User')

router.post('/register', Registration)
router.post('/login', Login)
router.get('/allgetusers', GetAllUsers) 
router.delete('/deleteuser/:id', DeleteUsers)
router.get("/:userId/liked-songs",getLikedSongs);
router.get("/:id",GetUserById)
module.exports = router