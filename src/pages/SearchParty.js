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
import '../css/FindPeopleWith.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Clean Dining
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

function SearchParty() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
   
    // 음식점 id value
    const { id, addr, grade, key, addr2, phone, cat } = useParams();
    const [data, setData] = useState([]);

    const handleShow = (id, key, addr, addr2, grade, phone, cat, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/Info/${id}/${key}/${addr}/${addr2}/${grade}/${phone}/${cat}`;
    }

    const handleCreate = (data, key, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/PartyGen/${data}/${key}`;
    }

    const handleClick = (data, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/JoinParty/${key}/${data}`;
    }
    
    function getList(){
        axios({
            method: 'get',
            url: 'http://52.79.70.2:3000/getPartyData',
            params: {'key': key}
        }).then(res=>setData(res.data));
    }

    function toAdminLogin(e) {
      window.location.href="/AdminLogin"
    }

    function gotoMain(e) {
      window.location.href="/Main"
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
              같이 먹을 사람 찾기
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
                    height: 300,
                  }}
                >
                  <center><h1>{id}</h1></center>
                  <center><h2>{addr}</h2></center>
                  <center><h2>위생등급 : {grade}</h2></center>
                </Paper>
                <Grid container>
                <Grid item sx={{ mt:1 }} xs>
                <Button variant="contained" color="success" onClick={(event) => handleCreate(id, key, event)}>새로운 파티 만들기</Button>
                </Grid>
                <Grid item sx={{ mt:1 }}>
                <Button variant="outlined" color="success" onClick={(event) => handleShow(id, key, addr, addr2, grade, phone, cat, event)}>음식점 세부정보 및 리뷰보기</Button>
                </Grid>
                </Grid>
                <Paper
                  sx={{
                    mt: 10,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <center><h2>파티리스트</h2></center>
                  <center>{data.map((item)=>(
                        <div className="partylist">
                            <div className="pi-top">
                                <div>{item.writer_id}admin34(Test Value)</div>
                                <button onClick={(event)=>handleClick(item.post_id, event)}>파티 확인</button>
                            </div>
                            <div className="pi-mid">
                                {item.title}
                            </div>
                            <div className="pi-btm">
                                <div className="pi-btm-date">{item.date.slice(0,10)}</div>
                                <div className="pi-btm-txt">현재 인원&nbsp;/&nbsp;정원</div>
                                <div className="pi-btm-num">{item.gathered}&nbsp;/&nbsp;{item.gather_num}</div>
                            </div>
                        </div>
                    ))}
                </center>
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

export default SearchParty;