export const layOutStyle = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        //flexDirection: "column",
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        '&>div:nth-child(3)': {
                display: 'flex',
                flexFlow: 'column noWrap',
                width: '100%',
                overflow: 'hidden',
            },
        [theme.breakpoints.down('sm')]: {
            // Ajustes para pantallas pequeñas
            padding: theme.spacing(1),
        },
    },
    pages: {
        display: "flex",
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        overflowX: 'auto',
        overflowY: 'auto',
        padding: theme.spacing(2),
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
});





// export const layOutStyle = theme => {
//     return ({
//         root: {
//             backgroundColor: theme.palette.background.paper,
//             display: "flex",
            
//             height: 'auto',
//             minHeight: '100vh',
//             width: '100%',
//             // '&>div:nth-child(3)': {
//             //     display: 'flex',
//             //     flexFlow: 'column noWrap',
//             //     width: '100%',
//             // },
//             [theme.breakpoints.down('sm')]: {
//                 // Ajustes para pantallas pequeñas
//                 padding: theme.spacing(1),
//             },

//         },
//         pages: {
//             display: "flex",
//             flexFlow: 'column noWrap',
//             width: '100%',
//             height: 'auto',
//             //border: '1px solid blue',
//         },
//         content: {
//             display: 'flex',
//             flexFlow: 'column noWrap',
//             width: '100%',
//             height: 'auto'
//         }
//     })
// }