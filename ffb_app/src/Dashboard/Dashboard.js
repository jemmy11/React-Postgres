import React, { useState, useEffect } from 'react';
import axios from "axios";
import FFB from './FFB';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField  from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import {Pie, Doughnut, Bar, Line} from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  table: {
    padding: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'flex',
  },
}));

export default function Dashboard({ clearToken, token }) {
  const [isOpenLoading, setIsOpenLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchEstate, setSearchEstate] = useState();
  const [ffbs, setFfbs] = useState([]);
  const [url, setUrl] = useState('/ffb/search');
  const [selectedDate, setSelectedDate] = useState(null);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [pieState, setPieState] = useState();
  const [barState, setBarState] = useState();
  const [lineState, setLineState] = useState();
  
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
	
  const handleLogout = async e => {
    e.preventDefault();
    clearToken();
  }
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const instance = axios.create({
	  baseURL: "http://localhost:3600",
	  headers: {
		"Content-type": "application/json",
		"Authorization": `Bearer ${token}`
	  }
	});
  
  useEffect(() => {
	let mounted = true
	instance.get('/user')
		.then(response => {
			if (mounted) {
				setCurrentUser(response.data);
            }
		})
	return function cleanup() {
		mounted = false
	}
  }, []);
  
  useEffect(() => {
	let mounted = true
    instance.get(url)
		.then(response => {
			if (mounted) {
				setFfbs(response.data);
				setIsOpenLoading(false);
				
				let temp = response.data;
				
				let state = {
				  labels: ['Ripe', 'Unripe', 'Rotten',
						   'Underripe', 'Overripe'],
				  datasets: [
					{
					  label: 'Quality',
					  backgroundColor: [
						'#B21F00',
						'#C9DE00',
						'#2FDE00',
						'#00A6B4',
						'#6800B4'
					  ],
					  hoverBackgroundColor: [
					  '#501800',
					  '#4B5000',
					  '#175000',
					  '#003350',
					  '#35014F'
					  ],
					  data: [temp.reduce((accumulator, currentValue) => accumulator + currentValue.ripe, 0),
							temp.reduce((accumulator, currentValue) => accumulator + currentValue.unripe, 0),
							temp.reduce((accumulator, currentValue) => accumulator + currentValue.rotten, 0),
							temp.reduce((accumulator, currentValue) => accumulator + currentValue.underripe, 0),
							temp.reduce((accumulator, currentValue) => accumulator + currentValue.overripe, 0)]
					}
				  ]
				}
				setPieState(state);
				
				let result = [];
				temp.reduce(function(res, value) {
					if (!res[value.estate]) {
						res[value.estate] = { estate: value.estate, ffb: 0 };
						result.push(res[value.estate])
					}
					res[value.estate].ffb += value.ripe;
					res[value.estate].ffb += value.unripe;
					res[value.estate].ffb += value.rotten;
					res[value.estate].ffb += value.underripe;
					res[value.estate].ffb += value.overripe;
					return res;
				}, {});
				
				state = {
				  labels: result.map(item => item.estate),
				  datasets: [
					{
					  label: 'Estate',
					  backgroundColor: 'rgba(75,192,192,1)',
					  borderColor: 'rgba(0,0,0,1)',
					  borderWidth: 2,
					  data: result.map(item => item.ffb)
					}
				  ]
				}
				setBarState(state);
				
				result = [];
				temp.reduce(function(res, value) {
					if (!res[value.harvestDate]) {
						res[value.harvestDate] = { harvestDate: value.harvestDate, ffb: 0 };
						result.push(res[value.harvestDate])
					}
					res[value.harvestDate].ffb += value.ripe;
					res[value.harvestDate].ffb += value.unripe;
					res[value.harvestDate].ffb += value.rotten;
					res[value.harvestDate].ffb += value.underripe;
					res[value.harvestDate].ffb += value.overripe;
					return res;
				}, {});
				
				state = {
				  labels: result.map(item => item.harvestDate),
				  datasets: [
					{
					  label: 'FFB',
					  fill: false,
					  lineTension: 0.5,
					  backgroundColor: 'rgba(75,192,192,1)',
					  borderColor: 'rgba(0,0,0,1)',
					  borderWidth: 2,
					  data: result.map(item => item.ffb)
					}
				  ]
				}
				
				setLineState(state);
            }
		})
	return function cleanup() {
		mounted = false
	}
  });
  
  const handleSubmit = async e => {
    e.preventDefault();
	setIsOpenLoading(true);
	let temp = '/ffb/search';
	
	if (selectedDate !== null) {
		let day = ('0' + selectedDate.getDate()).slice(-2);
		let month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
		let year = selectedDate.getFullYear();
		
		temp = temp + '?harvestDate=' + year + '-' + month + '-' + day;
		if (searchEstate !== '') {
			temp = temp + '&estate=' + searchEstate;
		}
	} else if (searchEstate !== '') {
		temp = temp + '?estate=' + searchEstate;
	}
		
	setIsOpenLoading(true);
	setUrl(temp);
	setIsOpen(false);
  }
  
  return(
	<div>
		<AppBar position="static">
		  <Toolbar>
			<IconButton
			  edge="start"
			  color="inherit"
			  aria-label="menu"
			  className={classes.menuButton}
			>
			  <MenuIcon onClick={handleOpen} />
			</IconButton>
			<Typography variant="h6" className={classes.title}>
			  {currentUser ? "Hi, " + currentUser.fullName : "" }
			</Typography>
			<Button color="inherit" onClick={handleLogout} >
			  Logout
			</Button>
		  </Toolbar>
		  <Drawer
			anchor="left"
			variant="temporary"
			open={isOpen}
			onClose={handleClose}>
				<TableContainer className={classes.table}>
					<Table size="small">
						<TableBody>
							<TableRow>
								<TableCell style={{ borderBottom: "none" }}>
									<TextField label="Search Estate" value={searchEstate} variant="outlined" autoFocus margin="dense" type="text" onChange={e => setSearchEstate(e.target.value)}/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ borderBottom: "none" }}>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											label="Harvest Date"
											format="yyyy-MM-dd"
											value={selectedDate}
											onChange={handleDateChange}
										  />
									</MuiPickersUtilsProvider>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ borderBottom: "none" }}>
									<Button onClick={handleSubmit} variant="contained" color="primary">Apply</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
		  </Drawer>
		</AppBar>
		<div className={classes.dashboard}>
			<Grid item>
				<Grid container justify="space-between" style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px' }}>
					<Grid item xs style={{margin: '20px'}}>
						<Card style={{minHeight: '100px', width: '300px'}}>
							<CardContent>
								<Pie
								  data={pieState}
								  options={{
									title:{
									  display:true,
									  text:'Quality',
									  fontSize:10
									},
									legend:{
									  display:true,
									  position:'right'
									}
								  }}
								/>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs style={{margin: '20px'}}>
						<Card style={{minHeight: '300px', width: '300px'}}>
							<CardContent>
								<Bar
								  data={barState}
								  options={{
									title:{
									  display:true,
									  text:'FFB',
									  fontSize:20
									},
									legend:{
									  display:true,
									  position:'right'
									}
								  }}
								/>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs style={{margin: '20px'}}>
						<Card style={{minHeight: '200px', width: '300px'}}>
							<CardContent>
								<Line
								  data={lineState}
								  options={{
									title:{
									  display:true,
									  text:'FFB',
									  fontSize:20
									},
									legend:{
									  display:true,
									  position:'right'
									}
								  }}
								/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
			<Grid container direction="column" className={classes.grid} >
				<Grid item style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px'}}>
					<FFB token={token} ffbs={ffbs} isUpdated={isUpdated} setIsUpdated={setIsUpdated} setIsOpenLoading={setIsOpenLoading} />
				</Grid>
			</Grid>
		</div>
	</div>
  );
}