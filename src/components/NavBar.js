import { Link } from "react-router-dom";

const Navbar = ({ token }) => {
  return (
    <nav className="navbar">
      <h1>Fitness Trac.kr!</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/routines">Routines</Link>
        {token && <Link to="/myroutines">My Routines</Link>}
        <Link to="/activities">Activities</Link>
        {!token && <Link to="/login">Login/Register</Link>}
        {token && <Link to="/logout">Log Out</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
