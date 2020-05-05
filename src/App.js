import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Cardlist from "./components/Cardlist";
import Footer from "./components/Footer";
import Login from "./components/googleLogin";
import Logout from "./components/logout";

class App extends React.Component {
  
  render() {
   
    return (
      <React.Fragment>
        <Router>
          {/* <NavBar/> */}

          <Switch>
            <Route exact path="/" component={Cardlist} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
