// const cloudinary= require('cloudinary').v2 ;

// const Cloudeconfig = cloudinary.config({ 
//     cloud_name: 'dkrncnwfj', 
//     api_key: '686952751913191', 
//     api_secret: 'EgBtUfacBb3l0Df1-geM8xhbIzg' // Click 'View API Keys' above to copy your API secret
// });
// module.exports = Cloudeconfig;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dkrncnwfj', 
    api_key: '686952751913191', 
    api_secret: 'EgBtUfacBb3l0Df1-geM8xhbIzg'
});

module.exports = cloudinary;
