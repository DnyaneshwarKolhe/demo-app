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
      let newErrorMsg = { id: '', name: '', salary: '', address1: '', address2: '', city: '', state: '', zip: '', mob_no: '' };
      if (!props.employee.id) newErrorMsg.id = "*Required";
      if (!props.employee.name) newErrorMsg.name = "*Required";
      if (!props.employee.salary) newErrorMsg.salary = "*Required";
      if (!props.employee.address1) newErrorMsg.address1 = "*Required";
      if (!props.employee.address2) newErrorMsg.address2 = "*Required";
      if (!props.employee.city) newErrorMsg.city = "*Required";
      if (!props.employee.state) newErrorMsg.state = "*Required";
      if (!props.employee.zip) newErrorMsg.zip = "*Required";
      if (!props.employee.mob_no) newErrorMsg.mob_no = "*Required";
      props.setErrorMsg(newErrorMsg);
    } else { //if (isEmployeeExist) 
      props.onSubmit(
        {
          id: props.employee.id,
          name: props.employee.name,
          salary: props.employee.salary,
          address1: props.employee.address1,
          address2: props.employee.address2,
          city: props.employee.city,
          state: props.employee.state,
          zip: props.employee.zip,
          mob_no: props.employee.mob_no
        }
      );
      props.setEditEmpId(null);
      props.setEmployee({ id: '', name: '', salary: '', address1: '', address2: '', city: '', state: '', zip: '', mob_no: '' });
    }
  }
  useEffect(() => {
    if (props.editEmployeeId) {
      props.setEmployee({
        id: props.employees[props.editEmployeeId].id,
        name: props.employees[props.editEmployeeId].name,
        salary: props.employees[props.editEmployeeId].salary,
        address1: props.employees[props.editEmployeeId].address1,
        address2: props.employees[props.editEmployeeId].address2,
        city: props.employees[props.editEmployeeId].city,
        state: props.employees[props.editEmployeeId].state,
        zip: props.employees[props.editEmployeeId].zip,
        mob_no: props.employees[props.editEmployeeId].mob_no
      });
    }
  }, [props.editEmployeeId]);
  useEffect(() => {
    if (!(props.employee.id || props.employee.name || props.employee.salary || props.employee.address1 || props.employee.address2 || props.employee.city || props.employee.state || props.employee.zip || props.employee.mob_no)) {
      props.setErrorMsg({ id: '', name: '', salary: '', address1: '', address2: '', city: '', state: '', zip: '', mob_no: '' });
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
      case "address1":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, address1: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, address1: '' });
        } else {
          props.setEmployee({ ...props.employee, address1: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, address1: '*Required' });
        };
        break;
      case "address2":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, address2: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, address2: '' });
        } else {
          props.setEmployee({ ...props.employee, address2: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, address2: '*Required' });
        };
        break;
      case "city":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, city: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, city: '' });
        } else {
          props.setEmployee({ ...props.employee, city: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, city: '*Required' });
        };
        break;
      case "state":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, state: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, state: '' });
        } else {
          props.setEmployee({ ...props.employee, state: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, state: '*Required' });
        };
        break;
      case "zip":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, zip: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, zip: '' });
        } else {
          props.setEmployee({ ...props.employee, zip: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, zip: '*Required' });
        };
        break;
      case "mob_no":
        if (e.target.value.trim()) {
          props.setEmployee({ ...props.employee, mob_no: e.target.value });
          props.setErrorMsg({ ...props.errorMsg, mob_no: '' });
        } else {
          props.setEmployee({ ...props.employee, mob_no: e.target.value.trim() });
          props.setErrorMsg({ ...props.errorMsg, mob_no: '*Required' });
        };
        break;
    }
  }
  //clearing form on reset
  function resetForm() {
    props.setEmployee({ id: '', name: '', salary: '', address1: '', address2: '', city: '', state: '', zip: '', mob_no: '' });
    props.setErrorMsg({ id: '', name: '', salary: '', address1: '', address2: '', city: '', state: '', zip: '', mob_no: '' });
    props.setEditEmpId(null);
  }
  return (
    <Grid container margin={0}>
      <Grid item xs={12} margin={1} display='flex' justifyContent='space-between'>
        <TextField
          error={props.errorMsg.id ? true : null}
          id="id"
          label="Employee ID"
          value={props.employee.id}
          helperText={props.errorMsg.id}
          size='small'
          onChange={setAttrOnChange}
        />
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
      <Grid item xs={12} margin={1} display='flex' justifyContent='space-between'>
        <TextField
          error={props.errorMsg.address1 ? true : null}
          id="address1"
          label="Address Line1"
          value={props.employee.address1}
          helperText={props.errorMsg.address1}
          size='small'
          onChange={setAttrOnChange}
        />
        <TextField
          error={props.errorMsg.address2 ? true : null}
          id="address2"
          label="Address Line2"
          value={props.employee.address2}
          helperText={props.errorMsg.address2}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={12} margin={1} display='flex' justifyContent='space-evenly'>
        <TextField
          error={props.errorMsg.city ? true : null}
          id="city"
          label="City"
          value={props.employee.city}
          helperText={props.errorMsg.city}
          size='small'
          onChange={setAttrOnChange}
        />
        <TextField
          error={props.errorMsg.state ? true : null}
          id="state"
          label="State"
          value={props.employee.state}
          helperText={props.errorMsg.state}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={12} margin={1} display='flex' justifyContent='center'>
        <TextField
          error={props.errorMsg.zip ? true : null}
          id="zip"
          label="zipcode"
          value={props.employee.zip}
          helperText={props.errorMsg.zip}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={12} margin={1} display='flex' justifyContent='center'>
        <TextField
          error={props.errorMsg.mob_no ? true : null}
          id="mob_no"
          label="Contact No"
          value={props.employee.mob_no}
          helperText={props.errorMsg.mob_no}
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
