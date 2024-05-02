import "./AttendanceList.css"; // Assuming correct import path for styles

function ExpenseList({  dateOfAttendance = "", InTime = 0, OutTime = 0, hours=0, i=0}) {
    
    function formatYearsMonths(dateOfExpense) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        const date = new Date(dateOfExpense);
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
    
        let result = `${monthName} ${day}, ${year}`;
    
        return result;
    }

  return (
    <div className="assetListContainer" >
      <div className={i % 2 === 0 ? "evenRow" : "oddRow"}>
        <div className="assetTitle">{formatYearsMonths(dateOfAttendance)}</div>
        <div className="assetDetails">
            <div className="details1"><span style={{ fontSize: '3vh' }}>In:</span> {InTime}</div>
            <div className="details2"><span style={{ fontSize: '3vh' }}>Out:</span> {OutTime}</div>
            <div className="details2">{hours}</div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
