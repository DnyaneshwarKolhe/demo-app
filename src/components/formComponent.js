import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
function FormComponent(props) {
  function addEmployee(e) {
    let isEmployeeExist = true;
    if (Object.keys(props.employees).find((element) => element == props.employee.id)) {
      if ((!props.editEmployeeId) || (props.editEmployeeId != props.employee.id)) {
        isEmployeeExist = false;
        props.setErrorMsg({ ...props.errorMsg, id: `Employee with id ${props.employee.id} already exist` });
      }
    }
    //Validating that all fields should contains values
    if (!(props.employee.id && props.employee.name && props.employee.salary)) {
      let newErrorMsg = { id: '', name: '', salary: '' };
      if (!props.employee.id) newErrorMsg.id = "*Required";
      if (!props.employee.name) newErrorMsg.name = "*Required";
      if (!props.employee.salary) newErrorMsg.salary = "*Required";
      props.setErrorMsg(newErrorMsg);
    } else if (isEmployeeExist) {
      props.onSubmit(
        {
          id: props.employee.id,
          name: props.employee.name,
          salary: props.employee.salary
        }
      );
      props.setEditEmpId(null);
      props.setEmployee({ id: '', name: '', salary: '' });
    }
  }
  useEffect(() => {
    if (props.editEmployeeId) {
      props.setEmployee({
        id: props.employees[props.editEmployeeId].id,
        name: props.employees[props.editEmployeeId].name,
        salary: props.employees[props.editEmployeeId].salary
      });
    }
  }, [props.editEmployeeId]);
  useEffect(() => {
    if (!(props.employee.id || props.employee.name || props.employee.salary)) {
      props.setErrorMsg({ id: '', name: '', salary: '' });
      props.setEditEmpId(null);
    }
  }, [props.employee.id, props.employee.name, props.employee.salary]);
  //setting state values on input box change
  function setAttrOnChange(e) {
    switch (e.target.id) {
      case "id":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, id: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, id: '' });
        } else {
          props.setEmployee({ ...props.employee, id: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, id: '*Required' });
        }
        break;
      case "name":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, name: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, name: '' });
        } else {
          props.setEmployee({ ...props.employee, name: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, name: '*Required' });
        }
        break;
      case "salary":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, salary: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, salary: '' });
        } else {
          props.setEmployee({ ...props.employee, salary: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, salary: '*Required' });
        };
        break;
    }
  }
  //clearing form on reset
  function resetForm() {
    props.setEmployee({ id: '', name: '', salary: '' });
    props.setErrorMsg({ id: '', name: '', salary: '' });
    props.setEditEmpId(null);
  }
  return (
    <Grid container margin={0}>
      <Grid item xs={12} margin={1} display='flex' justifyContent='center'>
        <TextField
          error={props.errorMsg.id ? true : null}
          id="id"
          label="Employee ID"
          value={props.employee.id}
          helperText={props.errorMsg.id}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={12} margin={1} display='flex' justifyContent='center'>
        <TextField
          error={props.errorMsg.name ? true : null}
          id="name"
          label="Employee Name"
          value={props.employee.name}
          helperText={props.errorMsg.name}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={12} margin={1} display='flex' justifyContent='center'>
        <TextField
          error={props.errorMsg.salary ? true : null}
          id="salary"
          label="Employee Salary"
          value={props.employee.salary}
          helperText={props.errorMsg.salary}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={12} margin={1} display='flex' justifyContent='center'>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" onClick={addEmployee}>
            Submit
          </Button>
          <Button variant="outlined" color="error" onClick={resetForm}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default FormComponent;
