import "./App.css";
import Login from "./containers/login";
import Todo from "./containers/todo";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/todo" component={Todo}></Route>
          {/* <Route path="/News" component={News}></Route>
        <Route path="/Website" component={Website}></Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
