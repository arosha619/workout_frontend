import { formatDistanceToNow } from 'date-fns';
const WorkoutDetails = ({ workout,onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting workout');
      }
      // Call the onDelete function passed as a prop to notify the parent component
      onDelete(workout._id);
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting workout');
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load(kg) :</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps :</strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span onClick={handleDelete}>Delete</span>
    </div>
  );
};
export default WorkoutDetails;
