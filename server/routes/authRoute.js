import express from "express";
import { signup,login, saveTestResult, submitFeedback, getAllQuestions } from "../controller/authController.js";
import  verifyToken  from "../middleWare/VerifyUser.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login",login)
router.get('/getQuestions',verifyToken,getAllQuestions)
router.post('/result',verifyToken,saveTestResult)
router.post('/feedback',verifyToken,submitFeedback)

export default router;