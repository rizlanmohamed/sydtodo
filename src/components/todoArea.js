import React from "react";
import { useState, useEffect } from "react";
import Addtodo from "./addTodo";
import Edittodo from "./editTodo";
import axios from "axios";

function TodoArea(props) {
  const [addTodoPopUp, setaddTodoPopUp] = useState(false);
  const [editTodoPopUp, setEditTodoPopUp] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [updateTodo, setUpdateTodo] = useState("");

  const openAddTodoPopUp = () => {
    setaddTodoPopUp(true);
  };

  const openEditTodoPopUp = () => {
    setEditTodoPopUp(true);
  };

  setTimeout(function () {
    setaddTodoPopUp(false);
    setEditTodoPopUp(false);
  }, 1000);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8000/todos/list");
      setTodoList(res.data);
    };
    setTimeout(() => {
      fetchPosts();
    }, 1800);
  });

  const deleteTodo = (e, list) => {
    axios.post("http://localhost:8000/todos/deleteTodo", {
      deleteId: list.id,
    });
  };

  const editTodo = (e, list) => {
    openEditTodoPopUp();
    setUpdateTodo(list);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="takeMeRight">
          <button
            type="button"
            className="btn btn-outline-primary mb-3"
            onClick={openAddTodoPopUp}
          >
            Add Task
          </button>
          <Addtodo addtodoBox={addTodoPopUp} />
          <Edittodo edittodoBox={editTodoPopUp} todoValue={updateTodo} />
        </div>

        <div>
          <table className="table takeTextCenter">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task name</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((todoList) => (
                <tr>
                  <th scope="row" key={todoList.id}>
                    {todoList.id}
                  </th>
                  <td>{todoList.taskName}</td>
                  <td>
                    <button
                      type="button"
                      className={
                        (todoList.statusOfTask == "Todo" &&
                          "btn btn-outline-dark") ||
                        (todoList.statusOfTask == "Completed" &&
                          "btn btn-outline-success") ||
                        (todoList.statusOfTask == "In Progress" &&
                          "btn btn-outline-warning")
                      }
                    >
                      {todoList.statusOfTask}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={(e) => editTodo(e, todoList)}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={(e) => deleteTodo(e, todoList)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {todoList == "" && (
            <h3 className="takeTextCenter blueColorText mt-5">No Todo Found</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoArea;
