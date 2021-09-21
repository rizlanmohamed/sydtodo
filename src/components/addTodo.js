import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addtodo = (props) => {
  const [closePopUp, setClosePopUp] = useState(false);
  const [todoName, setTodoName] = useState([]);
  const [todoStatus, setTodoStatus] = useState([]);

  const clickClosePopUp = () => {
    setClosePopUp(false);
  };

  useEffect(() => {
    if (props.addtodoBox == true) {
      setClosePopUp(true);
    }
  });

  const postTodo = () => {
    if (todoName | (todoStatus == "")) {
      toast.error("Todo Name or Todo Status not set properly");
      setClosePopUp(true);
      return;
    } else {
      axios.post("http://localhost:8000/todos/addTodo", {
        todoName: todoName,
        todoStatus: todoStatus,
      });
      toast.success("Todo Added");
    }
    setClosePopUp(false);
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
            <h5>Add todo Task</h5>
          </div>

          <div className="popupBody">
            <div>
              <center>
                <table className="fullWidth mt-4">
                  <tr>
                    <td>TODO</td>
                    <td>
                      <input
                        className="inputStyleTodo"
                        onChange={(event) => setTodoName(event.target.value)}
                      ></input>
                    </td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>
                      <select
                        className="inputStyleTodo mt-3"
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
                      <div className="mt-5 takeMeRight">
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

export default Addtodo;
