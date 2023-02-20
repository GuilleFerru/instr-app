const drawerWidth = 240;


export const appBarContainerStyle = theme => {
    return ({
        toolbar: {
            //border: '1px solid red',
            display: 'flex',
            background: '#069999',
            paddingRight: "24", // keep right padding when drawer closed
            width: '100%',
            // witdh: 'auto',
        },
        appBar: {
            //border: '1px solid red',
            //width: 'fit-content',
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
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            '& h1:nth-child(1)': {
                flexGrow: '100',
            },
            '& h1:nth-child(2)': {
                flexGrow: '1',
            }
        },
        toolbarSubMenu: {
            display: 'flex',
            flexFlow: 'row wrap',
            gap: '0.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        menuButton: {
            marginRight: "36",
        },
        menuButtonHidden: {
            display: "none",
        },
    })
}