import { useState } from "react";
import Row from "./Row";
import { initialData } from "../constants";
import { getCalculatedGrandTotal, initializeData } from "../utils/helpers";

const Table = () => {
  const [data, setData] = useState(initializeData(initialData));

  const calculatedGrandTotal = getCalculatedGrandTotal(data);

  const updateData = (updatedRow) => {
    setData((prevData) => {
      return prevData.map((row) => {
        if (row.id === updatedRow.id) {
          return updatedRow;
        } else {
          return row;
        }
      });
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <Row key={row.id} row={row} parent={null} updateData={updateData} />
          ))}
        </tbody>
      </table>
      <div>
        <strong>Grand Total: </strong>
        {calculatedGrandTotal}
      </div>
    </div>
  );
};

export default Table;
