 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuestionPage from "./pages/QuestionPage";
import Result from "./pages/Result";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "./Route/ProtectedRoute";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
 
          <Route
            path="/question"
            element={
              <ProtectedRoute>
                <QuestionPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
