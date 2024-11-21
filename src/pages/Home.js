import React from "react";
import { Link } from "react-router-dom";
import { usePatientData } from "../contexts/PatientDataContext"; // Assuming this is where your context is

const Home = () => {
  const { account, connectMetaMask } = usePatientData(); // Using the context for wallet data

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Telehealth</h1>

      {account ? (
        // If wallet is connected, show the link to the Patient Form
        <Link
          to="/patient-form"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go to Patient Form
        </Link>
      ) : (
        // If wallet is not connected, show the Connect Wallet button
        <button
          onClick={connectMetaMask}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Connect Wallet
        </button>
      )}

      {account && (
        <p className="mt-2 text-gray-500 text-sm">Connected: {account}</p>
      )}
    </div>
  );
};

export default Home;
