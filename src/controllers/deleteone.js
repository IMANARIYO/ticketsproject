import {
    Route,TravelAgency,Car,Ticket,Journey 
    } from "../models/index.js";
    import { catchAsync } from "../middlewares/globaleerorshandling.js";
    const deleteOneDynamic = model => {
        return async (req, res,next) => {
            const id = req.params.id;
            let document = await model.findById(id);
            if (!document) {
              return res.status(404).json({
                message: `No document with ID: ${id} found in ${model.modelName} collection.`
              });
            }
            let deleted = await model.findByIdAndDelete(id);
            
            if (!deleted) {
              return res.status(409).json({
                message: `Error deleting document with ID: ${id} in ${model.modelName} collection.`
              });
            }
            res.status(200).json({
              message: `${model.modelName} deleted successfully.`,
              data: deleted
            });
        };
      };
      const deleteRoute = catchAsync(deleteOneDynamic(Route));
const deleteTravelAgency = catchAsync(deleteOneDynamic(TravelAgency));
const deleteCar = catchAsync(deleteOneDynamic(Car));
const deleteTicket = catchAsync(deleteOneDynamic(Ticket));
const deleteJourney = catchAsync(deleteOneDynamic(Journey));

export { deleteRoute, deleteTravelAgency, deleteCar,deleteTicket,deleteJourney };