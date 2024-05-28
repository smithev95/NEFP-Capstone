import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ClientDataList = () => {
  const [data, setData] = useState([]);

  // Fetch data using axios
  useEffect(() => {
    console.log("App.js useEffect called.");
    axios.get('http://127.0.0.1:8000/clientdata/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="Handler">
      <h1>Client Data List</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>Completion Time</th>
            <th>Language</th>
            <th>Family Size</th>
            <th>SNAP Benefits</th>
            <th>Travel by Car</th>
            <th>ZIP Code</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.start_time}</td>
              <td>{item.completion_time}</td>
              <td>{item.language}</td>
              <td>{item.family_size}</td>
              <td>{item.snap_benefits}</td>
              <td>{item.travel_by_car}</td>
              <td>{item.zip_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDataList;
