import React from "react";

import NavbarComponent from "../../components/Todo/Navbar/NavbarComponent";
import TodoList from "../../components/Todo/TodoList/TodoList";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import pageStlye from "../TaskPage/Todo.module.css";

const Todo = () => {
     return (
          <div className={`${pageStlye.container}`}>
               <ToastContainer />
               <div className="page-nav">
                    <NavbarComponent />
               </div>
               <div>
                    <TodoList />
               </div>
          </div>
     );
};

export default Todo;
