import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from "./components/MainLayout";
import theme from "./utils/theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {routes} from "./utils/routes";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/> Normalize CSS
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        {routes.map(route => <Route path={route.path} element={route.element}/>)}
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}


export default App;
