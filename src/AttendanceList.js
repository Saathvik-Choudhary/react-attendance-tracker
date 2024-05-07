import "./AttendanceList.css"; // Assuming correct import path for styles

function AttendanceList({  login = "", logout = "", workingTime = 0, i=0}) {
    
  function formatDate(inputDate) {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);

    return formattedDate;
  }

  function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString('en-US', options);
  }

  function millisecondsToHours(milliseconds) {
    var hours = milliseconds / (1000 * 60 * 60);
    return Math.floor(hours);
  }

  return (
    <div className="assetListContainer" >
      <div className={i % 2 === 0 ? "evenRow" : "oddRow"}>
        <div className="assetTitle">{formatDate(login)}</div>
        <div className="assetDetails">
            <div className="details1"><span style={{ fontSize: '3vh' }}>In:</span> {formatTime(login)}</div>
            <div className="details2"><span style={{ fontSize: '3vh' }}>Out:</span> {formatTime(logout)}</div>
            <div className="details3">{millisecondsToHours(workingTime)}h</div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceList;
