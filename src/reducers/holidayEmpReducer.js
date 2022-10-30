import { TYPES } from "../actions/holidayEmpActions";

export const holidayEmpInitialState = {
    employee: "",
    employeeName: '',
    employeeCondition: '',
    leftDays: undefined,
};


export const holidayEmpReducer = (state, action) => {
    switch (action.type) {
        case TYPES.TOOGLE_PERIOD: {
            if (state.employee !== '') {
                let employee = action.payload.length > 1 ? action.payload.find(emp => emp.id === state.employee) : state;
                return {
                    ...state,
                    employee: employee.id,
                    employeeName: employee.name,
                    employeeCondition: employee.employeeCondition,
                    leftDays: employee.holidayDays,

                };
            } else {
                return {
                    ...state,
                    employee: action.payload[0].id,
                    employeeName: action.payload[0].name,
                    employeeCondition: action.payload[0].employeeCondition,
                    leftDays: action.payload[0].holidayDays,
                };
            }
        }
        case TYPES.TOOGLE_EMP_OPTIONS: {            
            return {
                ...state,
                employee: action.payload.id,
                employeeName: action.payload.name,
                employeeCondition: action.payload.employeeCondition,
                leftDays: action.payload.holidayDays,
            };
        }
        default:
            return state;
    }
}