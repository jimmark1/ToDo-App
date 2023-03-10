import React from "react";
import { Link } from "react-router-dom";

import SignupStyles from "../Signup/Signup.module.css";

const SignupForm = () => {
     return (
          <div
               className={`${SignupStyles.container}  d-flex justify-content-center align-items-center`}>
               <div className="col-lg-5 container-fluid">
                    <form
                         className={`${SignupStyles.form} shadow shadow-lg`}
                         id="signup-form">
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
                                   />
                              </div>
                              <div className="p-1">
                                   <input
                                        className={`${SignupStyles.inputField}`}
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                   />
                              </div>
                              <div className="p-1 d-flex row">
                                   <div className="col-lg">
                                        <input
                                             className={`${SignupStyles.inputField}`}
                                             name="password"
                                             type="password"
                                             placeholder="Password"
                                        />
                                   </div>
                                   <div className="col-lg">
                                        <input
                                             className={`${SignupStyles.inputField}`}
                                             name="re_password"
                                             type="password"
                                             placeholder="Confirm Password"
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
