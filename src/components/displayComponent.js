import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import Rows from "./Row";

function DisplayComponent(props) {
  return Object.keys(props.employees).length ? (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align="center">Employee Id</TableCell>
          <TableCell align="center">Employee Name</TableCell>
          <TableCell align="center">Employee Salary</TableCell>
          <TableCell align="center">Operations</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          Object.keys(props.employees).map((id) =>
            <Rows
              key={id}
              id={id}
              employee={props.employees[id]}
              employees={props.employees}
              addEmployee={props.addEmployee}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              cellEditMode={props.cellEditMode}
              setEditCellParams={props.setEditCellParams}
            />
          )
        }
      </TableBody>
    </Table >
  ) : (
    <Typography variant='h4' component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }} >
      No Data to Display
    </Typography>
  );
}

export default DisplayComponent;
