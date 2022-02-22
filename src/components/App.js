import { useState } from "react";
// import "../CSS/App.css";
import DisplayComponent from "./displayComponent";
import FormComponent from "./formComponent";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from "@mui/material";

function App() {
  const [employees, manageEmployee] = useState({});
  const [editEmployeeId, setEditEmpId] = useState(null);
  function onSubmit(employee, modeOfOperation) {
    if (!modeOfOperation) {
      let newEmployee = Object.assign({}, employees, {
        [employee.employee_id]: employee,
      });
      manageEmployee(newEmployee);
    } else {
      if (modeOfOperation == employee.employee_id) {
        let newEmployee = Object.assign({}, employees, {
          [employee.employee_id]: employee,
        });
        manageEmployee(newEmployee);
      } else {
        let editDelEmployee = { ...employees };
        delete editDelEmployee[modeOfOperation];
        manageEmployee(editDelEmployee);
        editDelEmployee = Object.assign({}, editDelEmployee, {
          [employee.employee_id]: employee,
        });
        manageEmployee(editDelEmployee);
      }
    }
  }
  function deleteEmployee(empId) {
    console.log(empId);
    let deleteEmployeeByID = { ...employees };
    delete deleteEmployeeByID[empId];
    manageEmployee(deleteEmployeeByID);
  }
  function editEmployee(empId) {
    setEditEmpId(empId);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              !!! Employee Management System !!!
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Card sx={{ minWidth: 275, maxWidth: 600 }}>
        <CardContent>
          <FormComponent
            employees={employees}
            onSubmit={onSubmit}
            setEditEmpId={editEmployee}
            editEmployeeId={editEmployeeId}
            deleteEmpOnEdit={deleteEmployee}
          />
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275, maxWidth: 600, m: 2 }} justifyContent="center">
        <CardContent>
          <DisplayComponent
            employees={employees}
            onDelete={deleteEmployee}
            onEdit={editEmployee}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default App;
