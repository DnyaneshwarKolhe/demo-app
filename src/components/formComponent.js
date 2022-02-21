import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../CSS/formComponent.css";

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
    <>
      <div className="row">
        <label className="labels">Employee ID:</label>
        <div className="input-container">
          <input
            id="employee_id" className="inputBox" onChange={setAttrOnChange} value={empId} placeholder="Enter Employee ID" style={{ border: !empId && empIdErrMsg ? '2px solid red' : 'none' }}
          ></input>
          <label id="employee_id" className="warning-text">
            {empIdErrMsg}
          </label>
        </div>
      </div>
      <div className="row">
        <label className="labels">Employee Name:</label>
        <div className="input-container">
          <input id="employee_name" className="inputBox" onChange={setAttrOnChange} value={empName} placeholder="Enter Employee Name" style={{ border: !empName && empNameErrMsg ? '2px solid red' : 'none' }} />
          <label id="employee_name" className="warning-text" >
            {empNameErrMsg}
          </label>
        </div>
      </div>
      <div className="row">
        <label className="labels">Employee Salary: </label>
        <div className="input-container">
          <input id="employee_salary" className="inputBox" onChange={setAttrOnChange} value={empSal} placeholder="Enter Employee Salary" style={{ border: !empSal && empSalErrMsg ? '2px solid red' : 'none' }} />
          <label id="employee_salary" className="warning-text">
            {empSalErrMsg}
          </label>
        </div>
      </div>
      <div className="row">
        <Button />
        <button className="formButton" onClick={addEmployee}>
          Submit
        </button>
        <button className="formButton" onClick={resetForm}>
          Reset
        </button>
      </div>
    </>
  );
}
export default FormComponent;
