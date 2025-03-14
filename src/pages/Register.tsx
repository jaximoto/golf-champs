import { useState } from "react";
import supabase from "../client";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("Select Role");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name,
          role: role,
        }
      }
    });

    if (error) {
      setMessage(error.message);
      return;
    }
    if (data) {
      setMessage("User account created!");
      navigate("/emailVerification");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className=" d-flex  flex-column justify-content-center align-items-center vh-100">
      <h1>Create Account</h1>

      <div
        className="p-4 border rounded shadow-lg bg-light mt-3"
        style={{ width: "350px" }}
      >
        {message && <>{message}</>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleEmail">Email Address</label>
            <input
              className="form-control"
              id="exampleEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="examplePasswordInput">Password</label>
            <input
              id="examplePasswordInput"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleFirstNameInput">First Name</label>
            <input
              id="examplFirstNameInput"
              className="form-control"
              value={first_name}
              onChange={(e) => setFirst_Name(e.target.value)}
              type="text"
              required
              placeholder="First Name"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleLastNameInput">Last Name</label>
            <input
              id="examplLastNameInput"
              className="form-control"
              value={last_name}
              onChange={(e) => setLast_Name(e.target.value)}
              type="text"
              required
              placeholder="Last Name"
            />
          </div>
          <div className="dropdown mt-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              
              onClick={() => setIsOpen(!isOpen)}
            >
              {role}
            </button>
            {isOpen && (
              <div className="dropdown-menu show">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setRole("Golfer");
                    setIsOpen(false);
                  }}
                >
                  Golfer
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setRole("Clubhouse");
                    setIsOpen(false);
                  }}
                >
                  Clubhouse
                </button>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Create Account
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <Link to={"/login"}>Log in.</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
