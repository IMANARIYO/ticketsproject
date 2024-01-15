import { Booking, direction, Journey, Ticket, Route } from "../../../models/index.js";

export const payForBooking = async (req, res, next) => {
  try {
    let bookingData = await Booking.findById(req.body.bookingId);
    
    let directionData = await direction.findById(bookingData.directionId);
    let payment = req.body.amount;
if( bookingData.paymentStatus === true){
    return res.status(409).json({
        message: `the booking is payed yet so no need to pay twice just wait for the tiime you will be noticed`
      });

}
    if (payment < bookingData.price) {
      return res.status(409).json({
        message: `The payment is less than the transport fee for ${directionData.directionName}. The fee is ${bookingData.price}.`
      });
    }

    bookingData.paymentStatus = true;
    
   
    directionData.ticketsbooked.pull(req.body.bookingId);
    directionData.nonpayedbookedtickets.pull(req.body.bookingId);
    directionData.payedticketsbooked.push(req.body.bookingId);

    await bookingData.save();
    await directionData.save();

    return res.status(200).json({
      message: "Booking payment successful.",
      data: bookingData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
