import { useState } from "react";
import { initialData } from "../constants";

const Table = () => {
  const [data, setData] = useState(initialData);


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
        //    TODO
          ))}
        </tbody>
      </table>
      <div>
        <strong>Grand Total: </strong>
        {/* todo */}
      </div>
    </div>
  );
};

export default Table;
