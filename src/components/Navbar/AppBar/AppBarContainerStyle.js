const drawerWidth = 240;


export const appBarContainerStyle = theme => {
    return ({
        toolbar: {
            //border: '1px solid red',
            display: 'flex',
            background: 'green',
            paddingRight: "24", // keep right padding when drawer closed
            // witdh: 'auto',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        toolbarContent: {
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            '& h1:nth-child(1)': {
                flexGrow: '100',
            },
            '& h1:nth-child(2)': {
                flexGrow: '1',
            }

        },
        menuButton: {
            marginRight: "36",
        },
        menuButtonHidden: {
            display: "none",
        },
    })
}