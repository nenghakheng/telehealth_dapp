import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import Web3 from "web3";
import PatientDataContract from "../contracts/contracts/PatientDataContract.json";

const PatientDataContext = createContext(null);

export const PatientDataProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});

  useEffect(() => {
    const init = async () => {
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
    init();
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

  return (
    <PatientDataContext.Provider value={{ connectMetaMask, account, contract }}>
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
