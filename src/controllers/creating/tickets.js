import { Ticket, Journey, Car, direction, TravelAgency, Route } from "../../models/index.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const buyTickets = catchAsync(async (req, res, next) => {
  try {
    const { journeyId } = req.params;

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
let   payedSeats=journey.payedSeats
let seat_on_number=0; 
let nonPayedSeats=journey.nonPayedSeats;
if(nonPayedSeats>0){
  seat_on_number=payedSeats+1;
}
if(seat_on_number==0){
  return res.status(403).json({
    status: 'error',
    message: 'Sorry, the journey is fully booked. No more seats available for this journey  you can check for other journeys next to this .',
  });
}

journey.payedSeats++;
journey.nonPayedSeats--;
    // Create a new ticket with auto-filled fields

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
      seat_on_number,
      journeyId
    });

    // Update Journey information
    journey.ticketsbooked.push(newTicket._id);
    await journey.save();

    res.status(201).json({
      message: "Ticket created successfully.",
      data: newTicket,
    });
  } catch (error) {
    next(error);
  }
});

export { buyTickets };
