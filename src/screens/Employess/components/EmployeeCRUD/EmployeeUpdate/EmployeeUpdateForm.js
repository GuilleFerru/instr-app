import React from 'react'
import { EmployeeForm } from '../Form/EmployeeForm';

export const EmployeeUpdateForm = ({ employee, auxData, isDialogOpen, handleDialog, handleCrud, title }) => {

    //const [form, setForm] = useState([]);
    // const [openAlertError, setOpenAlertError] = useState(false);
    // const [openAlertSuccess, setOpenAlertSuccess] = useState(false);

    // useEffect(() => {
    //     setForm([
    //         {
    //             id: "legajo",
    //             name: "legajo",
    //             label: "Legajo",
    //             value: employee?.legajo,
    //             type: "number",
    //             disabled: true,
    //         },
    //         {
    //             id: "nombre",
    //             name: "nombre",
    //             label: "Nombre",
    //             value: employee?.nombre,
    //             type: "text",
    //             disabled: false,
    //         },
    //         {
    //             id: "apellido",
    //             name: "apellido",
    //             label: "Apellido",
    //             value: employee?.apellido,
    //             type: "text",
    //             disabled: false,
    //         },
    //         {
    //             id: "puesto",
    //             name: "puesto",
    //             label: "Puesto",
    //             value: employee?.puesto,
    //             type: "text",
    //             disabled: false,
    //         },
    //         {
    //             id: "categoria",
    //             name: "categoria",
    //             label: "Categoria",
    //             value: employee?.categoria,
    //             type: "text",
    //             disabled: false,
    //         },
    //         {
    //             id: "shift",
    //             name: "shift",
    //             value: employee?.shiftType,
    //         },
    //         {
    //             id: "turno",
    //             name: "turno",
    //             label: "Turno",
    //             value: employee?.shiftType === 'rotativeShift' ? employee?.shift : employee?.shift,
    //         },
    //         {
    //             id: "holidayDays",
    //             name: "holidays",
    //             label: "Dias de vacaciones",
    //             value: employee?.holidayDays,
    //             type: "number",
    //             disabled: false,
    //         },
    //         {
    //             id: "hireDate",
    //             name: "hireDate",
    //             label: "Fecha de contratacion",
    //             value: parseStringToHtmlInputType(employee?.hireDate),
    //             type: "date",
    //             hidden: true,
    //         },
    //     ]);

    // }, [employee]);


    // const handleChanges = (e) => {
    //     const { name, value } = e.target;
    //     setForm((prev) => {
    //         return prev.map((item) => {
    //             if (item.name === name) {
    //                 return { ...item, value: value }
    //             }
    //             return item;
    //         })
    //     })
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if ((form[5].value === "rotativeShift" && form[6].value >= 5) || (form[5].value === "dailyShift" && form[6].value <= 4)) {
    //         setOpenAlertError(true);
    //     } else {
    //         handleCrud(form);
    //         setOpenAlertError(false);
    //         setOpenAlertSuccess(true);
    //         handleDialog(false);
    //     }
    // }

    // const handleCloseAlert = (_event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpenAlertSuccess(false);
    //     setOpenAlertError(false);
    // };


    return <>

        <EmployeeForm title={title}
            isDialogOpen={isDialogOpen}
            auxData={auxData}
            employee={employee}
            handleDialog={handleDialog}
            handleCrud={handleCrud}
        />
    </>
}
