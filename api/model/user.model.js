import mongoose from "mongoose";
import jobPostModel from "./post.model.js";
let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    companyName: { type: String, required: true, unique: true },
    companyEmail: { type: String, required: true },
    employeeSize: { type: Number, required: true },
    companyEmailVerified: { type: Boolean, default: false },
    emailOTP: { type: String, default: "" },
    phoneNumberVerified: { type: Boolean, default: false },
    phoneOTP: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre("findOneAndDelete", async function (next) {
  try {

    const userId=this.getQuery()._id;
    console.log('userid from userSchema-------------')
    console.log(userId)
    await jobPostModel.deleteMany({userId})
    next();
  } catch (error) {
    next(error);
  }
});


const userModel = mongoose.models.users || mongoose.model("users", userSchema);


export default userModel;
