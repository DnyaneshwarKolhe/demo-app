import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function DisplayComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [cellEditMode, setEditCellParams] = useState({
    editMode: false,
    editEmployeeId: null,
    editEmployeePropName: null,
    editValue: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null
  });
  function onDelete(e) {
    props.onDelete(e.target.id);
  }
  function onEdit(e) {
    props.onEdit(e.target.id);
  }
  function editCell(e) {
    if (e.target.getAttribute('name') !== 'address') {
      setEditCellParams({
        editMode: true,
        editEmployeeId: e.target.id,
        editEmployeePropName: e.target.getAttribute('name'),
        editValue: e.target.textContent,
      })
    } else {
      let newEditObj = {
        editMode: true,
        editEmployeeId: e.target.id,
        editEmployeePropName: e.target.getAttribute('name'),
        address1: props.employees[e.target.id].address1,
        address2: props.employees[e.target.id].address2,
        city: props.employees[e.target.id].city,
        state: props.employees[e.target.id].state,
        zip: props.employees[e.target.id].zip
      }
      setEditCellParams(newEditObj);
    }
  }
  function updateValue(e) {
    if (cellEditMode.editEmployeePropName !== 'address') {
      props.addEmployee({
        ...props.employees,
        [cellEditMode.editEmployeeId]: {
          ...props.employees[cellEditMode.editEmployeeId],
          [cellEditMode.editEmployeePropName]: cellEditMode.editValue
        }
      });
    } else {
      props.addEmployee({
        ...props.employees,
        [cellEditMode.editEmployeeId]: {
          ...props.employees[cellEditMode.editEmployeeId],
          address1: cellEditMode.address1,
          address2: cellEditMode.address2,
          city: cellEditMode.city,
          state: cellEditMode.state,
          pincode: cellEditMode.address1,
        }
      });
    }
    setEditCellParams({
      editMode: false, editEmployeeId: null, editEmployeePropName: null, editValue: null, address1: null, address2: null, city: null, state: null, zip: null
    });
  }
  function changeCellValue(e) {
    console.log(cellEditMode)
    if (cellEditMode.editEmployeePropName !== 'address') {
      setEditCellParams({ ...cellEditMode, editValue: e.target.value })
    } else {
      if (e.target.getAttribute('name') == 'address1') setEditCellParams({ ...cellEditMode, address1: e.target.value });
      if (e.target.getAttribute('name') == 'address2') setEditCellParams({ ...cellEditMode, address2: e.target.value });
      if (e.target.getAttribute('name') == 'city') setEditCellParams({ ...cellEditMode, city: e.target.value });
      if (e.target.getAttribute('name') == 'state') setEditCellParams({ ...cellEditMode, state: e.target.value });
      if (e.target.getAttribute('name') == 'zip') setEditCellParams({ ...cellEditMode, zip: e.target.value });
    }
  }
  function getAddress(emp) {
    let address = '';
    if (emp.address1) address = `${emp.address1}`;
    if (emp.address2) address = `${address}, ${emp.address2}`;
    if (emp.city) address = `${address}, ${emp.city}`;
    if (emp.state) address = `${address}, ${emp.state}`;
    if (emp.zip) address = `${address}, ${emp.zip}`;
    return address;
  }
  useEffect(() => {
    console.log("UseEffect", cellEditMode, "=======>", props.employees);
  }, [cellEditMode, props.employees])
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
            <>
              <TableRow
                key={props.employees[id].id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell
                  id={props.employees[id].id}
                  name='id'
                  align="right"
                  onDoubleClick={editCell}
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
                  onDoubleClick={editCell}
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
                  onDoubleClick={editCell}
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
              <TableRow key={`${props.employees[id].id}_collapse`}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Table size="small" aria-label="purchases">
                        <TableRow>
                          <TableCell children='Address' />
                          <TableCell
                            id={props.employees[id].id}
                            name='address'
                            align="right"
                            onDoubleClick={editCell}
                            children={
                              (cellEditMode.editMode && (cellEditMode.editEmployeePropName === 'address')) ?
                                <>
                                  <TextField
                                    name="address1"
                                    label="Address1"
                                    value={cellEditMode.address1}
                                    onChange={changeCellValue}
                                    onBlur={updateValue}
                                  />
                                  <TextField
                                    name="address2"
                                    label="Address2"
                                    value={cellEditMode.address2}
                                    onChange={changeCellValue}
                                    onBlur={updateValue}
                                  />
                                  <TextField
                                    name="city"
                                    label="City"
                                    value={cellEditMode.city}
                                    onChange={changeCellValue}
                                    onBlur={updateValue}
                                  />
                                  <TextField
                                    name="state"
                                    label="State"
                                    value={cellEditMode.state}
                                    onChange={changeCellValue}
                                    onBlur={updateValue}
                                  />
                                  <TextField
                                    name="zip"
                                    label="Zipcode"
                                    value={cellEditMode.zip}
                                    onChange={changeCellValue}
                                    onBlur={updateValue}
                                  />
                                </> :
                                getAddress(props.employees[id])
                            }
                          />
                        </TableRow>
                        <TableRow>
                          <TableCell children='Contact No' />
                          <TableCell
                            id={props.employees[id].id}
                            name='mob_no'
                            align="right"
                            onDoubleClick={editCell}
                            children={
                              (cellEditMode.editMode && (cellEditMode.editEmployeePropName === 'mob_no')) ?
                                <TextField
                                  value={cellEditMode.editValue}
                                  onChange={changeCellValue}
                                  onBlur={updateValue}
                                /> :
                                props.employees[id].mob_no}
                          />
                        </TableRow>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
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
