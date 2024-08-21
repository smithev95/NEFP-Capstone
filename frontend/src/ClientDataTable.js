import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMenu from './components/Navbar';
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx';
import './App.css';
import './css/Chart.css';
import SummaryDropdown from './components/SummaryDropdown';
import DoughnutChart from './components/DoughnutChart';



const ClientDataList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [clientCount, setClientCount] = useState(0);
  const [summaryData, setSummaryData] = useState([]);



  // Fetch data using axios
  useEffect(() => {
    console.log("App.js useEffect called.");
    axios.get('http://127.0.0.1:8000/clientdata/')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(()=> {
    applyFilter();
  }, [filterPeriod, data]);


  const applyFilter = () => {
    const now = new Date();
    let filtered = data;


    if (filterPeriod !== 'all'){
      filtered = data.filter(item => {
        const createdDate = new Date(item.created_timestamp);


        switch(filterPeriod){
          case 'day':
            return createdDate.toDateString() === now.toDateString();
          case 'week':
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());

            return createdDate >= startOfWeek;
          case 'month':
            const startOfMonth = new Date(now);

            return createdDate.getMonth() === startOfMonth.getMonth() && createdDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      })
    }
    setFilteredData(filtered);
    setClientCount(filtered.length);
    setSummaryData([
      `Total Clients (time-period ${filterPeriod}): ${filtered.length}`
    ]);
  };

  const excludedHeaders = ['client_fk','created_timestamp'];
  const excludedCharts = ['client_fk', 'created_timestamp'];

  
  const getHeaders = (data) => {
    if (data.length !== 0) {
      return Object.keys(data[0])
        .filter(key => !excludedHeaders.includes(key))
        .map(key => <th key={key}>{key}</th>);
    }
  };

  const getRows = (data) => {
    if (data.length !== 0) {
      return data.map((obj,index) => (
        <tr key={`${obj.client_fk}-${index}`}> 
          {getCells(obj)}
        </tr>
      ));
    }
  };

  const getCells = (obj) => {
    return Object.entries(obj)
      .filter(([key]) => !excludedHeaders.includes(key))
      .map(([key, value], idx) => (
        <td key={`${obj.client_fk}-${key}-${idx}`}>{value}</td> 
      ));
  };

  const exportToCSV = () => {
    const headers = filteredData.length > 0 ? Object.keys(data[0]).filter(key => !excludedHeaders.includes(key)) : [];
    const rows = filteredData.map(obj => headers.map(header => obj[header]));


    const csvContent = [
      headers.join(','), // Headers for CSV file
      ...rows.map(row=> row.join(',')) // CSV Rows
    ].join('\n');


    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    saveAs(blob, 'client_data.csv')
  };

  const exportToExcel = () => {
    const headers = filteredData.length > 0 ? Object.keys(data[0]).filter(key => !excludedHeaders.includes(key)) : [];
    const rows = filteredData.map(obj => {
      const row = {};
      headers.forEach(header => {
        row[header] = obj[header];
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Client Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, 'client_data.xlsx');
  };

  const collectChartData = (key) => {
    const list = {};

    filteredData.forEach(item => {
      const value = item[key];
      if (value in list) {
        list[value]++;
      } else {
        list[value] = 1;
      }
    });
    return list;
  };

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]).filter(key=> !excludedCharts.includes(key)) : [];

  return (
    <>
    <NavbarMenu />
    <div className="Handler">
      <h1>Client Data List</h1>
      <div>
        <label>Filter by: </label>
        <select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)}>
          <option value="all">All</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <button onClick={exportToCSV}>Export as .csv file</button>
        <button onClick={exportToExcel}>Export as .xlsx file (Excel)</button>
      </div> 
      <div>
      <SummaryDropdown summaryData={summaryData} />
      </div>
        <h2>Summary Doughnut Charts</h2>
        <div className="scrollable-container">
          <div className="charts-container">
            {headers.map(header => (
              <div key={header} className="chart-container">
                <h3>{header}</h3>
                <DoughnutChart key={header} title={header} chartData={collectChartData(header)} />
              </div>
            ))}
          </div>
        </div>
      <table>
        <thead>
          <tr>
            {getHeaders(filteredData)}
          </tr>
        </thead>
        <tbody>
          {getRows(filteredData)}
        </tbody>
      </table>
    </div>
    </>
  );
};


export default ClientDataList;







