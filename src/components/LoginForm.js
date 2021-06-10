import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { userLogin } from "../api";

const LoginForm = ({ setCurrentUser, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };

    setIsPending(true);

    const res = await userLogin(userDetails);

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.user.username);
      setToken(res.token);
      setCurrentUser(res.user.username);
      document.getElementById("login-form").reset();
      history.push("/");
    } else {
      setError(res.message);
      document.getElementById("login-form").reset();
      setIsPending(false);
      console.log("Login:", res.message);
    }
  };

  return (
    <div className="form">
      <h2>Registered Users Log In Here</h2>
      <form id="login-form" onSubmit={submitHandler}>
        <label>User Name:</label>
        <input type="text" required onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" required onChange={(e) => setPassword(e.target.value)} />
        {!isPending && <button>Log In</button>}
        {isPending && <button disabled>Logging in....</button>}
      </form>
      <span className="register-check">
        Not a registered user? <Link to="/Register">Sign Up Here!</Link>
      </span>
      {error && <span className="error-handle">{error}</span>}
    </div>
  );
};

export default LoginForm;
