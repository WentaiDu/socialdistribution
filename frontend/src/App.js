import "./App.css";
import Login from "./components/Login";
import T from "./components/T";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/T" exact component={T} />
      </Switch>
    </Router>
  );
}

export default App;