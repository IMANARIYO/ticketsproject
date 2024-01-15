import { Ticket, Journey } from "../../../models/index.js";

export const payforticket = async (req, res) => {
  try {
    let ticketId = req.params.ticketId;
    let ticketdata = await Ticket.findById(ticketId);

    if (!ticketdata) {
      return res.status(404).json({
        status: 'error',
        message: `Ticket with ID ${ticketId} not found.`,
      });
    }

    let journeyId = ticketdata.journeyId;
    let journeydata = await Journey.findById(journeyId);

    if (!journeydata) {
      return res.status(404).json({
        status: 'error',
        message: `Journey with ID ${journeyId} not found.`,
      });
    }

    let amount = req.body.amount;
    let payedSeats = journeydata.payedSeats;
    let seat_on_number =0;
    let checkingnumber=0;
    let nonPayedSeats = journeydata.nonPayedSeats;

    if (nonPayedSeats >= 0) {
      seat_on_number = payedSeats + 1;
      checkingnumber=1;
    }

    if (ticketdata.seat_on_number < payedSeats) {
      ticketdata.seat_on_number++;
    }

    if (checkingnumber === 0) {
      return res.status(403).json({
        status: 'error',
        message:
          'Sorry, the journey is fully booked. Your payment has delayed for too long, so please try another journey.',
          journey:journeydata
      });
    }

    if (amount !== ticketdata.price) {
      return res.status(403).json({
        status: 'error',
        message: `Sorry, check the amount. The transport fee is ${ticketdata.price} FRW.`,
        journey:journeydata
      });
    }

    ticketdata.status = 'paid';
    await ticketdata.save();

    journeydata.payedSeats++;
    journeydata.ticketsbooked = journeydata.ticketsbooked.filter(
      (ticket) => ticket.toString() !== ticketId
    );
    journeydata.payedticketsbooked.push(ticketId);
    await journeydata.save();
if(ticketdata.status=='paid')
{
    return res.status(201).json({
        message:"the ticket alredy payed   you will be notified on departure time to day"
    })
}

    return res.status(200).json({
      status: 'success',
      message: 'Payment successful. Ticket status updated.',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      error: error.message,
    });
  }
};
