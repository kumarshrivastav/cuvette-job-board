import jobPostModel from "../model/post.model.js";
import { sendInterviewEmailToCandidate } from "../Services/EmailService.js";
import ErrorHandler from "../utils/ErrorHandle.js";

class PostController {
  async createPost(req, res, next) {
    try {
      const { userBody, jobBody } = req.body;
      const {
        jobTitle,
        jobDescription,
        experienceLevel,
        candidateEmails,
        interviewDate,
      } = jobBody;
      if (
        !jobTitle ||
        !jobDescription ||
        !experienceLevel ||
        !candidateEmails ||
        !interviewDate
      ) {
        return next(ErrorHandler(400, "please provide all the fields."));
      }
      const result = await sendInterviewEmailToCandidate(jobBody, userBody);
      if (result.success === false) {
        return next(
          ErrorHandler(400, "Failed to send interview emails to candidate")
        );
      }
      const post = await jobPostModel.create({
        ...jobBody,
        userId: userBody?._id,
      });
      const savedPost = await post.save();
      return res
        .status(201)
        .send({
          msg: "Job Interview Invitation Has Been Submitted Successfully",
          post: savedPost,
        });
    } catch (error) {
      next(error);
    }
  }
}
export default new PostController();
