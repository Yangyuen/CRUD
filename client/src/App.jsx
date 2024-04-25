import React from "react";
import Axios from "axios";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [newPosition, setNewPosition] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3002/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployees = () => {
    Axios.post("http://localhost:3002/create", {
      id: id,
      name: name,
      lastname: lastname,
      position: position,
      department: department,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          id: id,
          name: name,
          lastname: lastname,
          position: position,
          department: department,
        },
      ]);
    });
  };

  const updateEmployeePosition = (id) =>{
    Axios.put('http://localhost:3002/update', { position: newPosition, id: id}).then((response) =>{
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            lastname: val.lastname,
            position: newPosition,
            department: val.department
          } : val;
        })
      )
    })

  }

  const deleteEmployeePosition = (id) =>{
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) =>{
      setEmployeeList(
        employeeList.filter((val) =>{
          return val.id != id;
        })
      )
    })
  }


  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="ID" className="form-label">
              ID:
            </label>
            <input
              type="int"
              className="form-control"
              placeholder="Enter ID"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Lastname:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Lastname"
              onChange={(event) => {
                setLastname(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Position"
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Department"
              onChange={(event) => {
                setDepartment(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addEmployees}>
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employee">
        <button onClick={getEmployees} className="btn btn-primary">
          {" "}
          Show Employee
        </button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">ID: {val.id}</p>
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">LastName: {val.lastname}</p>
                <p className="card-text">Position: {val.position}</p>
                <p className="card-text">Department: {val.department}</p>
                <div className="d-flex">
                  <input
                    type="text"
                    style={{width: "300px"}}
                    placeholder="Edit Position"
                    className="form-control"
                    onChange={(event) =>{
                      setNewPosition(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => { updateEmployeePosition(val.id)}}>Update</button>
                  <button className="btn btn-danger" onClick={() => { deleteEmployeePosition(val.id)}}>Update</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
