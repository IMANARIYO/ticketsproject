import cron from 'node-cron';
import { Journey } from '../../models/journeySchema.js';


 export const updateJourneyStatus = async () => {
  try {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    const currentDate = new Date().toISOString().split('T')[0];

    // Find journeys with departure time and date matching the current time and date
    const journeysToUpdate = await Journey.find({
      departureTime: { $lte: currentTime },
      departureDate: currentDate,
      status:"pending"
    });
console.log("the journeys to update",journeysToUpdate)
    // Update the status of found journeys to 'Available'
    await Promise.all(journeysToUpdate.map(async (journey) => {
      console.log("to be avalable",journey)
      journey.status = 'available';

  
      await journey.save();
    }));

   
    setTimeout(async () => {
      await Promise.all(journeysToUpdate.map(async (journey) => {
        journey.status = 'unavailable';
        await journey.save();
      }));
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
   
  } catch (error) {
    console.error('Error updating journey status:', error);
  }
};


cron.schedule('*/5 * * * *', updateJourneyStatus);

