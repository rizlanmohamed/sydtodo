import React from "react";
import CurrentUser from "../components/currentUser";
import TodoArea from "../components/todoArea";

const Todo = (props) => (
  <div>
    <div className="container">
      <CurrentUser/>
      <TodoArea />
    </div>
  </div>
);

export default Todo;
