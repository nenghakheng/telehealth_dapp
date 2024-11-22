import React, { useState } from "react";
import { usePatientData } from "../../contexts/PatientDataContext";

const PatientForm = () => {
  const { account, connectMetaMask, uploadToStarton } = usePatientData();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    condition: "",
  });
  const [ipfsHash, setIpfsHash] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!account) await connectMetaMask();
    const data = { ...formData, wallet: account };
    try {
      const hash = await uploadToStarton(data);
      setIpfsHash(hash);
      console.log("Uploaded to IPFS with CID:", hash);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Patient Information Form</h1>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleInputChange}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        name="condition"
        placeholder="Condition"
        value={formData.condition}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      {ipfsHash && (
        <p className="mt-4">
          Data stored on IPFS with CID:{" "}
          <a
            href={`https://ipfs.io/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {ipfsHash}
          </a>
        </p>
      )}
    </div>
  );
};

export default PatientForm;
