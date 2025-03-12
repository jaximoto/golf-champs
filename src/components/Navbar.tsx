import { Link } from "react-router-dom";

//make link to login/ register 
//<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//<span className="navbar-toggler-icon"></span>
//</button>
//<div className="collapse navbar-collapse" id="navbarSupportedContent">
//</div>
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <ul className="navbar-nav mr-auto mx-auto">        
        <li className="navbar-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="navbar-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
