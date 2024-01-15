import { deleteUserById,updateUserById,getAllUsers,signup,login,changepassword,generateAndSendOTP,verifyOTPAndUpdatePassword} from "../authentication/index.js";
import { verifyEmail } from "../authentication/verificationcontroller.js";
import {verifyingtoken }from "../utils/jwtfunctions.js"
import  express  from "express";
const authRouter=express.Router();
authRouter.post("/signup",signup);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/login",login)
authRouter.post("/forget",generateAndSendOTP)
authRouter.post("/reset",verifyOTPAndUpdatePassword)
authRouter.use(verifyingtoken)
authRouter.post("/change",changepassword)
authRouter.get("/getAllusers",getAllUsers)
authRouter.delete("/deleteUserById/:id",deleteUserById)
authRouter.patch("/updateUserById/:id",updateUserById)
export default authRouter;