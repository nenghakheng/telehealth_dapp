import "./styles/App.css";
import { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import { Windmill } from "@windmill/react-ui";

const Layout = lazy(() => import("./components/Layout/Layout"));
const PatientPage = lazy(() => import("./pages/PatientPage"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Windmill>
              <SidebarProvider>
                <Layout />
              </SidebarProvider>
            </Windmill>
          }
        />
        {/* <Route path="/patient" element={<PatientPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
