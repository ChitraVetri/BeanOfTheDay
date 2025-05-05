export const TypographyStyle = {
    flexGrow: 1,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#2c2c2c', // dark text for light background
    textShadow: '0.5px 0.5px 1px rgba(255, 255, 255, 0.3)', // soft highlight
    fontFamily: 'serif',
};

export const ButtonStyle = {    
    fontWeight: 'bold',
    backgroundColor:'#2c2c2c', // dark text for light background
    paddding: '10px 20px',
    letterSpacing: 2,
    color: 'white', // dark text for light background
    textShadow: '0.5px 0.5px 1px rgba(255, 255, 255, 0.3)', // soft highlight
    fontFamily: 'serif', // serif font family    
    border: '2px solid #2c2c2c', // Optional: Border color for better definition
    textTransform: 'uppercase', // Ensures the button text is capitalized
    '&:hover': {
        backgroundColor: '#eaf3e6', // Light background color on hover
        color: '#2c2c2c', // Maintain text color on hover
    }};

export const ListItemStyle  = {
    flexGrow: 1,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#2c2c2c',
    textShadow: '0.5px 0.5px 1px rgba(255, 255, 255, 0.3)',
    fontFamily: 'serif',
    '& .MuiListItemText-primary': {
      color: '#2c2c2c', // Dark color for primary text
      fontWeight: 'bold',
    },
    '& .MuiListItemText-secondary': {
      color: '#555', // Lighter color for secondary text
      fontStyle: 'italic',
    }};
  
export const IconStyle =    {    
    fontWeight: 'bold',   
    color: '#2c2c2c',
};
   
export const TextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#8cac89',
      },
    },
  }