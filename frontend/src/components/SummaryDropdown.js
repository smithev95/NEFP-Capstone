import React, { useState } from 'react';

const SummaryDropdown = ({summaryData}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };




return (
  <div>
    <button onClick={toggleDropdown}>
      {isOpen ? 'Hide Summary' : 'Show Summary'}
    </button>
    {isOpen && (
      <div className="dropdown-content">
        {summaryData.map((item, index) =>(
          <div key={index}>
            <p>{item}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default SummaryDropdown;