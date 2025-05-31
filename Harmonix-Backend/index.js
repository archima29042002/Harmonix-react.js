const express = require('express');
const dbconn = require('./config/dbconn');
const UserRouter = require('./router/UserRouter');
const SongsRouter = require('./router/SongsRouter');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user",UserRouter);
app.use("/api/v1/song",SongsRouter);

// app.get('/getUser', (req, res) => {
//     Userjs.find()
//     .then(users => res.json(users))
//     .catch(err => res.json(err));
// })

dbconn().then(()=>{ 
    app.listen(4000, () => {
        console.log("Server is running on http://localhost:4000");
})
})