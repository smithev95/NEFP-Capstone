import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ClientDataForm from "./ClientDataForm";
import ClientsPage from "./Clients";
import LandingPage from "./LandingPage";
import LanguagesTable from "./LanguagesTable";
import AdminPage from "./AdminPage";
import AddQuestionPage from "./AddQuestionPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";


const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addQuestion" element={<AddQuestionPage />} />
        <Route path="/form" element={<ClientDataForm />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/languages" element={<LanguagesTable />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
