import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ClientDataForm from "./ClientDataForm";
import ClientDataTable from "./ClientDataTable";
import AddQuestionPage from "./AddQuestionPage";
import LandingPage from "./LandingPage";
import AdminPage from "./AdminPage";
import "bootstrap/dist/css/bootstrap.css";
import SelectQuestionPage from "./SelectQuestionPage";
import EditQuestionPage from "./EditQuestionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/form" element={<ClientDataForm />} />
        <Route path="/table" element={<ClientDataTable />} />
        <Route path="/addQuestion" element={<AddQuestionPage />} />
        <Route path="/selectQuestion" element={<SelectQuestionPage />} />
        <Route path="/editQuestion" element={<EditQuestionPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
