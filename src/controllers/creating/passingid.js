import { catchAsync } from '../../middlewares/globaleerorshandling.js'
import {Booking,
  Route,
  TravelAgency,
  Car,
  Ticket,
  Journey,direction
} from '../../models/index.js'
const findOneDynamic = model => {
  return async (id, customId = null) => {
    const finalId = customId || id
    let document = await model.findOne({ _id: finalId })

    if (!document) {
     return res.status(404).json({
message:`there is no ${model} found in${model}s`
      })
    }

    return document
  }
  
}
const finddirection = catchAsync(findOneDynamic(direction))
const findBooking = catchAsync(findOneDynamic(Booking))
const findRoutee = catchAsync(findOneDynamic(Route))
const findTravelAgencyy = catchAsync(findOneDynamic(TravelAgency))
const findCarr = catchAsync(findOneDynamic(Car))
const findTickett = catchAsync(findOneDynamic(Ticket))
const findJourneyy = catchAsync(findOneDynamic(Journey))

export { findBooking,finddirection,findRoutee, findTravelAgencyy, findCarr, findJourneyy, findTickett }
// const route = await findRoute('your_id_here');
// const travelAgency = await findTravelAgency('your_id_here');
// const car = await findCar('your_id_here');
// const ticket = await findTicket('your_id_here');
// const journey = await findJourney('your_id_here');
