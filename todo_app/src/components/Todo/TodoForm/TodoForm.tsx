import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { AddSvg } from "../../Svgs";
const TodoForm = () => {
     return (
          <div className="border-bottom border-secondary-subtle info">
               <div className="mb-3">
                    <Form>
                         <div className="new-task d-flex gap-1">
                              <Form.Control
                                   type="text"
                                   placeholder="Add New Task"></Form.Control>
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
