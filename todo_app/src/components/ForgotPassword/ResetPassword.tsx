import React, { useState } from "react";
import axios, { AxiosError } from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Styles from "./ForgotPassword.module.css";

const ResetPassword: React.FC = () => {
     const [password, setPassword] = useState(""); // New password
     const [confirmPassword, setConfirmPassword] = useState(""); // Confirm new password
     const navigate = useNavigate(); // Navigate to login page
     const { token } = useParams<Record<string, string | undefined>>(); // Token from the URL

     const handleResetPassword = async (
          e: React.FormEvent<HTMLFormElement>,
     ) => {
          e.preventDefault();
          if (password !== confirmPassword) {
               toast.error("Passwords do not match", {
                    position: "top-right",
                    autoClose: 2000,
                    draggable: false,
                    theme: "colored",
                    closeButton: false,
               });
               return;
          } // Check if passwords match

          try {
               const response = await axios.post(
                    `http://127.0.0.1:8000/auth/reset-password/${token}/`,
                    {
                         password,
                    },
               );

               if (response.status === 200) {
                    toast.success(response.data.success, {
                         position: "top-right",
                         autoClose: 2000,
                         draggable: false,
                         theme: "colored",
                         closeButton: false,
                    });
                    setTimeout(() => {
                         navigate("/login");
                    }, 2000);
               } // If password reset is successful, navigate to login page
          } catch (error) {
               toast.error((error as AxiosError<any>).response?.data.error, {
                    position: "top-right",
                    autoClose: 2000,
                    draggable: false,
                    theme: "colored",
                    closeButton: false,
               }); // If password reset is unsuccessful, display error message
          }
     }; //

     return (
          <div
               className={`${Styles.container}  d-flex justify-content-center align-items-center`}>
               <div className="col-lg-5 container-fluid">
                    <ToastContainer
                         hideProgressBar={true}
                         toastStyle={{
                              fontSize: "15px",
                              fontWeight: "500",
                              letterSpacing: "1.5px",
                         }}
                    />
                    <Form
                         className={`${Styles.form} text-center p-5`}
                         onSubmit={handleResetPassword}>
                         <div className="app-label text-uppercase">
                              <h3 className="fw-bolder">Just Do It</h3>
                         </div>
                         <div className="d-flex gap-1">
                              <Form.Control
                                   type="password"
                                   id="password"
                                   value={password}
                                   placeholder="New Password"
                                   onChange={(e) => setPassword(e.target.value)}
                              />
                              <Form.Control
                                   type="password"
                                   id="confirm-password"
                                   value={confirmPassword}
                                   placeholder="Confirm Password"
                                   onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                   }
                              />
                              <Button variant="primary" type="submit">
                                   Submit
                              </Button>
                         </div>
                    </Form>
               </div>
          </div>
     );
};

export default ResetPassword;
