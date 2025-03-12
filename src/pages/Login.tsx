import { useState } from "react";
import supabase from "../client";
import { Link, useNavigate } from "react-router-dom";

function Login() {
 
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setMessage("");
  
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        setMessage(error.message);
        setEmail("");
        setPassword("");
        return;
      }
      if (data) {
        navigate("/dashboard")
      }
      
    };
    return (
      <div className=" d-flex  flex-column justify-content-center align-items-center vh-100">
        <h1>Log In</h1>
  
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
              Log In
            </button>
          </form>
          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <Link to={"/register"}>Sign Up.</Link>
          </div>
        </div>
      </div>
    );
  }

  export default Login;