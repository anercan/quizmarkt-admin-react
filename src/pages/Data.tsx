import React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {Link} from "react-router-dom";
import theme from "../utils/theme";

const Data = () => {
    const divStyle: any = {
        width: '200px',
        height: '100px',
        backgroundColor: '#555d5e',
        color: theme.palette.info.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
    };

    return (
        <div>
            <Button style={divStyle}
                    component={Link as any}
                    to="/life-in-the-uk-data"
                    variant="outlined"
                    color="info">
                Life In The UK
            </Button>
        </div>
    );
};

export default Data;
