import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

function SelectRadio({ label, items, row, color, myStyle, value, setValue, name }) {
  
  const handleChange = (event) => {
    setValue((curValue) => {
      return {
        ...curValue,
        [name]: event.target.value,
      };
    });
  };

  return (
    <FormControl sx={!!myStyle && myStyle}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup row={!!row} value={value} onChange={handleChange}>
        {items.map((item) => {
          return (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<Radio color={color} />}
              label={item.value}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default SelectRadio;
