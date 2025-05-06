import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { TypographyStyle, ButtonStyle, TextFieldStyle } from '../styles';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = "Phone must contain only numbers";
          }
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log(formData); // Replace with actual form logic
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });

            setTimeout(() => setSubmitted(false), 4000); // Hide message after 4 seconds
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", padding: "30px", gap: "20px", mt: 0, mb: 2 }}>
            <Box>
                <iframe src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d10015.042582034217!2d0.9015122!3d51.1313229!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x47dedb1db1eafd03%3A0x5a0c06f42055f74!2sCoffee%20Bean%20Shop%20Unit%2013%2C%20Business%20Park%2C%20Connect%2010%20Foster%20Rd%20Willesborough%2C%20Ashford%20TN24%200FE!3m2!1d51.1313366!2d0.9015276999999999!5e0!3m2!1sen!2suk!4v1746533001971!5m2!1sen!2suk"
                    width="600"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="map"></iframe>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", padding: "20px", gap: "20px", width: "100%" }}>
                <Typography variant="h4" sx={TypographyStyle}>Contact Us</Typography>
                <Typography variant="body1" sx={TypographyStyle}>
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
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={TextFieldStyle}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={TextFieldStyle}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone}
                        sx={TextFieldStyle}
                    />
                    <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.message}
                        helperText={errors.message}
                        sx={TextFieldStyle}
                    />
                    <Button type="submit" variant="contained" sx={ButtonStyle}>Send</Button>
                    {submitted && (
                        <Typography variant="h6" sx={TypographyStyle}>
                            Thank you for contacting us!
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Contact;
