const initializeRow = (row) => {
  if (!row) return;
  row.originalValue = row.value; // Set originalValue for variance calculation
  row.variance = 0; // Set variance to 0 initially
  // Recursively initialize children
  if (row.children) {
    row.children = row.children.map((child) => initializeRow(child));
  }
  return row;
};
export const initializeData = (data) => {
  if (!data) return;
  return data.map((row) => {
    return initializeRow(row);
  });
};

export const getCalculatedGrandTotal = (data) => {
  if (!data) return;
  return data?.reduce((total, row) => {
    return (
      total +
      row?.value +
      row?.children.reduce((childTotal, child) => childTotal + child.value, 0)
    );
  }, 0);
};
