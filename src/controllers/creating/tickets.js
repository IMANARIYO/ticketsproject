import { Ticket, Journey, Car, direction, TravelAgency, Route } from "../../models/index.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const buyTickets = catchAsync(async (req, res, next) => {
  try {
    const { journeyId } = req.params;

console.log("request.body  is  ----",req.body)
    // Fetch Journey information
    const journey = await Journey.findById(journeyId)
      .populate('carId')
      .populate('TravelAgencyId')
      .populate('RouteId');
     
    if (!journey) {
      return res.status(404).json({
        message: `No Journey found for id ${journeyId}`,
      });
    }

    const {
      carId,
      TravelAgencyId,
      RouteId,
      departureCity,
      destinationCity,
      travelAgenceName,
      departureDate,
      departureTime,
    } = journey;
const{phone,email,fullNames}=req.body
    // Fetch additional information from related models
    const car = await Car.findById(carId);
    const travelAgency = await TravelAgency.findById(TravelAgencyId);
    const route = await Route.findById(RouteId);

    // Check if all necessary data is available
    const missingInfo = [];

    if (!car) {
      missingInfo.push("Car");
    }

    if (!travelAgency) {
      missingInfo.push("TravelAgency");
    }

    if (!route) {
      missingInfo.push("Route");
    }

    if (missingInfo.length > 0) {
      return res.status(404).json({
        message: `Some related information is missing: ${missingInfo.join(', ')}`,
      });
    }
let plannedSeats=journey.plannedSeats   
let  payedSeats=journey.payedSeats
let nonPayedSeats=journey.nonPayedSeats;

let seat_on_number=0; 


if(journey.ticketsbooked.length<journey.plannedSeats){
  seat_on_number=journey.ticketsbooked.length
}



journey.nonPayedSeats=journey.ticketsbooked.length+1
    // Create a new ticket with auto-filled fields
let user= req.userId;
    const newTicket = await Ticket.create({
      directionId: journey.directionId,
      travelAgencyId: travelAgency._id,
      carId: car._id,
      travelAgencename: travelAgenceName,
      departureCity,
      destinationCity,
      price: route.price,
      departureDate,
      departureTime,
      journeyId,phone,email,fullNames,
      user
    });
    journey.ticketsbooked.push(newTicket._id);
    await journey.save();

    res.status(201).json({
      message: "Ticket added to pending tickets  successfully.",
      notice:"booking a ticket doesnt grants you  a ticket  it will only be confirmed after paying",
      data: newTicket,
    });
  } catch (error) {
    next(error);
  }
});

export { buyTickets };
