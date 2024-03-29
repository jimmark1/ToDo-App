import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginStyles from "./Login.module.css";

import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
     let authContext = useContext(AuthContext);

     return (
          <div
               className={`${LoginStyles.container} d-flex justify-content-center align-items-center`}>
               <ToastContainer
                    hideProgressBar={true}
                    toastStyle={{
                         fontSize: "15px",
                         fontWeight: "500",
                         letterSpacing: "1.5px",
                    }}
               />
               <div className="col-lg-5 container-fluid">
                    <form
                         className={`${LoginStyles.form} shadow shadow-lg`}
                         id="login-form"
                         onSubmit={authContext?.login}>
                         <div className="p-5">
                              <div className="app-brand text-center p-1">
                                   <h3
                                        className={`${LoginStyles.appLabel} fw-bolder`}>
                                        JUST DO IT
                                   </h3>
                              </div>
                              <div className="p-1">
                                   <input
                                        className={`${LoginStyles.input}`}
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        required={true}
                                   />
                                   <input
                                        className={`${LoginStyles.input}`}
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        required={true}
                                   />
                              </div>
                              <div className="d-grid gap-2 col-6 mx-auto p-2">
                                   <input
                                        className={`${LoginStyles.submitBtn} btn btn-primary`}
                                        type="submit"
                                        value={"Login"}
                                   />
                              </div>
                         </div>
                    </form>
                    <div
                         className={`${LoginStyles.dataLink} p-2 d-flex justify-content-center text-center col-lg-12`}>
                         <p>Don't Have an account? </p>
                         <Link
                              to={"/signup"}
                              className={`${LoginStyles.signupLink}`}>
                              <p className="fw-bold ms-1">Signup</p>
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default LoginForm;
