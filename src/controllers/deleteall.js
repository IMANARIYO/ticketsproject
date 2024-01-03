import { Route, TravelAgency, Car, Ticket ,Journey} from "../models/index.js";

import { catchAsync } from "../middlewares/globaleerorshandling.js";
const deleteAllDynamic = model => {
  return async (req, res, next) => {
    try {
      const deleted = await model.deleteMany({});

      if (deleted.deletedCount === 0) {
        return res.status(404).json({
          message: `No documents found in ${model.modelName} collection.`,
        });
      }

      res.status(200).json({
        message: `All documents in ${model.modelName} collection deleted successfully.`,
        data: deleted,
      });
    } catch (error) {
      next(error); // Pass the error to the global error handling middleware
    }
  };
};

const deleteAllRoutes = catchAsync(deleteAllDynamic(Route));
const deleteAllTravelAgencies = catchAsync(deleteAllDynamic(TravelAgency));
const deleteAllCars = catchAsync(deleteAllDynamic(Car));
const deleteAllTickets = catchAsync(deleteAllDynamic(Ticket));
const deleteAllJourneys = catchAsync(deleteAllDynamic(Journey));


export { deleteAllRoutes, deleteAllTravelAgencies, deleteAllCars, deleteAllTickets,deleteAllJourneys };
