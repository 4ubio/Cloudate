import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const greenTheme = createTheme({
    palette: {
        primary: {
            main: '#1F8A70'
        },
        secondary: {
            main: '#68B984'
        }, 
        error: {
            main: red.A400
        }
    }
})