const mongoose = require("mongoose");

const customerBookedRoomSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        },
        bookingStatus: {
            type: String,
            require: true,
            enum: ["Booked", "Not Booked"],
            default: "Not Booked"
        },
        paymentStatus: {
            type: String,
            require: true,
            enum: ["Paid", "Not Paid"],
            default: "Not Paid"
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "Credit Card", "Gpay"],
            default: null
        },
        bookedDate: {
            type: Date,
            default: new Date()
        }
    },
    {
        timetamps: true
    }
);

const CustomerBookedRoom = mongoose.model("CustomerBookingRoom", customerBookedRoomSchema);
module.exports = CustomerBookedRoom;
