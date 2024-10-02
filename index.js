const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const port = process.env.PORT || 9001;

connectDB();

//Init Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// console.log(process.env.MONGO_URL)

// app.use("/", (req, res)=>{
//     res.json("Coming!")
// })

const roomRouter = require("./routes/roomRouter");
const customerRouter = require("./routes/customerRouter");
const customerRoomBookingRouter = require("./routes/customerRoomBookingRouter");
// const bookingRoomsRouter = require("./routes/bookingRoomsRouter");

app.use("/api/room", roomRouter);
app.use("/api/customer", customerRouter);
app.use("/api/customer/room", customerRoomBookingRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
