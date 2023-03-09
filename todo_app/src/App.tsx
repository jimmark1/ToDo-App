import React from "react";
import "./App.css";

import LoginPage from "./pages/Login/LoginPage";
import TodoPage from "./pages/TaskPage/TodoPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
     return (
          <Router>
               <Routes>
                    <Route path="/" element={<TodoPage />} />
               </Routes>
               <Routes>
                    <Route path="/login" element={<LoginPage />} />
               </Routes>
          </Router>
     );
}

export default App;
