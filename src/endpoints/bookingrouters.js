import { createBooking,payForBooking } from "../controllers/index.js";
import express from 'express';
const bookingRouter=express.Router();
bookingRouter.post("/createBooking",createBooking)
bookingRouter.patch("/payForBooking",payForBooking)
export default bookingRouter