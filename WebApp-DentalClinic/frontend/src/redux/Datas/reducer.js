import * as types from "./types";

const initialState = {
    loading: false,
    error: false,
    dentists: [],
    admins:[],
    patients: [],
    ankesats: [],
    dashboard: [],
    departments: [],
    inventaries: [],
    knowledges: [], 
    marketings: [],
    medicalrecords: [],
    partners:[],
    patientnotes: [],
    prescriptions: [],
    sherbimeshteses:[],
    terapias:[],
    terminets:[],
    vlersimets:[],
    message: ""

};


export default function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.GET_PATIENT_SUCCESS:
            console.log("Reducer Action Payload:", payload);
            return {
                ...state,
                loading: false,
                patients: payload,
                error: false,
            };
        case types.GET_ANKESAT_SUCCESS:
            return {
                ...state,
                loading: false,
                ankesats: payload,
                error: false,
            };
        case types.GET_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departments: payload,
                error: false,
            };
        case types.GET_INVENTARY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventaries: payload,
                error: false,
            };
        case types.GET_ADMIN_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    admins: payload,
                    error: false,
                };
        
        case types.GET_DEPARTMENT_ERROR:
            return {
                ...state,
                loading: false,

                message: payload
            }
        case types.GET_INVENTARY_ERROR:
            return {
                ...state,
                loading: false,

                message: payload
            }

        case types.DELETE_PATIENT_SUCCESS:
            return {
                ...state,
                patients: payload
            }

        case types.DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                departments: payload
            }
        case types.DELETE_INVENTARY_SUCCESS:
            return {
                ...state,
                inventaries: payload
            }


        case types.DELETE_KNOWLEDGE_SUCCESS:
            return {
                ...state,
                knowledges: payload
            }

        case types.GET_KNOWLEDGE_SUCCESS:
            return {
                ...state,
                loading: false,
                knowledges: payload,
            }
        case types.GET_MARKETING_SUCCESS:
            return {
                ...state,
                loading: false,
                marketings: payload,
            }

        case types.DELETE_MARKETING_SUCCESS:
            return {
                ...state,
                loading: false,
                marketings: payload,
            }
        case types.DELETE_ANKESAT_SUCCESS:
            return {
                ...state,
                loading:false,
                ankesats: payload
            }

        case types.ADD_ANKESAT_SUCCESS:
            return {
                ...state,
                loading: false,
                ankesats: payload,
            }

        case types.GET_MEDICALRECORD_SUCCESS:
            return {
                ...state,
                loading: false,
                medicalrecords: payload,
            }
        case types.DELETE_MEDICALRECORD_SUCCESS:
            return {
                ...state,
                loading: false,
                medicalrecords: payload
            }

        case types.ADD_MEDICALRECORD_SUCCESS:
            return {
                ...state,
                loading: false,
                medicalrecords: payload,
            }

        case types.GET_PRESCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                prescriptions: payload,
            }
        case types.DELETE_PRESCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                prescriptions: payload
            }

        case types.ADD_PRESCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                prescriptions: payload,
            }
            
        case types.GET_TERAPIA_SUCCESS:
            return {
                ...state,
                loading: false,
                terapias: payload,
            }
        case types.DELETE_TERAPIA_SUCCESS:
            return {
                ...state,
                loading: false,
                terapias: payload
            }

        case types.ADD_TERAPIA_SUCCESS:
            return {
                ...state,
                loading: false,
                terapias: payload,
            }

        case types.GET_PATIENTNOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                patientnotes: payload,
            }
        case types.DELETE_PATIENTNOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                patientnotes: payload
            }

        case types.ADD_PATIENTNOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                patientnotes: payload,
            }

        case types.GET_TERMINET_SUCCESS:
            return {
                ...state,
                loading: false,
                terminets: payload,
            }
        case types.DELETE_TERMINET_SUCCESS:
            return {
                ...state,
                loading: false,
                terminets: payload
            }

        case types.ADD_TERMINET_SUCCESS:
            return {
                ...state,
                loading: false,
                terminets: payload,
            }

        case types.GET_VLERSIMET_SUCCESS:
            return {
                ...state,
                loading: false,
                vlersimets: payload,
            }
        case types.DELETE_VLERSIMET_SUCCESS:
            return {
                ...state,
                loading: false,
                vlersimets: payload
            }

        case types.ADD_VLERSIMET_SUCCESS:
            return {
                ...state,
                loading: false,
                vlersimets: payload,
            }

        case types.GET_DENTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                dentists: payload,
            }
        case types.GET_PARTNER_SUCCESS:
            return {
                ...state,
                loading: false,
                partners: payload,
            };

        case types.DELETE_PARTNER_SUCCESS:
            return {
                ...state,
                loading: false,
                partners: payload
            }

        case types.GET_SHERBIMESHTESE_SUCCESS:
            return {
                ...state,
                loading: false,
                sherbimeshteses: payload,
            };

        case types.DELETE_SHERBIMESHTESE_SUCCESS:
            return {
                ...state,
                loading: false,
                sherbimeshteses: payload
            }

        case types.DELETE_ADMIN_SUCCESS:
            return {
                ...state,
                loading:false,
                admins:payload
            }

        case types.DELETE_DENTIST_SUCCESS:
            return {
                ...state,
                loading:false,
                dentists:payload
            }

        default:
            return state;
    }

}