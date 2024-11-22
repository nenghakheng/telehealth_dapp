import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Telehealth</h1>
      <Link
        to="/patient-form"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go to Patient Form
      </Link>
    </div>
  );
};

export default Home;
