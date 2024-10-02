const Customer = require("../models/customer.model")

module.exports.createCustomer = async (req, res) => {
    try {
        const customerData = {
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address
        }
        const response = await Customer.create(customerData);
        if (response) {
            return res.status(201).json({
                message: "Customer created successfully",
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

module.exports.getAllCustomer = async (req, res) => {
    try {
        const response = await Customer.find({});
        if (response) {
            return res.status(200).json({
                message: "Customer fetched successfully",
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
    const customerId = req.params.id
    console.log({ customerId })
    try {
        
        const response = await Customer.findOne({ _id: customerId });
        if (response) {
            return res.status(200).json({
                message: "Customer fetched successfully",
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

module.exports.updateCustomer = async (req, res) => {
    const customerId = req.params.id
    console.log({customerId })
    try {
        const customerData = {
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address
        }
        const updatedData = await Customer.findOneAndUpdate(
            { _id: customerId },
            { $set: { ...req.body } },
            { new: true }
        );
        if (updatedData) {
            return res.status(200).json({
                message: "Customer updated successfully",
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


module.exports.deleteCustomer = async (req, res) => {
    const customerId = req.params.id
    console.log({ customerId })
    try {

        const deletedData = await Customer.findByIdAndDelete({ _id: customerId });
        if (deletedData) {
            return res.status(200).json({
                message: "Customer deleted successfully",
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
