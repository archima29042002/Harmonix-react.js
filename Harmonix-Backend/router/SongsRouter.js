const express = require('express');
const songrouter = express.Router();
const {AddSong,GetAllSong,GetSongById,DeleTeSong,UpdateSong,likeSong,downloadSong,removeLikedSong} = require('../controller/SongController')
const upload = require('../middleware/uploader');


songrouter.get('/getallsongs',GetAllSong)
songrouter.post('/createsong',upload.fields([{ name: 'image' }, { name: 'audio' }]),AddSong)
songrouter.post('/like/:userId/:songId',likeSong);
songrouter.post('/download/:userId/:songId', downloadSong);
songrouter.get('/getsong/:id',GetSongById)
songrouter.put('/updatesong/:id',UpdateSong)
songrouter.delete('/deletesong/:id',DeleTeSong)
songrouter.delete("/:userId/liked-songs/:songId",removeLikedSong);


module.exports = songrouter;