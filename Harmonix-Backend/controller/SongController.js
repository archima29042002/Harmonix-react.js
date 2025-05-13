const Song = require('../model/Song');
const cloudinary = require("../config/clodinary")
const fs = require("fs");
const AddSong = async (req,res)=>{
    if(req.body){

        const imageFile = req.files['image'][0];
        const audioFile = req.files['audio'][0];
    // Upload image
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'uploads/images',
        resource_type: 'image',
      });
  
      // Upload audio
      const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
        folder: 'uploads/audio',
        resource_type: 'video', // Cloudinary treats audio as "video"
      });      
        const {name,track} = req.body;

        const thumbnail = imageUpload.secure_url;
        const audio = audioUpload.secure_url;
        const song = new Song({name,thumbnail,track,audio});
        const result = await song.save();
        fs.unlinkSync(imageFile.path);
        fs.unlinkSync(audioFile.path);
    
        if(result){
            res.status(200).json({result});
        }
        else{
            res.status(500).json({message:"Error in adding song"});
        }
    }
}
const GetAllSong= async (req,res)=>{
    if(req){
        const songs = await Song.find();
        if(songs){
            res.status(200).json({songs});
        }
        else{
            res.status(500).json({message:"Error in getting songs"});
        }
    }
}
const GetSongById = async (req,res)=>{
    if(req){
        const song = await Song.findById(req.params.id);
        if(song){
            res.status(200).json({song});
        }
        else{
            res.status(500).json({message:"Error in getting song"});
        }
    }
}
const DeleTeSong = async (req,res)=>{
    if(req){
        const song = await Song.findByIdAndDelete(req.params.id);
        if(song){
            res.status(200).json({song});
        }
        else{
            res.status(500).json({message:"Error in deleting song"});
        }
    }
}
const UpdateSong = async (req,res)=>{
    if(req){
        const song = await Song.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(song){
            res.status(200).json({song});
        }
        else{
            res.status(500).json({message:"Error in updating song"});
        }
    }
}

module.exports = {AddSong,GetAllSong,GetSongById,DeleTeSong,UpdateSong};