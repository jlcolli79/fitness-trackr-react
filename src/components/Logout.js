import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = ({ setCurrentUser, setToken }) => {
  const history = useHistory();
  useEffect(() => {
    localStorage.clear("token");
    localStorage.clear("username");
    setCurrentUser("");
    setToken("");
  });

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="logout-page">
      <h1>Thank you for using our service. Come back soon!</h1>
      <button onClick={handleClick}>Return to Home</button>
    </div>
  );
};

export default Logout;
