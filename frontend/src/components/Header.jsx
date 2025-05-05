import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, InputBase, Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Badge } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { updateCartCount } from "../redux/Slice";
import CoffeeIcon from '@mui/icons-material/Coffee';
import { TypographyStyle, IconStyle } from '../styles';
import axios from '../api/axios';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {

  const { logout, user } = useAuth(); // Get logout function from context

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/SearchBeans?q=${encodeURIComponent(query)}`);
      setQuery(''); // ✅ Clear input after search
    }
  };

  function handleClick() {
    navigate("/Cart")
  }

  function handleLogout() {
    logout()
    navigate("/Login")
  }
  const fetchTotalQuantity = (user) => async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart/totalquantity`, {
        params: { user }
      });
      dispatch(updateCartCount(response.data.totalQuantity));
    } catch (error) {
      console.error('Failed to fetch cart total quantity:', error);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalQuantity(user)); // Fetch badge count on load
  }, [dispatch, user]);

  const cartCount = useSelector((state) => state.carts.count);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar pposition="fixed" sx={{
        backgroundImage: 'linear-gradient(to bottom, #eaf3e6 0%, #8cac89 100% )',
        borderRadius: 2,
        flex: 1, mt: 2, mb: 2
      }}>
        <Toolbar>
          {/* Coffee icon */}
          <IconButton sx={{ color: '#2c2c2c', mr: 2 }}>
            <CoffeeIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={TypographyStyle}
          >
            COFFEE BEANS
          </Typography>
          <Paper sx={{ display: 'flex', alignItems: 'center', p: '2px 8px' }}>
            <InputBase
              placeholder="Search beans…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ flex: 1 }}
            />
            <IconButton onClick={handleSearch} sx={IconStyle}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['Home', 'About', 'Shop', 'Contact'].map((page) => (
              <Link to={`/${page}`} key={page} className="link-button" style={{ textDecoration: 'none' }}>
                <Button
                  color="inherit"
                  sx={TypographyStyle}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <IconButton aria-label="cart" onClick={handleClick}>
            <Badge badgeContent={cartCount}>
              <ShoppingCartIcon sx={IconStyle} />
            </Badge>
          </IconButton>
          <LogoutIcon sx={IconStyle} onClick={handleLogout}>LOGOUT</LogoutIcon>
        </Toolbar>
      </AppBar>
    </Box>
  );
}