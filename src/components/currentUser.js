import React from "react";
import { useHistory } from "react-router-dom";

function CurrentUser() {
  const history = useHistory();
  const routeChange = () => {
    let path = `./`;
    history.push(path);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="shadow-none p-4 mb-5 bg-light takeTextRight blueColorText">
          Hi, Rizlan Mohamed
          <span> </span>
          <button className="btn btn-sm btn-secondary" onClick={routeChange}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrentUser;
