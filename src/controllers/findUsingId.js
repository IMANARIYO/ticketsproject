import {
    Route,TravelAgency,Car,Ticket ,Journey
    } from "../models/index.js";
import { catchAsync } from "../middlewares/globaleerorshandling.js";
const findOneDynamic = model => {
    return async (req, res, next, customId = null) => {
      const id = customId || req.params.id;
      let document = await model.findOne({ _id: id });
      if (!document) {
        return res.status(404).json({
          message: `No document with ID: ${id} found in ${model.modelName} collection.`
        });
      }
if(model== Journey)
{
  
  let document = await model.findOne({ _id: id }).populate('TravelAgencyId') // Populate TravelAgency
  .populate({path:'carId',
select:'driverName telephone CarId'})          // Populate Car
  .populate({path:'RouteId',
select:'routeName price '})        // Populate Route
  .populate({path:'ticketsbooked',
select:'ticketCutTime'})// Populate Ticket
  .populate('TravelAgencyId');
  return  res.status(200).json({
    message: `${model.modelName} retrieved successfully.`,
    data: document
  });
}
     return  res.status(200).json({
        message: `${model.modelName} retrieved successfully.`,
        data: document
      });
    };
  };
  
  const findRoute = catchAsync(findOneDynamic(Route));
  const findTravelAgency = catchAsync(findOneDynamic(TravelAgency));
  const findCar = catchAsync(findOneDynamic(Car));
  const findTicket = catchAsync(findOneDynamic(Ticket));
  const findJourney = catchAsync(findOneDynamic(Journey));
  export { findRoute, findTravelAgency, findCar, findJourney,findTicket };
//   findRoute(req, res, next, 'your_custom_id_here');
//   findTravelAgency(req, res, next, 'your_custom_id_here');
  
//   findTicket(req, res, next, 'your_custom_id_here');
  