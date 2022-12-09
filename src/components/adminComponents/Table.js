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

// // 삭제
// const rows = [
//   createData(1, 1,'필동함박','2022-12-01', 0),
//   createData(2, 3,'이삭토스트','2022-12-02', 0),
//   createData(3, 5,'필동면옥','2022-12-03', 0),
//   createData(4, 7,'내가찜한닭','2022-12-04', 0),
// ];

function Row(props) {
  //const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  // database row 만들기 위한 데이터 구축
  const [data, setData] = React.useState([]); 
  React.useEffect(()=>{
    getReportList(); // 컴포넌트가 렌더링될 때마다 데이터 불러오기
  })

  function getReportList(){ // database 신고 불러오기
    console.log(data);
    axios({
      method: 'get',
      url: 'http://52.79.70.2:3000/getReportedData',
      params: {'key': data}
    }).then(res=>setData(res.data));
  }

  // function setData(Data) {
  //   report_id, review_id, restaurant, date, processed, r_date, r_writer_id, r_contents, r_report_cnt
  // };

  // 신고 수락 이벤트
  function acceptReportRequest(reportID, reviewID) {
    // 신고 수락 버튼을 눌렀으니, DB에서는 
    // 1. 해당 리뷰를 report table에서 삭제한다.
    axios({
      method: 'delete',
      url: 'http://localhost:3000/adminDeleteReport',
      params: {'key': reportID}
    })
    // 2. 해당 리뷰를 review table에서 삭제한다.
    axios({
      method: 'delete',
      url: 'http://localhost:3000/adminDeleteOriginReview',
      params: {'key': reviewID}
    })
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
    console.log(data) && data && data.product.map((item)=>(
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
          <TableCell component="th" scope="row">{item.report_id}</TableCell>
          <TableCell align="left">{item.review_id}</TableCell>
          <TableCell align="left">{item.restaurant}</TableCell>
          <TableCell align="center">{item.date}</TableCell>
          <TableCell align="right">{item.processed}</TableCell>
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
                    <Button onClick={acceptReportRequest(item.report_id, item.review_id)} variant="contained" color="success" size="small">신고 수락</Button>
                    <Button onClick={deleteReportRequest(item.report_id)} variant="outlined" color="error" size="small">신고 철회</Button>
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
                    <TableRow key={item.review_id}>
                      <TableCell component="th" scope="row">{item.r_date}</TableCell>
                      <TableCell align="left">{item.r_writer_id}</TableCell>
                      <TableCell>{item.r_contents}</TableCell>
                      <TableCell align="right">누적 {item.r_report_cnt}번</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ))
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    // report data
    report_id: PropTypes.number.isRequired, 
    review_id: PropTypes.number.isRequired, 
    restaurant: PropTypes.string.isRequired, 
    date: PropTypes.string.isRequired, 
    processed: PropTypes.bool.isRequired, 
    // review data
    r_date: PropTypes.string.isRequired, 
    r_writer_id: PropTypes.string.isRequired, 
    r_contents: PropTypes.string.isRequired, 
    r_report_cnt: PropTypes.number.isRequired, 
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
          <Row />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
