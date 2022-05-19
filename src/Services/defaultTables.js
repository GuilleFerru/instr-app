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

export const dailyWorksInitialRowData = {
  _id: 0,
  action: '1',
  attelier: 0,
  beginDate: '',
  complete: 'C',
  description: '',
  endDate: '',
  manteinance: '1',
  ot: '',
  plant: 0,
  routineScheduleId: '',
  sector: 'Instrumentos-Sistemas',
  tag: '',
  timeSchedule: '5'
}

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

export const otherRoutinesInitialRowData = {
  _id: 0,
  routineId: 0,
  plant: 0,
  attelier: 0,
  tag: '',
  ot: '',
  frecuency: 0,
  checkDay: '',
  description: '',
  complete: '',
  filePath: '',
  nickname: ''
}

export const defaultDailyWorksRoutineTable = [
  {
    field: "_id",
    title: "Numero",
    hidden: true,
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
    field: "beginDate",
    title: "Fecha de inicio",
  },
  {
    field: "endDate",
    title: "Fecha de realización",
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

export const defaultPlantShutdownsTable = [
  {
    field: "_id",
    title: "Numero",
    hidden: true,
  },
  {
    field: "name",
    title: "Nombre",
    type: "string",
  },
  {
    field: "beginDate",
    title: "Fecha de inicio",
    type: "date",
  },
  {
    field: "endDate",
    title: "Fecha de finalización",
    type: "date",
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

export const plantShutDownsInitialRowData = {
  _id: 0,
  name: '',
  beginDate: 1 / 1 / 2022,
  endDate: 2 / 1 / 2022,
  description: '',
  complete: '',
}