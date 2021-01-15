import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import { useHistory } from 'react-router-dom';

const Login = ( auth, errors ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorss, setErrors] = useState({});
    const history = useHistory();
    console.log(errorss)
    useEffect(() => {
      if (auth.isAuthenticated) {
        history.push('/dashboard')
      }

      if(errors) {
        showErrors(errors)
      }
    }, [errors])

    const showErrors = (err) => {
      setErrors(err)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
      }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {

      e.preventDefault();
      const userData = {
        email,
        password,
      };
      console.log(userData);
  };


return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            {/* <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link> */}
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b>
              </h4>
              {/* <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p> */}
            </div>
            <form noValidate onSubmit={handleSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={handleEmailChange}
                  value={email}
                  error={errorss.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errorss.email || errorss.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  error={errorss.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errorss.password || errorss.passwordincorrect
                  })}
                />
                <label htmlFor="password">Hasło</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Zaloguj
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (auth, errors) => ({
  auth,
  errors
});
            
export default connect(mapStateToProps,{ loginUser })(Login);