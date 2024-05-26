import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientDataTable from './ClientDataTable';
import './App.css'

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<ClientDataTable />} />
              {/* Add other routes here */}
          </Routes>
      </Router>
  );
};
 


export default App;

