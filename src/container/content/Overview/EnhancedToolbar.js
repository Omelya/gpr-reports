import {alpha} from "@mui/material/styles";
import {IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import React from "react";
import PropTypes from "prop-types";
import {Form} from "react-router-dom";

const EnhancedToolbar = (props) => {
    const {numSelected, id} = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Engagement table
                </Typography>
            )}

            {
                numSelected > 0 &&
                <Tooltip title="Delete">
                    <IconButton onClick={() => props.handleRemove()}>
                        <Delete/>
                    </IconButton>
                </Tooltip>
            }

            {
                numSelected === 1 &&
                <Tooltip title="Edit">
                    <Form method="post">
                        <IconButton type='submit' name='id' value={id}>
                            <Edit/>
                        </IconButton>
                    </Form>
                </Tooltip>
            }

        </Toolbar>
    )
}

EnhancedToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleRemove: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}

export default EnhancedToolbar;
