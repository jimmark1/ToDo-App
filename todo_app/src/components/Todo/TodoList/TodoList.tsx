import React, { useContext } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { TodoContext } from "../../../contexts/TodoContext";

const TodoList = () => {
     let todoContext = useContext(TodoContext);

     return (
          <>
               {todoContext?.todos.map((todo) => (
                    <ListGroup variant="flush" key={todo.task_id}>
                         <ListGroup.Item>{todo.task_title}</ListGroup.Item>
                    </ListGroup>
               ))}
          </>
     );
};

export default TodoList;
