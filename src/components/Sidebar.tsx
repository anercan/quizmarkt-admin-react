import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import { Drawer, IconButton, ListItemIcon } from "@mui/material";
import theme from "../utils/theme";
import { Dataset, Home, VerifiedUser, Menu } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

const Sidebar: React.FC = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

    const drawerContent = (
        <List style={{ marginTop: isMobile ? 0 : 70 }}>
            <ListItem button component={Link as any} to="/" onClick={() => isMobile && setDrawerOpen(false)}>
                <ListItemIcon>
                    <Home color="info" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link as any} to="/data" onClick={() => isMobile && setDrawerOpen(false)}>
                <ListItemIcon>
                    <Dataset color="info" />
                </ListItemIcon>
                <ListItemText primary="Data" />
            </ListItem>
            <ListItem button component={Link as any} to="/users" onClick={() => isMobile && setDrawerOpen(false)}>
                <ListItemIcon>
                    <VerifiedUser color="info" />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>
        </List>
    );

    return (
        <>
            {isMobile && (
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    style={{ position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
                >
                    <Menu />
                </IconButton>
            )}
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={!isMobile || isDrawerOpen}
                onClose={toggleDrawer}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        color: theme.palette.primary.main,
                        bgcolor: theme.palette.secondary.main,
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Sidebar;
