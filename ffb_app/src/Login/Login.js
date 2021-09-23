import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField  from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
	background: '#F4F4F6',
    display: 'flex',
	flexGrow: 1,
    minHeight: '100vh'
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    display: 'flex',
  }
}));

export default function Login({ setToken }) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState();
  
  const handleClickOpen = (task) => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
	await instance.post(`/login`, { "userName": userName, "password": password })
		.then(response => {
			setToken(response.data);
		});
  }
  
  const handleCreate = async e => {
    e.preventDefault();
	await instance.post(`/users`, { "fullName": fullName, "userName": userName, "password": password })
		.then(response => {
			
		});
	setIsOpen(!isOpen);
  }
  
  const instance = axios.create({
	  baseURL: "http://localhost:3600",
	  headers: {
		"Content-type": "application/json"
	  }
	});
  
  const classes = useStyles();
  
  return(
	<div className={classes.root}>
      <Paper className={classes.paper}>
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2} direction="column" >
				<Grid item>
					<p>Login</p>
				</Grid>
				<Grid item>
					<TextField label="User Name" variant="outlined" type="text" onChange={e => setUserName(e.target.value)}/>
				</Grid>
				<Grid item>
					<TextField label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)}/>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" type="submit">Login</Button>
					<Button variant="outlined" color="primary" onClick={handleClickOpen} style={{marginLeft: '20px'}}>Create User</Button>
				</Grid>
			</Grid>
		</form>
	  </Paper>
	  
	  <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
		<DialogTitle id="form-dialog-title">Create User</DialogTitle>
			<DialogContent>
			  <Grid container spacing={2} direction="column">
				<Grid item>
				  <TextField label="Full Name" variant="outlined" autoFocus margin="dense" type="text" onChange={e => setFullName(e.target.value)}/>
				</Grid>  
				<Grid item> 
				  <TextField label="User Name" variant="outlined" autoFocus margin="dense" type="text" onChange={e => setUserName(e.target.value)}/>
				</Grid>  
				<Grid item>  
				  <TextField label="Password" variant="outlined" autoFocus margin="dense" type="text" onChange={e => setPassword(e.target.value)}/>
				</Grid>  
			  </Grid>
			</DialogContent>
		<DialogActions>
		  <Button variant="contained" color="error" onClick={() => setIsOpen(!isOpen) }>Cancel</Button>
		  <Button type="submit" variant="contained" color="primary" onClick={handleCreate}>Create</Button>
		</DialogActions>
	  </Dialog>
	</div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}