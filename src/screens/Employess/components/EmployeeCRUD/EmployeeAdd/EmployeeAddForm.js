import React from 'react';
import { EmployeeForm } from '../Form/EmployeeForm';

export const EmployeeAddForm = ({ auxData, isDialogOpen, handleDialog, handleCrud, title }) => {

    // const [form, setForm] = useState([]);
    // const [openAlertError, setOpenAlertError] = useState(false);
    // const [openAlertSuccess, setOpenAlertSuccess] = useState(false);

    // useEffect(() => {
    //     setForm([
    //         {
    //             id: "legajo",
    //             name: "legajo",
    //             label: "Legajo",
    //             type: "number",
    //             value: "",
    //         },
    //         {
    //             id: "nombre",
    //             name: "nombre",
    //             label: "Nombre",
    //             type: "text",
    //             value: "",
    //         },
    //         {
    //             id: "apellido",
    //             name: "apellido",
    //             label: "Apellido",
    //             type: "text",
    //             value: "",
    //         },
    //         {
    //             id: "puesto",
    //             name: "puesto",
    //             label: "Puesto",
    //             type: "text",
    //             value: "",
    //         },
    //         {
    //             id: "categoria",
    //             name: "categoria",
    //             label: "Categoria",
    //             type: "text",
    //             value: "",
    //         },
    //         {
    //             id: "condicion",
    //             name: "Condicion",
    //             label: "Condicion",
    //             type: "text",
    //             value: "",

    //         },
    //         {
    //             id: "shift",
    //             name: "shift",
    //             value: "",
    //         },
    //         {
    //             id: "turno",
    //             name: "turno",
    //             label: "Turno",
    //             value: ""
    //         },
    //         {
    //             id: "holidayDays",
    //             name: "holidays",
    //             label: "Dias de vacaciones",
    //             type: "number",
    //             value: "",
    //         },
    //         {
    //             id: "hireDate",
    //             name: "hireDate",
    //             label: "Fecha de contratacion",
    //             type: "date",
    //             value: parseStringToHtmlInputType(new Date().toLocaleDateString()),
    //         },
    //     ]);

    // }, []);


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
    //         handleCrud(form)
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
            employee={null}
            handleDialog={handleDialog}
            handleCrud={handleCrud}
        />
    </>
}
