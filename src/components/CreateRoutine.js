import { useState } from "react";

const CreateRoutine = ({ addMyRoutine }) => {
  const token = localStorage.getItem("token");
  const [routineName, setRoutineName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsPending(true);

    return fetch("https://collins-fitness-trackr.herokuapp.com/api/routines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: routineName,
        goal: goal,
        isPublic: isPublic,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.name === "error") {
          setError(res.message);
        } else {
          addMyRoutine(res);
          setIsPending(false);
          document.getElementById("createRoutine").reset();
          error && setError("");
        }
      })
      .catch((error) => {
        console.log("catch block");
        console.log(error.message);
        console.error(error);
      });
  };

  return (
    <div className="form-create-routine">
      <h2>Add Routine</h2>
      <form onSubmit={submitHandler} id="createRoutine" className="create-routine-form">
        <label>Routine Name:</label>
        <input type="text" required onChange={(e) => setRoutineName(e.target.value)} />
        <label>Goal:</label>
        <input type="text" required onChange={(e) => setGoal(e.target.value)} />
        <label className="checkbox-label" htmlFor="isPublic">
          Public?
        </label>
        <input
          className="checkbox-input"
          type="checkbox"
          id="isPublic"
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        {!isPending && <button>Create</button>}
        {isPending && <button>Creating...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CreateRoutine;
