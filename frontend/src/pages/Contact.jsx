import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { TypographyStyle,ButtonStyle,TextFieldStyle } from '../styles';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with actual form handling logic
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", padding: "30px", gap: "20px", mt: 0, mb: 2 }}>
            <Box>
                <iframe src="https://www.google.com/maps/embed?pb=!1m22!1m8!1m3!1d10015.042582034217!2d0.9015122!3d51.1313229!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d51.1207782!2d0.8975211!4m5!1s0x47dedb1db1eafd03%3A0x5a0c06f42055f74!2sCoffee%20Bean%20Shop%20Unit%2013%2C%20Business%20Park%2C%20Connect%2010%20Foster%20Rd%20Willesborough%2C%20Ashford%20TN24%200FE!3m2!1d51.1313366!2d0.9015276999999999!5e0!3m2!1sen!2suk!4v1746360070771!5m2!1sen!2suk" width="600"
                    height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", padding: "20px", gap: "20px", width: "100%" }}>
                <Typography variant="h4" sx={TypographyStyle}  >Contact Us</Typography>
                <Typography variant="body1" sx={TypographyStyle}   >
                    Need any more help? Please feel free to contact one of the Coffee Beaners today, they just love talking all things coffee!
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: 500,
                        margin: '0 auto',
                        gap: 2,
                    }}
                >
                    <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required fullWidth sx={TextFieldStyle}/>
                    <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required fullWidth sx={TextFieldStyle}/>
                    <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required fullWidth sx={TextFieldStyle}/>
                    <TextField label="Message" name="message" value={formData.message} onChange={handleChange} required multiline rows={4} fullWidth sx={TextFieldStyle}/>
                    <Button type="submit" variant="contained" sx={ButtonStyle}> Send</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default Contact;