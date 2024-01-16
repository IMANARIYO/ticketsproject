
import { Route, TravelAgency, Car, Ticket, Journey,Booking,direction } from "../models/index.js";
import { catchAsync } from "../middlewares/globaleerorshandling.js";

const getAllDynamic = (model, populateOptions) => {
  return async (req, res, next) => {
    try {
      let query = model.find();

      if (populateOptions) {
        query = query.populate(populateOptions);
      }

      if (model === Journey) {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get current time in 'HH:mm' format

        query = model.find({
          departureDate: { $eq: currentDate },
          $or: [
            { departureTime: { $gte: currentTime } }, // Departure time greater than or equal to current time
            { departureDate: { $gt: currentDate } }    // If departure date is greater than today, include it
          ]
        });
      }

      const allDocs = await query.exec();

      if (allDocs.length === 0) {
        return res.status(404).json({
          message: `No documents found in ${model.modelName} collection.`,
        });
      }

      res.status(200).json({
        message: `All documents in ${model.modelName} collection retrieved successfully.`,
        data: allDocs,
      });
    } catch (error) {
      next(error);
    }
  };
};
const getAlldirections = catchAsync(getAllDynamic(direction));
const getAllRoutes = catchAsync(getAllDynamic(Route));
const getAllTravelAgencies = catchAsync(getAllDynamic(TravelAgency));
const getAllCars = catchAsync(getAllDynamic(Car));


// Use the getAllDynamic function with the Journey model and populate options
const journeyPopulateOptions = [
  { path: 'TravelAgencyId' },
  { path: 'carId' },
  { path: 'RouteId' },
  { path: 'pendingtickets' },
  // Add other paths you want to populate
];
const ticketPopulateOptions = [
  { path: 'directionId' },
  { path: 'journeyId' },
  { path: 'TravelAgencyId' }, 
  { path: 'carId' }, 
];
const getAllBookings=catchAsync(getAllDynamic(Booking));
const getAllTickets = catchAsync(getAllDynamic(Ticket, ticketPopulateOptions));
const getAllJourneys = catchAsync(getAllDynamic(Journey, journeyPopulateOptions));

export { getAllBookings,getAllRoutes, getAllTravelAgencies, getAllCars, getAllTickets, getAllJourneys ,getAlldirections};
