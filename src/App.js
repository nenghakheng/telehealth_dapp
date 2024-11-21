import "./styles/App.css";
import { PatientDataProvider } from "./contexts/PatientDataContext.js";
import ConnectWallet from "./components/MetaMask/ConnectWallet.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientForm from "./components/Patient/PatientForm.js";
import Home from "./pages/Home.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PatientDataProvider>
              <Home />
            </PatientDataProvider>
          }
        />
        <Route
          path="/connect-wallet"
          element={
            <PatientDataProvider>
              <ConnectWallet />
            </PatientDataProvider>
          }
        />
        <Route
          path="/patient-form"
          element={
            <PatientDataProvider>
              <PatientForm />
            </PatientDataProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
