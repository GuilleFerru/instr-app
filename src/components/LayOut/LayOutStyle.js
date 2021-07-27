export const layOutStyle = theme => {
    return ({
        root: {
            display: "flex",
            '&>div:nth-child(3)':{
                // border: '3px solid red',
                display:'flex',
                flexFlow: 'column noWrap',
                width: '100%',
                height:'100vh'
            }
        },
        pages: {
            width: '100%'
        },
        content: {
            // flexGrow: "1",
            // // height: "100vh",
            // overflow: "auto",
        },
    })
}