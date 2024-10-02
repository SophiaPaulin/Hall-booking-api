const Customer = require("../models/customer.model");
const CustomerBookedRoom = require("../models/customerRoomBooking.model");
const Room = require("../models/rooms.model");

module.exports.createCustomerBookRoom = async (req, res) => {
    // res.json("Working");
    try {
        const bookingRoomsData = {
            customerId: req.body.customerId,
            roomId: req.body.roomId,
            bookingStatus: req.body.bookingStatus,
            paymentStatus: req.body.paymentStatus,
            paymentMethod: req.body.paymentMethod,
            bookedDate: req.body.date || new Date()
        };

        const response = await CustomerBookedRoom.create(bookingRoomsData);
        if (response) {
            return res.status(201).json({
                message: "Rooms booked successfully",
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

module.exports.getBookedRoomData = async (req, res) => {
    const id = req.params.id;
    try {
        // const data = await CustomerBookedRoom.findById(id);
        // res.json({ data });

        const data = await CustomerBookedRoom.findById({_id:id});
        if (data) {
            const roomData = await Room.findOne({ _id: data.roomId });
            const customerData = await Customer.findOne({ _id: data.customerId });
            if (!roomData) {
                return res.status(404).json({
                    status: false,
                    message: "Rooms not found"
                });
            }
            if (!customerData) {
                return res.status(404).json({
                    status: false,
                    message: "Customer not found"
                });
            }
            return res.status(200).json({
                status: true,
                roomData,
                customerData,
                bookedData: data
            });
        } else {
            return res.status(200).json({
                status: false,
                message: "No records found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.customerTotalRoomBookings = async (req, res) => {
    const customerId = req.params.customerId;
    try {
        const data = await CustomerBookedRoom.find({ customerId });

        const customerData = await Customer.findOne({ _id: customerId });

        const totalBookedCount = data.length ? data.length : 0;

        let bookedRoomData = [];

        for (let index = 0; index < data.length; index++) {
            const roomData = await Room.findById({ _id: data[index].roomId });
            console.log({ roomData });
            let result = {};
            if (roomData) {
                result = {
                    roomName: roomData.roomName,
                    noOfSeatsAvailable: roomData.noOfSeatsAvailable,
                    amenities: roomData.amenities,
                    priceForAnHour: roomData.priceForAnHour,
                    availableStatus: roomData.availableStatus
                };
                bookedRoomData.push(result);
            } else {
                bookedRoomData = [];
            }
        }

        return res.status(200).json({
            // data,
            totalBookedCount,
            customerData,
            totalCustomerBookedRooms: bookedRoomData
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};
