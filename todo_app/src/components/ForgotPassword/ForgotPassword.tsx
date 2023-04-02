import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { toast, ToastContainer } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
     let navigate = useNavigate();
     const [email, setEmail] = useState<string>("");

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          try {
               const response = await axios.post(
                    "https://todo-api-production-065e.up.railway.app/auth/forgot-password/",
                    { email },
               ); // Send email to the API

               if (response.status === 200) {
                    toast.success(response.data.success, {
                         position: "top-right",
                         autoClose: 2000,
                         draggable: false,
                         theme: "colored",
                         closeButton: false,
                    }); // If password reset is successful, navigate to login page

                    setTimeout(() => {
                         navigate("/login");
                    }, 2000);
               }
          } catch (error) {
               toast.error((error as AxiosError<any>).response?.data.error, {
                    position: "top-right",
                    autoClose: 2000,
                    draggable: false,
                    theme: "colored",
                    closeButton: false,
               }); // If password reset is unsuccessful, show error message
          }
     };

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
                         onSubmit={handleSubmit}>
                         <div className="app-label text-uppercase">
                              <h3 className="fw-bolder">Just Do It</h3>
                         </div>
                         <div className="d-flex gap-1">
                              <Form.Control
                                   type="email"
                                   placeholder="Enter your email address"
                                   required={true}
                                   onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
