import React from "react";
import { Link } from "react-router-dom";

import LoginStyles from "./Login.module.css";

const LoginForm = () => {
     return (
          <div
               className={`${LoginStyles.container} d-flex justify-content-center align-items-center`}>
               <div className="col-lg-5">
                    <form
                         className={`${LoginStyles.form} shadow shadow-lg`}
                         id="login-form">
                         <div className="p-5">
                              <div className="p-1">
                                   <input
                                        className={`${LoginStyles.input} form-control`}
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                   />
                              </div>
                              <div className="p-1">
                                   <input
                                        className={`${LoginStyles.input} form-control`}
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                   />
                              </div>
                              <div className="d-grid gap-2 col-6 mx-auto p-2">
                                   <input
                                        className="form-control btn btn-primary"
                                        type="submit"
                                        value={"Login"}
                                   />
                              </div>
                         </div>
                    </form>
                    <div
                         className={`${LoginStyles.dataLink} p-3 d-flex justify-content-center text-center col-lg-12`}>
                         <p>Don't Have an account? </p>
                         <Link to={"/"}>
                              <p className="fw-bold ms-1">Signup</p>
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default LoginForm;
