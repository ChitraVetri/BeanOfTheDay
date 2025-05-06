import { Box, Container, Toolbar } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home';
import About from './About';
import Header from "../components/Header";
import Footer from "../components/Footer";
import BeanList from "../components/BeanList";
import Contact from "./Contact";
import Login from "./Login";
import Cart from "./Cart";
import  { useAuth} from '../context/AuthContext';
import React from 'react';
import SignUpForm from "./SignUp";
import BeanDetail from "./BeanDetail";
import BeanSearch from "../components/BeanSearch";
import OrderSuccess from "./OrderForm";


function Layout() {
    const { isLoggedIn } = useAuth(); // Get login status and role from context
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {isLoggedIn ?
                <>
                    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }}>
                        <Header />
                    </Box>

                    <Toolbar />

                    <Container maxWidth={false} disableGutters
                        sx={{
                            backgroundImage: 'linear-gradient(to bottom, #8cac89 0%, #eaf3e6 100%)',
                            padding: 0                            
                        }}>
                        <Routes>
                            {/* Redirect root path to Home */}
                            <Route path="/" element={<Navigate to="/Home" />} />
                            <Route path="/Home" element={<Home />}></Route>
                            <Route path="/About" element={<About />}></Route>
                            <Route path="/Contact" element={<Contact />}></Route>
                            <Route path="/BeanDetails/:id" element={<BeanDetail/>}></Route>
                            <Route path="/SearchBeans" element={<BeanSearch/>}></Route>
                            <Route path="/OrderForm" element={<OrderSuccess/>}></Route>
                            <Route path="/Shop" element={<BeanList />}></Route>
                            <Route path="/Login" element={<Login />}></Route>
                            <Route path="/Cart" element={<Cart />}></Route>                            
                        </Routes>
                    </Container>
                    <Box sx={{ mt: 'auto' }}>
                        <Footer />
                    </Box>
                </> : <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUpForm />} />
                </Routes>}
        </Box>
    )
}

export default Layout;