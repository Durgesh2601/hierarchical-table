/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import InputField from "./InputField";
import Button from "./Button";

const Row = ({ row, parent, updateData, isChild = false }) => {
  const [inputValue, setInputValue] = useState("");
  const [variance, setVariance] = useState(row.variance);

  // Update variance when value changes
  useEffect(() => {
    const newVariance =
      ((row.value - row.originalValue) / row.originalValue) * 100;
    setVariance(newVariance);
  }, [row.value, row.originalValue]);

  // Function to update row's value based on percentage or fixed value
  const updateRowValue = (newValue, isPercentage) => {
    let updatedRow = { ...row };

    if (isPercentage) {
      updatedRow.value = row.value + (row.value * newValue) / 100;
    } else {
      updatedRow.value = newValue;
    }
    updatedRow.variance =
      ((updatedRow.value - updatedRow.originalValue) /
        updatedRow.originalValue) *
      100;
    updatedRow = recalculateParent(updatedRow); // Recalculate parent value and variance

    // Update the row and recursively update children
    updateData(updatedRow);
    setInputValue("");
  };

  // Recalculate parent row when a child row's value changes
  const recalculateParent = (updatedRow) => {
    if (parent) {
      const updatedParent = { ...parent };
      const updatedChildren = updatedParent.children.map((child) => {
        if (child.id === updatedRow.id) {
          return updatedRow;
        } else {
          return child;
        }
      });
      // Calculate the sum of children's values
      const totalChildValue = updatedChildren.reduce(
        (total, child) => total + child.value,
        0
      );

      updatedParent.value = totalChildValue;
      updatedParent.children = updatedChildren;
      // Recalculate parent's variance
      updatedParent.variance =
        ((updatedParent.value - updatedParent.originalValue) /
          updatedParent.originalValue) *
        100;

      // Update the parent row with the new value and variance
      updateData(updatedParent);
    }

    return updatedRow;
  };

  return (
    <>
      <tr>
        <td>
          {isChild && "-- "}
          {row.label}
        </td>
        <td>{row.value}</td>
        <td>
          <InputField inputValue={inputValue} setInputValue={setInputValue} />
        </td>
        <td>
          <Button
            label="Allocation %"
            onClick={() => updateRowValue(Number(inputValue), true)}
          />
        </td>
        <td>
          <Button
            label="Allocation Val"
            onClick={() => updateRowValue(Number(inputValue), false)}
          />
        </td>
        <td>{variance.toFixed(2)}%</td>
      </tr>

      {row.children &&
        row.children.map((child) => (
          <Row
            key={child.id}
            row={child}
            parent={row} // Passing the current row as the parent to the child
            updateData={updateData}
            isChild={true}
          />
        ))}
    </>
  );
};

export default Row;
