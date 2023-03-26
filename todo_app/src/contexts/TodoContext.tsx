import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

import { AuthContext } from "./AuthContext";

interface Todo {
     readonly task_id: string;
     task_title: string;
     is_completed: boolean;
     created_at: string;
} // define the Todo interface

interface TodoContextValue {
     get_todos: () => Promise<void>;
     todos: Todo[];
     new_todo: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
     task_title: string;
     setTaskTitle: (task_title: string) => void;
} // define the TodoContextValue interface

interface Props {
     children: React.ReactNode;
} // define the Props interface

export const TodoContext = createContext<TodoContextValue | null>(null); // set the initial state of authTokens to null

export const TodoProvider: React.FC<Props> = ({ children }: Props) => {
     let authContext = useContext(AuthContext);
     const [todos, setTodos] = useState<Todo[]>([]); // set the initial state of Todos to null
     const [task_title, setTaskTitle] = useState(""); // set the initial state of task_title to null

     const get_todos = async () => {
          const request_instance = axios.create({
               headers: {
                    Authorization: `Bearer ${authContext?.authTokens?.access}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
               },
          }); // create an axios instance with the auth token

          const response = await request_instance.get(
               "http://127.0.0.1:8000/tasks/",
          ); // get the todos from the API

          if (response.status === 200) {
               setTodos(response.data);
          } else {
               console.log(response);
          } // if the response is successful, set the todos to the response data
     };

     const new_todo = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const request_instance = axios.create({
               headers: {
                    Authorization: `Bearer ${authContext?.authTokens?.access}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
               },
          }); // create an axios instance with the auth token

          const response = await request_instance.post(
               "http://127.0.0.1:8000/tasks/",
               {
                    task_title: e.currentTarget.task_title.value,
               },
          ); // get the todos from the API

          if (response.status === 200 || 201) {
               get_todos();
               setTaskTitle("");
          } else {
               console.log(response.status);
          } // if the response is successful, set the todos to the response data
     };

     const contextData = {
          get_todos,
          todos,
          new_todo,
          task_title,
          setTaskTitle,
     }; // set the context data

     useEffect(() => {
          get_todos();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []); // get the todos on page load

     return (
          <TodoContext.Provider value={contextData}>
               {children}
          </TodoContext.Provider>
     );
}; // set the initial state of user to null
