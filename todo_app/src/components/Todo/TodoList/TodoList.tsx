import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";

import { AuthContext } from "../../../contexts/AuthContext";

const TodoList = () => {
     interface Todo {
          readonly task_id: string;
          task_title: string;
          is_completed: boolean;
          created_at: string;
     }

     let authContext = useContext(AuthContext);
     const [todos, setTodos] = useState<Todo[]>([]);
     const get_todos = async () => {
          const request_instance = axios.create({
               headers: {
                    Authorization: `Bearer ${authContext?.authTokens?.access}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
               },
          });

          const response = await request_instance.get(
               "http://127.0.0.1:8000/tasks/",
          );

          if (response.status === 200) {
               setTodos(response.data);
          } else {
               console.log(response);
          }
     };

     useEffect(() => {
          get_todos();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     return (
          <>
               {todos.map((todo) => (
                    <ListGroup variant="flush" key={todo.task_id}>
                         <ListGroup.Item>{todo.task_title}</ListGroup.Item>
                    </ListGroup>
               ))}
          </>
     );
};

export default TodoList;
