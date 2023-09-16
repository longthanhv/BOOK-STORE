import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectInput({ label, items, value, setValue, name, multiple }) {
  const handleChange = (event) => {
    setValue((curValue) => {
      return {
        ...curValue,
        [name]: event.target.value,
      };
    });
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        sx={{ py: 1.5 }}
        multiple={!!multiple}
      >
        {items.map((item, index) => {
          return (
            <MenuItem
              value={item.id}
              key={item.id}
              sx={index === items.length - 1 ? {} : { mb: 0.5 }}
            >
              {item.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
