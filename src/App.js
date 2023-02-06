import Header from "./container/Header";
import Footer from "./container/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Container from '@mui/material/Container';
import {Box, CssBaseline} from "@mui/material";
import './index.css';

function App() {
    return (
        <Container maxWidth={"xl"}>
            <div className="h-screen flex flex-col h-screen">
                <CssBaseline/>
                <Header/>
                <div className='flex-grow'>
                    <Toaster
                        position="top-left"
                        reverseOrder={false}
                    />
                    <Outlet/>
                </div>
                <Box component="footer" sx={{
                    flexShrink: 0
                }}>
                    <Footer/>
                </Box>
            </div>
        </Container>
    );
}

export default App;
