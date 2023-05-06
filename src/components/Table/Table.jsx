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

  useEffect(() => {
    axios.get("http://localhost:8080/today").then((response) => {
      console.log(response.data);
      setTableData(response?.data?.tableData);
    });
  }, []);
  return (
    <div className="container text-center mx-auto lg:w-4/5">
      <h1 className="text-center font-bold text-3xl mb-5">Today's Tips</h1>
      <table className="w-full table-auto border border-collapse">
        <thead>
          <tr className="h-12">
            <th className="border">Date</th>
            <th className="border text-center">Match</th>
            <th className="border text-center">Outcome Predictions</th>
            <th className="border text-center">Prediction Tip</th>
            <th className="border text-center">Result</th>
          </tr>
        </thead>
        <tbody className="p-5">
          {tableData?.map((row, index) => (
            <tr key={index} className="text-center py-4 h-12 my-2">
              <td className="border text-center px-4">{row.date}</td>
              <td className="border text-center">{row.match}</td>
              <td className="border flex flex-col items-center justify-center md:flex-row md:justify-center md:items-center md:gap-1">
                {row?.outcomePredictions?.map((prediction, index) => {
                  const [number, percentage] = prediction.split(":");
                  const formattedPercentage = percentage;

                  console.log(formattedPercentage);
                  const bgColor = determineBackgroundColor(formattedPercentage);
                  return (
                    <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:items-center md:gap-1 text-center">
                      {" "}
                      <span
                        key={index}
                        className="percentage-badge p-1"
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
  );
};

export default Table;
