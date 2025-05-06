import { Box, Button, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { TypographyStyle, ButtonStyle, ListItemStyle, IconStyle } from '../styles';
import { useState } from 'react';

function Footer() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    
    // Form validation
    const validate = () => {
        const newErrors = {};
        if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubscribe = () => {
        if (validate()) {
            if (email.trim()) {
                setMessage('Thanks for your subscription!');
                setEmail('');
                setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            }
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: 'space-between',
                backgroundImage: 'linear-gradient(to bottom, #eaf3e6 0%, #8cac89 100%)',
                borderRadius: 2,
                flexDirection: { xs: "column", sm: "row" }, // Switch to column on smaller screen   
                color: '#1d1e20',
                gap: 4, // Space between sections
                mt: 0,
                mb: 4,
            }}
        >
            {/* Address Section */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={TypographyStyle}>Address</Typography>
                <List>
                    <ListItem>
                        <ListItemIcon sx={IconStyle}>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Location" secondary={null} sx={ListItemStyle} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={IconStyle}>
                            <CallIcon />
                        </ListItemIcon>
                        <ListItemText primary="Call +01 2656798784" secondary={null} sx={ListItemStyle} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={IconStyle}>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="allbeans@gmail.com" secondary={null} sx={ListItemStyle} />
                    </ListItem>
                </List>
            </Box>

            {/* Info Section */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={TypographyStyle}>Info</Typography>
                <Typography variant="h6" sx={TypographyStyle}>
                    Become part of the exclusive coffee bean club and we will be sending you the latest hot scoop on crops of coffee,
                    rare and exclusives along with delicious discounts and tasty promotions…. Ooooooh!!!
                </Typography>
            </Box>

            {/* Subscribe Section */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={TypographyStyle}>Subscribe</Typography>
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#8cac89',
                            },
                        },
                        mb: 2,
                    }}
                    id="standard-basic"
                    label="Enter your email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <Button sx={ButtonStyle} onClick={handleSubscribe}>
                    Subscribe
                </Button>
                {message && (
                    <Typography variant="body2" sx={TypographyStyle}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>

    )
}

export default Footer;