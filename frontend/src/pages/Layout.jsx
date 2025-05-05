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
import { CounterContext } from "../context/Context";
import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AddBeans from "./AddBeans";
import SignUpForm from "./SignUp";
import BeanDetail from "./BeanDetail";


function Layout() {
    const { isLoggedIn } = useContext(CounterContext);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decoded = jwtDecode(token);
            setRole(decoded.role); // Extract the role from the decoded token        
        }
        setLoading(false);
        console.log(role)

    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while waiting for role
    }

    // Protected Route based on role
    const ProtectedRoute = ({ children, requiredRole }) => {
        if (role === requiredRole) {
            return children; // Render children (i.e., the component)
        } else {
            return <Navigate to="/Login" />; // Redirect to login if role doesn't match
        }
    };
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
                            {<Route path="/Details/:id" element={<BeanDetail/>}></Route>}
                            <Route path="/Shop" element={<BeanList />}></Route>
                            <Route path="/Login" element={<Login />}></Route>
                            <Route path="/Cart" element={<Cart />}></Route>
                            <Route path="/AddBeans" element={
                                <ProtectedRoute requiredRole="admin">
                                    <AddBeans /></ProtectedRoute>}
                            />
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