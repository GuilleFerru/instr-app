import { TYPES } from "../actions/employeeCrudActions";

export const employeeCrudInitialState = {
    db: null,
    aux: null,
};

export const employeeCrudReducer = (state, action) => {

    switch (action.type) {
        case TYPES.CREATE_EMPLOYEE: {
            return {
                ...state,
            };
        } case TYPES.UPDATE_EMPLOYEE: {
            return {
                ...state,
            };
        } case TYPES.READ_ALL_EMPLOYEES: {
            return {
                ...state,
                db: action.payload.employees?.map((data) => data),
                aux: action.payload.shiftOptions?.map((data) => data),
            };
        }
        case TYPES.NO_DATA:
            return employeeCrudInitialState;
        default:
            return state;
    }
}