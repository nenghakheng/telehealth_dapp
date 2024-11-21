import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";

// Import contract
import PatientDataContract from "../contracts/contracts/PatientDataContract.json";

const PatientDataContext = createContext(null);

export const PatientDataProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});

  const STARTON_BASE_URL = process.env.REACT_APP_STARTON_BASE_URL;
  const STARTON_API_KEY = process.env.REACT_APP_STARTON_API_KEY;

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PatientDataContract.networks[networkId];

        if (deployedNetwork) {
          const instance = new web3.eth.Contract(
            PatientDataContract.abi,
            deployedNetwork.address
          );
          setContract(instance);
        } else {
          console.error("Contract not deployed on the detected network.");
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };
    initWeb3();
  }, []);

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      return accounts[0];
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const uploadToStarton = async (data) => {
    try {
      // AUTHENTICATING TO THE API USING YOUR API KEY
      const startonApi = axios.create({
        baseURL: `${STARTON_BASE_URL}`,
        headers: {
          "x-api-key": `${STARTON_API_KEY}`,
        },
      });

      const response = await startonApi.post("/v3/ipfs/json", {
        name: "PatientData", // name of your json file on starton.
        content: { my: data }, // json object.
      });

      console.log("Data uploaded successfully:", response.data);
      return response.data.cid; // Returns the IPFS CID
    } catch (error) {
      console.error("Error uploading data to Starton:", error);
      throw error; // Rethrow error for further handling
    }
  };

  return (
    <PatientDataContext.Provider
      value={{ connectMetaMask, account, contract, uploadToStarton }}
    >
      {children}
    </PatientDataContext.Provider>
  );
};

export const usePatientData = () => {
  const context = useContext(PatientDataContext);
  if (!context) {
    throw new Error("usePatientData must be used within a PatientDataProvider");
  }
  return context;
};
