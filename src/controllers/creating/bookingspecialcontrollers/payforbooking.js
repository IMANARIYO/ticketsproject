// import { Booking, direction, Journey, Ticket, Route } from "../../../models/index.js";

// export const payForBooking = async (req, res, next) => {
//   try {
//     let bookingData = await Booking.findById(req.body.bookingId);
    
//     let directionData = await direction.findById(bookingData.directionId);
//     let payment = req.body.amount;
// if( bookingData.paymentStatus === true){
//     return res.status(409).json({
//         message: `the booking is payed yet so no need to pay twice just wait for the tiime you will be noticed`
//       });

// }
//     if (payment < bookingData.price) {
//       return res.status(409).json({
//         message: `The payment is less than the transport fee for ${directionData.directionName}. The fee is ${bookingData.price}.`
//       });
//     }

//     bookingData.paymentStatus = true;
    
   
//     directionData.ticketsbooked.pull(req.body.bookingId);
//     directionData.nonpayedbookedtickets.pull(req.body.bookingId);
//     directionData.payedticketsbooked.push(req.body.bookingId);

//     await bookingData.save();
//     await directionData.save();

//     return res.status(200).json({
//       message: "Booking payment successful.",
//       data: bookingData
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Internal Server Error"
//     });
//   }
// };

import { Booking, direction, Journey, Ticket, Route } from "../../../models/index.js";

export const payForBooking = async (req, res, next) => {
  try {
    let bookingData = await Booking.findById(req.body.bookingId);

    if (!bookingData) {
      return res.status(404).json({
        message: `No booking found for id ${req.body.bookingId}`,
      });
    }

    let directionData = await direction.findById(bookingData.directionId);

    if (!directionData) {
      return res.status(404).json({
        message: `No direction found for id ${bookingData.directionId}`,
      });
    }

    let payment = req.body.amount;

    if (bookingData.paymentStatus === true) {
      return res.status(409).json({
        message: `The booking has already been paid. No need to pay twice; just wait for the time you will be notified.`,
      });
    }

    if (payment !== bookingData.price) {
      return res.status(409).json({
        message: `Invalid payment amount. The required payment for ${directionData.directionName} is ${bookingData.price}.`,
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
      data: bookingData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

