import React from "react";
import "../CSS/displayComponent.css";

function DisplayComponent(props) {
    function onDelete(e) {
        props.onDelete(e.target.id);
    }
    function onEdit(e) {
        props.onEdit(e.target.id);
    }
    function getEmployeeRow(employee) {
        employee = props.employees[employee];
        return (
            <tr key={employee.employee_id} className="employeeTR">
                <td>{employee.employee_id}</td>
                <td>{employee.employee_name}</td>
                <td>{employee.employee_salary}</td>
                <td className="tdButtons">
                    <button
                        id={employee.employee_id}
                        className="tableButton"
                        onClick={onEdit}
                    >
                        EDIT
                    </button>
                    <button
                        id={employee.employee_id}
                        className="tableButton"
                        onClick={onDelete}
                    >
                        DELETE
                    </button>
                </td>
            </tr>
        );
    }
    return Object.keys(props.employees).length ? (
        <table>
            <thead>
                <tr className="tableHeadRow">
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Employee Salary</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.employees).map((employee_id) =>
                    getEmployeeRow(employee_id)
                )}
            </tbody>
        </table>
    ) : (
        <h1>No data to Display</h1>
    );
}

export default DisplayComponent;
