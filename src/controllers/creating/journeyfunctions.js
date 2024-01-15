function moveElements(array1, array2, numToMove) {
    // Ensure numToMove is within bounds
    numToMove = Math.min(numToMove, array1.length);
  
    // Remove elements from array1 and add them to array2
    array2.push(...array1.splice(0, numToMove));
  }
  
  // Example usage:
  const array1 = [1, 2, 3, 4, 5];
  const array2 = [];
  const numToMove = 3;
  
  moveElements(array1, array2, numToMove);
  
  console.log(array1); // Output: [4, 5]
  console.log(array2); // Output: [1, 2, 3]
  




  const numberOfTicketsToMove = cardata.equipedseats;
  const ticketsToMove = directiondata.payedticketsbooked.slice(0, numberOfTicketsToMove);
  const updateQuery = {
    $pull: { 'payedticketsbooked': { $in: ticketsToMove } }
  };
  const updatedBooking = await direction.findByIdAndUpdate(req.body.directionId, updateQuery, { new: true });
  if (updatedBooking) {
    await updatedBooking.save();
  }
  newObject.payedticketsbooked = ticketsToMove; 








  
// console.log(cron)

// cron.schedule('* * * * *', function() {
//   console.log('Cron job running every minutee');
//   let date=Date.now()
//  console.log("date iss",date)
 
// });
// console.log("-----------------------------",((1704740460105- 1704740400361)/1000))
// cron.schedule('*/6 * * * *', function() {
//   console.log('Cron job running every 6 minutes');
// });


// let counter = 0;
// const maxExecutions = 5; // Set your desired number of executions

// function runCronJob() {
//   counter++;
//   console.log(`Cron job running (Execution ${counter})`);

//   if (counter === maxExecutions) {
//     console.log('Reached the maximum number of executions. Stopping cron job.');
//   } else {
//     setTimeout(runCronJob, 1000); // Run again after 1 second (adjust as needed)
//   }
// }

// runCronJob();

// cron.schedule("* * * * * *",function(){
// console.log(Date.now()) 
// })



// Retrieve individual components
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1
let currentDay = currentDate.getDate();
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();
let currentSecond = currentDate.getSeconds();

console.log("Current Date:", currentYear + "-" + currentMonth + "-" + currentDay);
console.log("Current Time:", currentHour + ":" + currentMinute + ":" + currentSecond);
let date="2024-01-09";
let time="09:10";
let result=Date.parse(date+"T"+time )
let result1=Date.parse(date )
let result2=Date.parse(time)
console.log("resulted date+++++---------------",result,result1,result2)
