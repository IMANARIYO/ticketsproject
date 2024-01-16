import { createBooking,payForBooking,deleteAllBookings } from "../controllers/index.js";

import { getMyBookingData } from "../controllers/myticketsandmybookings/getmyticketsandbookings.js";
import express from 'express';
import { verifyingtoken } from "../utils/jwtfunctions.js";
const bookingRouter=express.Router();
bookingRouter.use(verifyingtoken)
bookingRouter.get("/getMyBookingData",getMyBookingData)
bookingRouter.post("/createBooking",createBooking)
bookingRouter.patch("/payForBooking",payForBooking)
bookingRouter.delete("/deleteMyAllBookings",deleteAllBookings)
bookingRouter.delete("/deletingallbooking fromagiven travel agence",deleteAllBookings)
export default bookingRouter