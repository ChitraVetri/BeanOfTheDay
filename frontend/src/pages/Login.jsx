import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Avatar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from "@mui/material";
import { TypographyStyle, ButtonStyle, TextFieldStyle, IconStyle } from '../styles';

function Login() {
  const { login } = useAuth(); // Get login status and login function from context
  const [errors, setErrors] = useState({});
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

  // Handle input change and clear error for that field
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user updates it
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name]; // Remove the error for the field being updated
      return newErrors;
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.user_name) newErrors.user_name = "Name is required";
    if (!formData.user_password) {
      newErrors.user_password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
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
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', gap: '10px' }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user_name"
            label="User name"
            name="user_name"
            autoComplete="user_name"
            onChange={handleChange}
            value={formData.user_name}
            sx={TextFieldStyle}
            error={!!errors.user_name}
            helperText={errors.user_name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="user_password"
            label="Password"
            type="password"
            id="user_password"
            autoComplete="current-password"
            value={formData.user_password}
            onChange={handleChange}
            error={!!errors.user_password}
            helperText={errors.user_password}
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