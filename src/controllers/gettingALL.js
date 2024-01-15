
import { Route, TravelAgency, Car, Ticket, Journey } from "../models/index.js";
import { catchAsync } from "../middlewares/globaleerorshandling.js";

const getAllDynamic = (model, populateOptions) => {
  return async (req, res, next) => {
    try {
      let query = model.find();

      if (populateOptions) {
        query = query.populate(populateOptions);
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

const getAllRoutes = catchAsync(getAllDynamic(Route));
const getAllTravelAgencies = catchAsync(getAllDynamic(TravelAgency));
const getAllCars = catchAsync(getAllDynamic(Car));
const getAllTickets = catchAsync(getAllDynamic(Ticket));

// Use the getAllDynamic function with the Journey model and populate options
const journeyPopulateOptions = [
  { path: 'TravelAgencyId' },
  { path: 'carId' },
  { path: 'RouteId' },
  { path: 'pendingtickets' },
  // Add other paths you want to populate
];
const getAllJourneys = catchAsync(getAllDynamic(Journey, journeyPopulateOptions));

export { getAllRoutes, getAllTravelAgencies, getAllCars, getAllTickets, getAllJourneys };
