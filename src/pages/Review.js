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
import {useState} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../css/WriteReview.css'
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

function Review() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function gotoMain(e) {
    window.location.href="/Main"
  }

  const {id, key} = useParams();
  const [title, setTitle] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [grade, setGrade] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = (event) => {
      event.preventDefault();
      const title1 = title;
      const visitDate1 = visitDate;
      const grade1 = grade;
      const content1 = content;
      const license = key;
      const userEmail = sessionStorage.getItem("email");
      const requestURL = "http://52.79.70.2:3000/addReview";
      const reviewInfo = {
          'license': license,
          'title': title1,
          'visitDate': visitDate1,
          'grade': grade1,
          'content': content1,
          'userEmail' : userEmail
      }
      if(title===""){
          alert('제목을 입력해주세요');
      } else if(grade===""){
          alert('등급을 선택해주세요!');
      } else if(content===""){
          alert('설명을 입력해주세요!');
      } else{
          axios.post(requestURL, reviewInfo).then(
              alert('소중한 리뷰가 정상적으로 등록되었습니다!'),
              window.history.back()
          ).catch(
              error => {
                  return alert(error);
              });
      }
  }

  const handleTitle = (event) => {
      setTitle(event.target.value);
  }

  const handleVisit = (event) => {
      const data1 = new Date();
      const data2 = new Date(event.target.value);
      if(data2>data1){
          alert('방문했던 날짜를 다시 선택해주세요');
          setVisitDate("");
      } else{
          setVisitDate(event.target.value);
      }
  }
  
  const handleGrade = (event) => {
      setGrade(event.target.value);
  }

  const handleContent = (event) => {
      setContent(event.target.value);
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
              리뷰 쓰기
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
                    height: 120,
                  }}
                >
                  <center><h1>{id}</h1></center>
                </Paper>
                <br />
                <center><h2>리뷰 작성하기</h2></center>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  elevation={10}
                >
              <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
               <Grid container spacing={3}>
                <Grid item xs={6} md={6} lg={6}>
                <h4>방문 일자</h4>
                <input className="w-date" type="date" name="partyDate" onChange={handleVisit}/>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                <h4>음식점의 위생상태는...</h4>
                    <select className="wm-grade" value={grade} onChange={handleGrade}>
                        <option value="">Select Grade</option>
                        <option value="매우우수">매우 우수</option>
                        <option value="우수">우수</option>
                        <option value="좋음">좋음</option>
                    </select>
                </Grid>
                <Divider variant="middle" />
                <br />
                <Grid item xs={12} md={12} lg={12}>
                <h4>리뷰 작성란</h4>
                  <TextField
                      id="standard-required"
                      label="리뷰제목쓰셔용"
                      required
                      onChange={handleTitle}
                      variant="standard"
                     />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                <TextField
                  id="filled-multiline-static"
                   label="알찬 리뷰 작성하기"
                 multiline
                 rows={8}
                 fullWidth
                 defaultValue="ex)맛있긴 한데 음식에서 바퀴벌레가 나왔어요..."
                 variant="standard"
                 onChange={handleContent}
                  />
                </Grid>
            </Grid>
            </Container>
            </Paper>
            <br />
            <br />
            <center><Grid><Button variant="contained" color="success" onClick={handleCreate}>작성하기!</Button></Grid></center>
            <br />
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

export default Review;