import * as React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableHead } from "@mui/material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const DataTable = ({ rows, headers, editAction, deleteAction }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#00ace6",
      color: theme.palette.common.white,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            {headers.map((header) => {
              if (header.field === "id") {
                return (
                  <StyledTableCell width="10%" align="center">
                    {header.label}
                  </StyledTableCell>
                );
              } else {
                return (
                  <StyledTableCell align="center">
                    {header.label}
                  </StyledTableCell>
                );
              }
            })}
            <StyledTableCell width="10%" align="center">
              Editar
            </StyledTableCell>
            <StyledTableCell width="10%" align="center">
              Eliminar
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow id={`item${row.id}`}>
              {headers.map((header) => {
                if (header.field === "id") {
                  return (
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                  );
                } else if (header.subfield) {
                  return (
                    <TableCell component="th" scope="row" align="center">
                      {row[header.field][header.subfield]}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell component="th" scope="row" align="center">
                      {row[header.field]}
                    </TableCell>
                  );
                }
              })}
              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{ paddingLeft: 8 }}
              >
                <IconButton
                  id={`editButton${row.id}`}
                  onClick={() => editAction(row.id)}
                >
                  <EditRounded color="warning" />
                </IconButton>
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{ paddingLeft: 8 }}
              >
                <IconButton onClick={() => deleteAction(row.id)}>
                  <DeleteRounded color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {rows.length <= 0 ? (
            <TableRow style={{ height: 50 }}>
              <TableCell colSpan={headers.length + 2} align="center">
                No hay datos para mostrar
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx={{
                borderBottomWidth: 0,
                ".MuiTablePagination-toolbar": {
                  backgroundColor: "#88ace6",
                  width: "100%",
                },
                ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                  {
                    fontWeight: "bold",
                    marginBottom: 0,
                  },
              }}
              rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
              colSpan={headers.length + 2}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "Filas a mostrar",
                },
                native: true,
              }}
              labelRowsPerPage={<span>Filas a mostrar:</span>}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
