import User from "../models/User.js";
import TestResult from "../models/Test.js"
import Feedback from "../models/Feedback.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import Question from "../models/Question.js";

export const signup = async (req, res) => {
  try {
    
    const { name, email, password,status,mobile } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ mobileNumber:mobile });
   

    if (existingUser) {
      return res.status(400).json({ message: "Mobile Number already registered" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = new User({
      fullName:name,
      email,
      password: hashedPassword,
      status,mobileNumber:mobile
    });

    await newUser.save();

    

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    console.log(req.body,"request body")
    const { mobile, password } = req.body;

     
    const user = await User.findOne({ mobileNumber: mobile });
    console.log(user,"user data")

    if (!user) {
      
      return res.status(400).json({ message: "User Not Registered" });
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // Create token
    const token = generateToken({
      userId: user._id,
      email: user.email,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        mobile: user.mobileNumber,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
export const saveTestResult = async (req, res) => {
  try {
    const { userId, score } = req.body;
console.log(req.body,"data")
    if (!userId || score === undefined) {
      return res.status(400).json({ message: "userId and score are required" });
    }

    const result = new TestResult({
      userId,
      score,
    });

    await result.save();
    res.status(201).json({ message: "Test result saved successfully", result });
  } catch (error) {
    console.error("Save test result error:", error);
    res.status(500).json({ message: "Server error while saving test result" });
  }
};
export const submitFeedback = async (req, res) => {
  try {
    const { userId, emoji, comment } = req.body;

    if (!userId || !emoji) {
      return res.status(400).json({ message: "userId and emoji are required" });
    }

    const feedback = new Feedback({
      userId,
      emoji,
      comment: comment || "",
    });

    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Submit feedback error:", error);
    res.status(500).json({ message: "Server error while submitting feedback" });
  }
};
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};