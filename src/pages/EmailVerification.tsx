import { useNavigate } from "react-router-dom";

function EmailVerification() {
  const navigate = useNavigate();
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container d-flex  flex-column justify-content-center align-items-center vh-100">
        <h1 className="display-4">Please verify your email to continue.</h1>
        <p className="lead">
          A verification email has been sent, and is waiting for you :)
        </p>
        <button
          onClick={() => navigate("/")}
          type="button"
          className="btn btn-primary"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}
export default EmailVerification;
