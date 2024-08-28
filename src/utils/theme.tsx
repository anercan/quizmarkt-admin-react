import {createTheme} from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
    palette: {
        mode: 'dark', // or 'dark' if you prefer a dark theme
        background: {
            default: '#9c9c9c', // Custom background color
            paper: '#9c9c9c', // Custom paper color
        },
        primary: {
            main: '#d9d9d9', // Primary color
        },
        info: {
            main: '#b0e2c9', // Primary color
        },
        secondary: {
            main: '#8d8d8d', // Secondary color
        }
        // Add more palette customizations if needed
    },
    typography: {
        // Customize typography if needed
    },
    // Add more theme customizations if needed
});

export default theme;
