import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css'

function App() {
  //Define component for axios
  const [data, setData] = useState([]); //

  //Fetch data using axios
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


  //html loop 'data.map' iterates through object and displays data
 
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
          <tr key ={item.id}>
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

 )
 
 /* return (
    <div className="Handler">
      <h1>Client Data List</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
            <p>Start Time: {item.start_time}</p>
            <p>Completion Time: {item.completion_time}</p>
            <p>Language: {item.language}</p>
            <p>Family Size: {item.family_size}</p>
            <p>SNAP Benefits: {item.snap_benefits}</p>
            <p>Travel by Car: {item.travel_by_car}</p>
            <p>ZIP Code: {item.zip_code}</p>
          </li>
        ))}
      </ul>
    </div>
  );

*/

}

export default App;

/*
#import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/