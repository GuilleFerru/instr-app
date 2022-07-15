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
    field: "id",
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
    field: '_id',
    title: 'Numero',
    hidden: true,
  },
  {
    field: "name",
    title: "Nombre",
    type: "string",
    width: "15%"
  },
  {
    field: 'beginDate',
    title: 'Fecha de inicio',
    type: 'date',
    dateSetting: { locale: 'es-AR', format: 'dd-MMM-yyyy' },
    defaultSort: 'asc',
    width: "15%"

  },
  {
    field: 'endDate',
    title: 'Fecha de finalización',
    type: 'date',
    dateSetting: { locale: 'es-AR', format: 'dd-MMM-yyyy' },
    width: "15%"
  },
  {
    field: 'timeSchedule',
    title: 'Horario de trabajo',
    lookup: {},
    initialEditValue: '5',
    width: "15%"
  },
  {
    field: 'description',
    title: 'Descripción',
    multiline: true,
    width: '30%'
  },
  {
    field: 'complete',
    title: 'Estado',
    lookup: {
      'E': 'En ejecución',
      'P': 'Pendiente',
      'C': 'Completado',
      'RE': 'Reprogramado',
    },
    initialEditValue: 'P',
    width: "10%"
  }
];

export const plantShutDownsInitialRowData = {
  name: '',
  beginDate: new Date(),
  endDate: undefined,
  timeSchedule: 13,
  description: '',
  complete: 'P',
}

export const defaultPlantShutdownWorksToDoTable = [
  {
    field: 'id',
    title: 'Numero',
    hidden: true,
  },
  {
    field: 'plant',
    title: 'Planta',
    lookup: {},
    editable: 'never',
    defaultGroupOrder: 0,
    width: "10%",
  },
  {
    field: 'attelier',
    title: 'Attelier',
    lookup: {},
    editable: 'never',
    width: "10%"
  },
  {
    field: 'tag',
    title: 'TAG',
    type: 'string',
    editable: 'never',
    width: "10%"
  },
  {
    field: 'ot',
    title: 'OT',
    type: 'string',
    width: "10%"
  },
  {
    field: 'description',
    title: 'Trabajo a realizar',
    multiline: true,
    align: "justify",
    width: '40%'
  },
  {
    field: 'plantShutdownWorkId',
    title: 'Asignar a Paro',
    lookup: {},
    width: "10%"
  },
  {
    field: 'complete',
    title: 'Estado',
    lookup: {
      'E': 'En ejecución',
      'P': 'Pendiente',
      'C': 'Completado',
      'R': 'Demorado',
      'PP': 'Paro de planta',
    },
    width: "10%"
  }
]


export const defaultPlantShutdownWorksTable = [
  {
    field: 'id',
    title: 'Numero',
    hidden: true,
  },
  {
    field: 'plant',
    title: 'Planta',
    lookup: {},
    width: "10%",
  },
  {
    field: 'attelier',
    title: 'Attelier',
    lookup: {},
    width: "5%"
  },
  {
    field: 'tag',
    title: 'TAG',
    type: 'string',
    width: "5%"
  },
  {
    field: 'timeSchedule',
    title: 'Horario',
    lookup: {},
    initialEditValue: '5',
    width: "5%"
  },
  {
    field: 'ot',
    title: 'OT',
    type: 'string',
    width: "5%"
  },
  {
    field: 'action',
    title: 'Acción',
    lookup: {},
    initialEditValue: "1",
    width: "10%"
  },
  {
    field: 'workToDo',
    title: 'Trabajo a realizar',
    multiline: true,
    align: "justify",
    width: '25%'
  },
  {
    field: 'description',
    title: 'Trabajo realizado',
    multiline: true,
    align: "justify",
    width: '25%'
  },
  {
    field: 'complete',
    title: 'Estado',
    lookup: {
      'E': 'En ejecución',
      'P': 'Pendiente',
      'C': 'Completado',
      'R': 'Demorado',
      'RE': 'Reprogramado',
    },
    width: "10%"
  }
];

export const plantShutDownWorksInitialRowData = (timeSchedule) => ({
  plant: 0,
  attelier: 0,
  tag: '',
  timeSchedule: timeSchedule,
  ot: '',
  action: 1,
  workToDo: '',
  description: '',
  complete: 'P'
})

export const defaultHolidayScoreTable = [
  { field: 'id', title: 'Numero', hidden: true },
  {
    field: 'legajo',
    title: 'Legajo',
    editable: 'never',
    width: '10%'
  },
  {
    field: 'fullName',
    title: 'Nombre Completo',
    lookup: {},
    editable: 'never',
    width: '30%'
  },
  {
    field: 'averagePoints',
    title: 'Promedio',
    editable: 'never',
    width: '15%'
  },
  {
    field: 'rotativeShiftResult',
    title: 'Turno',
    editable: 'never',
    width: '15%'
  },
  {
    field: 'dailyShiftResult',
    title: 'Diurno',
    editable: 'never',
    width: '15%'
  },
  {
    field: 'generalResult',
    title: 'General',
    editable: 'never',
    width: '15%'
  }
]

export const holidayScoreInitialRowData = {
  id: 0,
  legajo: '',
  fullName: '',
  averagePoints: 0,
  rotativeShiftResult: '',
  dailyShiftResult: '',
  generalResult: ''
}
