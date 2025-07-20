import { publicAxios, privateAxios } from "./axiosInstance";

export const loginUser = async (formData) => {
  try {
    const res = await publicAxios.post("/auth/login", formData);

    return {
      user: {
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
      },
      token: res.data.token,
      status: res.status,
    };
  } catch (error) {
    throw error
  }
};

export const signupUser = async (formData) => {
  try {
    const res = await publicAxios.post("/auth/signup", formData);
    
    return res;
  } catch (error) {
    throw error|| { message: "Signup failed" };
  }
};
export const saveResultToDatabase =async({ userId, score })=>{
try {
  const res=await privateAxios.post("/auth/result",{
      userId,
      score,
    })
      console.log("Saved result:", res.data);
      return res
} catch (error) {
  console.error("Error saving result:", error);
}
}

export const submitFeedbackToBackend = async ({ userId, emoji, comment }) => {
  try {
    const res = await privateAxios.post("/auth/feedback", {
      userId,
      emoji,
      comment,
    });
    console.log("Feedback submitted:", res.data);
    return res;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};
export const fetchQuestion=async()=>{
  try {

     
    const res=await privateAxios("/auth/getQuestions")
    
    return res.data
  } catch (error) {
      console.error("Error submitting feedback:", error);
    throw error;
  }
}
 
