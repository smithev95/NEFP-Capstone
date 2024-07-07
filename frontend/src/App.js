import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ClientDataForm from "./ClientDataForm";
import ClientDataTable from "./ClientDataTable";
import LandingPage from "./LandingPage";
import SelectLanguage from "./SelectLanguage";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/selectlanguage" element={<SelectLanguage />} />
        <Route path="/questionaire" element={<ClientDataForm />} />
        <Route path="/table" element={<ClientDataTable />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
