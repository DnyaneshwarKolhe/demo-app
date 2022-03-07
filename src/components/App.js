import { useState } from "react";
import DisplayComponent from "./displayComponent";
import FormComponent from "./formComponent";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Paper, TableContainer } from "@mui/material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

function App() {
  const [employees, manageEmployee] = useState({});
  const [editEmployeeId, setEditEmpId] = useState(null);
  const [avgSal, setAvgSal] = useState(0);
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    salary: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    mob_no: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    id: "",
    name: "",
    salary: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    mob_no: "",
  });
  const [cellEditMode, setEditCellParams] = useState({
    editMode: false,
    editEmployeeId: null,
    editEmployeePropName: null,
    editValue: null,
    errorMsg: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
  });
  React.useEffect(() => {
    let average = 0;
    let salArr = Object.keys(employees).map((key) => employees[key].salary);
    salArr.forEach((sal) => average += parseInt(sal));
    setAvgSal(average);
  }, [employees]);
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
          [employee.id]: employee,
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
    if (empId)
      setEmployee({
        id: employees[empId].id,
        name: employees[empId].name,
        salary: employees[empId].salary,
      });
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              !!! Employee Management System !!!
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ m: 0.5, flexGrow: 1, display: "flex" }}>
        <Card
          sx={{
            justifySelf: "center",
            width: 2 / 5,
            maxHeight: 450
          }}
          padding={0}
        >
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
        <Divider orientation="vertical" flexItem>
          <Typography>Average</Typography>
          <Chip label={avgSal} />
          <Typography>Salary</Typography>
        </Divider>
        <TableContainer
          sx={{
            minWidth: 275,
            width: 3 / 5,
            justifySelf: "center",
            justifyItems: "center",
            alignItems: "center",
            bgcolor: "text.secondary",
            display: 'flex'
          }}
          component={Paper}
        >
          <DisplayComponent
            employees={employees}
            onDelete={deleteEmployee}
            onEdit={editEmployee}
            addEmployee={manageEmployee}
            cellEditMode={cellEditMode}
            setEditCellParams={setEditCellParams}
          />
        </TableContainer>
      </Box>
    </>
  );
}

export default App;
