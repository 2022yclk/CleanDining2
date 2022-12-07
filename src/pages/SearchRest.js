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
import {useState} from 'react';
import MapContainer from '../components/MapContainer.js';
import Loading from '../components/Loading.js';
import '../css/SearchPlace.css';

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

function DataMap(){

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

function SearchRest() {
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
  const [inputText, setText] = useState("");
    const [place, setPlace] = useState("");
    const [dataMap, setDataMap] = useState([]);
    const [loading, setLoading] = useState(false);

    const onChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPlace(inputText);
        setText("");

        var aplace = inputText.replace(/ /gi, "_");
        var uri = encodeURI(`http://openapi.foodsafetykorea.go.kr/api/ef03c3ddff5742b7bf91/C004/json/1/500/ADDR=${aplace}`);

        callApi(uri);
    };

    const callApi = async (uri) => {
        setLoading(true);
        try {
                
            const response = await fetch(uri);
            const result = await response.json();

            setDataMap(result.C004.row.map((item) =>
                <DataMap key={item.WRKR_REG_NO} place={item.BSSH_NM} value={item.HG_ASGN_LV} address={item.ADDR} />
            ));

            if(dataMap === null || dataMap === undefined) throw new Error("retry");

            setLoading(false);
        } catch (error) {
            window.alert(error);
            setLoading(false);
        }
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
              주소로 찾기
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
          <Container maxWidth="1800px" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                 <div>
                  <div class="search-bar">
                    <form class="inputForm" onSubmit={handleSubmit}>
                      <input class="input" placeholder="검색해보세요... [Ex) 경기도 시흥시 승지로]" onChange={onChange} value={inputText} />
                      <button class="search" type="submit">찾기!</button>
                    </form>
                  </div>
                  <Paper alignItem='center'>{loading ? <Loading /> : <MapContainer apiData={dataMap} searchPlace={place} />}</Paper>
                </div>
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

export default SearchRest;