import React, { useContext } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { TodoContext } from "../../../contexts/TodoContext";

import { EditSvg, DeleteSvg } from "../../Svgs";

const TodoList = () => {
     let todoContext = useContext(TodoContext);

     return (
          <>
               {todoContext?.todos.map((todo) => (
                    <ListGroup variant="flush" key={todo.task_id}>
                         <ListGroup.Item className="border-bottom border-secondary-subtle text-align-middle">
                              <div className="d-flex justify-content-between align-items-center">
                                   <span>{todo.task_title}</span>
                                   <ButtonGroup>
                                        <Button
                                             variant="primary"
                                             onClick={(e) =>
                                                  todoContext?.edit_todo(
                                                       e,

                                                       todo.task_id,
                                                       todo.task_title,
                                                  )
                                             }>
                                             <img src={EditSvg} alt="Edit" />
                                        </Button>
                                        <Button variant="danger">
                                             <img
                                                  src={DeleteSvg}
                                                  alt="Delete"
                                             />
                                        </Button>
                                   </ButtonGroup>
                              </div>
                         </ListGroup.Item>
                    </ListGroup>
               ))}
          </>
     );
};

export default TodoList;
