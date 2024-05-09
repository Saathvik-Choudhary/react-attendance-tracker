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
    a();
  };

  const handleAssetClick = () => {
    setActiveSection('Spend');
    getAttendanceList();
    setIsAssetButtonClicked(true); // Set Asset button as clicked
    setIsHomeButtonClicked(false); // Reset Home button state
  };


  const [list, setAttendanceList] = useState([]);

  // useEffect(() => {
  //   a();
  // });

  const a=() => {
        getAttendanceList();
        const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:8080/attendance/checkLogin');
              const data = await response.json();
              setIsButtonDisabled(!data.status); // Assuming API response contains a field 'isLoggedIn'
              console.log(!data.status)
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();

      const fetchData1 = async () => {
        try {
            const response = await fetch('http://localhost:8080/attendance/checkLogOut');
            const data = await response.json();
            setIsButtonDisabled1(!data.status); // Assuming API response contains a field 'isLoggedIn'
            console.log(data.status)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData1();
  };

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

    const handleLogin = () => {
      const currentDate = new Date();

      try {
          fetch('http://localhost:8080/attendance/logIn', {
            method: 'PUT', // or 'GET', 'PUT', etc. depending on your API
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            // Optionally, include a request body if your endpoint expects one
            body: JSON.stringify({
                "zoneOffset": "+00:30"
            }),
        });
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error logging in:', error.message);
    }
      
      // Create a DateTimeFormat object with the desired options
      const timeZoneOffset = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(currentDate)
        .find(part => part.type === 'timeZoneName').value;
      
      console.log('Timezone offset:', timeZoneOffset);
    }

    const handleLogout = () => {
      const currentDate = new Date();

      try {
          fetch('http://localhost:8080/attendance/logOut', {
            method: 'PUT', // or 'GET', 'PUT', etc. depending on your API
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            // Optionally, include a request body if your endpoint expects one
            body: JSON.stringify({
            }),
        });
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error logging in:', error.message);
    }
      
      // Create a DateTimeFormat object with the desired options
      const timeZoneOffset = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(currentDate)
        .find(part => part.type === 'timeZoneName').value;
      
      console.log('Timezone offset:', timeZoneOffset);
    }

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isButtonDisabled1, setIsButtonDisabled1] = useState(false);

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
              <div className="newAsset">
                <button className="ButtonName" onClick={handleLogin} disabled={isButtonDisabled}>
                    Log In
                </button>
                <button className="ButtonName" onClick={handleLogout} disabled={isButtonDisabled1}>Log Out</button>
              </div>
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
