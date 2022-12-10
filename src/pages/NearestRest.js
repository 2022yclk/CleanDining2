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
import {useEffect, useState} from 'react';
import Loading from '../components/Loading.js';
import FindGpsApi from '../components/FindGpsApi.js';

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

const {kakao} = window; 

function NearestRest() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function toAdminLogin(e) {
    window.location.href="/AdminLogin"
  }

  function gotoMain(e) {
    window.location.href="/Main"
  }

  const [addr, setAddr] = useState("");
  const [print, setPrint] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longtitude, setLongtitude] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect (()=>{

      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position){
              var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도

              setLatitude(lat);
              setLongtitude(lon);

          });
      } else {
          //var locPosition = new kakao.maps.LatLng(37.557523, 126.998186), // gps 허용이 안될때, 기본주소 충무로
          //    message = '<div style="padding:5px;">geolocation을 사용할 수 없어요..</div>';
  
          // displayGpsMarker(locPosition, message);
      }
  
      // 주소-좌표 객체 생성
      var geocoder = new kakao.maps.services.Geocoder();
  
      var callback = function(result, status){
          if(status === kakao.maps.services.Status.OK){
              for(var i=0;i<result.length;i++){
                  if(result[i].region_type==='H'){
                      //console.log(result[i].region_3depth_name);
                      setAddr(result[i].region_3depth_name);
                      setLoading(false);
                  }
                  if(result[i].region_type==='B'){
                      setPrint(result[i].address_name);
                  }
              }
          }
      }
  
      geocoder.coord2RegionCode(longtitude, latitude, callback);
  
  }, [latitude, longtitude, addr, print]);


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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              주변 음식점 검색
            </Typography>
            <IconButton color="inherit" onClick={gotoMain}>
                <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <center><FoodBankIcon />기능1</center>
          <Divider sx={{ my: 2 }} />
          </List>
          <List component="nav">
          <center><FoodBankIcon />기능2</center>
            <Divider sx={{ my: 2 }} />
          </List>
          <List component="nav">
          <center><FoodBankIcon />기능3</center>
            <Divider sx={{ my: 2 }} />
          </List>
        </Drawer>
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
          <Container maxWidth="md" sx={{ mt: 4, mb: 4, }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 800,
                  }}
                >
                    <>
                      {
                        loading ? <Loading /> :
                        <FindGpsApi addr={addr} print={print}/>
                      }
                    </>
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

export default NearestRest;