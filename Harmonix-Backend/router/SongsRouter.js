const express = require('express');
const songrouter = express.Router();
const {AddSong,GetAllSong,GetSongById,DeleTeSong,UpdateSong} = require('../controller/SongController')
const upload = require('../middleware/uploader');


songrouter.get('/getallsongs',GetAllSong)
songrouter.post('/createsong',upload.fields([{ name: 'image' }, { name: 'audio' }]),AddSong)
songrouter.get('/getsong/:id',GetSongById)
songrouter.put('/updatesong/:id',UpdateSong)
songrouter.delete('/deletesong/:id',DeleTeSong)

module.exports = songrouter;