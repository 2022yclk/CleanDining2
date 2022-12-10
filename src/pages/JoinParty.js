import * as React from 'react';
import { styled, createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
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
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/ShowParty.css';
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

function JoinParty() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function gotoMain(e) {
    window.location.href="/Main"
  }
  const { key, postid } = useParams();
  const [data, setData] = useState([]);

  function getList(){
      //console.log(key);
      axios({
          method: 'get',
          url: 'http://52.79.70.2:3000/getPartyDataDetail',
          params: {'key': postid}
      }).then(res=>setData(res.data));
  }

  //console.log(data.gathered);

  const hanldeParticipate = (num, gather, event) => {
      event.preventDefault();
      const requestURL = "http://52.79.70.2:3000/participateParty";
      const participateInfo = {
          'postid': postid,
          'email': sessionStorage.getItem('email')
      }
      
      if(num==gather){
          alert('이미 모집인원이 다 찼습니다!');
      } else{
          axios.post(requestURL, participateInfo).then(response=> {
              switch (response.data) {
                case "Already":
                  alert("이미 참가중인 파티입니다!");
                  return window.history.back();
                case "Participated":
                  alert('모임 참가 신청이 완료되었습니다!');
                  return window.history.back();
                default :
                  return alert("ERROR");
              }
            }
          ).catch(
              error=>{
                  return alert(error);
              });
      }
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
              파티 참가
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
          <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                    <div>
            {data.map((item)=>(
                <div>
                    <h4>같이 먹을 사람 찾기 &gt; 파티 리스트 &gt; {item.title} &gt;</h4>
                    <div className="partyFind">
                        <div className="partyTitle">
                            <label>Title</label>
                            {item.title}
                        </div>
                        <div className="partyTitle">
                            <label>Date / Time </label>
                            {item.date}{item.time}
                        </div>
                        <div className="partyTitle">
                            <label>Due Date </label>
                            {item.dueDate}
                        </div>
                        <div className="partyTitle">
                            <label>내용</label>
                            {item.content}
                        </div>
                        <div className="partyPeople">
                            <label>모집 인원</label>
                            {item.gather_num}
                        </div>
                        <div className="partyPeople">
                        <label>현재 인원</label>
                            {item.gathered}
                        </div>
                        <button className="sp-btn" onClick={(event) => hanldeParticipate(item.gathered, item.gather_num, event)}>파티 참가하기</button>
                    </div>
                </div>
            ))}
        </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default JoinParty;