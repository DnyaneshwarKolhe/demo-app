import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
// import "../CSS/formComponent.css";
function FormComponent(props) {
  const [empId, setEmployeeId] = useState("");
  const [empName, setEmployeeName] = useState("");
  const [empSal, setEmployeeSal] = useState("");
  const [empIdErrMsg, setEmployeeIdErrMsg] = useState("");
  const [empNameErrMsg, setEmployeeNameErrMsg] = useState("");
  const [empSalErrMsg, setEmployeeSalErrMsg] = useState("");
  function addEmployee(e) {
    let isEmployeeExist = true;
    //checking if employee already exists
    if (Object.keys(props.employees).find((element) => element == empId)) {
      if ((!props.editEmployeeId) || (props.editEmployeeId != empId)) {
        setEmployeeId("");
        isEmployeeExist = false;
        setEmployeeIdErrMsg(`Employee with id ${empId} already exist`);
      }
    }
    //Validating that all fields should contains values
    if (!(empId && empName && empSal && isEmployeeExist)) {
      if (!empId) setEmployeeIdErrMsg("*Required");
      if (!empName) setEmployeeNameErrMsg("*Required");
      if (!empSal) setEmployeeSalErrMsg("*Required");
    } else {
      props.onSubmit(
        { employee_id: empId, employee_name: empName, employee_salary: empSal },
        props.editEmployeeId
      );
      if (props.editEmployeeId) {
        props.setEditEmpId(null);
      }
      setEmployeeId("");
      setEmployeeName("");
      setEmployeeSal("");
    }
  }
  useEffect(() => {
    if (props.editEmployeeId) {
      setEmployeeId(props.employees[props.editEmployeeId].employee_id);
      setEmployeeName(props.employees[props.editEmployeeId].employee_name);
      setEmployeeSal(props.employees[props.editEmployeeId].employee_salary);
    }
  }, [props.editEmployeeId]);
  useEffect(() => {
    if (!(empId || empName || empSal)) {
      setEmployeeIdErrMsg(null);
      setEmployeeNameErrMsg(null);
      setEmployeeSalErrMsg(null);
      props.setEditEmpId(null);
    }
  }, [empId, empName, empSal]);
  //setting state values on input box change
  function setAttrOnChange(e) {
    switch (e.target.id) {
      case "employee_id":
        if (e.target.value.trim()) {
          setEmployeeId(e.target.value);
          setEmployeeIdErrMsg(null);
        } else {
          setEmployeeId(e.target.value.trim());
          setEmployeeIdErrMsg("*Required");
        }
        break;
      case "employee_name":
        if (e.target.value.trim()) {
          setEmployeeName(e.target.value)
          setEmployeeNameErrMsg(null);
        } else {
          setEmployeeName(e.target.value.trim())
          setEmployeeNameErrMsg("*Required");
        };
        break;
      case "employee_salary":
        if (e.target.value.trim()) {
          setEmployeeSal(e.target.value)
          setEmployeeSalErrMsg(null);
        } else {
          setEmployeeSal(e.target.value.trim())
          setEmployeeSalErrMsg("*Required");
        };
        break;
    }
  }
  //clearing form on reset
  function resetForm() {
    setEmployeeId("");
    setEmployeeName("");
    setEmployeeSal("");
    setEmployeeIdErrMsg(null);
    setEmployeeNameErrMsg(null);
    setEmployeeSalErrMsg(null);
    props.setEditEmpId(null);
  }
  return (
    <Grid container spacing={2} alignItems='center' justifyContent='center' margin={0}>
      <Grid item xs={10}>
        <TextField
          id="employee_id"
          label="Employee ID"
          value={empId}
          helperText={empIdErrMsg}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={10}>
        <TextField
          id="employee_name"
          label="Employee Name"
          value={empName}
          helperText={empNameErrMsg}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={10}>
        <TextField
          id="employee_salary"
          label="Employee Salary"
          value={empSal}
          helperText={empSalErrMsg}
          size='small'
          onChange={setAttrOnChange}
        />
      </Grid>
      <Grid item xs={10}>
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
