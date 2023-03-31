import React, { useContext } from "react";

import TodoForm from "../TodoForm/TodoForm";

import { TodoContext } from "../../../contexts/TodoContext";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { ToastContainer } from "react-toastify";

import { EditSvg, DeleteSvg, CheckSvg } from "../../Svgs";

import ListStyle from "../TodoList/Todo.module.css";

const TodoList = () => {
     let todoContext = useContext(TodoContext);

     const completedTodos = todoContext?.todos.filter(
          (todo) => todo.is_completed === true,
     );

     const unFinishedTodos = todoContext?.todos.filter(
          (todo) => todo.is_completed === false,
     );

     return (
          <>
               <div className="d-flex justify-content-center align-items-center">
                    <div className="col-lg-5 ">
                         <ToastContainer
                              hideProgressBar={true}
                              toastStyle={{
                                   fontSize: "15px",
                                   fontWeight: "500",
                                   letterSpacing: "1.5px",
                              }}
                         />
                         <TodoForm />
                         <Tabs
                              className="nav-fill nav-tabs"
                              defaultActiveKey="task-list"
                              id="tab">
                              <Tab
                                   tabClassName="Completed Tasks"
                                   className={`${ListStyle.todoContainer}`}
                                   eventKey="task-list"
                                   title="Tasks">
                                   {unFinishedTodos?.map((todo) => (
                                        <ListGroup
                                             variant="flush"
                                             key={todo.task_id}>
                                             <ListGroup.Item className="border-bottom border-secondary-subtle text-align-middle">
                                                  <div className="d-flex justify-content-between align-items-center">
                                                       <span>
                                                            {todo.task_title}
                                                       </span>
                                                       <ButtonGroup>
                                                            <Button variant="success">
                                                                 <img
                                                                      src={
                                                                           CheckSvg
                                                                      }
                                                                      alt="Edit"
                                                                 />
                                                            </Button>
                                                            <Button
                                                                 variant="primary"
                                                                 onClick={(e) =>
                                                                      todoContext?.edit_todo(
                                                                           e,

                                                                           todo.task_id,
                                                                           todo.task_title,
                                                                      )
                                                                 }>
                                                                 <img
                                                                      src={
                                                                           EditSvg
                                                                      }
                                                                      alt="Edit"
                                                                 />
                                                            </Button>
                                                            <Button
                                                                 variant="danger"
                                                                 onClick={(e) =>
                                                                      todoContext?.delete_todo(
                                                                           e,
                                                                           todo.task_id,
                                                                      )
                                                                 }>
                                                                 <img
                                                                      src={
                                                                           DeleteSvg
                                                                      }
                                                                      alt="Delete"
                                                                 />
                                                            </Button>
                                                       </ButtonGroup>
                                                  </div>
                                             </ListGroup.Item>
                                        </ListGroup>
                                   ))}
                              </Tab>
                              <Tab
                                   className={`${ListStyle.todoContainer}`}
                                   eventKey="task-list-completed"
                                   title="Completed Tasks">
                                   {completedTodos?.map((todo) => (
                                        <ListGroup
                                             variant="flush"
                                             key={todo.task_id}>
                                             <ListGroup.Item className="border-bottom border-secondary-subtle text-align-middle">
                                                  <div className="d-flex justify-content-between align-items-center">
                                                       <span>
                                                            {todo.task_title}
                                                       </span>
                                                       <ButtonGroup>
                                                            <Button
                                                                 variant="danger"
                                                                 onClick={(e) =>
                                                                      todoContext?.delete_todo(
                                                                           e,
                                                                           todo.task_id,
                                                                      )
                                                                 }>
                                                                 <img
                                                                      src={
                                                                           DeleteSvg
                                                                      }
                                                                      alt="Delete"
                                                                 />
                                                            </Button>
                                                       </ButtonGroup>
                                                  </div>
                                             </ListGroup.Item>
                                        </ListGroup>
                                   ))}
                              </Tab>
                         </Tabs>
                    </div>
               </div>
          </>
     );
};

export default TodoList;
