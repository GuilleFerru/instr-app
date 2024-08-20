export const addTooltipStyle = theme => {
    return ({
        fab: {
            margin: theme.spacing(1),
        },
        tooltipWrapper: {
            display: 'inline-block',  // Asegura que el span se ajuste al tamaño del botón
            cursor: (props) => (props.disabled ? 'not-allowed' : 'pointer'),  // Cambia el cursor si el botón está deshabilitado
        }
    })
}