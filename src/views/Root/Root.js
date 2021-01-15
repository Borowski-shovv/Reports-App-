
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ExercisesList from "../../components/exercisesList";
import EditExercise from "../../components/editExercise";
import CreateExercise from "../../components/createExercise";
import CreateUser from "../../components/createUser";
import Login from "../../components/login";
import Dashboard from '../../components/dashboard';
import PrivateRoute from '../../components/privateRoute';
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../../actions/authActions";

import { Provider } from "react-redux";
import store from "../../store";

function Root() {
  // Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/";
  }
}
  
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path="/" exact component={Login} />
          <Route path="/list"  component={ExercisesList} /> 
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default Root;
