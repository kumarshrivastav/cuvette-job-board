import mongoose from "mongoose";

let postSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    candidateEmails: [{ type: String, required: true }],
    interviewDate: { type: Date, required: true },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true}
  },
  { timestamps: true }
);

// postSchema.pre('save', function(next) {
//   if (!this.userId) {
//     this.userId = this._userId; // Assuming _userId is set from the request context
//   }
//   next();
// });

const jobPostModel =
  mongoose.models.jobPostModel || mongoose.model("jobPostModel", postSchema);
export default jobPostModel;
