import { Ticket, Journey, userconst } from "../../../models/index.js";

export const payforticket = async (req, res) => {
  try {
    let ticketId = req.params.ticketId;
    let ticketdata = await Ticket.findById(ticketId);
    let journeyId = ticketdata.journeyId;
    let journeydata = await Journey.findById(journeyId);
    if (!ticketdata) {
      return res.status(404).json({
        status: 'error',
        message: `Ticket with ID ${ticketId} not found.`,
      });
    }
    if(ticketdata.status=='paid')
    {
        return res.status(201).json({
            message:"the ticket alredy payed   you will be notified on departure time to day",
            ticket:ticketdata,
            journeydata:journeydata
        })
    }
    if (!journeydata) {
      return res.status(404).json({
        status: 'error',
        message: `Journey with ID ${journeyId} not found.`,
      });
    }
   


    let userid=journeydata.user; 
    let telphonenumber=req.body.phone
    let amount = req.body.amount;

    if (amount !== ticketdata.price) {
      return res.status(403).json({
        status: 'error',
        message: `Sorry, check the amount. The transport fee is ${ticketdata.price} FRW.`,
        journey:journeydata
      });
    }
    let payedSeats = journeydata.payedticketsbooked.length;
    let plannedSeats=journeydata.plannedSeats
    let seat_on_number =payedSeats+1;
    let checkingnumber=0;
    let nonPayedSeats = journeydata.nonPayedSeats;

    if(payedSeats<plannedSeats){
      ticketdata.payingphone=telphonenumber;
      ticketdata.status = 'paid';
      ticketdata.bookingStatus="confirmed",
      ticketdata.paymentStatus= "paid",
      ticketdata.seat_on_number=seat_on_number
      await ticketdata.save();
  
      journeydata.payedSeats++;
      journeydata.nonPayedSeats--
      journeydata.remainingNonPayedSeats=journeydata.nonPayedSeats;
      journeydata.ticketsbooked = journeydata.ticketsbooked.filter(
        (ticket) => ticket.toString() !== ticketId);
  
      journeydata.payedticketsbooked.push(ticketId);
      console.log(journeydata)
      await journeydata.save();
    }

    else  {
      return res.status(403).json({
        status: 'error',
        message:
          'Sorry, the journey is fully booked. Your payment has delayed for too long, so please try another journey.',
          journey:journeydata
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Payment successful. Ticket status updated.',
      "ticket":ticketdata,});
  }
   catch (error) 
   {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      error: error.message,
    });
  }
};
