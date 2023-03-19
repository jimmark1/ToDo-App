import React, { useEffect, useState } from "react";

import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";

const TodoList = () => {
     // const [todo, setTodo] = useState([]);
     const get_todos = async () => {
          const request_instance = axios.create({
               headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                         "access_token",
                    )}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
               },
          });

          const response = await request_instance.get(
               "http://127.0.0.1:8000/tasks/",
          );

          if (response.status === 200) {
               console.log(response.data);
          } else {
               console.log(response);
          }
     };

     useEffect(() => {
          get_todos();
     });

     return (
          <>
               <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
               </ListGroup>
          </>
     );
};

export default TodoList;
