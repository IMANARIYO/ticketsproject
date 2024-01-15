import dotenv from "dotenv";
dotenv.config();
import { datew } from "./src/utils/datefunctin.js";
import yaml from "yamljs";
import twilio from "twilio";
import cors from "cors";
import cron from "node-cron";
import fs from 'fs';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mainRouter from "./src/endpoints/index.js";
import { badroutes,errosingeneral } from "./src/middlewares/globaleerorshandling.js";
import swaggerUi from 'swagger-ui-express';
const app = express();
app.use(cors());
const swaggerDocument = yaml.load("./documentationfile.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/",mainRouter)
app.use('*',badroutes)
app.use(errosingeneral)
app.use((req, res) => {
  res.status(404).json({ message: "Welcome to the API! This route is not found." });
});
async function sendSms() {
  const client = new twilio(process.env.twilioaccountSid, process.env.twilioAuthToken);
  return client.messages
    .create({ body: 'Hey this is themes', from:'+19292426206', to: '+250787795163' })
    .then(message => console.log(message))
    .catch(err => console.error(err));
}

app.use(bodyParser.json());
mongoose
  .connect(process.env.DB_CONNECTION_LIVE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

//sendSms();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on the port http://localhost:${process.env.PORT}`);
  console.log("the current date ------------------",datew)
});

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

console.log("array1",array1[0]); // Output: [4, 5]
console.log("array2",array2[0]); // Output: [1, 2, 3]

let currentDate = new Date(Date.now());

let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1
let currentDay = currentDate.getDate();
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();
let currentSecond = currentDate.getSeconds();

// console.log("Current Date:", currentYear + "-" + currentMonth + "-" + currentDay);
// let  thedate=Date.parse('currentYear + "-" + currentMonth + "-" + currentDay')
// console.log("the date in number",thedate)
// console.log("Current Time:", currentHour+"T"+currentMinute+"T"+currentSecond);
// let date="2024-01-09";
// let time="09:10";
// let result=Date.parse(date+"T"+time )
// let result1=Date.parse(date )

// console.log("resulted date+++++---------------",result,result1)
