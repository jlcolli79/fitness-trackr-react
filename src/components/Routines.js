import { useState, useEffect } from "react";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch("https://collins-fitness-trackr.herokuapp.com/api/routines")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRoutines(data);
      });
  }, []);

  return (
    <div className="routines">
      <h2>Public Routines</h2>
      {routines.map((routine) => (
        <div className="routine-cards" key={routine.id}>
          <p>Name: {routine.name}</p>
          <p>Goal: {routine.goal}</p>
          <p>Creator: {routine.creatorName}</p>
        </div>
      ))}
    </div>
  );
};

export default Routines;
