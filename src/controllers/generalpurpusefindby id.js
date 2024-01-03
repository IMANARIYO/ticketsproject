import { catchAsync } from "../middlewares/globaleerorshandling.js";
import { Route, TravelAgency, Car, Ticket,Journey } from "../models/index.js";
const findOneDynamic = model => {
  return async (id, customId = null) => {
    const finalId = customId || id;
    let document = await model.findOne({ _id: finalId });

    if (!document) {
        console.log("there is no document found in",model)
      return null; // or handle as needed for your specific use case
    }

    return document;
  };
};

const findRoutee = catchAsync(findOneDynamic(Route));
const findTravelAgencyy = catchAsync(findOneDynamic(TravelAgency));
const findCarr = catchAsync(findOneDynamic(Car));
const findTickett = catchAsync(findOneDynamic(Ticket));
const findJourneyy = catchAsync(findOneDynamic(Journey));

export { findRoutee, findTravelAgencyy, findCarr, findJourneyy, findTickett };
// const route = await findRoute('your_id_here');
// const travelAgency = await findTravelAgency('your_id_here');
// const car = await findCar('your_id_here');
// const ticket = await findTicket('your_id_here');
// const journey = await findJourney('your_id_here');
