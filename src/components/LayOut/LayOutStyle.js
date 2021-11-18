export const layOutStyle = theme => {
    return ({
        root: {
            display: "flex",
            height:'auto',
            minHeight: '100vh',
            '&>div:nth-child(3)':{
                // border: '3px solid red',
                display:'flex',
                flexFlow: 'column noWrap',
                width: '100%',
                // height:'auto'
            }
        },
        pages: {
            width: '100%'
        }
    })
}