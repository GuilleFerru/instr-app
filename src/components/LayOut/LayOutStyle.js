export const layOutStyle = theme => {
    return ({
        root: {
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            height: 'auto',
            minHeight: '100vh',
            width: '100%',
            '&>div:nth-child(3)': {
                //border: '1px solid red',
                display: 'flex',
                flexFlow: 'column noWrap',
                width: '100%',
                // height:'auto'
            },
            //border: '1px solid red',
            //width: '100wh',
            //width: 'fit-content',

        },
        pages: {
            display: "flex",
            flexFlow: 'column noWrap',
            width: '100%',
            height: 'auto',
            //border: '1px solid blue',
        },
        content: {
            display: 'flex',
            flexFlow: 'column noWrap',
            width: '100%',
            height: 'auto'
        }
    })
}