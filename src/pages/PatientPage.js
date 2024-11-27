import { PatientDataProvider } from "../contexts/PatientDataContext.js";
import ConnectWallet from "../components/MetaMask/ConnectWallet";

const PatientPage = () => {
  return (
    <>
      <PatientDataProvider>
        <ConnectWallet />
      </PatientDataProvider>
    </>
  );
};

export default PatientPage;
