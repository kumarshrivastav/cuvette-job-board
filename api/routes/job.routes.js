import express from "express"
import { isAuthorized } from "../middleware/middleware.js"
import postController from "../controllers/postController.js"
const router=express.Router()
router.post('/createpost',isAuthorized,postController.createPost)
export default router