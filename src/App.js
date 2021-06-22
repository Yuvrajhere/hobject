import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Home from "./components/Home";
import AddProject from "./components/AddProject";
import Project from "./components/Project";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/project/:projectId" exact>
            <Project  />
          </Route>
          <Route path="/addproject/:projectId" exact>
            <AddProject />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
