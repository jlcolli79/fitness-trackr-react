import { useState, useEffect } from "react";
import { apiFetch } from "../api/Routines";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [activityName, setActivityName] = useState("");
  const [activityDesc, setActivityDesc] = useState("");

  const token = localStorage.getItem("token");

  const addMyActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = "https://collins-fitness-trackr.herokuapp.com/api/activities";
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: activityName,
        description: activityDesc,
      }),
    };
    try {
      const data = await apiFetch(URL, headers);
      if (data) {
        document.getElementById("create-act-form").reset();
        console.log(data);
        addMyActivity(data);
      } else {
        document.getElementById("create-act-form").reset();
        alert("This Activity Already Exists!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const URL = "https://collins-fitness-trackr.herokuapp.com/api/activities";
    async function getAllActivities() {
      try {
        const data = await apiFetch(URL);
        setActivities(data);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllActivities();
  }, []);

  return (
    <div className="activities">
      {isPending && <div>Loading...</div>}
      <h1>Activities</h1>
      {token && (
        <form
          id="create-act-form"
          className="form-create-routine"
          onSubmit={handleSubmit}
        >
          <label>Activity Name:</label>
          <input type="text" required onChange={(e) => setActivityName(e.target.value)} />
          <label>Description:</label>
          <input type="text" required onChange={(e) => setActivityDesc(e.target.value)} />
          {!isPending && <button>Create</button>}
          {isPending && <button>Creating...</button>}
        </form>
      )}
      {activities.map((act) => (
        <div className="activities-cards" key={act.id}>
          <p>
            <strong>Name:</strong> {act.name}
          </p>
          <p>
            <strong>Description:</strong> {act.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Activities;
