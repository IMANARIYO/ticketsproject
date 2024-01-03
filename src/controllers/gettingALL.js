import { Route, TravelAgency, Car, Ticket,Journey } from "../models/index.js";
import { catchAsync } from "../middlewares/globaleerorshandling.js";

const getAllDynamic = model => {
  return async (req, res, next) => {
    try {
      const allDocs = await model.find();

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
      next(error); // Pass the error to the global error handling middleware
    }
  };
};

const getAllRoutes = catchAsync(getAllDynamic(Route));
const getAllTravelAgencies = catchAsync(getAllDynamic(TravelAgency));
const getAllCars = catchAsync(getAllDynamic(Car));
const getAllTickets = catchAsync(getAllDynamic(Ticket));
const getAllJourneys = catchAsync(getAllDynamic(Journey));
export { getAllRoutes, getAllTravelAgencies, getAllCars, getAllTickets ,getAllJourneys};
