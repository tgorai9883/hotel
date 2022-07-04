const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    roomid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room"
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    fromDate: {
        type: String,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    transactionid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'booked'
    }
},{
    timestamps: true
})

const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking;