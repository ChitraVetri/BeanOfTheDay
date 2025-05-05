import { Box, Typography } from "@mui/material";
import { TypographyStyle } from '../styles';

function About() {
    return (
        <Box sx={{ display: "flex",flexDirection:"column", padding: "60px", gap: "60px" ,mt: 6, mb: 6,}}>


            <Typography variant="h4" sx={TypographyStyle}>About Us</Typography>
            <Typography variant="h5" sx={TypographyStyle} >THE COFFEE BEAN SHOP JOURNEY</Typography>
            <Typography variant="h6"  sx={TypographyStyle}>
                I LOVE THE SMELL AND TASTE OF FRESH COFFEE</Typography>
            <Typography variant="h6"  sx={TypographyStyle}>

                Not supermarket coffee, not coffee roasted months ago but really fresh roasted coffee beans that tastes so different from “old” roasted coffee.

                I purchased a Gaggia beans to cup machine for my home but noticed the coffee beans I bought were often black and oily with a bitter aftertaste. This changed when I had freshly roasted coffee beans from a coffee shop in Covent Garden. It was a revelation! Like no other coffee I had ever tasted!

                I wanted to share this experience, so the Coffee Bean Shop was founded in 2008. Since then, so much has happened to the business and I. Looking back, it's been hard work, fulfilling, enjoyable and sometimes daunting.                </Typography>

        </Box>)
}

export default About;