import Header from "@/components/Header";
import React ,{useState,useEffect}from "react";
import { FaRegAngry } from "react-icons/fa";
import { FaRegFrown } from "react-icons/fa";
import { FaRegMeh } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { FaRegGrinStars } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import congratsLogo from "@/assets/congrats.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { submitFeedbackToBackend } from "../../api/auth";
const Result = () => {
     const location = useLocation();
  const { userId, score } = location.state || {};
const [selectedEmoji, setSelectedEmoji] = useState("");
  const [comment, setComment] = useState("");

 const handleEmojiClick = (emojiKey) => {
    const emojiSymbol = emojiMap[emojiKey];

    // Only update emoji if it's not already selected
    setSelectedEmoji(emojiKey);

    // If emoji isn't already in comment, prepend it
    if (!comment.includes(emojiSymbol)) {
      setComment(`${emojiSymbol} ${comment}`);
    }
  };
const emojiMap = {
  angry: "😠",
  frown: "☹️",
  meh: "😐",
  smile: "🙂",
  grin: "🤩",
};
   const handleSubmit = async () => {
    if (!selectedEmoji) {
       toast.warning("Please select an emoji.");
      return;
    }
    try {
      await submitFeedbackToBackend({ userId, emoji: selectedEmoji, comment });
      toast.success("Feedback submitted successfully!");
      setSelectedEmoji("");
      setComment("");
       navigate("/");
    } catch (err) {
      alert("Failed to submit feedback.");
    }
  };
 
  const navigate = useNavigate();
 
   const user = useSelector((state) => state.auth.user);
  const handleBack = () => {
    navigate("/");
  };
 
  

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col">
      <Header />

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center  px-4">
        {/* Success icon */}
        <div className="bg-green-100 rounded-full p-4 mb-4">
          <img src={congratsLogo} className="w-[100px] h-auto" />
        </div>

        {/* Success message */}
        <h2 className="text-lg md:text-xl font-medium text-[#1d2a3a] text-center mb-2">
          Congratulations you have Successfully Completed The Test
        </h2>

        {/* Score & ID */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-800 font-medium">Score :</span>
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded font-semibold">
              {score}/50
            </span>
          </div>
          <div className="bg-[#2A586F] text-white text-sm px-3 py-1 rounded font-medium">
            Your ID : {userId}
          </div>
        </div>
      </div>

      {/* Feedback Card */}
      <div className="mt-10 w-full px-4 md:px-0 flex justify-start md:justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full  max-w-3xl md:ml-16 min-h-[300px] ">
          <h3 className="text-base font-semibold mb-1">Feedback</h3>
          <p className="text-sm text-gray-600 mb-4">
            Your input is important for us. We take customer feedback very
            seriously.
          </p>

          {/* Emojis */}
          
         <div className="flex justify-between max-w-[280px] mx-auto mb-4 text-xl text-gray-600">
          <FaRegAngry className="cursor-pointer hover:text-red-500" onClick={() => handleEmojiClick("angry")} />
          <FaRegFrown className="cursor-pointer hover:text-orange-500" onClick={() => handleEmojiClick("frown")} />
          <FaRegMeh className="cursor-pointer hover:text-yellow-500" onClick={() => handleEmojiClick("meh")} />
          <FaRegSmile className="cursor-pointer hover:text-green-500" onClick={() => handleEmojiClick("smile")} />
          <FaRegGrinStars className="cursor-pointer hover:text-blue-500" onClick={() => handleEmojiClick("grin")} />
        </div>
          

          {/* Comment box */}
          <Textarea
          placeholder="Add a comment"
          className="w-full resize-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

          {/* Submit */}
          <div className="mt-4 flex justify-start">
            <Button  onClick={handleSubmit} className="bg-[#2A586F] text-white hover:bg-gray-800">
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>

      {/* Back to home */}
      <div className=" flex items-center justify-center mt-8 text-center">
        <button
          onClick={handleBack}
          className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
        >
          🏠 Back to home
        </button>
      </div>
    </div>
  );
};

export default Result;
