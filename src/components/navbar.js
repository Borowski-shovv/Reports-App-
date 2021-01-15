import { Link } from 'react-router-dom';
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Navbar = ({user}) => {

  const onLogoutClick = e => {
    e.preventDefault();
    logoutUser();
    console.log('click');
  };

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Ads Reports</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/list" className="nav-link">Lista Projektów</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Dodaj ćwiczenie</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Utwórz uzytkownika</Link>
          </li>
        </ul>
     
        </div>
      </nav>
    );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps,  { logoutUser })(Navbar);