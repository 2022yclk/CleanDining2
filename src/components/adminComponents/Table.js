import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


{/* <TableCell align="left">ID&nbsp; (100g serving)</TableCell>
<TableCell align="left">Writer&nbsp;</TableCell>
<TableCell align="left">Restaurant&nbsp;(g)</TableCell>
<TableCell align="right">Date&nbsp;(YYYY-MM-DD)</TableCell>
<TableCell align="right">Processed&nbsp;(0/1)</TableCell>
const rows = [
    createData(1,'홍길동','필동함박','2022-12-01', '허위사실유포', 0), */}

function createData(id, writer, restaurant, date, processed) {
  return {
    id, writer, restaurant, date, processed: [
      {
        date: '2020-01-05',
        contents: '허위사실유포!',
        amount: 3,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.writer}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.writer}</TableCell>
        <TableCell align="right">{row.restaurant}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Report Detail
              </Typography>
              {row.contents}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    writer: PropTypes.string.isRequired,
    restaurant: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    processed: PropTypes.bool.isRequired,
  }).isRequired,
};

const rows = [
  createData(1,'홍길동','필동함박','2022-12-01', '허위사실유포', 0),
  createData(1,'김대한','이삭토스트','2022-12-02', '허위사실유포', 0),
  createData(1,'황민국','필동면옥','2022-12-03', '허위사실유포', 0),
  createData(1,'양만세','내가찜한닭','2022-12-04', '허위사실유포', 0),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">ID&nbsp; (100g serving)</TableCell>
            <TableCell align="left">Writer&nbsp;</TableCell>
            <TableCell align="left">Restaurant&nbsp;(g)</TableCell>
            <TableCell align="right">Date&nbsp;(YYYY-MM-DD)</TableCell>
            <TableCell align="right">Processed&nbsp;(0/1)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
