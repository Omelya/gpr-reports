import Coordinates from "./Coordinates";
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const CoordinatesBlock = (props) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Coordinates
                name='coordinates_north'
                coordinates={props.coordinates}
                type='N'
            />
            <Coordinates
                name='coordinates_east'
                coordinates={props.coordinates}
                type='E'
            />
        </Box>
    )
}

CoordinatesBlock.propTypes = {
    coordinates: PropTypes.string
}

export default CoordinatesBlock;
