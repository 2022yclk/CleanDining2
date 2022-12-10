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

function ReviewDetail() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function gotoMain(e) {
    window.location.href="/Main"
  }

  const { key, reviewid } = useParams();

  const [data, setData] = useState([]);

  function getList(){
      axios({
          method: 'get',
          url: 'http://52.79.70.2:3000/getReviewDataDetail',
          params: {'key': reviewid}
      }).then(res=>setData(res.data));
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
              리뷰 상세정보
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
                <h4>음식점 상세 정보 &gt; 리뷰 리스트 &gt; {key} &gt; {reviewid}</h4>
                <div className="showReview">
                    <div className="reviewTitle">
                        <label>리뷰 제목</label>
                        {item.title}
                    </div>
                    <div className="reviewTitle">
                        <label>방문한 날짜</label>
                        {item.date.slice(0,10)}
                    </div>
                    <div className="reviewTitle">
                        <label>작성자가 매긴 등급</label>
                        {item.grade}
                    </div>
                    <div className="reviewTitle">
                        <label>리뷰 내용</label>
                        {item.content}
                    </div>
                    <div className="reviewTitle">
                        <label>리뷰 추천수</label>
                        {item.recomCnt}
                    </div>
                </div>
                <div className="reviewBtm">
                    <button className="sr-btn" onClick={(event) => handleRecommend(reviewid, event)}>추천하기</button>
                    <button className="sr-btn" onClick={(event) => handleAlert(reviewid, event)}>신고하기</button>
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

export default ReviewDetail;