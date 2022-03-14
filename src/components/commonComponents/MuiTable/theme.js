import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#128726',
        },
        secondary: {
            main: '#47BD77',
        },
    },
    // MuiTableCell: {
    //     border: '1px solid black',
    //     root: {
    //         '& tr': {
    //             '&:td:last-child div': {
    //                 justifyContent: 'center'
    //             }
    //         }
    //     }
    // }
})

export default theme;