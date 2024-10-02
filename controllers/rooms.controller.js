const Room = require("../models/rooms.model");
const CustomerBookedRoom = require("../models/customerRoomBooking.model");
const Customer = require("../models/customer.model");

module.exports.createRooms = async (req, res) => {
    try {
        const roomsData = {
            roomName: req.body.roomName,
            noOfSeatsAvailable: req.body.noOfSeatsAvailable,
            amenities: req.body.amenities || [],
            priceForAnHour: req.body.priceForAnHour,
            availableStatus: req.body.availableStatus || []
        };
        const response = await Room.create(roomsData);
        if (response) {
            return res.status(201).json({
                message: "Rooms created successfully",
                result: response,
                status: true
            });
        } else {
            return res.status(201).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.getAllRooms = async (req, res) => {
    try {
        const response = await Room.find({});
        if (response) {
            return res.status(200).json({
                message: "Rooms fetched successfully",
                result: response,
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.getById = async (req, res) => {
    const roomId = req.params.id;
    console.log({ roomId });
    try {
        const response = await Room.findOne({ _id: roomId });
        if (response) {
            return res.status(200).json({
                message: "Rooms fetched successfully",
                result: response,
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.updateRoom = async (req, res) => {
    const roomId = req.params.id;
    console.log({ roomId });
    try {
        const roomsData = {
            roomName: req.body.roomName,
            noOfSeatsAvailable: req.body.noOfSeatsAvailable,
            amenities: req.body.amenities || [],
            priceForAnHour: req.body.priceForAnHour,
            availableStatus: req.body.availableStatus || []
        };
        const updatedData = await Room.findOneAndUpdate(
            { _id: roomId },
            { $set: { ...req.body } },
            { new: true }
        );
        if (updatedData) {
            return res.status(200).json({
                message: "Rooms updated successfully",
                result: updatedData,
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.deleteRoom = async (req, res) => {
    const roomId = req.params.id;
    console.log({ roomId });
    try {
        const deletedData = await Room.findByIdAndDelete({ _id: roomId });
        if (deletedData) {
            return res.status(200).json({
                message: "Rooms deleted successfully",
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.bookedRoomData = async (req, res) => {
    // const roomId = req.params.roomId;
    try {
        const bookedData = await CustomerBookedRoom.find({
            bookingStatus: "Booked"
        });
        let detailedBookedRoomData = [];

        for (let index = 0; index < bookedData.length; index++) {
            const roomData = await Room.findById({ _id: bookedData[index].roomId });
            const customerData = await Customer.findById({ _id: bookedData[index].customerId });
            const obj = {
                bookedData: bookedData[index],
                roomName: roomData.roomName,
                customerName: customerData.name
            };
            detailedBookedRoomData.push(obj);
        }
        res.send({ detailedBookedRoomData });

        // res.status(200).json({ bookedData });
        // if (bookedData) {
        //     const roomData = await Rooms.findById({ _id: roomId });
        //     if (roomData) {
        //         return res.status(200).json({
        //             status: true,
        //             roomData,
        //             result: bookedData
        //         });
        //     } else {
        //         return res.status(404).json({
        //             status: false,
        //             message: "Room not found!"
        //         });
        //     }
        // } else {
        //     return res.status(404).json({
        //         status: false,
        //         message: "No records found"
        //     });
        // }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};
