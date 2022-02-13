import { useState } from "react";
import "../CSS/App.css";
import DisplayComponent from "./displayComponent";
import FormComponent from "./formComponent";
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
      <h1>!!! Employee Management System !!!</h1>
      <div id="form" className="bgContainer">
        <FormComponent
          employees={employees}
          onSubmit={onSubmit}
          setEditEmpId={editEmployee}
          editEmployeeId={editEmployeeId}
          deleteEmpOnEdit={deleteEmployee}
        />
      </div>
      <div id="board" className="bgContainer">
        <DisplayComponent
          employees={employees}
          onDelete={deleteEmployee}
          onEdit={editEmployee}
        />
      </div>
    </>
  );
}

export default App;
