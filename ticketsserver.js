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


console.log(cron)

cron.schedule('* * * * *', function() {
  console.log('Cron job running every minutee');
});

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
//   console.log("cron job being run ")
// })
