import { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../api/index";

const RegisterForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const formValidate = () => {
    if (password === confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };

    setIsPending(true);

    const res = await registerUser(userDetails);

    if (res.token) {
      alert("You have successfully registered, you may now log in!");
      history.push("/login");
    } else {
      setError(res.message);
      document.getElementById("register-form").reset();
      setIsPending(false);
      console.log("Register:", res.message);
    }
  };

  return (
    <div className="form">
      <h2>Register Here</h2>
      <form id="register-form" onSubmit={submitHandler}>
        <label>User Name:</label>
        <input type="text" required onChange={(e) => setUserName(e.target.value)} />
        <label>Password</label>
        <input type="password" required onChange={(e) => setPassword(e.target.value)} />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {!isPending && <button disabled={formValidate()}>Register</button>}
        {isPending && <button disabled>Registering...</button>}
        {password === confirmPassword}
      </form>
      {formValidate() && <span className="form-validate">Passwords do not match!</span>}
      {error && <span className="error-handle">{error}</span>}
    </div>
  );
};

export default RegisterForm;
