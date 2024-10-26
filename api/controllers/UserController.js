import mongoose from "mongoose";
import userModel from "../model/user.model.js";
import { sendOtpToEmail } from "../Services/EmailService.js";
import sendOtpToPhoneNumber from "../Services/PhoneService.js";
import ErrorHandler from "../utils/ErrorHandle.js";

class UserController {
  async register(req, res, next) {
    try {
      const { companyEmail, companyName, employeeSize, name, phoneNumber } =
        req.body;
      if (
        !companyEmail ||
        !companyName ||
        !employeeSize ||
        !name ||
        !phoneNumber
      ) {
        return next(ErrorHandler(400, "please provide all the fields"));
      }
      const user = await userModel.findOne({ companyName });
      if (user) {
        return next(ErrorHandler(400, `${companyName} is already present`));
      }
      const newUser = new userModel(req.body);
      const savedUser = await newUser.save();
      const resOfOtpOnEmai = await sendOtpToEmail(companyEmail);
      if (resOfOtpOnEmai.success === false) {
        return next(ErrorHandler(400, resOfOtpOnEmai.error));
      }
      const resOfOtpOnPhone = await sendOtpToPhoneNumber(phoneNumber);
      if (resOfOtpOnPhone.success === false) {
        return next(ErrorHandler(400, resOfOtpOnPhone.error));
      }
      req.session.userId = resOfOtpOnPhone?.user?._id;
      // req.session.userId = savedUser?._id
      req.session.save(function (err) {
        if (err) {
          return next(ErrorHandler(400, "Failed to save session"));
        }
        return res
          .status(201)
          .send({ msg: "User Registered Successfully", user: savedUser });
      });
    } catch (error) {
      next(error);
    }
  }
  async isVerifiedEmail(req, res, next) {
    try {
      const { userId } = req?.session;
      console.log(req.session);
      const user = await userModel.findById(userId);
      return res.status(200).send(user.companyEmailVerified);
    } catch (error) {
      next(error);
    }
  }
  async isVerifiedPhoneNumber(req, res, next) {
    try {
      const { userId } = req.session;
      const user = await userModel.findById(userId);
      return res.status(200).send(user.phoneNumberVerified);
    } catch (error) {
      next(error);
    }
  }
  async checkEmailOTP(req, res, next) {
    try {
      const { userId } = req?.session;
      const { emailOTP } = req.body;
      const user = await userModel.findById(userId);
      const [otp, ttl] = user.emailOTP.split(".");
      if (Date.now() > +ttl) {
        return next(ErrorHandler(400, "Email OTP has been expired"));
      }
      if (Number(emailOTP) === +otp) {
        user.companyEmailVerified = true;
        await user.save();
        return res
          .status(201)
          .send({ success: true, emailVerified: true, user });
      } else {
        return next(
          ErrorHandler(400, "Incorrect Email OTP please check again")
        );
      }
    } catch (error) {
      next(error);
    }
  }
  async checkPhoneNumberOTP(req, res, next) {
    try {
      console.log(req.session);
      const { userId } = req?.session;
      const { phoneNumberOTP } = req.body;
      if (!phoneNumberOTP) {
        return next(ErrorHandler(400, "please enter the otp"));
      }
      const user = await userModel.findById(userId);
      const [otp, ttl] = user.phoneOTP.split(".");
      console.log(otp, ttl);
      if (Date.now() > +ttl) {
        return next(ErrorHandler(400, "Phone Number OTP has been expired"));
      }
      console.log(phoneNumberOTP === Number(otp));
      if (Number(phoneNumberOTP) === +otp) {
        user.phoneNumberVerified = true;
        await user.save();
        return res
          .status(201)
          .send({ success: true, phoneNumberVerified: true, user });
      } else {
        return next(
          ErrorHandler(400, "Incorrect Phone Number OTP please check again")
        );
      }
    } catch (error) {
      next(error);
    }
  }
  async checkSession(req, res, next) {
    try {
      if (req.session && req.session.userId) {
        return res.status(200).send({ valid: true });
      } else {
        return res.status(200).send({ valid: false });
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.params);
      const userId = req.session.userId;
      const userIdForDelete = id || userId;

      if (!userIdForDelete || !mongoose.Types.ObjectId.isValid(userIdForDelete)) {
        return next(ErrorHandler(400, "Invalid or missing user ID"));
      }

      const user = await userModel.findByIdAndDelete(userIdForDelete);
      if (!user) {
        return next(ErrorHandler(400, "User not found"));
      }
      req.session.destroy((err) => {
        if (err) {
          return next(ErrorHandler(400, "Failed to Session Deleting"));
        }
        console.log("session deleted");
      });
      res.clearCookie("sessoin-cookie");
      return res
        .status(200)
        .send("User and associated posts deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
