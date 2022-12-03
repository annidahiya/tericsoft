import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {EmployeeTable } from './Components/employee'
import Modalcontainer from "./Components/modal"
import axios from "axios"

function App() {
  const [employee, setEmployee] = useState([])

  const getdata = () => {
    axios.get('https://tericsoft-backend.herokuapp.com/employee')
    .then(function (response) {
        console.log("get:", response.data);
        setEmployee(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
}

  return (
    <div className="App">
      <EmployeeTable getdata={getdata} employee={employee}></EmployeeTable>
      <Modalcontainer prop={"Add Employee"} getdata={getdata} ></Modalcontainer>
    </div>
  )
}

export default App
