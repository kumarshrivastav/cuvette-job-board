import express from "express"
import UserController from "../controllers/UserController.js"
const router=express.Router()
router.post("/register",UserController.register)
router.get("/isverifiedemail",UserController.isVerifiedEmail)
router.get("/isverifiedphonenumber",UserController.isVerifiedPhoneNumber)
router.put("/checkemailotp",UserController.checkEmailOTP)
router.put("/checkphonenumberotp",UserController.checkPhoneNumberOTP)
router.get("/checksession",UserController.checkSession)
router.delete("/deleteuser/:id",UserController.deleteUser)
export default router