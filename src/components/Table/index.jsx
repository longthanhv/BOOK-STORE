import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// @mui components
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Toolbar,
  InputAdornment,
  TextField,
  Button,
  Grid,
} from "@mui/material";

// icon
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

import MKInput from "../MKInput";
import MKButton from "../MKButton";
import MKTypography from "../MKTypography";

export default function MyTable(props) {
  const { title, tableHead, tableData, toolFilter, toggleModals, setLimit, count, onlyView } =
    props;
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [emptyRows, setEmptyRows] = useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setEmptyRows(() => {
      return tableData.length < rowsPerPage ? rowsPerPage - tableData.length : 0;
    });
  }, [tableData, rowsPerPage]);

  useEffect(() => {
    setLimit(() => {
      return {
        page: page + 1,
        size: rowsPerPage,
      };
    });
  }, [page, rowsPerPage]);

  return (
    <div>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid xs={10} item container alignItems="center" spacing={1} sx={{ width: "auto" }}>
            {title ? <MKTypography variant="h3">{title}</MKTypography> : null} {toolFilter}
          </Grid>
          {toggleModals.add && (
            <Grid xs={2} item sx={{ display: "block", textAlign: "right" }}>
              <MKButton color="success" onClick={() => toggleModals.add()}>
                <AddIcon />
                &nbsp; Thêm mới
              </MKButton>
            </Grid>
          )}
        </Grid>
      </Toolbar>
      <Table
        sx={{
          "& .MuiTableCell-root": { verticalAlign: "middle" },
          "& .MuiTableRow-root": { verticalAlign: "middle", display: "table-row" },
        }}
      >
        {tableHead ? (
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return <TableCell key={key}>{prop}</TableCell>;
              })}
              {!onlyView && <TableCell>Hoạt động</TableCell>}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            console.log(prop);
            return (
              <TableRow key={key}>
                {prop.map((prop_1, key_1) => {
                  return <TableCell key={key_1}>{prop_1}</TableCell>;
                })}
                <TableCell sx={{ "& .MuiButton-root": { mr: 1 } }}>
                  {toggleModals.view && (
                    <MKButton color="info" size="small" onClick={() => toggleModals.view(prop[0])}>
                      <VisibilityIcon />
                    </MKButton>
                  )}
                  {toggleModals.edit && (
                    <MKButton
                      color="warning"
                      size="small"
                      onClick={() =>
                        typeof toggleModals.edit === "function"
                          ? toggleModals.edit(prop[0])
                          : toggleModals.edit.fn(prop[0])
                      }
                      disabled={
                        typeof toggleModals.edit === "function"
                          ? false
                          : toggleModals.edit.disabled(prop)
                      }
                    >
                      <EditOutlinedIcon />
                    </MKButton>
                  )}
                  {toggleModals.delete && (
                    <MKButton
                      color="error"
                      size="small"
                      onClick={() =>
                        typeof toggleModals.delete === "function"
                          ? toggleModals.delete(prop[0])
                          : toggleModals.delete.fn(prop[0])
                      }
                      disabled={
                        typeof toggleModals.delete === "function"
                          ? false
                          : toggleModals.delete.disabled(prop)
                      }
                    >
                      <DeleteForeverOutlinedIcon />
                    </MKButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={tableHead.length + 1} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={count}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </div>
  );
}
