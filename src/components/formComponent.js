import React, { useState } from "react";
import "../CSS/formComponent.css";

function FormComponent(props) {
  const [displayWarning, setDisplayWarning] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [empId, setEmployeeId] = useState("");
  const [empName, setEmployeeName] = useState("");
  const [empSal, setEmployeeSal] = useState("");
  function addEmployee(e) {
    let isEmployeeExist = true;
    //checking if employee already exists
    if (Object.keys(props.employees).find((element) => element == empId)) {
      if ((!props.editEmployeeId) || (props.editEmployeeId != empId)) {
        setEmployeeId("");
        isEmployeeExist = false;
        alert(`Employee with id ${empId} already exist`);
      }
    }
    //Validating that all fields should contains values
    if (!(empId && empName && empSal && isEmployeeExist)) {
      setDisplayWarning(true);
    } else {
      props.onSubmit(
        { employee_id: empId, employee_name: empName, employee_salary: empSal },
        props.editEmployeeId
      );
      setDisplayWarning(false);
      if (props.editEmployeeId) {
        setEditMode(true);
        props.setEditEmpId(null);
      }
      setEmployeeId("");
      setEmployeeName("");
      setEmployeeSal("");
    }
  }
  //setting state values on input box change
  function setAttrOnChange(e) {
    //setting state if mode of operation is Edit
    if (props.editEmployeeId && editMode) {
      setEmployeeId(props.employees[props.editEmployeeId].employee_id);
      setEmployeeName(props.employees[props.editEmployeeId].employee_name);
      setEmployeeSal(props.employees[props.editEmployeeId].employee_salary);
      setEditMode(false);
    }
    //setting values by getting input element id
    switch (e.target.id) {
      case "employee_id":
        setEmployeeId(e.target.value.trim());
        break;
      case "employee_name":
        setEmployeeName(e.target.value.trim());
        break;
      case "employee_salary":
        setEmployeeSal(e.target.value.trim());
        break;
    }
  }
  //clearing form on reset
  function resetForm() {
    setEmployeeId("");
    setEmployeeName("");
    setEmployeeSal("");
    setDisplayWarning(false);
    props.setEditEmpId(null);
  }
  return (
    <>
      <div className="row">
        <label className="labels">Employee ID:</label>
        <div className="input-container">
          <input
            id="employee_id"
            className="inputBox"
            onChange={setAttrOnChange}
            value={
              props.editEmployeeId && editMode
                ? props.employees[props.editEmployeeId].employee_id
                : empId
            }
            placeholder="Enter Employee ID"
            style={{ border: !empId && displayWarning ? '2px solid red' : 'none' }}
          ></input>
          <label
            id="employee_id"
            className="warning-text"
            style={{ display: !empId && displayWarning ? "block" : "none" }}
          >
            *Required
          </label>
        </div>
      </div>
      <div className="row">
        <label className="labels">Employee Name:</label>
        <div className="input-container">
          <input
            id="employee_name"
            className="inputBox"
            onChange={setAttrOnChange}
            value={
              props.editEmployeeId && editMode
                ? props.employees[props.editEmployeeId].employee_name
                : empName
            }
            placeholder="Enter Employee Name"
            style={{ border: !empName && displayWarning ? '2px solid red' : 'none' }}
          ></input>
          <label
            id="employee_name"
            className="warning-text"
            style={{ display: !empName && displayWarning ? "block" : "none" }}
          >
            *Required
          </label>
        </div>
      </div>
      <div className="row">
        <label className="labels">Employee Salary: </label>
        <div className="input-container">
          <input
            id="employee_salary"
            className="inputBox"
            onChange={setAttrOnChange}
            value={
              props.editEmployeeId && editMode
                ? props.employees[props.editEmployeeId].employee_salary
                : empSal
            }
            placeholder="Enter Employee Salary"
            style={{ border: !empSal && displayWarning ? '2px solid red' : 'none' }}
          ></input>
          <label
            id="employee_salary"
            className="warning-text"
            style={{ display: !empSal && displayWarning ? "block" : "none" }}
          >
            *Required
          </label>
        </div>
      </div>
      <div className="row">
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
