import React, { useState } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, Typography } from '@mui/material';

const BeanSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 2) {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/beans/search?query=${value}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <TextField fullWidth label="Search Beans" variant="outlined" value={query} onChange={handleSearch} sx={{ mb: 2 }} />
      <List>
        {results.map(bean => (
          <ListItem key={bean.id}>
            <Typography>{bean.name} — {bean.origin}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BeanSearch;