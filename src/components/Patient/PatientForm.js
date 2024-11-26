import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatientData } from "../../contexts/PatientDataContext";

const PatientForm = () => {
  const navigate = useNavigate();
  const {
    account,
    connectMetaMask,
    uploadToStarton,
    storeCIDOnBlockchain,
    generateDIDFromAddress,
  } = usePatientData();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    houseAddr: "",
    bloodGroup: "",
    diagnoses: "",
    medications: "",
  });
  const [ipfsHash, setIpfsHash] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!account) await connectMetaMask();
    // Include the DID and IPFS CID in the contract method call
    const data = { ...formData, wallet: account }; // Might need to remove wallet later

    try {
      const did = generateDIDFromAddress(account);
      const cid = await uploadToStarton(data); // Upload to IPFS
      await storeCIDOnBlockchain(did, cid); // Store on blockchain
      setIpfsHash(cid);
      console.log("DID and CID stored successfully!");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Register Patient</h3>
        <button
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
      <div class="bg-white border-4 rounded-lg shadow relative m-10">
        <div class="flex items-start justify-between p-5 border-b rounded-t">
          <h3 class="text-xl font-semibold">Patient Form</h3>
        </div>

        <div class="p-6 space-y-6">
          <form action="#">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="name"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Enter Your Name"
                  required=""
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="phone"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="01234567"
                  required=""
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="gender"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required=""
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="dob"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="01/01/2024"
                  required=""
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="height"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Height (Cm)
                </label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required=""
                  placeholder="Height (cm)"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="weight"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Weight (Kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Weight (kg)"
                  required=""
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="houseAddr"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  House Address
                </label>
                <input
                  type="text"
                  name="houseAddr"
                  id="houseAddr"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required=""
                  value={formData.houseAddr}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="bloodGroup"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Blood Group
                </label>
                <input
                  type="text"
                  name="bloodGroup"
                  id="bloodGroup"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required=""
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-span-full">
                <label
                  for="diagnoses"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Diagnoses
                </label>
                <textarea
                  id="diagnoses"
                  name="diagnoses"
                  rows="4"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Details"
                  value={formData.diagnoses}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div class="col-span-full">
                <label
                  for="medications"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Medications
                </label>
                <textarea
                  id="medications"
                  name="medications"
                  rows="4"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Details"
                  value={formData.medications}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <div class="p-6 border-t border-gray-200 rounded-b">
          <button
            class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
            onClick={handleSubmit}
          >
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
