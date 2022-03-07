import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
function Rows(props) {
  const [open, setOpen] = useState(false);

  function getAddress(emp) {
    let address = "";
    if (emp.address1) address = `${emp.address1}`;
    if (emp.address2) address = `${address}, ${emp.address2}`;
    if (emp.city) address = `${address}, ${emp.city}`;
    if (emp.state) address = `${address}, ${emp.state}`;
    if (emp.zip) address = `${address}, ${emp.zip}`;
    return address;
  }

  function updateValue(e) {
    if (!props.cellEditMode.editValue) {
      props.setEditCellParams({ ...props.cellEditMode, errorMsg: "*Required" });
      return;
    }
    if (props.cellEditMode.editEmployeePropName === "id") {
      if (
        Object.keys(props.employees).find(
          (element) => element == props.cellEditMode.editValue
        )
      ) {
        if (props.cellEditMode.editValue != props.cellEditMode.editEmployeeId) {
          props.setEditCellParams({
            ...props.cellEditMode,
            errorMsg: `Employee with id ${props.cellEditMode.editValue} already exist`,
          });
          return;
        }
      }
    }
    if (props.cellEditMode.editEmployeePropName === "mob_no") {
      if (isNaN(props.cellEditMode.editValue)) {
        props.setEditCellParams({
          ...props.cellEditMode,
          errorMsg: "Invalid! Shouldn't contains charactor",
        });
        return;
      } else if (props.cellEditMode.editValue.trim().length !== 10) {
        props.setEditCellParams({
          ...props.cellEditMode,
          errorMsg: "Invalid! No should be 10 digit only",
        });
        return;
      }
    }
    if (props.cellEditMode.editEmployeePropName !== "address") {
      if (props.cellEditMode.editEmployeePropName !== "id") {
        props.addEmployee({
          ...props.employees,
          [props.cellEditMode.editEmployeeId]: {
            ...props.employees[props.cellEditMode.editEmployeeId],
            [props.cellEditMode.editEmployeePropName]:
              props.cellEditMode.editValue,
          },
        });
      } else if (props.cellEditMode.editEmployeeId !== props.cellEditMode.editValue) {
        let deletedEmployee = {
          ...props.employees,
          [props.cellEditMode.editValue]: {
            ...props.employees[props.cellEditMode.editEmployeeId],
            [props.cellEditMode.editEmployeePropName]:
              props.cellEditMode.editValue,
          },
        };
        delete deletedEmployee[props.cellEditMode.editEmployeeId];
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
        },
      });
    }
    props.setEditCellParams({
      editMode: false,
      editEmployeeId: null,
      editEmployeePropName: null,
      editValue: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zip: null,
    });
  }
  function onDelete(e) {
    props.onDelete(e.target.id);
  }
  function onEdit(e) {
    props.onEdit(e.target.id);
  }
  function editCell(e) {
    if (e.target.getAttribute("name") !== "address") {
      props.setEditCellParams({
        editMode: true,
        editEmployeeId: e.target.id,
        editEmployeePropName: e.target.getAttribute("name"),
        editValue: e.target.textContent,
      });
    } else {
      let newEditObj = {
        editMode: true,
        editEmployeeId: e.target.id,
        editEmployeePropName: e.target.getAttribute("name"),
        address1: props.employees[e.target.id].address1,
        address2: props.employees[e.target.id].address2,
        city: props.employees[e.target.id].city,
        state: props.employees[e.target.id].state,
        zip: props.employees[e.target.id].zip,
      };
      props.setEditCellParams(newEditObj);
    }
  }

  function changeCellValue(e) {
    if (props.cellEditMode.editEmployeePropName !== "address") {
      props.setEditCellParams({
        ...props.cellEditMode,
        editValue: e.target.value,
        errorMsg: null,
      });
    } else {
      if (e.target.getAttribute("name") == "address1")
        props.setEditCellParams({
          ...props.cellEditMode,
          address1: e.target.value,
        });
      if (e.target.getAttribute("name") == "address2")
        props.setEditCellParams({
          ...props.cellEditMode,
          address2: e.target.value,
        });
      if (e.target.getAttribute("name") == "city")
        props.setEditCellParams({
          ...props.cellEditMode,
          city: e.target.value,
        });
      if (e.target.getAttribute("name") == "state")
        props.setEditCellParams({
          ...props.cellEditMode,
          state: e.target.value,
        });
      if (e.target.getAttribute("name") == "zip")
        props.setEditCellParams({ ...props.cellEditMode, zip: e.target.value });
    }
  }

  return (
    <>
      <TableRow
        key={props.employee.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
          align="right"
          children={
            props.cellEditMode.editMode &&
              props.cellEditMode.editEmployeePropName === "id" &&
              props.employee.id === props.cellEditMode.editEmployeeId ? (
              <TextField
                error={
                  props.cellEditMode.errorMsg && props.cellEditMode.editMode
                }
                helperText={props.cellEditMode.errorMsg}
                value={props.cellEditMode.editValue}
                onChange={changeCellValue}
                onBlur={updateValue}
              />
            ) : (
              <Typography id={props.employee.id} name="id" onClick={editCell}>
                {props.employee.id}
              </Typography>
            )
          }
        />
        <TableCell
          align="right"
          children={
            props.cellEditMode.editMode &&
              props.cellEditMode.editEmployeePropName === "name" &&
              props.employee.id === props.cellEditMode.editEmployeeId ? (
              <TextField
                error={
                  props.cellEditMode.errorMsg && props.cellEditMode.editMode
                }
                helperText={props.cellEditMode.errorMsg}
                value={props.cellEditMode.editValue}
                onChange={changeCellValue}
                onBlur={updateValue}
              />
            ) : (
              <Typography id={props.employee.id} name="name" onClick={editCell}>
                {props.employee.name}
              </Typography>
            )
          }
        />
        <TableCell
          align="right"
          children={
            props.cellEditMode.editMode &&
              props.cellEditMode.editEmployeePropName === "salary" &&
              props.employee.id === props.cellEditMode.editEmployeeId ? (
              <TextField
                error={
                  props.cellEditMode.errorMsg && props.cellEditMode.editMode
                }
                helperText={props.cellEditMode.errorMsg}
                value={props.cellEditMode.editValue}
                onChange={changeCellValue}
                onBlur={updateValue}
              />
            ) : (
              <Typography
                id={props.employee.id}
                name="salary"
                onClick={editCell}
              >
                {props.employee.salary}
              </Typography>
            )
          }
        />
        <TableCell align="center">
          <Button
            id={props.employee.id}
            variant="contained"
            color="secondary"
            size="small"
            onClick={onEdit}
            color="primary"
            aria-label="add to shopping cart"
          >
            EDIT
          </Button>
          <Button
            id={props.employee.id}
            variant="contained"
            color="error"
            size="small"
            onClick={onDelete}
            color="primary"
            aria-label="add to shopping cart"
          >
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
                    <TableCell children="Address" />
                    <TableCell
                      align="right"
                      children={
                        props.cellEditMode.editMode &&
                          props.cellEditMode.editEmployeePropName === "address" &&
                          props.employee.id ===
                          props.cellEditMode.editEmployeeId ? (
                          <>
                            <TextField
                              error={
                                props.cellEditMode.errorMsg &&
                                !props.cellEditMode.address1 &&
                                props.cellEditMode.editMode
                              }
                              helperText={props.cellEditMode.errorMsg}
                              name="address1"
                              label="Address1"
                              value={props.cellEditMode.address1}
                              onChange={changeCellValue}
                              onBlur={updateValue}
                            />
                            <TextField
                              error={
                                props.cellEditMode.errorMsg &&
                                !props.cellEditMode.address2 &&
                                props.cellEditMode.editMode
                              }
                              helperText={props.cellEditMode.errorMsg}
                              name="address2"
                              label="Address2"
                              value={props.cellEditMode.address2}
                              onChange={changeCellValue}
                              onBlur={updateValue}
                            />
                            <TextField
                              error={
                                props.cellEditMode.errorMsg &&
                                !props.cellEditMode.city &&
                                props.cellEditMode.editMode
                              }
                              helperText={props.cellEditMode.errorMsg}
                              name="city"
                              label="City"
                              value={props.cellEditMode.city}
                              onChange={changeCellValue}
                              onBlur={updateValue}
                            />
                            <TextField
                              error={
                                props.cellEditMode.errorMsg &&
                                !props.cellEditMode.state &&
                                props.cellEditMode.editMode
                              }
                              helperText={props.cellEditMode.errorMsg}
                              name="state"
                              label="State"
                              value={props.cellEditMode.state}
                              onChange={changeCellValue}
                              onBlur={updateValue}
                            />
                            <TextField
                              error={
                                props.cellEditMode.errorMsg &&
                                !props.cellEditMode.zip &&
                                props.cellEditMode.editMode
                              }
                              helperText={props.cellEditMode.errorMsg}
                              name="zip"
                              label="Zipcode"
                              value={props.cellEditMode.zip}
                              onChange={changeCellValue}
                              onBlur={updateValue}
                            />
                          </>
                        ) : (
                          <Typography
                            id={props.employee.id}
                            name="address"
                            onClick={editCell}
                          >
                            {getAddress(props.employee)}
                          </Typography>
                        )
                      }
                    />
                  </TableRow>
                  <TableRow>
                    <TableCell children="Contact No" />
                    <TableCell
                      align="right"
                      children={
                        props.cellEditMode.editMode &&
                          props.cellEditMode.editEmployeePropName === "mob_no" &&
                          props.employee.id ===
                          props.cellEditMode.editEmployeeId ? (
                          <TextField
                            error={
                              props.cellEditMode.errorMsg &&
                              props.cellEditMode.editMode
                            }
                            helperText={props.cellEditMode.errorMsg}
                            value={props.cellEditMode.editValue}
                            onChange={changeCellValue}
                            onBlur={updateValue}
                          />
                        ) : (
                          <Typography
                            id={props.employee.id}
                            name="mob_no"
                            onClick={editCell}
                          >
                            {props.employee.mob_no}
                          </Typography>
                        )
                      }
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
export default Rows;
