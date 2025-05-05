import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { TypographyStyle,ButtonStyle,TextFieldStyle, IconStyle } from '../styles';


const SignUpForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // State to manage errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.user_name) newErrors.user_name = "Name is required";
    if (!formData.user_email) {
      newErrors.user_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = "Enter a valid email";
    }
    if (!formData.user_password) {
      newErrors.user_password = "Password is required";
    } else if (formData.user_password.length < 6) {
      newErrors.user_password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {     
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/createuser`,{
        method:"POST",
        body:JSON.stringify(formData),
        headers:{
            "content-type":"application/json"
        }
    })
    if(response.ok){
      navigate('/')
  }    
    }    
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={TypographyStyle}>
          SIGN UP
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', gap: '10px' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                error={!!errors.user_name}
                helperText={errors.user_name}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                error={!!errors.user_email}
                helperText={errors.user_email}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="user_password"
                type="password"
                value={formData.user_password}
                onChange={handleChange}
                error={!!errors.user_password}
                helperText={errors.user_password}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={ButtonStyle}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpForm;