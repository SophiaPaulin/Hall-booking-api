const mongoose = require('mongoose');

const bookingRoomsSchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookingRooms",
    },
    date:{
        type:date,
        default:new Date()
    },
    startTime:{
        type:date,
        default:new Date()
    },
    endTime:{
        type:date,
        default:new Date()
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    }
}, {
    timestamps: true
});

const BookingRooms = mongoose.model("BookingRooms", bookingRoomsSchema);
module.exports = BookingRooms;