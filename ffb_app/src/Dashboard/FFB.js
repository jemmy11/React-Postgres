import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

const useStyles = makeStyles((theme) => ({
  table: {
	display: 'flex',
	flexWrap: 'nowrap'
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function FFB({ token, ffbs, isUpdated, setIsUpdated, setIsOpenLoading }) {
  const classes = useStyles();
  
  return(
	<TableContainer component={Paper} className={classes.table}>
		<Table size="small">
			<TableHead>
				<TableCell>
					Estate
				</TableCell>
				<TableCell>
					HarvestDate
				</TableCell>
				<TableCell>
					Ripe
				</TableCell>
				<TableCell>
					Unripe
				</TableCell>
				<TableCell>
					Rotten
				</TableCell>
				<TableCell>
					Underripe
				</TableCell>
				<TableCell>
					Overripe
				</TableCell>
			</TableHead>
			<TableBody>
			  {ffbs &&
				ffbs.map((ffb, index) => 
				(
					<TableRow key={ffb.id}>
						<TableCell>
							<font color="#0000FF">{ffb.estate}</font>
						</TableCell>
						<TableCell>
							{ffb.harvestDate}
						</TableCell>
						<TableCell justify="right">
							{ffb.ripe}
						</TableCell>
						<TableCell justify="right">
							{ffb.unripe}
						</TableCell>
						<TableCell justify="right">
							{ffb.rotten}
						</TableCell>
						<TableCell justify="right">
							{ffb.underripe}
						</TableCell>
						<TableCell justify="right">
							{ffb.overripe}
						</TableCell>
					</TableRow >
				))}
			</TableBody>
		</Table>
	</TableContainer>
  );
}