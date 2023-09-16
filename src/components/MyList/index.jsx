// Import Component Mui
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// Import Icon
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import MyListRoot from "./MyListRoot";
import { baseURL } from "../../services/axios";
/*
  item = {
    id: v4(),
    file: File
  }
*/
function MyList({ items, handleOnClick, handleDelete, handleAdd, handleClickBtn, ...rest }) {
  return (
    <>
      <List>
        <ListItem sx={{ mb: 1 }} onClick={handleClickBtn}>
          <ListItemText
            sx={{ textAlign: "center", border: "1px solid #f0f2f5" }}
            primary={
              <IconButton>
                <AddIcon />
              </IconButton>
            }
          />
        </ListItem>
      </List>
      <MyListRoot {...rest}>
        {items.map((item) => {
          const { file, id } = item;
          const name = typeof file === "string" ? file.split("\\").slice(-1)[0] : file.name;
          const img = typeof file === "string" ? `${baseURL}/${file}` : URL.createObjectURL(file);
          return (
            <ListItem
              key={id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={name}
                onClick={() => {
                  handleOnClick({ img, name });
                }}
              />
            </ListItem>
          );
        })}
      </MyListRoot>
    </>
  );
}

export default MyList;
