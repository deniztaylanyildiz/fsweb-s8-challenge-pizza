import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderForm from "./OrderForm";
import Success from "./Success";
import NotReady from "./NotReady";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        {/* Home'un rotası  */}
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/order">
          {/* OrderForm bileşeni çağrılır */}
          <OrderForm />
        </Route>
        <Route path="/success">
          {/* Success bileşeni çağrılır */}
          <Success />
        </Route>
        <Route path="/not-ready">
          <NotReady />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
