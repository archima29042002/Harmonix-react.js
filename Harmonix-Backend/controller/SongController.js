const Song = require('../model/Song');
const User = require('../model/User');

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
const likeSong = async (req, res) => {
  const { userId } = req.params;
  const { songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.likedSongs.includes(songId)) {
      user.likedSongs.push(songId);
      await user.save();
    }

    res.status(200).json({ message: "Song added to liked songs" });
  } catch (err) {
    res.status(500).json({ message: "Error adding liked song" });
    console.log(err);
  }
};
const removeLikedSong = async (req, res) => {
  const { userId, songId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove the songId from the likedSongs array
    user.likedSongs = user.likedSongs.filter(
      (id) => id.toString() !== songId
    );

    await user.save();

    res.status(200).json({ message: "Song removed from liked songs" });
  } catch (error) {
    console.error("Error removing liked song:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const downloadSong = async (req, res) => {
  const { userId, songId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if already downloaded
    if (user.downloads.includes(songId)) {
      return res.status(400).json({ message: "Song already downloaded" });
    }

    user.downloads.push(songId);
    await user.save();

    res.status(200).json({ message: "Song added to downloads", downloads: user.downloads });
  } catch (error) {
    res.status(500).json({ message: "Error downloading song", error });
  }
};
module.exports = {AddSong,GetAllSong,GetSongById,DeleTeSong,UpdateSong,likeSong,downloadSong,removeLikedSong};