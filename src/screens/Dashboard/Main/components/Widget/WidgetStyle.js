export const widgetStyle = theme => {
    return ({
        widget: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            flex: '1',
            padding: '10px',
            webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
            boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            borderRadius: '10px',
            height: 'auto',
            fontFamily: 'Nunito, sans-serif',

        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'rgb(160, 160, 160);',
            marginBottom: '10px',
        },
        info: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontSize: '16px',
            //color: 'rgb(160, 160, 160);',
            marginBottom: '2px',
        },
        infoTitle: {
            display: 'flex',
            flexDirection: 'column',
            fontSize: '16px',
            //color: 'rgb(160, 160, 160);',
            marginBottom: '2px',
        },
        percentage: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.2rem',
            '& > positive': {
                color: '#00ff00',
            },
            '& > negative': {
                color: '#ff0000',
            }
        },
        icon: {
            fontSize: '30px',
            padding: '5px',
            borderRadius: '50%',
            alignSelf: 'flex-end',
        }
    })
}