// import { cashingin,cashingout } from "../controllers/index.js";
import express from "express";
import { cashingin,cashingout } from "../controllers/paypack.js";

const payRouter = express.Router();
payRouter.post("/cashout",cashingout)
payRouter.post("/cashin",cashingin)
export default payRouter