import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignupStyles from "../Signup/Signup.module.css";

const SignupForm = () => {
     type TSignupForm = {
          name: string;
          email: string;
          username: string;
          password: string;
          re_password: string;
     };

     const [formData, setFormData] = useState<TSignupForm>({
          name: "",
          email: "",
          username: "",
          password: "",
          re_password: "",
     });

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     };

     const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const request_instance = axios.create({
               headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
               },
          }); // create an  axios instance with the auth token
          try {
               const response = await request_instance.post(
                    "http://127.0.0.1:8000/auth/register/",
                    {
                         formData,
                    },
               );

               if (response.status === 200 || response.status === 201) {
                    toast.success("User registered successfully!", {
                         position: "top-right",
                         autoClose: 2000,
                         draggable: false,
                         theme: "colored",
                         closeButton: false,
                    });
               } else {
                    toast.error("Something went wrong!", {
                         position: "top-right",
                         autoClose: 2000,
                         draggable: false,
                         theme: "colored",
                         closeButton: false,
                    });
               }
          } catch (err) {
               console.log(err);
          }
     };

     return (
          <div
               className={`${SignupStyles.container}  d-flex justify-content-center align-items-center`}>
               <div className="col-lg-5 container-fluid">
                    <ToastContainer />
                    <form
                         className={`${SignupStyles.form} shadow shadow-lg`}
                         id="signup-form"
                         onSubmit={handleSignup}>
                         <div className="p-5">
                              <div className="app-brand text-center p-1">
                                   <h3 className={`fw-bolder`}>JUST DO IT</h3>
                              </div>
                              <div className="p-1">
                                   <input
                                        className={`${SignupStyles.inputField}`}
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                   />
                              </div>
                              <div className="p-1">
                                   <input
                                        className={`${SignupStyles.inputField}`}
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                   />
                              </div>
                              <div className="p-1">
                                   <input
                                        className={`${SignupStyles.inputField}`}
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                   />
                              </div>
                              <div className="p-1 d-flex row">
                                   <div className="col-lg">
                                        <input
                                             className={`${SignupStyles.inputField}`}
                                             name="password"
                                             type="password"
                                             placeholder="Password"
                                             value={formData.password}
                                             onChange={handleChange}
                                        />
                                   </div>
                                   <div className="col-lg">
                                        <input
                                             className={`${SignupStyles.inputField}`}
                                             name="re_password"
                                             type="password"
                                             placeholder="Confirm Password"
                                             value={formData.re_password}
                                             onChange={handleChange}
                                        />
                                   </div>
                              </div>
                              <div className="d-grid gap-2 col-6 mx-auto p-2 mt-5">
                                   <input
                                        className={`btn btn-success`}
                                        type="submit"
                                        value={"Signup"}
                                   />
                              </div>
                         </div>
                    </form>
                    <div
                         className={`${SignupStyles.dataLink} p-2 d-flex justify-content-center text-center col-lg-12`}>
                         <p>Already Have an account? </p>
                         <Link
                              to={"/login"}
                              className={`${SignupStyles.signupLink}`}>
                              <p className="fw-bold ms-1">Login</p>
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default SignupForm;
