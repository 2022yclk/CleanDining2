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

const theme = createTheme();

function AdminLogin() {

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
      label="Email Address" 
      required 
      fullWidth 
      name="email"
      autoComplete="email"
      autoFocus
      />
      <TextField 
      label="Password" 
      type="password" 
      required 
      fullWidth 
      name="password"
      autoComplete="current-password"
      sx={{ mt:3 }}
      />
      <FormControlLabel 
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt:3 }} onClick = {signinClick}>로그로그인</Button>
      <Grid container>
        <Grid item sx={{ mt:1 }} xs><Link>비밀번호는 잃어버리면 큰일나요 눌러도 아무 기능 없는 링크임</Link></Grid>
      </Grid>
    </Container>
    </Box>
    </Grid>
    </Grid>
    </ThemeProvider>
  );
}

export default AdminLogin;
