import { TableContainer } from "@mui/material";
import { useState } from "react";
// import "../CSS/App.css";
import DisplayComponent from "./displayComponent";
import FormComponent from "./formComponent";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Paper } from "@mui/material";

function App() {
  const [employees, manageEmployee] = useState({});
  const [editEmployeeId, setEditEmpId] = useState(null);
  const [employee, setEmployee] = useState({ id: '', name: '', salary: '' });
  const [errorMsg, setErrorMsg] = useState({ id: '', name: '', salary: '' });

  function onSubmit(employee) {
    if (!editEmployeeId) {
      let newEmployee = Object.assign({}, employees, {
        [employee.id]: employee,
      });
      manageEmployee(newEmployee);
    } else {
      if (editEmployeeId == employee.id) {
        let newEmployee = {
          ...employees,
          [employee.id]: employee
        };
        manageEmployee(newEmployee);
      } else {
        let editDelEmployee = { ...employees };
        delete editDelEmployee[editEmployeeId];
        manageEmployee(editDelEmployee);
        editDelEmployee = Object.assign({}, editDelEmployee, {
          [employee.id]: employee,
        });
        manageEmployee(editDelEmployee);
      }
    }
  }
  function deleteEmployee(empId) {
    let deleteEmployeeByID = { ...employees };
    delete deleteEmployeeByID[empId];
    manageEmployee(deleteEmployeeByID);
  }
  function editEmployee(empId) {
    setEditEmpId(empId);
    console.log('=>', empId);
    if (empId)
      setEmployee({
        id: employees[empId].id,
        name: employees[empId].name,
        salary: employees[empId].salary
      });
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }} >
              !!! Employee Management System !!!
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Card sx={{ minWidth: 275, maxWidth: 600, mb: 2, justifySelf: 'center' }} padding={0} >
        <CardContent>
          <FormComponent
            employees={employees}
            onSubmit={onSubmit}
            setEditEmpId={editEmployee}
            editEmployeeId={editEmployeeId}
            deleteEmpOnEdit={deleteEmployee}
            employee={employee}
            setEmployee={setEmployee}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
        </CardContent>
      </Card>
      <TableContainer sx={{ minWidth: 275, maxWidth: 800, justifySelf: 'center', justifyItems: 'center' }} component={Paper}>
        <DisplayComponent
          employees={employees}
          onDelete={deleteEmployee}
          onEdit={editEmployee}
          addEmployee={manageEmployee}
        />
      </TableContainer>
    </>
  );
}

export default App;
