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
            <th>Created Timestamp</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.created_timestamp}</td>
              <td>{item.question_value}</td>
              <td>{item.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDataList;
