//TODO: add validation messages

const StepOne = ({
  onNext,
  formState,
  handleInputChange,
  handleGenderChange,
}) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-md mx-auto">
      <form className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formState.age}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={formState.height}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formState.weight}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleGenderChange("male")}
            className={`px-4 py-2 rounded-lg ${
              formState.gender === "male"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => handleGenderChange("female")}
            className={`px-4 py-2 rounded-lg ${
              formState.gender === "female"
                ? "bg-pink-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Female
          </button>
        </div>
        <button
          type="button"
          onClick={onNext}
          className="block w-full px-4 py-2 rounded-lg bg-indigo-500 text-white"
          disabled={
            !formState.username ||
            !formState.password ||
            !formState.email ||
            !formState.age ||
            !formState.height ||
            !formState.weight ||
            !formState.gender
          }
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default StepOne;
