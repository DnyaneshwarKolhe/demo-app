import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
function Rows(props) {
  const [open, setOpen] = useState(false);
  console.log(props.id, "<>", props.employee);



  function getAddress(emp) {
    let address = '';
    if (emp.address1) address = `${emp.address1}`;
    if (emp.address2) address = `${address}, ${emp.address2}`;
    if (emp.city) address = `${address}, ${emp.city}`;
    if (emp.state) address = `${address}, ${emp.state}`;
    if (emp.zip) address = `${address}, ${emp.zip}`;
    return address;
  }

  function updateValue(e) {
    if (props.cellEditMode.editEmployeePropName !== 'address') {
      if (props.cellEditMode.editEmployeePropName !== 'id') {
        props.addEmployee({
          ...props.employees,
          [props.cellEditMode.editEmployeeId]: {
            ...props.employees[props.cellEditMode.editEmployeeId],
            [props.cellEditMode.editEmployeePropName]: props.cellEditMode.editValue
          }
        });
      } else {
        let deletedEmployee = {
          ...props.employees,
          [props.cellEditMode.editValue]: {
            ...props.employees[props.cellEditMode.editEmployeeId],
            [props.cellEditMode.editEmployeePropName]: props.cellEditMode.editValue
          }
        };
        console.log("----=>", deletedEmployee);
        delete deletedEmployee[props.cellEditMode.editEmployeeId];
        console.log("====->", deletedEmployee);
        props.addEmployee(deletedEmployee);
      }
    } else {
      props.addEmployee({
        ...props.employees,
        [props.cellEditMode.editEmployeeId]: {
          ...props.employees[props.cellEditMode.editEmployeeId],
          address1: props.cellEditMode.address1,
          address2: props.cellEditMode.address2,
          city: props.cellEditMode.city,
          state: props.cellEditMode.state,
          pincode: props.cellEditMode.address1,
        }
      });
    }
    props.setEditCellParams({
      editMode: false, editEmployeeId: null, editEmployeePropName: null, editValue: null, address1: null, address2: null, city: null, state: null, zip: null
    });
  }

  function onDelete(e) {
    props.onDelete(e.target.id);
  }
  function onEdit(e) {
    props.onEdit(e.target.id);
  }
  function editCell(e) {
    if (e.target.getAttribute('name') !== 'address') {
      props.setEditCellParams({
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
      props.setEditCellParams(newEditObj);
    }
  }

  function changeCellValue(e) {
    console.log(props.cellEditMode)
    if (props.cellEditMode.editEmployeePropName !== 'address') {
      props.setEditCellParams({ ...props.cellEditMode, editValue: e.target.value })
    } else {
      if (e.target.getAttribute('name') == 'address1') props.setEditCellParams({ ...props.cellEditMode, address1: e.target.value });
      if (e.target.getAttribute('name') == 'address2') props.setEditCellParams({ ...props.cellEditMode, address2: e.target.value });
      if (e.target.getAttribute('name') == 'city') props.setEditCellParams({ ...props.cellEditMode, city: e.target.value });
      if (e.target.getAttribute('name') == 'state') props.setEditCellParams({ ...props.cellEditMode, state: e.target.value });
      if (e.target.getAttribute('name') == 'zip') props.setEditCellParams({ ...props.cellEditMode, zip: e.target.value });
    }
  }

  return <>
    <TableRow
      key={props.employee.id}
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
        id={props.employee.id}
        name='id'
        align="right"
        onDoubleClick={editCell}
        children={(props.cellEditMode.editMode && (props.cellEditMode.editEmployeePropName === 'id')) ?
          <TextField
            value={props.cellEditMode.editValue}
            onChange={changeCellValue}
            onBlur={updateValue} /> :
          props.employee.id} />
      <TableCell
        id={props.employee.id}
        name='name'
        align="right"
        onDoubleClick={editCell}
        children={(props.cellEditMode.editMode && (props.cellEditMode.editEmployeePropName === 'name')) ?
          <TextField
            value={props.cellEditMode.editValue}
            onChange={changeCellValue}
            onBlur={updateValue} /> :
          props.employee.name} />
      <TableCell
        id={props.employee.id}
        name='salary'
        align="right"
        onDoubleClick={editCell}
        children={(props.cellEditMode.editMode && (props.cellEditMode.editEmployeePropName === 'salary')) ?
          <TextField
            value={props.cellEditMode.editValue}
            onChange={changeCellValue}
            onBlur={updateValue} /> :
          props.employee.salary} />
      <TableCell align="center">
        <Button id={props.employee.id} variant="contained" color="secondary" size='small' onClick={onEdit} color="primary" aria-label="add to shopping cart">
          EDIT
        </Button>
        <Button id={props.employee.id} variant="contained" color="error" size='small' onClick={onDelete} color="primary" aria-label="add to shopping cart">
          DELETE
        </Button>
      </TableCell>
    </TableRow>
    <TableRow key={`${props.employee.id}_collapse`}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell children='Address' />
                  <TableCell
                    id={props.employee.id}
                    name='address'
                    align="right"
                    onDoubleClick={editCell}
                    children={(props.cellEditMode.editMode && (props.cellEditMode.editEmployeePropName === 'address')) ?
                      <>
                        <TextField
                          name="address1"
                          label="Address1"
                          value={props.cellEditMode.address1}
                          onChange={changeCellValue}
                          onBlur={updateValue} />
                        <TextField
                          name="address2"
                          label="Address2"
                          value={props.cellEditMode.address2}
                          onChange={changeCellValue}
                          onBlur={updateValue} />
                        <TextField
                          name="city"
                          label="City"
                          value={props.cellEditMode.city}
                          onChange={changeCellValue}
                          onBlur={updateValue} />
                        <TextField
                          name="state"
                          label="State"
                          value={props.cellEditMode.state}
                          onChange={changeCellValue}
                          onBlur={updateValue} />
                        <TextField
                          name="zip"
                          label="Zipcode"
                          value={props.cellEditMode.zip}
                          onChange={changeCellValue}
                          onBlur={updateValue} />
                      </> :
                      getAddress(props.employee)} />
                </TableRow>
                <TableRow>
                  <TableCell children='Contact No' />
                  <TableCell
                    id={props.employee.id}
                    name='mob_no'
                    align="right"
                    onDoubleClick={editCell}
                    children={(props.cellEditMode.editMode && (props.cellEditMode.editEmployeePropName === 'mob_no')) ?
                      <TextField
                        value={props.cellEditMode.editValue}
                        onChange={changeCellValue}
                        onBlur={updateValue} /> :
                      props.employee.mob_no} />
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>;
}
export default Rows;