const Router = require("express").Router();
const bookingRoomsController = require("../controllers/bookingRooms.controller")

Router.post("/create", bookingRoomsController.createBookingRooms);
Router.get("/getAllBookingRooms", bookingRoomsController.getAllBookingRooms);
Router.get("/getById/:id", bookingRoomsController.getById);
Router.put("/update/:id", bookingRoomsController.updateBookingRooms);
Router.delete("/:id", bookingRoomsController.deleteBookingRooms);

module.exports = Router;