import React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const theme = createTheme();

function AdminLogin() {
  
  //sessionStorage.Clear();
  const [adminID, setAdminID] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async(e) => {
    console.log(adminID);
    console.log(password);
    e.preventDefault();
    const adminIDInput = adminID;
    const passwordInput = password;
    const requestURL = 'http://52.79.70.2:3000/adminloginVerify';
    const userInfo = {
      'adminID': adminIDInput,
      'password': passwordInput
    };
    if(adminIDInput.length === 0) {
      return alert("관리자ID를 입력해주세요!");
    }
    else if(passwordInput.length === 0) {
      return alert("비밀번호를 입력해주세요!");
    }
    else {
      axios.post(requestURL, userInfo)
      .catch(error => {
        alert(error);
        return window.location.reload()
      })
      .then(response => {
        console.log(response);
        switch (response.data) {
          case "SUCCESS":
            alert("관리자님 환영합니다");
            return window.location.replace("/AdminPage"); //추후 수정요함
          case "ERROR1":
            return alert("비밀번호를 다시 확인해주세요");
          case "ERROR2":
            return alert("아이디를 다시 확인해주세요");
          default :
            return alert("ERROR");
        }
      })
    }
  }

    function handleClick(e) {
        window.location.href="/Signup"
    }
    function signinClick(e) {
        window.location.href="/Main"
    }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  }
  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(./adminbg.jpg)',
          backgroundRepeat: 'no-repeat',  
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'left-top',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    <Container 
    component="main" 
    maxWidth="xs"
    >
       <Box
          sx={{
            marginTop: 8,
            marginBottom: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ><Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
         <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
         관리자 모드 로그인
         </Typography>
       </Box>
      <TextField 
      label="Admin ID" 
      required 
      fullWidth 
      name="adminID"
      autoComplete="adminID"
      onChange={(e) => {
        setAdminID(e.target.value);
      }}
      autoFocus
      />
      <TextField 
      label="Password" 
      type="password" 
      required 
      fullWidth 
      name="password"
      autoComplete="current-password"
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      sx={{ mt:3 }}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt:3 }} onClick = {login}>로그인</Button>
    </Container>
    </Box>
    </Grid>
    </Grid>
    </ThemeProvider>
  );
}

export default AdminLogin;
