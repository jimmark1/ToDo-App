import React from "react";
import "./App.css";

import LoginPage from "./pages/Login/LoginPage";
import Signup from "./components/Signup/Signup";
import TodoPage from "./pages/TaskPage/TodoPage";
import NotFoundPage from "./pages/404_NotFound/NotFoundPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
     return (
          <Router>
               <Routes>
                    <Route path="/" element={<TodoPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<NotFoundPage />} />
               </Routes>
          </Router>
     );
}

export default App;
