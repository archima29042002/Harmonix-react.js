const mongoose = require('mongoose');
const Payment = new mongoose.Schema({
    cardNumber: {
        type: Integer,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    month:{
        type: Integer,
        required:true,
    },
    year:{
        type: Integer,
        required: true,
    },
    cvv:{
        type: Integer,
        required: true,
    },
})
const PaymentModel = mongoose.model("Payment", Payment);
module.exports = PaymentModel;
