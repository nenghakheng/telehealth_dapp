import "./styles/App.css";
import { PatientDataProvider } from "./contexts/PatientDataContext.js";
import ConnectWallet from "./components/MetaMask/ConnectWallet.js";

function App() {
  return (
    <PatientDataProvider>
      <ConnectWallet />
    </PatientDataProvider>
  );
}

export default App;
