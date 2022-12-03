import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MultipleSelectCheckmarks from "./selectbar"
import { useState,useEffect } from 'react';
import axios from "axios"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



// -------------------------component-------------------------

export default function CustomizedDialogs({ prop, getdata, id}) {
    const [open, setOpen] = React.useState(false);
  
    const [details, sedetails] = useState({
        name : "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        hobbies : []
    })
    const Hobbies = ["Reading","Travelling", "Playing"]

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    const handlechange = (e) => {
        sedetails({
            ...details,
            [e.target.name] : e.target.value
        })
        console.log(details)
   }
   

    const  Addemployee = () => {
      if(details.name && details.email && details.phone && details.dob && details.gender && details.hobbies){
        axios.post('https://tericsoft-backend.herokuapp.com/employee', details)
        .then(function (response) {
            console.log("post:", response.data);
            getdata()
            alert("added successfully")
        })
        .catch(function (error) {
          console.log(error)
        });
      } else {
          alert("Fill all the details")
      }
   }
  
    const Editemployee = (id) => {
        console.log(id)
        if(details.name && details.email && details.phone && details.dob && details.gender && details.hobbies){
            axios.put(`https://tericsoft-backend.herokuapp.com/employee/${id}`, details)
            .then(function (response) {
                console.log("update:", response.data);
                getdata()
                alert("updated successfully")
            })
            .catch(function (error) {
              console.log(error)
            });
          } else {
              alert("Fill all the details")
          }
    }
    

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {prop}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField name="name"  id="outlined-basic" label="Name" variant="filled" onChange={handlechange}  />
                <TextField name="email" id="filled-basic" label="Email" variant="filled" onChange={handlechange}  />
                <TextField name="phone" id="standard-basic" label="Phone" variant="filled" onChange={handlechange}  />
                <input name="dob" type="date" style={{height : "50px", fontSize: "20px", border: "1px solid lightgray"}} onChange={handlechange}  />
                <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel name="gender" value="female" control={<Radio />} label="Female" onChange={handlechange}  />
                    <FormControlLabel name="gender" value="male" control={<Radio />} label="Male" onChange={handlechange}  />
                    <MultipleSelectCheckmarks name="hobbies" title={"Hobbies"} names={Hobbies} onChange={handlechange} sedetails={sedetails} details={details}  ></MultipleSelectCheckmarks>
                </RadioGroup>
                </FormControl>

            </Box>         
        </DialogContent>
              <DialogActions>
                  {prop ==="Edit" ?  <Button variant="contained" autoFocus onClick={() => {
                      handleClose()
                      Editemployee(id)
                  }}>
                    Update
                  </Button>
                      :
                      <Button variant="contained" autoFocus onClick={() => {
                      handleClose()
                      Addemployee()
                  }}>
                    Add Employee
                 </Button>}
                  
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
