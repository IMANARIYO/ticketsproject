import {Booking,direction,Journey,Car } from "../../models/index.js";

 import { finddirection,findCarr } from "./passingid.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const createDynamic = (model) => {
  return catchAsync(async (req, res, next) => {
    try {// Pre-checks to ensure required data is available
      const directiondata = await direction.findById(req.body.directionId);
      if (!directiondata) {
        return res.status(404).json({
          message: `Direction not found for id ${req.body.directionId}`,
        });
      }

      const cardata = await Car.findById(req.body.carId);
      if (!cardata) {
        return res.status(404).json({
          message: `Car not found for id ${req.body.carId}`,
        });
      }
                  let newObject = { ...req.body}
             newObject.TravelAgencyId=directiondata.TravelAgencyId
             newObject.carId=cardata._id
             newObject.RouteId=directiondata.RouteId
             newObject.travelAgenceName=cardata.travelAgencyName
             newObject.plannedSeats=cardata.equipedseats
             newObject.departureCity=directiondata.departureCity
             newObject.destinationCity=directiondata.destinationCity
          
             const numberOfTicketsToMove = cardata.equipedseats; 
             const payedTicketsArray = directiondata.payedticketsbooked || [];
             const readyToGoTickets = [];
          
             const departureDate = req.body.departureDate;
             const departureTime = req.body.departureTime;

             if (payedTicketsArray.length > 0) {
              // Filter tickets using an immediately-invoked asynchronous function expression (IIFE)
              const matchingTickets = (async () => {
                const results = [];
            
                for (const ticketId of payedTicketsArray) {
                  const bookingData = await Booking.findById(ticketId); // Assuming Booking is your mongoose model
            
                  if (bookingData && bookingData.bookingDate === departureDate && bookingData.bookingTime === departureTime) {
                    results.push(ticketId);
                  }
                }  
                return results;
              })();
              // Wait for the matchingTickets to resolve
              const resolvedMatchingTickets = await matchingTickets;
              // Shuffle the resolvedMatchingTickets array to randomize the order
              const shuffledMatchingTickets = resolvedMatchingTickets.sort(() => Math.random() - 0.5);
              // Select the specified number of tickets
              const selectedTickets = shuffledMatchingTickets.slice(0, numberOfTicketsToMove);
              readyToGoTickets.push(...selectedTickets);

             // Remove selected tickets from payedTicketsArray
            const updatedPayedTicketsArray = payedTicketsArray.filter(ticketId => !selectedTickets.includes(ticketId));

           // Update directionData.payedticketsbooked with the new array
            directiondata.payedticketsbooked = updatedPayedTicketsArray;
           // Save the updated directionData
           await directiondata.save();
            } else {
              console.log('No payed tickets available');
            }

           
  newObject.payedticketsbooked = readyToGoTickets;

  const cardataId = cardata._id; // Assuming cardata is available

  // Assuming readyToGoTickets contains Booking document IDs
  for (const bookingId of readyToGoTickets) {
  
    // Find the corresponding document in the Booking collection
    const bookingDocument = await Booking.findById(bookingId);
  
    if (bookingDocument) {
      
      // Update the bookedCar field to be equal to cardata._id
      bookingDocument.bookedCar = cardataId;
  
      // Save the updated document
      await bookingDocument.save();
  
      console.log(`Updated bookedCar for Booking document ${bookingId}`);
    } else {
      console.log(`Booking document ${bookingId} not found`);
    }
  }


  
  

 newObject.payedSeats=newObject.payedticketsbooked.length;
 newObject.nonPayedSeats=newObject.plannedSeats-newObject.payedSeats;


// Convert departureDate and departureTime to a JavaScript Date object
const departureDateTime = new Date(`${departureDate}T${departureTime}`);
// Get the current date and time
const currentDateTime = new Date();
// Check if the departureDateTime is in the future
if (!(departureDateTime > currentDateTime)) {
 // The departure date and time are not in the future
 const errorMessage = 'Please choose a future date and time for your journey.';
 // Return a JSON response with an error status and message
 return res.status(400).json({ status: 'error', message: errorMessage });
} 



        let data = await model.create(newObject);
        if (!data)
        {
           return res
           .status(404)
           .json({ message: `${model.modelName} failed to add` });
       }
      res.status(201).json({
        message: `Document created successfully in ${model.modelName} collection.`,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  });
};
const createJourney = createDynamic(Journey);

export { createJourney };
