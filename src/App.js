import React from "react";
import Header from "./container/Header";
import Footer from "./container/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Container from '@mui/material/Container';
import {Box, CssBaseline} from "@mui/material";
import './index.css';

function App() {
    return (
        <Box sx={{
            backgroundColor: 'rgba(243, 244, 246)'
        }}>
            <Container maxWidth={"xl"} sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'space-between'
            }}>
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />
                <CssBaseline/>
                <Header/>
                <Outlet/>
                <Footer/>
            </Container>
        </Box>
    );
}

export default App;
