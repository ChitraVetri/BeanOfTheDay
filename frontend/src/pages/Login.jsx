import React, { useContext, useState } from 'react';
import { Container, Box, TextField, Button, Typography, Avatar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { CounterContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from "@mui/material";
import { TypographyStyle,ButtonStyle,TextFieldStyle, IconStyle } from '../styles';

function Login() {
  const { isLoggedIn, login } = useContext(CounterContext)

  const [formData, setFormData] = useState({
    user_name: "",
    user_password: "",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  function handleClick() {
    navigate("/signup")
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Form submitted', formData);
    // SEND VALUES TO DATABASE AND VALIDATE
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      const token = await response.text()
      localStorage.setItem('jwtToken', token)
      login()
    }
    else {
      setMessage(`Error: ${response.statusText}`);
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '50px',
          borderRadius: 2,
          boxShadow: 3,         
        }}
      >
        <Avatar sx={IconStyle}>
          <LockIcon />
        </Avatar>
        <Typography variant="h6" sx={TypographyStyle} >
          COFFEE BEANS LOGIN
        </Typography>
        <Box component="form" noValidate sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', gap: '10px' }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="user_name"
            onChange={handleChange}
            value={formData.username}
            sx={TextFieldStyle}
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
            value={formData.password}
            onChange={handleChange}
            sx={TextFieldStyle}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={ButtonStyle}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={ButtonStyle}
            onClick={handleClick}
          >
            Sign Up
          </Button>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="error" >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default Login;