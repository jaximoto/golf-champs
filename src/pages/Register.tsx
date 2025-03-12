import { useState } from "react";
import supabase from "../client";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }
    if (data) {
      setMessage("User account created!");
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
