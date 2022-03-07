export const scheduleEmpDefault = [
  {
    field: "id",
    title: "Numero",
    hidden: true,
  },
  {
    field: "legajo",
    title: "Legajo",
    editable: "never",
  },
  {
    field: "fullName",
    title: "Nombre Completo",
    lookup: {},
  },
  {
    field: "timeSchedule",
    title: "Horario",
    lookup: {},
  },
  {
    field: "workedHours",
    title: "Horas Trabajadas",
    align: "left",
    type: "numeric",
  },
];

export const dailyWorksDefault = [
  {
    field: "_id",
    title: "Numero",
    hidden: true,
  },
  {
    field: "plant",
    title: "Planta",
    lookup: {},
  },
  {
    field: "attelier",
    title: "Attelier",
    lookup: {},
  },
  {
    field: "tag",
    title: "TAG",
    type: "string",
  },
  {
    field: "timeSchedule",
    title: "Horario",
    lookup: {},
  },
  {
    field: "manteinance",
    title: "Tipo de mto",
    lookup: {},
  },
  {
    field: "ot",
    title: "OT",
    type: "string",
    align: "left",
  },
  {
    field: "action",
    title: "Acción",
    lookup: {},
  },
  {
    field: "description",
    title: "Descripción",
    multiline: true,
    width: "40%",
  },
  {
    field: "complete",
    title: "Estado",
    lookup: {},
  },
];

export const otherRoutinesDefault = [
  {
    field: "_id",
    title: "Numero",
    hidden: true,
  },
  {
    field: "nickname",
    title: "Nickname",
    type: "string",
  },
  {
    field: "plant",
    title: "Planta",
    lookup: {},
  },
  {
    field: "attelier",
    title: "Attelier",
    lookup: {},
  },
  {
    field: "tag",
    title: "TAG",
    type: "string",
  },
  {
    field: "timeSchedule",
    title: "Horario",
    lookup: {},
  },
  {
    field: "manteinance",
    title: "Tipo de mto",
    lookup: {},
  },
  {
    field: "ot",
    title: "OT",
    type: "string",
    align: "left",
  },
  {
    field: "action",
    title: "Acción",
    lookup: {},
  },
  {
    field: "description",
    title: "Descripción",
    multiline: true,
    width: "40%",
  },
  {
    field: "complete",
    title: "Estado",
    lookup: {},
  },
  {
    field: "filePath",
    title: "Adjuntar archivo",
    type: "string",
  },
];
