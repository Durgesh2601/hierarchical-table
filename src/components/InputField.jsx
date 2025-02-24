/* eslint-disable react/prop-types */
const InputField = ({ inputValue, setInputValue }) => (
  <input
    type="number"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
  />
);

export default InputField;
