import { useState, useEffect } from "react";
import { apiFetch } from "../api/Routines";

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const URL = "https://collins-fitness-trackr.herokuapp.com/api/routines";
    async function getAllRoutines() {
      try {
        const data = await apiFetch(URL);
        setRoutines(data);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllRoutines();
  }, []);

  return (
    <div className="routines">
      {isPending && <div>Loading...</div>}
      <h1>Routines</h1>
      {routines.map((routine) => (
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
            <h4>Included Activities</h4>
            {routine.activities.map((activity) => (
              <div className="included-activities" key={activity.id}>
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
        </div>
      ))}
    </div>
  );
};

export default Routines;
