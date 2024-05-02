import './AttendanceSummary.css';
import { useState, useEffect } from 'react';

function ExpenseSummary() {
    const [monthSummaries, setMonthSummaries] = useState([]);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch('http://localhost:8080/attendance/summary/3')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.monthSummaries) {
                    setMonthSummaries(data.monthSummaries);
                } else {
                    console.error('Month summaries data is undefined or null.');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div className="Summary-Container">
            {monthSummaries.length > 0 ? (
                monthSummaries.map((summary, index) => (
                    <div key={index} className="Month1Summary">
                        <div className="container">
                            <div className="content">{formatDate(summary.month)}</div>
                            <div className="contentValue">USD {summary.totalAttendance?.toFixed(2)}</div>
                        </div>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default ExpenseSummary;