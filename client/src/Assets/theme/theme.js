import { createTheme } from "@mui/material";
import {blue} from "@mui/material/colors";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const theme = createTheme({
    palette: {
        primary: {
            main: '#5AAC44'
        },
        secondary: {
            main: '#e1f5fe'
        },
        registeBtnTheme: {
            main: '#0052CC'
        }
    }

})

export const fontTheme = createTheme({
    typography: {
        fontFamily: 'Roboto'
    }
})