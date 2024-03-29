import React from "react";
import "./App.css";

import LoginPage from "./pages/Login/LoginPage";
import Signup from "./components/Signup/SignupForm";
import TodoPage from "./pages/TaskPage/TodoPage";
import NotFoundPage from "./pages/404_NotFound/NotFoundPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";
import PrivateRoutes from "./contexts/PrivateRoutes";

const App: React.FC = () => {
     return (
          <Router>
               <AuthProvider>
                    <Routes>
                         <Route element={<PrivateRoutes />}>
                              <Route
                                   path="/"
                                   element={
                                        <TodoProvider>
                                             <TodoPage />
                                        </TodoProvider>
                                   }
                              />
                         </Route>
                         <Route path="/signup" element={<Signup />} />
                         <Route path="/login" element={<LoginPage />} />

                         <Route path="*" element={<NotFoundPage />} />
                    </Routes>
               </AuthProvider>
          </Router>
     );
};

export default App;
