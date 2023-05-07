import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  function determineBackgroundColor(percentage) {
    if (percentage >= 50) {
      return "green";
    } else if (percentage >= 30) {
      return "orange";
    } else {
      return "red";
    }
  }

  const [tableData, setTableData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios.get("https://logi.onrender.com/today").then((response) => {
      console.log(response.data);
      const filteredTableData = response?.data?.tableData.filter((row) => {
        return row.outcomePredictions.some((prediction) => {
          const [, percentage] = prediction.split(":");
          const formattedPercentage = parseFloat(percentage.trim());
          return formattedPercentage > 55;
        });
      });
      setTableData(filteredTableData);
      setIsFetching(false);
    });
  }, []);
  return (
    <>
      {isFetching ? (
        <div className=" h-screen flex items-center justify-center">
          <CircularProgress className="" color="inherit" />
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
                  <th className="border text-center p-2">
                    Outcome Predictions
                  </th>
                  <th className="border text-center p-2">Prediction Tip</th>
                  <th className="border text-center p-2">Result</th>
                </tr>
              </thead>
              <tbody className="p-5">
                {tableData?.map((row, index) => (
                  <tr key={index} className="text-center py-4 h-16 my-2">
                    <td className="border text-center px-4">{row.date}</td>
                    <td className="border text-center">{row.match}</td>
                    <td className=" h-full p-2 border flex flex-col items-center gap-2 justify-center md:flex-row md:justify-center md:items-center md:gap-1">
                      {row?.outcomePredictions?.map((prediction, index) => {
                        const [number, percentage] = prediction.split(":");
                        const formattedPercentage = percentage;

                        console.log(formattedPercentage);
                        const bgColor =
                          determineBackgroundColor(formattedPercentage);
                        return (
                          <div className=" h-full flex flex-col items-center justify-center md:flex-row md:justify-center md:items-center md:gap-1 text-center">
                            {" "}
                            <span
                              key={index}
                              className="percentage-badge p-1 h-full"
                              style={{ backgroundColor: bgColor }}
                            >
                              {number}: {formattedPercentage}
                            </span>
                          </div>
                        );
                      })}
                    </td>
                    <td className="border text-center">{row.predictionTip}</td>
                    <td className="border text-center">{row.result}</td>
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
