import * as React from 'react';
import axios from "axios";
import { useState, useRef, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Context } from "../../context/Context";
import {URI} from '../../api';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch, isFetching} = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {     
      const res = await axios.post(`${URI}/loginAdmin`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.error(res.data);
      res.data && window.location.replace('/');
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };


    return (
  
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpaper.dog/large/5545246.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#ff781f',  '&:hover': { backgroundColor: 'white', border: 1,  borderColor: '#ff781f',color: '#ff781f'} }}

              >
                Sign In
              </Button>                  
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
};

export default Login;






