import { Ticket, Booking } from "../../models/index.js";

const getMyData = (model) => {
  return async (req, res, next) => {
    try {
      let user = req.userId;

      let myData;

      if (model === Booking) {
        myData = await Booking.find({ user: user })
          .populate('directionId')
          .populate('TravelAgencyId');
      } else if (model === Ticket) {
        myData = await Ticket.find({ user: user })
          .populate('directionId')
          .populate('journeyId')
          .populate('travelAgencyId')
          .populate('carId');
      } else {
        return res.status(400).json({ success: false, message: 'Invalid model' });
      }

      if (!myData) {
        return res.status(404).json({ success: false, message: 'Data not found' });
      }

      res.status(200).json({ success: true, data: myData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
};
const getMyBookingData = getMyData(Booking);
const getMyTicketData = getMyData(Ticket);

export { getMyBookingData, getMyTicketData };
