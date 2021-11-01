import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/Login";
import MyApp from "./pages/Home";
import NavBar from './components/Navbar'
import Friends from "./pages/Friends";
import Lists from "./pages/Lists";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const PrivateRoute = ({ path, component }) => {
    if (loading) return <div>Loading...</div>;
    if (loggedIn) return <Route path={path} component={component} />;
    return <Redirect to="/login" />;
  };

  useEffect(() => {
    if (user) {
        setLoading(false);
        setLoggedIn(true);
      } else {
        setLoading(false);
        setLoggedIn(false);
      }
  }, [user]);

  return (
    <BrowserRouter>
      <div className="pageContainer">
        <NavBar user={user} setUser={setUser} />
        <div className="contentWrap">
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/friends" component={Friends} />
            <PrivateRoute path="/lists" component={Lists} />
            <Route exact path="/login">
              {user ? (
                <Redirect to="/dashboard" />
              ) : (
                <LoginForm user={user} setUser={setUser} />
              )}
            </Route>
            <Route exact path="/" >
              <MyApp user={user} setUser={setUser} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
