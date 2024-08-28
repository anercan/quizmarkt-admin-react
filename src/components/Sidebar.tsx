import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Link} from "react-router-dom";
import {Drawer, ListItemIcon} from "@mui/material";
import theme from "../utils/theme";
import {Dataset, Home, VerifiedUser} from "@mui/icons-material";

const Sidebar: React.FC = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    color: theme.palette.primary.main,
                    bgcolor: theme.palette.secondary.main
                },
            }}
        >
            <List style={{marginTop:70}}>
                <ListItem button component={Link as any} to="/">
                    <ListItemIcon>
                        <Home color={'info'} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem button component={Link as any} to="/data">
                    <ListItemIcon>
                        <Dataset color={'info'} />
                    </ListItemIcon>
                    <ListItemText primary="Data"/>
                </ListItem>
                <ListItem button component={Link as any} to="/users">
                    <ListItemIcon>
                        <VerifiedUser color={'info'} />
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
