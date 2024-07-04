import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMenu from './components/Navbar';
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

  // `map` over the first object in the array and get an array of keys and add them to TH elements
  function getHeaders(data) {
    if (data.length !== 0) {
      return Object.keys(data[0]).map(key => {return <th key={key}>{key}</th>;});
    }
  }

  // `map` over the data to return row data, passing in each mapped object to `getCells`
  function getRows(data) {
    if (data.length !== 0) {
      return data.map(obj => {return <tr key={`${obj.client_id}`}>{getCells(obj)}</tr>;});
    }
  }

  function getCells(obj) {
    return Object.values(obj).map((value, idx) => {return <td key={`${obj.client_id}-${idx}-${value}`}>{value}</td>;});
  }

  return (
    <>
    <NavbarMenu />
    <div className="Handler">
      <h1>Client Data List</h1>
      <table>
        <thead>
          <tr>
            {getHeaders(data)}
          </tr>
        </thead>
        <tbody>
          {getRows(data)}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ClientDataList;
