import { createTheme  } from '@material-ui/core/styles';

const theme = createTheme ({
    palette: {
        background: {
            default: "#ebeeef",
            paper: "#ffffff",
        },
        primary: {
            main: '#069999',
        },
        secondary: {
            main: '#47BD77',
        },
        black: {
            main: '#000000',
        }

    }
})

export default theme;