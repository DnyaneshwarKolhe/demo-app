import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function DisplayComponent(props) {
  const [cellEditMode, setEditCellParams] = useState({
    editMode: false,
    editEmployeeId: null,
    editEmployeePropName: null,
    editValue: null
  });
  function onDelete(e) {
    props.onDelete(e.target.id);
  }
  function onEdit(e) {
    props.onEdit(e.target.id);
  }
  function editCell(e) {
    setEditCellParams({
      editMode: true,
      editEmployeeId: e.target.id,
      editEmployeePropName: e.target.getAttribute('name'),
      editValue: e.target.textContent
    })
  }
  function updateValue(e) {
    setEditCellParams({ ...cellEditMode, editMode: false })
    props.addEmployee({
      ...props.employees,
      [cellEditMode.editEmployeeId]: {
        ...props.employees[cellEditMode.editEmployeeId],
        [cellEditMode.editEmployeePropName]: cellEditMode.editValue
      }
    });
  }
  function changeCellValue(e) {
    console.log(cellEditMode)
    setEditCellParams({ ...cellEditMode, editValue: e.target.value })
  }
  useEffect(() => {
    console.log("UseEffect", cellEditMode);
  }, [cellEditMode])
  return Object.keys(props.employees).length ? (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Employee Id</TableCell>
          <TableCell align="center">Employee Name</TableCell>
          <TableCell align="center">Employee Salary</TableCell>
          <TableCell align="center">Operations</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          Object.keys(props.employees).map((id) =>
            <TableRow
              key={props.employees[id].id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                id={props.employees[id].id}
                name='id'
                align="right"
                onClick={editCell}
                children={
                  (cellEditMode.editMode && (cellEditMode.editEmployeePropName === 'id')) ?
                    <TextField
                      value={cellEditMode.editValue}
                      onChange={changeCellValue}
                      onBlur={updateValue}
                    /> :
                    props.employees[id].id
                }
              />
              <TableCell
                id={props.employees[id].id}
                name='name'
                align="right"
                onClick={editCell}
                children={
                  (cellEditMode.editMode && (cellEditMode.editEmployeePropName === 'name')) ?
                    <TextField
                      value={cellEditMode.editValue}
                      onChange={changeCellValue}
                      onBlur={updateValue}
                    /> :
                    props.employees[id].name
                }
              />
              <TableCell
                id={props.employees[id].id}
                name='salary'
                align="right"
                onClick={editCell}
                children={
                  (cellEditMode.editMode && (cellEditMode.editEmployeePropName === 'salary')) ?
                    <TextField
                      value={cellEditMode.editValue}
                      onChange={changeCellValue}
                      onBlur={updateValue}
                    /> :
                    props.employees[id].salary
                }
              />
              <TableCell align="center">
                <Button id={props.employees[id].id} variant="contained" color="secondary" size='small' onClick={onEdit} color="primary" aria-label="add to shopping cart">
                  EDIT
                </Button>
                <Button id={props.employees[id].id} variant="contained" color="error" size='small' onClick={onDelete} color="primary" aria-label="add to shopping cart">
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
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
