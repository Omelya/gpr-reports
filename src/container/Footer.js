import React from "react";
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";

const Footer = () => {
    return (
        <Container maxWidth={"xl"} sx={{backgroundColor: '#1976d2'}}>
            <Typography sx={{
                color: "#fff"
            }}>
                Footer
            </Typography>
        </Container>
    )
}

export default Footer;
