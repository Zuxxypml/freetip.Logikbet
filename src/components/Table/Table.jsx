import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedDate, setSelectedDate] = useState("today"); // Added state for selected date

  function determineBackgroundColor(percentage) {
    if (percentage >= 50) {
      return "green";
    } else if (percentage >= 30) {
      return "orange";
    } else {
      return "red";
    }
  }

  useEffect(() => {
    // Fetch data based on the selected date
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(
          `https://lavender-kingfisher-shoe.cyclic.app/${selectedDate}`
        );
        const tableDataFromBackend = response.data.scrapedData;
        setTableData(tableDataFromBackend);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsFetching(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      {isFetching ? (
        <div className="h-screen flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="container text-center mx-auto lg:w-4/5 min-h-screen">
          <h1 className="text-center font-bold text-3xl mb-5">
            {selectedDate === "today" ? "Today's Tips" : "Yesterday's Tips"}
          </h1>
          <div className="mb-3">
            <button
              className={`mr-2 ${
                selectedDate === "today"
                  ? "bg-blue-500 px-2 py-3 rounded-lg"
                  : "bg-gray-300 px-1 py-1 rounded"
              }`}
              onClick={() => handleDateChange("today")}
            >
              Today
            </button>
            <button
              className={`${
                selectedDate === "yesterday"
                  ? "bg-blue-500 px-2 py-3 rounded-lg"
                  : "bg-gray-300 px-1 py-1 rounded"
              }`}
              onClick={() => handleDateChange("yesterday")}
            >
              Yesterday
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-collapse">
              <thead>
                <tr className="h-12">
                  <th className="border text-center py-3 px-4">Date</th>
                  <th className="border text-center py-3 px-4">Match</th>
                  <th className="border text-center py-3 px-4">
                    Prediction Tip
                  </th>
                  <th className="border text-center py-3 px-4">Odds</th>
                  <th className="border text-center py-3 px-4">League</th>
                  <th className="border text-center py-3 px-4">Win Rate</th>
                </tr>
              </thead>
              <tbody className="p-5">
                {tableData?.map((row, index) => (
                  <tr key={index} className="text-center py-4 h-16 my-2">
                    <td className="border text-center px-4 py-3">{row.Time}</td>
                    <td className="border text-center px-4 py-3">
                      {row.Matches}
                    </td>
                    {/* Render other relevant fields here */}
                    <td className="border text-center px-4 py-3">
                      {row.Market}
                    </td>
                    <td className="border text-center px-4 py-3">{row.ODDS}</td>
                    <td className="border text-center px-4 py-3">
                      {row.leagueName}
                    </td>
                    <td className="border text-center px-4 py-3">
                      <span
                        className="percentage-badge p-1 h-full"
                        style={{
                          backgroundColor: determineBackgroundColor(
                            row["PRO. %"]
                          ),
                        }}
                      >
                        {row["PRO. %"]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
