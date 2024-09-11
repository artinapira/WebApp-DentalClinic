import * as types from './types';

const token1 = localStorage.getItem("token1");

const initialState = {
    userLogin: {
        loading: false,
        error: false,
        message: ""
    },
    userLogout: { message: "" },
    data: {
        token1: token1,
        user1: null,
        dentist: null,
        admin: null,
        ankesat: null,
        department: null,
        medicalrecord: null,
        patientnote: null,
        prescription: null,
        terapia: null,
        terminet: null,
        vlersimet: null,
    },
    message: ""
}

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.LOGIN_USER_REQUEST:
        case types.LOGIN_DENTIST_REQUEST:
        case types.LOGIN_ADMIN_REQUEST:
            return {
                ...state,
                userLogin: { loading: true, error: false, message: "" }
            };

        case types.LOGIN_USER_SUCCESS:
            console.log("Token from payload:", payload.token1);
            localStorage.setItem("token1", payload.token1);
            console.log('Updating token in reducer:', payload.token1);
            return {
                ...state,
                userLogin: { loading: false, error: false, message: payload.message },
                data: {
                    ...state.data,
                    token1: payload.token1,
                    user1: payload.user1 || state.data.user1,
                }
            };
        case types.LOGIN_DENTIST_SUCCESS:
            localStorage.setItem("token1", payload.token1);
            return {
                ...state,
                userLogin: { loading: false, error: false, message: payload.message },
                data: {
                    ...state.data,
                    token1: payload.token1,
                    dentist: payload.dentist || state.data.dentist,
                }
            }
        case types.LOGIN_ADMIN_SUCCESS:
            localStorage.setItem("token1", payload.token1);
            return {
                ...state,
                userLogin: { loading: false, error: false, message: payload.message },
                data: {
                    ...state.data,
                    token1: payload.token1,
                    admin: payload.admin || state.data.admin,
                }
            };

        case types.LOGIN_USER_ERROR:
        case types.LOGIN_DENTIST_ERROR:
        case types.LOGIN_ADMIN_ERROR:
            return {
                ...state,
                userLogin: { loading: false, error: true, message: payload.message }
            };

        case types.AUTH_LOGOUT:
            localStorage.removeItem("token1");
            return {
                ...state,
                userLogin: { loading: false, error: false, message: "" },
                userLogout: { message: "Logout Successfully" },
                data: {
                    token1: null,
                    user1: null,
                    dentist: null,
                    admin: null,
                    ankesat: null,
                    department: null,
                    medicalrecord: null,
                    patientnote: null,
                    prescription: null,
                    terapia: null,
                    terminet: null,
                    vlersimet: null,
                }
            };
            
        case types.GET_DENTIST_PROFILE_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    dentist: payload
                }
            };

        case types.GET_PATIENT_PROFILE_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    user1: payload
                }
            };

        case types.GET_ADMIN_PROFILE_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    admin: payload
                }
            };

        case types.GET_ANKESAT_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ankesat: payload
                }
            };

        case types.GET_DEPARTMENT_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    department: payload
                }
            };

        case types.GET_MEDICALRECORD_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    medicalrecord: payload
                }
            };

        case types.GET_PATIENTNOTE_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    patientnote: payload
                }
            };

        case types.GET_PRESCRIPTION_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    prescription: payload
                }
            };

        case types.GET_TERAPIA_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    terapia: payload
                }
            };

        case types.GET_TERMINET_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    terminet: payload
                }
            };

        case types.GET_VLERSIMET_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    vlersimet: payload
                }
            };

            case types.GET_PATIENT_SUCCESS:
                return {
                    ...state,
                    data: {
                        ...state.data,
                        user1: payload
                    }
                }

            case types.GET_DENTIST_SUCCESS:
                return {
                    ...state,
                    data: {
                        ...state.data,
                        dentist: payload
                    }
                }
            case types.EDIT_PATIENT_SUCCESS:
                return {
                    ...state,
                    data: {
                        ...state.data,
                        patient: payload
                    }
                }
        default:
            return state;
    }
}