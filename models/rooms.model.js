const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: {
        type:String,
        require:true
    },
    noOfSeatsAvailable:{
        type:Number,
        default:0
    },
    amenities:{
        type:[],
    },
    priceForAnHour:{
        type:Number,
        require:true
    },
    availableStatus:{
        type:String,
        enum:["Available","Booked","Pending","Not Available"],
        default:"Available"
    }
}, {
    timestamps: true
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;