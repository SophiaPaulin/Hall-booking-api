const Router = require("express").Router();
const roomsController = require("../controllers/rooms.controller");

Router.post("/create-room", roomsController.createRooms);
Router.get("/getAllRooms", roomsController.getAllRooms);
Router.get("/getById/:id", roomsController.getById);
Router.put("/update/:id", roomsController.updateRoom);
Router.delete("/:id", roomsController.deleteRoom);

Router.get("/booked-rooms-data", roomsController.bookedRoomData);

module.exports = Router;
