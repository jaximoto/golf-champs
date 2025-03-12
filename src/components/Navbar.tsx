import { Link } from "react-router-dom";

//make link to login/ register 
//<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//<span className="navbar-toggler-icon"></span>
//</button>
//<div className="collapse navbar-collapse" id="navbarSupportedContent">
//</div>
function Navigate() {
  return (
    <nav className="navbar-inline bg-light fixed-top">
      
      <ul className="navbar-nav mg-inline">
        <li className="nav-item">
          <Link className="navbar-item" to="/">Home</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">register</Link>
        </li>
      </ul>
      
    </nav>
  )
}

export default Navigate;
