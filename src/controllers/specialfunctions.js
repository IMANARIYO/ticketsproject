import {
    Route,TravelAgency,Car,Ticket,Journey 
    } from "../models/index.js";
    
    export const carbooking=async (car,journeydata,newObject)=>{
       
let thecarcapacity=car.availableSeats;
let theremainingseats=car.remaingSeats
let ticketsbookedsize=car.ticketsbooked.length
newObject.seat_on_number=car.ticketsbooked.length + 1
if((ticketsbookedsize > thecarcapacity)){
    return  "the car  for the journey is full booked  or there is no remaining tickets for this car at this moment"
}
if(ticketsbookedsize <= thecarcapacity){
    
    theremainingseats=thecarcapacity-ticketsbookedsize
    car.remaingSeats=theremainingseats
    journeydata.remainingseats=theremainingseats;
    journeydata.availableSeats=theremainingseats
    await journeydata.save();
    await car.save();
    console.log("the remaining seats in the car book",car.remaingSeats-1)
    console.log("the number of  seats in the car being booked",car.ticketsbooked.length)
    return 1;
}

    }