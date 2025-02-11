import React from 'react';
import {Outlet} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Box } from '@mui/material';
import Sidebar from './Sidebar';
import {usePageTitle} from "../utils/usePageTitle";

const MainLayout: React.FC = () => {

    const location = usePageTitle();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h5" noWrap component="div">
                        Admin Panel || QuestMarkt - {location}
                    </Typography>
                </Toolbar>
            </AppBar>
            {location !== 'Login' && <Sidebar />}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: (theme) => theme.palette.background.default,
                    p: 0,
                    mt: 10,
                }}
            >
                <Container>
                    <Outlet /> {/* This is where the routed content will be rendered */}
                </Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
