export const dashboardStyle = theme => {
    return ({
        root: {
            display: 'flex',
        },
        rootContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            margin: '0px 2% 5% 0px',
        },
        widgets: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: '2%',
            gap: '2%',
        },
        chartsContainer: {
            //display: 'flex',
            //flexDirection: 'row',
            //flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'space-between',
            boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            borderRadius: '10px',
            height: 'auto',
            fontFamily: 'Nunito, sans-serif',
        },
        monthPicker: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '2%',
        },
        charts: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0px 2%',
            padding: '2%',
            gap: '2%',
            flexWrap: 'wrap',
        },
        // Media query para pantallas más pequeñas
        [theme.breakpoints.down('md')]: { // Cambiado a 'md' para más pruebas
            charts: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                margin: '0px', 
                padding: '10px',
                gap: '10px',
            },
            chartsContainer: {
                justifyContent: 'center',
            },
            chartsIndividual: {
                minWidth: '45%', // Asegura que los gráficos ocupen al menos un 45% del contenedor
            },
        },
    });
};



// export const dashboardStyle = theme => {
//     return ({
//         root: {
//             display: 'flex',
//         },
//         rootContainer: {
//             display: 'flex',
//             flexDirection: 'column',
//             flex: 1,
//             margin: '0px 10px 100px 0px',
//         },
//         widgets: {
//             display: 'flex',
//             padding: '20px',
//             gap: '20px',
//         },
//         chartsContainer: {
//             display: 'flex',
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             flex: 1,
//             margin: '0px 20px',
//             justifyContent: 'space-between',
//             padding: '10px',
//             webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
//             boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
//             borderRadius: '10px',
//             height: 'auto',
//             fontFamily: 'Nunito, sans-serif',
//         },
//         monthPicker: {
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             margin: '10px',
//         },
        
//         charts: {
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100%',
//             margin: '0px 10px',
//             padding: '20px',
//         }
//     })
// }