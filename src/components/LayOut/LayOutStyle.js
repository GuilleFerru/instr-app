export const layOutStyle = theme => {
    return ({
        root: {
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            height: 'auto',
            minHeight: '100vh',
            '&>div:nth-child(3)': {
                // border: '3px solid red',
                display: 'flex',
                flexFlow: 'column noWrap',
                width: '100%',
                // height:'auto'
            }
        },
        pages: {
            display: "flex",
            flexFlow: 'column noWrap',
            width: '100%',
            height: 'auto',
            // border: '1px solid blue',
        },
        content: {
            // border: '1px solid black',
            display: 'flex',
            flexFlow: 'column noWrap',
            width: '100%',
            height: 'auto'
        }
    })
}