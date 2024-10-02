const BookingRooms = require("../models/bookingRooms.model");

module.exports.createBookingRooms = async (req, res) => {
    try {
        const bookingRoomsData = {
            customerId: req.body.customerId,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            roomId: req.body.roomId
        }
        const response = await BookingRooms.create(bookingRoomsData);
        if (response) {
            return res.status(201).json({
                message: "BookingRooms created successfully",
                result: response,
                status: true
            })
        } else {
            return res.status(201).json({
                message: "Something went wrong!",
                status: false
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: error,
            message: 'Internal server error',
            status: false
        })

    }
}

module.exports.getAllBookingRooms = async (req, res) => {
    try {
        const response = await BookingRooms.find({});
        if (response) {
            return res.status(200).json({
                message: "BookingRooms fetched successfully",
                result: response,
                status: true
            })
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: error,
            message: 'Internal server error',
            status: false
        })

    }
}

module.exports.getById = async (req, res) => {
    const bookinRoomsId = req.params.id
    console.log({ bookinRoomsId })
    try {
        
        const response = await BookingRooms.findOne({ _id: bookinRoomsId });
        if (response) {
            return res.status(200).json({
                message: "BookingRooms fetched successfully",
                result: response,
                status: true
            })
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: error,
            message: 'Internal server error',
            status: false
        })

    }
}

module.exports.updateBookingRooms = async (req, res) => {
    const bookingRoomsId = req.params.id
    console.log({bookingRoomsId })
    try {
        const bookingRoomsData = {
            customerId: req.body.customerId,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            roomId: req.body.roomId
        }
        const updatedData = await BookingRooms.findOneAndUpdate(
            { _id: bookingRoomsId },
            { $set: { ...req.body } },
            { new: true }
        );
        if (updatedData) {
            return res.status(200).json({
                message: "BookingRooms updated successfully",
                result: updatedData,
                status: true
            })
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: error,
            message: 'Internal server error',
            status: false
        })

    }
}


module.exports.deleteBookingRooms = async (req, res) => {
    const bookingRoomsId = req.params.id
    console.log({ bookingRoomsId })
    try {

        const deletedData = await BookingRooms.findByIdAndDelete({ _id: bookingRoomsId });
        if (deletedData) {
            return res.status(200).json({
                message: "BookingRooms deleted successfully",
                status: true
            })
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: error,
            message: 'Internal server error',
            status: false
        })

    }
}
