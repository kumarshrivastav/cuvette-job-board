import nodemailer from "nodemailer";
import Crypto from "crypto";
import userModel from "../model/user.model.js";
import dotenv from "dotenv";
dotenv.config({});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_GMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});
export const sendInterviewEmailToCandidate = async (jobBody, userBody) => {
  let mailOptions = {
    from: process.env.ADMIN_GMAIL,
    to: [...jobBody?.candidateEmails],
    subject: `Job Interview Invitation For ${jobBody.jobTitle}.`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #2c3e50;">Dear Candidate,</h2>
              <p>We are pleased to invite you for an interview for the <strong>${jobBody?.jobTitle}</strong> position at <strong>${userBody?.companyName}</strong>.</p>
              <h2 style="color: #2980b9;">Interview Details:</h2>
              <ul style="list-style-type: none; padding: 0;">
                <li style="margin: 5px 0;"><strong>Date:</strong> ${jobBody?.interviewDate}</li>
                <li style="margin: 5px 0;"><strong>Time:</strong> 09:00 AM</li>
                <li style="margin: 5px 0;"><strong>Location:</strong> Maharana Pratap (MP) Nagar, Zone 2, Bhopal, Madhya Pradesh, India</li>
              </ul>
              <p>Please confirm your availability for this interview by <strong>${jobBody?.interviewDate}</strong>. If you are unable to make it, please let us know as soon as possible so we can reschedule.</p>
              <p>We have attached a copy of the job description for your reference.</p>
              <p>We look forward to speaking with you soon.</p>
              <h1 style="color: #2c3e50;">Contact Information</h1>
              <span style="display: block; margin: 5px 0;"><strong>Company Name:</strong> ${userBody?.companyName}</span>
              <span style="display: block; margin: 5px 0;"><strong>Company Email:</strong> ${userBody?.companyEmail}</span>
              <span style="display: block; margin: 5px 0;"><strong>Company Phone Number:</strong> ${userBody?.phoneNumber}</span>
            </div>
            `,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return { result: info, success: true };
  } catch (error) {
    console.log(error);
    return { result: error, success: false };
  }
};
export async function sendOtpToEmail(companyEmail) {
  let otp6Digit = Crypto.randomInt(100000, 999999);
  let mailOptions = {
    from: process.env.ADMIN_GMAIL,
    to: companyEmail,
    subject: "Email Verification on Cuvette",
    html: `
        Your One-Time-Password(OTP) is ${otp6Digit} on Cuvette
        `,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    const user = await userModel.findOne({ companyEmail });
    console.log("email------------");
    console.log(user);
    user.emailOTP = `${otp6Digit}.${Date.now() + 2 * 60 * 1000}`;
    await user.save();
    return { info: result, success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}
