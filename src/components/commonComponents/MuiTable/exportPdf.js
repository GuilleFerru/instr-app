import { ExportPdf } from '@material-table/exporters';

export const ExportPdfButton = (pdfTitle, disableExportMenu) => {
    return {
        label: 'Exportar a PDF',
        exportFunc: (cols, datas) => ExportPdf(cols, datas, pdfTitle)
    }
}