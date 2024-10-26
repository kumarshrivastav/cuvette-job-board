import Twilio from "twilio";
import Crypto from "crypto";
import userModel from "../model/user.model.js";



function sendOtpToPhoneNumber(phoneNumber) {
  try {
    const twilio = Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    const otp6Digit = Crypto.randomInt(100000, 999999);
    return twilio.messages
      .create({
        body: `Your Phone No. OTP ${otp6Digit} on Cuvette`,
        to: '+91'+phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      })
      .then(async(msg) => {
        const user = await userModel.findOne({ phoneNumber });
        console.log('phone----------------')
        console.log(user)
        user.phoneOTP = `${otp6Digit}.${Date.now() + (2 * 60 * 1000)}`;
        const savedUser=await user.save();
        // console.log(msg);
        return { success: true ,user:savedUser}; // Return success object to the caller
      });
      
  } catch (error) {
    console.log(`Error Occured while sending OTP on phone number:${error}`);
    return { success: false, error: error.message }; // Handle error case
  }
}

export default sendOtpToPhoneNumber;
