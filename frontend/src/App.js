import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ClientDataForm from "./ClientDataForm";
import ClientDataTable from "./ClientDataTable";
import AddQuestionPage from "./AddQuestionPage";
import LandingPage from "./LandingPage";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<ClientDataForm />} />
        <Route path="/table" element={<ClientDataTable />} />
        <Route path="/addQuestion" element={<AddQuestionPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
