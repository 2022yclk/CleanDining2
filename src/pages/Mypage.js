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
import HomeIcon from '@mui/icons-material/Home';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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

function Mypage() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  function gotoMain(e) {
    window.location.href="/Main"
  }
      //console.log(sessionStorage.getItem("email"));

      const [partydata, setPartyData] = useState([]);
      const [reviewdata, setReviewData] = useState([]);
  
      const email = sessionStorage.getItem("email");
      //const email = "222020029";
      //console.log(email1);
  
      function handleOut(event){
          event.preventDefault();
          memberOut();
          window.location.href = "http://localhost:3000/"
      }
  
      function memberOut(){
          axios({
              method: 'post',
              url: 'http://52.79.70.2:3000/deleteUser',
              params: {'email':email}
          }).then(
              alert('회원 탈퇴가 완료되었습니다'),
          );
      }
      
      function getMyParty(){
          axios({
              method: 'get',
              url: 'http://52.79.70.2:3000/getMyParty',
              params: {'email': email}
          }).then(res=>setPartyData(res.data));
      }
  
      function getMyReview(){
          axios({
              method: 'get',
              url: 'http://52.79.70.2:3000/getMyReview',
              params: {'email': email}
          }).then(res=>setReviewData(res.data));
      }
  
      useEffect(()=>{
          getMyParty();
          getMyReview();
      }, []);

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
              마이페이지
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
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 110,
                    alignItems: 'center',
                  }}
                >
                <h1>마이페이지</h1>
                </Paper>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    mt: 4,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 360,
                  }}
                >
                    <br />
                    <center><img src="./accountimg.jpg" width="240" height="200" />
                    <h3>먹깨비 {email}님, 반갑습니다.</h3></center>
                </Paper>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                <h3>내 파티</h3>
                <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                {partydata.map((item) => 
                        <div>
                        <center><h4>{item.title}</h4>
                        {item.resName}</center><br/><br/>
                        거사일: {item.date.slice(0,10)}&nbsp;&nbsp;{item.hour}시 &nbsp;/&nbsp;{item.min}분<br/>
                        파티원: {item.gathered}/{item.gather_num}<br/>
                        내용: {item.content}<br/>
                        마감기한 {item.dueDate.slice(0,10)}
                        <br/>
                        <br/>
                        <Divider />
                        </div>
                    )}
                    </Paper>
                    </Grid>
                </Paper>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                    <h3>내가 쓴 댓글</h3>
                <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                {reviewdata.map((item)=>
                        <div>
                        <center><h4>{item.title}</h4>{item.resName}</center>
                        작성일: {item.date.slice(0,10)}<br/>
                        평가: {item.grade}<br/>
                        내용: {item.content}
                        <br/>
                        <br/>
                        <Divider />
                        </div>
                    )}
                    </Paper>
                    </Grid>
                </Paper>
                </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Button onClick={(event)=>handleOut(event)} variant="contained" fullWidth color="error"><DeleteForeverIcon/>그럴일 없으면 좋겠지만 회원을 탈퇴하려면 여기를 누르시면 됩니다 가지마세요ㅠㅠ</Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Mypage;