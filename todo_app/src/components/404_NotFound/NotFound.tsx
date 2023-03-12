import React from "react";
import { Link } from "react-router-dom";

import { ReturnSvgComponent } from "../Svgs/index";

import NotFoundStyles from "../404_NotFound/NotFound.module.css";
import ImageNotFound from "./Images/PageNotFound.jpg";

const NotFound = () => {
     return (
          <div className={`${NotFoundStyles.container} text-center`}>
               <div className="d-flex justify-content-center align-items-center">
                    <img
                         className={`${NotFoundStyles.img}`}
                         src={ImageNotFound}
                         alt="404 Page Not Found"
                    />
               </div>
               <div className="data-link">
                    <Link className={`${NotFoundStyles.dataLink}`} to={"/"}>
                         <img src={ReturnSvgComponent} alt="Return" />{" "}
                         <span> Back to Homepage</span>
                    </Link>
               </div>
          </div>
     );
};

export default NotFound;
