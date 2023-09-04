import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  function determineBackgroundColor(percentage) {
    if (percentage >= 50) {
      return "green";
    } else if (percentage >= 30) {
      return "orange";
    } else {
      return "red";
    }
  }

  function checkMatch(predictionTip, result, matchTime) {
    // Your checkMatch function remains the same as before
  }

  useEffect(() => {
    // Fetch data from your backend API
    axios
      .get("https://logi.onrender.com/today") // Update with your backend URL
      .then((response) => {
        const tableDataFromBackend = response.data.scrapedData;
        // Process and sort data here as needed

        setTableData(tableDataFromBackend);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsFetching(false);
      });
  }, []);

  return (
    <>
      {isFetching ? (
        <div className="h-screen flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="container text-center mx-auto lg:w-4/5 min-h-screen">
          <h1 className="text-center font-bold text-3xl mb-5">Today's Tips</h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-collapse">
              <thead>
                <tr className="h-12">
                  <th className="border p-2">Date</th>
                  <th className="border text-center p-2">Match</th>
                  <th className="border text-center p-2">Prediction Tip</th>
                  <th className="border text-center p-2">Odds</th>
                  <th className="border text-center p-2">League</th>
                  <th className="border text-center p-2">Win Rate</th>
                </tr>
              </thead>
              <tbody className="p-5">
                {tableData?.map((row, index) => (
                  <tr key={index} className="text-center py-4 h-16 my-2">
                    <td className="border text-center px-4">{row.Time}</td>
                    <td className="border text-center">{row.Matches}</td>
                    {/* Render other relevant fields here */}
                    <td className="border text-center">{row.Market}</td>
                    <td className="border text-center">{row.ODDS}</td>
                    <td className="border text-center">{row.leagueName}</td>
                    <td className="border text-center">
                      {
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
                      }
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
