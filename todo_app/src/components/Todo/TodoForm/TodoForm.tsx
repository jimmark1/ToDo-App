import React, { useContext } from "react";

import { TodoContext } from "../../../contexts/TodoContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { AddSvg } from "../../Svgs";
const TodoForm = () => {
     let todoContext = useContext(TodoContext);

     return (
          <div className="border-bottom border-secondary-subtle info">
               <div className="mb-3">
                    <Form onSubmit={todoContext?.handle_todo}>
                         <div className="new-task d-flex gap-1">
                              <Form.Control
                                   name="task_title"
                                   type="text"
                                   placeholder="Add New Task"
                                   value={todoContext?.task_title}
                                   onChange={(e) =>
                                        todoContext?.setTaskTitle(
                                             e.target.value,
                                        )
                                   }></Form.Control>
                              <Button variant="primary" type="submit">
                                   <img src={AddSvg} alt="ADD" />
                              </Button>
                         </div>
                    </Form>
               </div>
          </div>
     );
};

export default TodoForm;
