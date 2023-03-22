import React from "react";
import "./App.css";

import LoginPage from "./pages/Login/LoginPage";
import Signup from "./components/Signup/SignupForm";
import TodoPage from "./pages/TaskPage/TodoPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import NotFoundPage from "./pages/404_NotFound/NotFoundPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoutes from "./contexts/PrivateRoutes";

function App() {
     return (
          <Router>
               <AuthProvider>
                    <Routes>
                         <Route path="/signup" element={<Signup />} />
                         <Route path="/login" element={<LoginPage />} />
                         <Route
                              path="/forgot-password"
                              element={<ForgotPasswordPage />}
                         />
                         <Route path="*" element={<NotFoundPage />} />
                         <Route element={<PrivateRoutes />}>
                              <Route path="/" element={<TodoPage />} />
                         </Route>
                    </Routes>
               </AuthProvider>
          </Router>
     );
}

export default App;
