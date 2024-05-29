import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ClientDataForm from "./ClientDataForm";
import ClientDataTable from "./ClientDataTable";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<ClientDataForm />} />
        <Route path="/table" element={<ClientDataTable />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
