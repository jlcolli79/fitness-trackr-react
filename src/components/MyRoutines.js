import { useState, useEffect } from "react";

import { apiFetch } from "../api/Routines";
import CreateRoutine from "./CreateRoutine";

const MyRoutines = () => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const addMyRoutine = (routine) => {
    setMyRoutines([...myRoutines, routine]);
  };

  async function deleteRoutine(routineId) {
    const URL = "https://collins-fitness-trackr.herokuapp.com/api/routines/" + routineId;
    const headers = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await apiFetch(URL, headers);
      const updatedRoutines = myRoutines.filter((myR) => myR.id !== result.id);

      setMyRoutines(updatedRoutines);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const URL = `https://collins-fitness-trackr.herokuapp.com/api/users/${username}/routines`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function getMyRoutines() {
      try {
        const data = await apiFetch(URL, headers);
        setMyRoutines(data);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    }
    getMyRoutines();
  }, []);

  return (
    <div className="my-routines">
      {isPending && <div>Loading...</div>}
      <CreateRoutine addMyRoutine={addMyRoutine} />
      {myRoutines.map((routine) => (
        <div className="routine-cards" key={routine.id}>
          <p>
            <strong>Name:</strong> {routine.name}
          </p>
          <p>
            <strong>Goal:</strong> {routine.goal}
          </p>
          <p>
            <strong>Creator:</strong> {routine.creatorName}
          </p>
          <div>
            {myRoutines.activities && <h4>Included Activities</h4>}
            {myRoutines.activities &&
              myRoutines.activities.map((activity) => (
                <div className="included-activities">
                  <p>
                    <strong>Name:</strong> {activity.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {activity.description}
                  </p>
                  {activity.duration && (
                    <p>
                      <strong>Duration:</strong> {activity.duration}
                    </p>
                  )}
                  {activity.count && (
                    <p>
                      <strong>Count:</strong> {activity.count}
                    </p>
                  )}
                </div>
              ))}
          </div>
          <button onClick={() => deleteRoutine(routine.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyRoutines;
