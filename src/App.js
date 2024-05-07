import './App.css';
import AttendanceList from './AttendanceList';
import ExpenseSummary from './AttendanceSummary'; // Assuming correct import path
import React, { useState, useEffect } from 'react';

function App() {

  const [activeSection, setActiveSection] = useState('Home'); // Initial active section

  const [isHomeButtonClicked, setIsHomeButtonClicked] = useState(false); // Home button state
  const [isAssetButtonClicked, setIsAssetButtonClicked] = useState(false); // Asset button state

  const handleHomeClick = () => {
    setActiveSection('Home');
    setIsHomeButtonClicked(true); // Set Home button as clicked
    setIsAssetButtonClicked(false); // Reset Asset button state
  };

  const handleAssetClick = () => {
    setActiveSection('Spend');
    getAttendanceList();
    setIsAssetButtonClicked(true); // Set Asset button as clicked
    setIsHomeButtonClicked(false); // Reset Home button state
  };


  const [list, setAttendanceList] = useState([]);

  useEffect(() => {
        getAttendanceList();
  }, []);

const getAttendanceList = () =>{
     fetch('http://localhost:8080/attendance')
    .then((res) => {
        return res.json();
    })
    .then((response) => {
         console.log(response);
         setAttendanceList(response.content);
       })
    }


  return (
    <div className="App">
      <header className="App-header">
        <div className="App-heading">
          <p className="heading">A10dance</p>
        </div>

        <div className="DynamicContainer">
          {activeSection === 'Home' && <ExpenseSummary />}
          {activeSection === 'Spend' && (
            <>
              <button className="newAsset">
                <div className="ButtonName">Log In</div>
                <div className="ButtonName">Log Out</div>
              </button>
              {
              list.map((item,index) => (
              <AttendanceList key         =   {index}
                              login       =   {item.logIn} 
                              logout      =   {item.logOut} 
                              workingTime =   {item.workingTime}
                              i           =   {index}
              />
              ))}
            </>
          )}

        </div>

        <div className="StaticContainer">
          <button
            style={{ backgroundColor: isHomeButtonClicked ? '#45474B' : '#000' }}
            className="HomeButton"
            onClick={handleHomeClick}
          >
            <div className="contents">Home</div>
          </button>

          <button
            style={{ backgroundColor: isAssetButtonClicked ? '#45474B' : '#000' }}
            className="AssetsButton"
            onClick={handleAssetClick}
          >
            <div className="contents">Hours</div>
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
