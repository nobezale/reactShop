/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import SignIn from "views/SignIn/SignIn.js";
import LocationView from "views/LocationView/LocationView.js";

import SignUp from "views/SignUp/SignUp.js";
import ShoppingCart from "views/ShoppingCart/ShoppingCart.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

import 'bootstrap/dist/css/bootstrap.min.css'; 

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route  path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signout" component={Admin} />
      <Route path="/LocationView" component={LocationView}  />

      <Redirect from="/" to="/admin/Home" />
      
      
    </Switch>
  </Router>,
  document.getElementById("root")
);
