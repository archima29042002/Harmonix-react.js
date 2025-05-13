const mongoose = require('mongoose');

const dbconn = async () => {
  try {
    await mongoose.connect("mongodb+srv://archimamandal:12345@cluster0.j6mzdxf.mongodb.net/Harmonix?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Database connected successfully");
} catch (error) {
    console.log(error);
  }
}
module.exports = dbconn;