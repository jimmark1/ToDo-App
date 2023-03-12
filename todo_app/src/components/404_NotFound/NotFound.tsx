import React from "react";

import NotFoundStyles from "../404_NotFound/NotFound.module.css";
import ImageNotFound from "./Image/PageNotFound.jpg";

const NotFound = () => {
     return (
          <div
               className={`${NotFoundStyles.container} d-flex justify-content-center align-items-center`}>
               <img
                    className={`${NotFoundStyles.img}`}
                    src={ImageNotFound}
                    alt="404 Page Not Found"
               />
          </div>
     );
};

export default NotFound;
