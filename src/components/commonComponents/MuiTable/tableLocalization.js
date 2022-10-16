export const tableLocalization = (LoadDataTable, data) => ({
    header: {
        actions: 'Acciones'
    },
    body: {
        emptyDataSourceMessage: <LoadDataTable data={data} />,
        deleteTooltip: 'Borrar Fila',
        editTooltip: 'Editar Fila',
        bulkEditTooltip: 'Editar todo',
        bulkEditApprove: 'Aprobar',
        bulkEditCancel: 'Cancelar',
        addTooltip: 'Agregar',
        filterRow: 'Filtrar por',
        editRow: {
            deleteText: 'Esta seguro de borrar esta fila?',
        }
    },
    grouping: {
        placeholder: 'Arrastre para agrupar',
        groupedBy: 'Agrupado por'
    },
    toolbar: {
        searchTooltip: 'Buscar',
        searchPlaceholder: 'Buscar',
        nRowsSelected: '{0} fila(s) seleccionada(s)',
        exportTitle: 'Exportar a PDF',
        exportAriaLabel: 'Exportar a PDF',
        showColumnsTitle: 'Mostrar Columnas',
        showColumnsAriaLabel: 'Mostrar Columnas',
    },
    pagination: {
        labelRowsSelect: 'filas',
        labelDisplayedRows: '{count} de {from}-{to}',
        firstTooltip: 'Primera página',
        previousTooltip: 'Página anterior',
        nextTooltip: 'Próxima página',
        lastTooltip: 'Última página'
    }
})
