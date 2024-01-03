import { Route, TravelAgency, Car, Ticket ,Journey} from "../models/index.js";

import { catchAsync } from "../middlewares/globaleerorshandling.js";
const updateOneDynamic = model => {
  return async (req, res, next) => {
    try {
      const id = req.params.id;
      const updateFields = req.body;

      let document = await model.findByIdAndUpdate(id, updateFields, {
        new: true, // Return the updated document
        runValidators: true, // Run validators on update
      });

      if (!document) {
        return res.status(404).json({
          message: `No document with ID: ${id} found in ${model.modelName} collection.`,
        });
      }

      res.status(200).json({
        message: `${model.modelName} updated successfully.`,
        data: document,
      });
    } catch (error) {
      next(error); // Pass the error to the global error handling middleware
    }
  };
};

const updateRoute = catchAsync(updateOneDynamic(Route));
const updateTravelAgency = catchAsync(updateOneDynamic(TravelAgency));
const updateCar = catchAsync(updateOneDynamic(Car));
const updateTicket = catchAsync(updateOneDynamic(Ticket));
const updateJourney = catchAsync(updateOneDynamic(Journey));
export { updateRoute, updateTravelAgency, updateCar, updateTicket,updateJourney };
