import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edittodo = (props) => {
  const [closePopUp, setClosePopUp] = useState(false);
  const [todoStatus, setTodoStatus] = useState([]);
  const [editItems, setEditItems] = useState({});
  const [todoName, setTodoName] = useState("");

  const clickClosePopUp = () => {
    setClosePopUp(false);
  };

  useEffect(() => {
    if (props.edittodoBox == true) {
      setClosePopUp(true);
    }
    setEditItems(props.todoValue);
  });

  const postTodo = () => {
    if (todoName == "") {
      toast.error("Please input new name of the Todo ");
      setClosePopUp(true);
      return;
    } else {
      if (todoStatus == "") {
        toast.error("Please select the Status");
        setClosePopUp(true);
        return;
      } else {
        axios.post("http://localhost:8000/todos/editTodo", {
          todoName: todoName,
          todoStatus: todoStatus,
          todoId: editItems.id,
        });
        toast.success("Todo Edited");
      }
      setClosePopUp(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="popup"
        style={{ display: closePopUp == false ? "none" : "block" }}
      >
        <div className="popup_inner">
          <div className="popupHeader">
            <h5>Edit Todo Task</h5>
          </div>

          <div className="popupBody">
            <div>
              <center>
                <table className="fullWidth mt-3">
                  <tr>
                    <td>Todo Name</td>
                    <td>
                      <input
                        className="inputStyleTodo"
                        value={editItems.taskName}
                        disabled
                      ></input>
                    </td>
                  </tr>

                  <tr>
                    <td>Change as</td>
                    <td>
                      <input
                        className="inputStyleTodo mt-2"
                        onChange={(event) => setTodoName(event.target.value)}
                      ></input>
                    </td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>
                      <select
                        className="inputStyleTodo mt-2"
                        onChange={(event) => setTodoStatus(event.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>&nbsp;</td>
                    <td>
                      <div className="mt-3 takeMeRight">
                        <button
                          className="btn btn-danger"
                          onClick={clickClosePopUp}
                        >
                          Close
                        </button>
                        <span> </span>
                        <button
                          className="btn btn-success "
                          type="submit"
                          onClick={postTodo}
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                </table>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittodo;
