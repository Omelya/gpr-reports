import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const Ammunition = (props) => {
    let name = Object.keys(JSON.parse(props.ammunition)),
        value = Object.values(JSON.parse(props.ammunition)),
        list = [];

    for (let n = 0; n < name.length; n++) {
        list.push([name[n].split('_').join(' '), value[n]])
    }

    return(
        list.map((item, keys) =>
            <Typography key={keys}>{item[0]}: {item[1]}</Typography>
        )
    )
}

Ammunition.propTypes = {
    ammunition: PropTypes.string,
}

export default Ammunition;
