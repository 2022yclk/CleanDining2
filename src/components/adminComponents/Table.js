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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

const rows = [
  createData(1, 1,'필동함박','2022-12-01', 0),
  createData(2, 3,'이삭토스트','2022-12-02', 0),
  createData(3, 5,'필동면옥','2022-12-03', 0),
  createData(4, 7,'내가찜한닭','2022-12-04', 0),
];

function createData(report_id, review_id, restaurant, date, processed) {
  return {
    report_id, review_id, restaurant, date, processed, review: [
      {
        date: '2020-01-05',
        writer_id: 'asdf@gmail.com',
        contents: '맛이 없어요',
        report_cnt: 2,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  // 신고 수락 이벤트
  function acceptReportRequest(reportID, reviewID) {
    // 신고 수락 버튼을 눌렀으니, DB에서는 
    // 1. 해당 리뷰를 report table에서 삭제한다.
    axios()
    // 2. 해당 리뷰를 review table에서 삭제한다.
    axios()
    // 그리고 다시 리스트를 띄운다.
  }
  // 신고 철회 이벤트
  function deleteReportRequest(reportID){
    // 신고 철회 버튼을 눌렀으니, DB에서는
    // [해당 리뷰를 report table에서 삭제]한다.
    axios({
      method: 'delete',
      url: 'http://localhost:3000/adminDeleteReport',
      params: {'key': reportID}
    })
    // 그리고 다시 리스트를 띄운다.
  }

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
        <TableCell component="th" scope="row">{row.report_id}</TableCell>
        <TableCell align="left">{row.review_id}</TableCell>
        <TableCell align="left">{row.restaurant}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="right">{row.processed}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "#ccc" }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 1, padding:0.1, backgroundColor: "#FFFFFF"}}>
              <Box sx={{ marginTop: 1, marginLeft:2, marginRight:2, display:'flex', justifyContent: "space-between" }}>
                <Typography variant="h6" gutterBottom component="div" fontFamily={"Nanum"}>
                  Reported Review Detail
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button onClick={acceptReportRequest(row.report_id, row.review_id)} variant="contained" color="success" size="small">신고 수락</Button>
                  <Button onClick={deleteReportRequest(row.report_id)} variant="outlined" color="error" size="small">신고 철회</Button>
                </Stack>
              </Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Writer ID</TableCell>
                    <TableCell>Contents</TableCell>
                    <TableCell align="right">Accumulate of Report</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.review.map((reviewRow) => (
                    <TableRow key={reviewRow.date}>
                      <TableCell component="th" scope="row">
                        {reviewRow.date}
                      </TableCell>
                      <TableCell align="left">{reviewRow.writer_id}</TableCell>
                      <TableCell>{reviewRow.contents}</TableCell>
                      <TableCell align="right">
                        누적 {reviewRow.report_cnt}번
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    report_id: PropTypes.number.isRequired, 
    review_id: PropTypes.number.isRequired, 
    restaurant: PropTypes.string.isRequired, 
    date: PropTypes.string.isRequired, 
    processed: PropTypes.bool.isRequired, 
    review: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired, 
        writer_id: PropTypes.string.isRequired, 
        contents: PropTypes.string.isRequired, 
        report_cnt: PropTypes.number.isRequired, 
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID&nbsp;</TableCell>
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
