import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modalcontainer from "./modal"
import axios from "axios"
import { useState } from 'react';


export const EmployeeTable = ({getdata,employee}) => {
  
  React.useEffect(() => {
    getdata()
  }, [])
  
  const handleDelete = (id) => {
    axios.delete(`https://tericsoft-backend.herokuapp.com/employee/${id}`)
    .then(function (response) {
        console.log("deleted:", response.data);
        getdata()
    })
    .catch(function (error) {
      console.log(error)
    });
  }

 


  return (
      <div>
        <TableContainer  component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" >Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">phone</TableCell>
                <TableCell align="center">DOB</TableCell>
                <TableCell align="center">Hobbies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.dob}</TableCell>
                  <TableCell align="center">{row.hobbies.map((e) => {
                    return (
                        <TableCell align="center">{e}</TableCell>
                    )
                  })}</TableCell>
                  <TableCell align="center"><Button size="small" variant="contained" onClick={()=> handleDelete(row.id)} >Delete</Button></TableCell>
                  <TableCell align="center"  > <Modalcontainer prop={"Edit"} id={row.id} getdata={getdata} ></Modalcontainer></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
