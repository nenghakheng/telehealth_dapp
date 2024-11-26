import React, { createContext, useContext, useState, useEffect } from "react";
import { initWeb3 } from "../utils/Web3Utils";
import { createStartonApi } from "../utils/apiUtils";
import PatientDataContract from "../contracts/contracts/PatientDataContract.json";

const PatientDataContext = createContext(null);

export const PatientDataProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  const STARTON_BASE_URL = process.env.REACT_APP_STARTON_BASE_URL;
  const STARTON_API_KEY = process.env.REACT_APP_STARTON_API_KEY;

  // Initialize Web3 and Contract
  useEffect(() => {
    const initialize = async () => {
      try {
        const { contract } = await initWeb3(PatientDataContract);
        setContract(contract);
      } catch (error) {
        console.error("Error initializing Web3 or contract:", error.message);
      }
    };

    initialize();
  }, []);

  // Fetch Account
  useEffect(() => {
    const fetchAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          setAccount(accounts[0] || "");
        } catch (error) {
          console.error("Error fetching account:", error.message);
        }
      } else {
        console.warn("MetaMask is not installed.");
      }
    };

    fetchAccount();
  }, []);

  // Listen for Account Changes
  useEffect(() => {
    const handleAccountChange = (accounts) => setAccount(accounts[0] || "");

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    };
  }, []);

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed.");
      return null;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0] || "");
      return accounts[0];
    } catch (error) {
      console.error("Error connecting to MetaMask:", error.message);
      return null;
    }
  };

  const uploadToStarton = async (data) => {
    try {
      const startonApi = createStartonApi(STARTON_BASE_URL, STARTON_API_KEY);

      const response = await startonApi.post("/v3/ipfs/json", {
        name: "PatientData",
        content: { data },
      });

      console.log("Data uploaded successfully:", response.data);
      return response.data.cid;
    } catch (error) {
      console.error("Error uploading data to Starton:", error.message);
      throw error;
    }
  };

  const generateDIDFromAddress = (address) => `did:ethr:${address}`;

  const storeCIDOnBlockchain = async (did, cid) => {
    if (!contract || !account) {
      console.error("Contract or account not initialized.");
      return;
    }

    try {
      const result = await contract.methods
        .registerPatient(did, cid)
        .send({ from: account });

      console.log("Transaction successful:", result);
    } catch (error) {
      console.error("Error storing CID on blockchain:", error.message);
    }
  };

  return (
    <PatientDataContext.Provider
      value={{
        account,
        contract,
        connectMetaMask,
        uploadToStarton,
        storeCIDOnBlockchain,
        generateDIDFromAddress,
      }}
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
