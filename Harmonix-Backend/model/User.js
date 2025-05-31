const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "",
    },
    likedSongs: {
      //Array
      type: String,
      default: "",
    },
    likedPlaylists: {
      //Array
      type: String,
      default: "",
    },
    subscribedArtists: {
      type: String,
      default: "",
    },
    image: {
      type: String,
    },
    downloads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
