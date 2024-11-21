import React from "react";
import { usePatientData } from "../../contexts/PatientDataContext";

const ConnectWallet = () => {
  const { connectMetaMask, account } = usePatientData();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Connect Your Wallet
      </h1>
      <button
        onClick={connectMetaMask}
        className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {account ? "Wallet Connected" : "Connect Wallet"}
      </button>
      {account && (
        <p className="mt-6 text-lg text-gray-700">
          Connected Account: <span className="font-mono">{account}</span>
        </p>
      )}
    </div>
  );
};

export default ConnectWallet;
