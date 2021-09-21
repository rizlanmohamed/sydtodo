import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const [usernameInput, setUsernameInput] = useState([]);
  const [passwordInput, setPasswordInput] = useState([]);

  const history = useHistory();
  const routeChange = () => {
    let path = `./todo`;
    history.push(path);
  };

  const postToServer = () => {
    if (usernameInput | (passwordInput == "")) {
      toast.error("Enter the valid details");
    } else {
      axios
        .post("http://localhost:8000/logme", {
          username: usernameInput,
          password: passwordInput,
        })
        .then((response) => {
          if (response.data == "found") {
            console.log("user Found ");
            toast.success("Welcome " + usernameInput);
            routeChange();
          } else {
            console.log("User not found " + response.username);
            toast.error("User name or Password not Matched");
          }
        })
        .catch((err) => {
          toast.error("Unable to connect with Server!!!");
          console.log("Something Went wrong" + err);
        });
    }
  };

  return (
    <div>
      <div className="loginPanelBackground">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-3"></div>
            <div className="col-md-4 col-sm-6">
              <ToastContainer />
              <div className="mb-3">
                <center>
                  <div className="logo mt-5 mb-5"> </div>
                </center>

                <label className="form-label">Email address</label>
                <input
                  id="unameId"
                  className="inputStyle mb-4"
                  placeholder="Jone Mike"
                  autoComplete="off"
                  onChange={(event) => setUsernameInput(event.target.value)}
                />

                <label className="form-label">Password</label>
                <input
                  id="passwordId"
                  className="inputStyle mb-5"
                  type="password"
                  placeholder="*******"
                  autoComplete="off"
                  required
                  onChange={(event) => setPasswordInput(event.target.value)}
                />

                <button
                  className="buttonStyle"
                  type="submit"
                  onClick={postToServer}
                >
                  Login
                </button>
                <h2></h2>
              </div>
            </div>
            <div className="col-md-4 col-sm-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
