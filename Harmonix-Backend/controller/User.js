const User = require("../model/User");
const Registration = async (req,res)=>{
    try {
        if(req.body.firstName && req.body.lastName && req.body.email && req.body.password){
            const isUserExist = await User.findOne({email: req.body.email}); //email:-database email and req.body.email- front end theke asa email
            if(isUserExist){
                return res.status(400).json({message: "User already exist",success: false})
            }else{
                const user = new User(req.body)
                const isReg = await user.save() // cloud database
                if(isReg){
                   res.status(201).json({message: "User registered successfully",success: true}) 
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate request
        if (!email || !password) {
          return res.status(400).json({ message: "Email and password required", success: false });
        }
        const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    if(user.password ==password){
        res.status(200).json({
            message: "Login successful",
            success: true, // frontend can store this in localStorage
            user: {
              id: user._id,
              email: user.email,
              name: `${user.firstName} ${user.lastName}`
            }
          });
    }else{
        res.status(401).json({ message: "Invalid credentials", success: false });
    }
   
    } catch (error) {
        console.log(error)
    }
}
const GetAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({}, {
            password: 0 // Exclude password field for security
        });
        
        if (users.length > 0) {
            res.status(200).json({
                message: "Users fetched successfully",
                success: true,
                users: users
            });
        } else {
            res.status(404).json({
                message: "No users found",
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching users",
            success: false,
            error: error.message
        });
    }
}

const DeleteUsers = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }
        
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (user) {
            res.status(200).json({
                message: "User deleted successfully",
                success: true,
                user: user
            });
        } else {
            res.status(404).json({
                message: "User not found",
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in deleting user",
            success: false,
            error: error.message
        });
    }
}

module.exports = {Registration, Login, GetAllUsers, DeleteUsers}
