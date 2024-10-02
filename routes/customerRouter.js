const Router = require("express").Router();
const customerController = require("../controllers/customer.controller");
const customerBookingController = require("../controllers/customerRoomBooking.controller");

Router.post("/create", customerController.createCustomer);
Router.get("/getAllCustomer", customerController.getAllCustomer);
Router.get("/getById/:id", customerController.getById);
Router.put("/update/:id", customerController.updateCustomer);
Router.delete("/:id", customerController.deleteCustomer);

Router.get("/total-room-bookings/:customerId", customerBookingController.customerTotalRoomBookings);

module.exports = Router;
