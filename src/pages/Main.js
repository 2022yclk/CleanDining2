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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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


const mdTheme = createTheme();

function Main() {
  
  //console.log(sessionStorage.getItem("email"));

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function toMap(e) {
    window.location.href=`/NearestRest`
  }

  function toStringsearch(e) {
    window.location.href=`/SearchRest`
  }

  function toAdminLogin(e) {
    window.location.href="/AdminLogin"
  }
  function toMypage(e) {
    window.location.href="/Mypage"
  }
  function toLogin(e) {
    window.location.href="/"
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
              <FoodBankIcon /> Clean Dining에 오신걸 환영합니다
            </Typography>
            <IconButton color="inherit" onClick={toLogin}>
            <ExitToAppIcon />
            </IconButton>
            <IconButton color="inherit" onClick={toMypage}>
            <AccountBoxIcon />
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
          <Container maxWidth="1800px" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 509,
                    backgroundImage: 'url(./mainback.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                >
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 360,
                  }}
                >
                  <Card xs={12} md={6} lg={6}>
                    <CardMedia
                      component="img"
                      alt="markerimg"
                      height="200"
                      image="./markerimg.png"
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      <center>내 주변 음식점 찾기</center>
                      </Typography>
                      </CardContent>
                      <CardActions>
                      <Button size="large" fullWidth variant="contained" color="success" onClick={toMap}>찾으러 가보자구</Button>
                      </CardActions>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 360,
                  }}
                >
                  <Card xs={6} md={6} lg={6}>
                    <CardMedia
                           component="img"
                           object-fit
                           alt="markerimg"
                           height="200"
                           image="./searchimg.png"
                           sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                          <center>나는 검색할꺼야</center>
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="large" fullWidth variant="contained" color="success" onClick={toStringsearch}>검색하러 가보자구</Button>
                    </CardActions>
                  </Card>
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

export default Main;