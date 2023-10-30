const StepTwo = ({ onPrev, onNext, goal, setGoal }) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">What do you want to do?</h2>
      <button
        onClick={() => setGoal("lose")}
        className={`block w-full px-4 py-2 rounded-lg mb-2 ${
          goal === "lose" ? "bg-indigo-500 text-white" : "bg-white border"
        }`}
      >
        Lose Weight
      </button>
      <button
        onClick={() => setGoal("maintain")}
        className={`block w-full px-4 py-2 rounded-lg mb-2 ${
          goal === "maintain" ? "bg-indigo-500 text-white" : "bg-white border"
        }`}
      >
        Maintain Weight
      </button>
      <button
        onClick={() => setGoal("gain")}
        className={`block w-full px-4 py-2 rounded-lg mb-4 ${
          goal === "gain" ? "bg-indigo-500 text-white" : "bg-white border"
        }`}
      >
        Gain Weight
      </button>
      <button
        onClick={onPrev}
        className="block w-full px-4 py-2 rounded-lg bg-gray-500 text-white mb-2"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        className="block w-full px-4 py-2 rounded-lg bg-indigo-500 text-white"
        disabled={!goal}
      >
        Next
      </button>
    </div>
  );
};

export default StepTwo;
