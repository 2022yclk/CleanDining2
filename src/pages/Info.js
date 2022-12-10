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
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/WatchDetailInfo.css';
import axios from 'axios';
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

function Info() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function gotoMain(e) {
    window.location.href="/Main"
  }
  
  const {id, addr, grade, key, addr2, phone, cat} = useParams();

  const [data, setData] = useState([]);
  
  const handleReview = (event) => {
      event.preventDefault();
      window.location.href = `http://localhost:3000/Review/${id}/${key}`;
  }

  const handleClick = (review_id, event) => {
      event.preventDefault();
      window.location.href = `http://localhost:3000/ReviewDetail/${key}/${review_id}`;
  }

  const handleAlert = (review_id, event) => {
      event.preventDefault();

      const requestURL = 'http://52.79.70.2:3000/addAlert';
      const alertInfo = {
          'review_id': review_id,
      }

      axios.post(requestURL, alertInfo).then(
          alert('해당 리뷰에 대한 신고가 접수되었습니다. 신고 접수 처리까지는 2~3일 소요됩니다. 감사합니다.'),
          window.location.reload()
      );
  }

  const handleRecommend = (review_id, event) => {
      event.preventDefault();

      const requestURL = 'http://52.79.70.2:3000/addRecommend';
      const recomInfo = {
          'review_id': review_id,
      }

      axios.post(requestURL, recomInfo).then(
          alert('해당 리뷰가 추천 되었습니다!'),
          window.location.reload()
      );
  }

  const handleSanitary = (event) => {
      event.preventDefault();
      window.open("https://www.foodsafetykorea.go.kr/minwon/complain/complainIntro.do");
  }

  function getList(){
      axios({
          method: 'get',
          url: 'http://52.79.70.2:3000/getReviewData',
          params: {'key': key}
      }).then(res=>setData(res.data));
  }

  function toAdminLogin(e) {
    window.location.href="/AdminLogin"
  }

  useEffect(()=>{

      getList();

  }, [])

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
              음식점 정보와 리뷰
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
                    <center>{cat}</center>
                    <center><h1>{id}</h1></center>
                    <center><h2>{addr}</h2></center>
                    <center><h2>위생등급 : {grade}</h2></center>
                    <div>Tel)&nbsp;{phone}</div>
                </Paper>
                <Grid container>
                <Grid item sx={{ mt:1 }} xs>
                <Button variant="contained" color="error" onClick={(event) => handleSanitary(event)}>신고합니다!</Button>
                </Grid>
                <Grid item sx={{ mt:1 }}>
                <Button variant="contained" color="success" onClick={(event) => handleReview(event)}>리뷰 쓰기</Button>
                </Grid>
                </Grid>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4
                  }}
                >
                    <center><h1>최근에 작성된 리뷰들...</h1></center>
                    <div className="wd-bottom">
                        <div className="review-list">
                            {data.map((item)=>(
                                <div className="partylist">
                                    <div className="wd-top">
                                        <div>{item.email}</div>
                                        <button className="wd-btn" onClick={(event) => handleRecommend(item.review_id, event)}>추천</button>
                                        <button className="wd-btn" onClick={(event) => handleAlert(item.review_id, event)}>신고</button>
                                    </div>
                                    <div className="wd-mid" onClick={(event)=>handleClick(item.review_id, event)}>
                                        <div className="wd-midtitle">
                                            <div className="wd-midtitle-1">{item.title}</div>
                                            <div className="wd-midtitle-2">추천 수&nbsp;&nbsp;{item.recomCnt}</div>
                                        </div>
                                        <div className="wd-midcon">{item.content}</div>
                                    </div>
                                    <div className="wd-btm">
                                        <div className="wd-btm-date">{item.date.slice(0,10)} 방문</div>
                                    </div>
                                </div>
                            ))}
                        </div>
            </div>
            <br />
            <br />
                </Paper>
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

export default Info;