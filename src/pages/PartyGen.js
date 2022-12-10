import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { useState } from "react";
import { useParams } from "react-router-dom";
import '../css/CreateNewParty.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function PartyGen() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function gotoMain(e) {
    window.location.href="/Main"
  }

  console.log(sessionStorage.getItem("email"));
  const { id, key } = useParams();

  const [title, setTitle] = useState("");
  const [partyDate, setPartyDate] = useState("");
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);
  const [number, setNumber] = useState(null);
  const [briefInfo, setBriefInfo] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");

  const data1 = new Date();

  const handleCreate = async(event) => {

      event.preventDefault();
      const title1 = title; // title
      const partyDate1 = partyDate; // date
      const partyHour1 = hour;
      const partyMinute1 = min;
      const number1 = number; // gather_num
      const briefInfo1 = briefInfo;
      const content1 = content;
      const dueDate1 = dueDate;
      const license = key; // license_id
      const userEmail = sessionStorage.getItem("email");

      const requestURL = "http://52.79.70.2:3000/addParty";
      const partyInfo = {
          'license': license,
          'title': title1,
          'date': partyDate1,
          'hour': partyHour1,
          'min': partyMinute1,
          'briefInfo': briefInfo1,
          'gather_num': number1,
          'content': content1,
          'duedate': dueDate1,
          'userEmail' : userEmail
      }

      if(number===null){
          alert('인원을 선택해주세요');
      } else if(title===""){
          alert('제목을 입력해주세요!');
      } else if(content===""){
          alert('설명을 입력해주세요!');
      } else{
          axios.post(requestURL, partyInfo).then(
              alert('새로운 파티가 등록되었습니다!'),
              window.history.back()
          ).catch(
              error => {
                  return alert(error);
              });
      }

  }

  const handleDate = (event) => {
      const data2 = new Date(event.target.value); // 날짜 변환
      if(data2<data1){ // 모임 날짜 설정을 오늘 이전 날짜로 한다면 다시 입력
          alert('모임 날짜를 다시 선택해주세요!');
          setPartyDate("");
      } else{
          setPartyDate(event.target.value);
      }
  };

  const handleHour = (event) => {
      setHour(event.target.value);
  }

  const handleMin = (event) => {
      setMin(event.target.value);
  }

  const handleNumber = (event) => {
      setNumber(event.target.value);
  }
  
  const handleTitle = (event) => {
      setTitle(event.target.value);
  }

  const handleInfo = (event) => {
      setBriefInfo(event.target.value);
  }

  const handleContent = (event) => {
      setContent(event.target.value);
  }

  const handleDueDate = (event) => {
      const data2 = new Date(event.target.value);
      const data3 = new Date(partyDate);
      if(data2<data1 || data2>=data3){
          alert('마감기한을 다시 선택해주세요!');
          setDueDate("");
      } else{
          setDueDate(event.target.value);
      }
  }
  function toAdminLogin(e) {
    window.location.href="/AdminLogin"
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color="success">
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              새로운 파티 만들기
            </Typography>
            <IconButton color="inherit" onClick={gotoMain}>
            <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                    <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                    <center><h1>{id}</h1></center>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 4,
                  }}
                  elevation={10}
                >
                <center>
                <br/>
                <h4>파티 제목</h4>
                <Grid item sx={{ mt:2 }} xs><TextField
                        id="outlined-name"
                        fullWidth
                        label="사람들이 보고 모일 수 있게 매력적인 제목을 작성해주세요!"
                        value={title}
                        onChange={handleTitle}
                        required
                     />
                </Grid>
                <br/>
                <h4>모임 일시</h4>
                <Grid item sx={{ mt:2 }} xs>
                <input type="date" value={partyDate} onChange={handleDate}/>
                이날먹는걸<ul/>
                <input type="date" value={dueDate} onChange={handleDueDate} />
                이날까지 모집
                <ul/>
                <div>
                        <select value={hour} onChange={handleHour}>
                            <option value="">Hour</option>
                            <option value="00">0</option>
                            <option value="01">1</option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                        </select>시
                        <select value={min} onChange={handleMin}>
                            <option value="">Min</option>
                            <option value="00">00</option>
                            <option value="30">30</option>
                        </select>분에
                    </div>
                    <div>
                        <select id="number" value={number} onChange={handleNumber}>
                            <option value="">Choose ?</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>명이 먹어요
                    </div>
                </Grid>
                <br/>
                <h4>파티 설명 작성</h4>
                <Grid item sx={{ mt:2 }} xs>
                <TextField
                    id="standard-name"
                    label="파티설명"
                    value="결벽증이 있는 사람들만 와요!"
                    onChange={handleInfo}
                    variant="standard"
                    fullWidth
                    required
                 />
                </Grid>
                 <Grid item sx={{ mt:2 }} xs><TextField
                       id="outlined-multiline-static"
                          label="디스크립션을 작성하세요"
                      value={content}
                      multiline
                      onChange={handleContent}
                      rows={5}
                      fullWidth
                      variant="standard"
                     />
                    </Grid>
                    <br/>
                <br/>
                </center>
                </Paper>
                <center><Grid item sx={{ mt:2 }} xs><Button variant="contained" color="success" onClick={handleCreate}>새로운 파티 만들기</Button></Grid></center>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Link
                  onClick={toAdminLogin}>
                  by Team YLCK in SW Engineering 2022
                  </Link>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default PartyGen;