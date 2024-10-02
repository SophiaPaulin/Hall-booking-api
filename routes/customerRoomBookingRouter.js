const Router = require("express").Router();
const controller = require("../controllers/customerRoomBooking.controller");

Router.post("/booking", controller.createCustomerBookRoom);
Router.get("/booked/:id", controller.getBookedRoomData);

module.exports = Router;
