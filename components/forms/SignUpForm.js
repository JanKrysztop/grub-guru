import { useState } from "react";
import axios from "axios";

function SignUpForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  });

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenderChange = (gender) => {
    setFormState({
      ...formState,
      gender,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    // Handle form submission here
    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        formState
      );

      console.log(response.data); // Handle the response data in the UI
    } catch (error) {
      console.error("Error:", error); // Handle the error in the UI
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        type="submit"
        className="block w-full px-4 py-2 rounded-lg bg-indigo-500 text-white"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
