import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
     return (
          <div
               className={`${Styles.container}  d-flex justify-content-center align-items-center`}>
               <div className="col-lg-5 container-fluid">
                    <Form className={`${Styles.form} text-center p-5`}>
                         <div className="app-label text-uppercase">
                              <h3 className="fw-bolder">Just Do It</h3>
                         </div>
                         <div className="d-flex gap-1">
                              <Form.Control
                                   type="email"
                                   placeholder="Enter your email address"
                                   required={true}
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
