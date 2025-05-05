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
  backgroundColor: '#2c2c2c',
  padding: '8px 16px', // Corrected 'paddding' to 'padding' and reduced size
  letterSpacing: 1.5,
  fontSize: '0.875rem',
  color: 'white',
  textShadow: '0.5px 0.5px 1px rgba(255, 255, 255, 0.3)',
  fontFamily: 'serif',
  border: '2px solid #2c2c2c',
  textTransform: 'uppercase',
  minWidth: 'auto', // Prevents unnecessary stretching
  width: 'fit-content', // Keeps width tight to content
  '&:hover': {
    backgroundColor: '#eaf3e6',
    color: '#2c2c2c',
  },
};


export const ListItemStyle = {
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
  }
};

export const IconStyle = {
  fontWeight: 'bold',
  color: '#2c2c2c',
};

export const TextFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#8cac89',
    },
  },
};

export const TableStyle = {
  minWidth: 650,
  borderCollapse: 'collapse',
  '& th, & td': {
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#2c2c2c', // dark text color
    textShadow: '0.5px 0.5px 1px rgba(255, 255, 255, 0.3)',
    fontFamily: 'serif',
    padding: '12px 16px',
  },
  '& th': {
    backgroundColor: '#8cac89', // Updated to match the desired color
    color: '#fff', // White text for contrast
  },
  '& tr:hover': {
    backgroundColor: '#f9f9f9', // Light hover color for rows
  },
};