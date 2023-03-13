import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import NavbarComponent from "../../components/Todo/Navbar/NavbarComponent";
// import TodoForm from "../../components/Todo/TodoForm/TodoForm";
// import TodoList from "../../components/Todo/TodoList/TodoList";

import pageStlye from "../TaskPage/Todo.module.css";
import "./pageStyles.css";

const Todo = () => {
     return (
          <div className={`${pageStlye.container}`}>
               <div className="page-nav">
                    <NavbarComponent />
               </div>
               <div className="d-flex justify-content-center align-items-center">
                    <div className="col-lg-5 container-fluid">
                         <Tabs
                              className="nav-fill nav-tabs"
                              defaultActiveKey="task-list"
                              id="tab">
                              <Tab
                                   className={`${pageStlye.todoContainer}  p-3`}
                                   eventKey="task-list"
                                   title="Tasks">
                                   <p>Tasks List</p>
                              </Tab>
                              <Tab
                                   className={`${pageStlye.todoContainer}  p-3`}
                                   eventKey="task-list-completed"
                                   title="Completed Tasks">
                                   <p>Completed Tasks</p>
                              </Tab>
                         </Tabs>
                    </div>
               </div>
          </div>
     );
};

export default Todo;
