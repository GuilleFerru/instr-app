const shadowEffect = {
    webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
    boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
    borderRadius: '10px',
}

export const tableCardStyle = theme => {
    return ({
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            overflow: 'hidden',
            ...shadowEffect
            //border: '1px solid red',
        },
        // fixedHeight: {
        //     height: "240",
        // },
        appBarSpacer: theme.mixins.toolbar,
        container: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(5),
            display: 'flex',
            flexFlow: 'column noWrap',
            height: 'auto',

        },
        toolbarHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            height: '48px',
            [theme.breakpoints.down('xs')]: {
                height: '40px',
            },
            ...shadowEffect
        },
    })
}
