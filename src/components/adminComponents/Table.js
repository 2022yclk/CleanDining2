import * as React from 'react';
import {useEffect} from 'react';
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





// function setData(Data) {
//   report_id, review_id, restaurant, date, processed, r_date, r_writer_id, r_contents, r_report_cnt
// };




function Row(props) {
  const [open, setOpen] = React.useState(false);
  
  // database row 만들기 위한 데이터 구축
  const [data, setData] = React.useState([]); 

  useEffect(()=>{
    getReportList(); // 컴포넌트가 렌더링될 때마다 데이터 불러오기
  }, []);

  function getReportList(){ // database 신고에 data 불러오기
    axios({
      method: 'get',
      url: 'http://52.79.70.2:3000/getReportedData',
      params: {'key': data}
    }).then(res=>setData(res.data));
    console.log(data);
  }
  // 신고 수락 이벤트
  function acceptReportRequest(reviewID, event) {
    // 해당 리뷰를 review table에서 삭제한다.
    event.preventDefault();
    axios({
      method: 'delete',
      url: 'http://52.79.70.2:3000/adminDeleteOriginReview',
      params: {'key': reviewID}
    })
    .catch(error => {
      return alert(error);
    })
    .then(response=>{
      console.log(response.data);
    })
    window.location.reload();
  }
  // 신고 철회 이벤트
  function deleteReportRequest(reviewID, event){
    // [해당 리뷰의 alert cnt를 0으로 초기화한다.
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://52.79.70.2:3000/adminInitAlertCnt',
      params: {'key': reviewID}
    })
    .catch(error => {
      return alert(error);
    })
    .then(response=>{
      console.log(response.date);
    })
    window.location.reload();
  }


  return (
    data.map((item)=>(
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell sx={{ fontSize:"14px" }} component="th" scope="row">{item.date.slice(0,10)}</TableCell>  
          <TableCell align="left">{item.writer_id}</TableCell>
          <TableCell align="left">{item.title}</TableCell>
          <TableCell align="right">{item.resName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "#F5FEEE" }} colSpan={6}>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <Box sx={{margin: 1, padding:0.1, backgroundColor: "#F5FEEE"}}>
                <Box sx={{ marginTop: 1, marginLeft:2, marginRight:2, display:'flex', justifyContent: "space-between" }}>
                  <Typography variant="h6" gutterBottom component="div" fontFamily={"Nanum"}>
                    Reported Review Detail
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button onClick={(event) => acceptReportRequest(item.review_id, event)} variant="contained" color="success" size="small">신고 수락</Button>
                    <Button onClick={(event) => deleteReportRequest(item.review_id, event)} variant="outlined" color="error" size="small">신고 철회</Button>
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
                      <TableCell component="th" scope="row">{item.date.slice(0,10)}</TableCell>
                      <TableCell align="left">{item.writer_id}</TableCell>
                      <TableCell>{item.content}</TableCell>
                      <TableCell align="right">누적 {item.alertCnt}번</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ))
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    license_id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    date: PropTypes.string.isRequired, 
    grade: PropTypes.string.isRequired, 
    content: PropTypes.string.isRequired, 
    alertCnt: PropTypes.number.isRequired, 
    recomCnt: PropTypes.number.isRequired, 
    review_id: PropTypes.number.isRequired, 
    writer_id: PropTypes.number.isRequired, 
    resName: PropTypes.string.isRequired, 
  }).isRequired,
};


export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{backgroundColor: "#FFFFFF"}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontFamily:"Nanum", fontSize:"20px"}}><b>날짜</b>&nbsp;(YYYY-MM-DD)</TableCell>
            <TableCell sx={{fontFamily:"Nanum", fontSize:"20px"}} align="left"><b>유저아이디</b>&nbsp;</TableCell>
            <TableCell sx={{fontFamily:"Nanum", fontSize:"20px"}} align="left"><b>제목</b>&nbsp;</TableCell>
            <TableCell sx={{fontFamily:"Nanum", fontSize:"20px"}} align="right"><b>식당</b>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
