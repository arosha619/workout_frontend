import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForms from "../components/WorkoutForms";

function Home() {
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, [workouts]);

  const handleDelete = async (workoutId) => {
    try {
      // Filter out the deleted workout from the list
      setWorkouts(workouts.filter(workout => workout._id !== workoutId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} onDelete={handleDelete}/>
          ))}
          
      </div>
      <WorkoutForms/>
    </div>
  );
}

export default Home;
