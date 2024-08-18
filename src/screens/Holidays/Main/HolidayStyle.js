const shadowEffect = {
    webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
    boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
    borderRadius: '10px',
}

export const holidayStyle = theme => {
    return ({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '10px',
            width: '100%',
            maxWidth: '100vw',
            boxSizing: 'border-box',
            gap: '10px',
            height: 'auto',
            marginTop: '10px',
            fontFamily: 'Nunito, sans-serif',
            overflowX: 'auto', // Permite desplazamiento horizontal en pantallas pequeñas
            ...shadowEffect,
        },
        mainTitles: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: 'auto',
            margin: '0',
            padding: '0',
            boxSizing: 'border-box', // Asegura que el padding no afecte el ancho total
        },
        containerHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            boxSizing: 'border-box', // Asegura que el padding no afecte el ancho total
        },
    })
}

