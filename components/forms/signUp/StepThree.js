const StepThree = ({
  onPrev,
  onSubmit,
  weightGoal,
  setWeightGoal,
  activity,
  setActivity,
  activityLevels,
  goal,
}) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Select your activity</h2>
      <select value={activity} onChange={(e) => setActivity(e.target.value)}>
        {activityLevels.map((level) => (
          <option key={level.id} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
      {goal !== "maintain" && (
        <>
          <h2 className="text-lg font-bold mb-4">Set Your Goal</h2>
          <label htmlFor="weightGoal" className="block mb-2">
            Kilos per week:
          </label>
          <div className="flex items-center mb-4">
            <button
              type="button"
              onClick={() =>
                setWeightGoal((prev) => Math.max(0, prev - 0.1).toFixed(2))
              }
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              -
            </button>
            <input
              type="text"
              id="weightGoal"
              name="weightGoal"
              value={weightGoal}
              onChange={(e) =>
                setWeightGoal(parseFloat(e.target.value).toFixed(2))
              }
              className="block w-full mx-2 px-4 py-2 border rounded-lg text-center"
            />
            <button
              type="button"
              onClick={() =>
                setWeightGoal((prev) => (parseFloat(prev) + 0.1).toFixed(2))
              }
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              +
            </button>
          </div>
        </>
      )}
      <button
        onClick={onPrev}
        className="block w-full px-4 py-2 rounded-lg bg-gray-500 text-white mb-2"
      >
        Previous
      </button>
      <button
        onClick={onSubmit}
        className="block w-full px-4 py-2 rounded-lg bg-indigo-500 text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default StepThree;
