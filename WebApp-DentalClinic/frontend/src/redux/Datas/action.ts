import * as types from './types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store'; 
import { Action } from 'redux';
import { AppDispatch } from "../store";

// Define interfaces for common payloads and responses
interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
}

interface ErrorResponse {
  message: string;
}

type RegisterResponse = ApiResponse<any> | ErrorResponse; 

// Define the expected response type from the API
interface ContactUsResponse {
  data: {
    message: string;
  };
}

// Typing the function parameters and return type
export const SendContactUs = (data: { mesazhi: string }, token: string) => async (dispatch: AppDispatch): Promise<ContactUsResponse | void> => {
  try {
    dispatch({ type: types.SEND_CONTACT_REQUEST });
    const res = await axios.post<ContactUsResponse>(
      `https://localhost:7227/api/Kontakti/add-kontakti`, 
      data, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data; // Return the response data
  } catch (error) {
    dispatch({ type: types.SEND_CONTACT_ERROR });
    console.error(error); // Log the error for debugging
    return;
  }
};




export const GetAllPatients = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_PATIENT_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/PatientAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }}
      );
      
      dispatch({
        type: types.GET_PATIENT_SUCCESS,
        payload: res.data,
      });
    }
    catch (error) {
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PATIENT_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeletePatient = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_PATIENT_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Patient/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_PATIENT_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PATIENT_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const GetAllKontaktet = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({type:types.GET_KONTAKTI_REQUEST});
    const res = await axios.get(
      `https://localhost:7157/api/Kontakti/get-all-kontakti`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }}
    );
    dispatch({
      type: types.GET_KONTAKTI_SUCCESS,
      payload:res.data.data,
    });
    

  }catch (error){
    const err = error as AxiosError<ErrorResponse>;

    dispatch({
      type: types.GET_KONTAKTI_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });
  }
}

export const DeleteKontakti = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({type:types.DELETE_KONTAKTI_REQUEST});
    const res = await axios.delete (
      `https://localhost:7157/api/Kontakti/delete-kontakti-by-id//${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }}
      );
      dispatch({
        type: types.DELETE_KONTAKTI_SUCCESS,
        payload:res.data.data,
      });
      

    }catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.DELETE_KONTAKTI_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
  }
}


export const GetAllDentists = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_DENTIST_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/DentistAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_DENTIST_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_DENTIST_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteDentist = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_DENTIST_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Dentist/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_DENTIST_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_DENTIST_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const GetAllAdmin = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_ADMIN_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/AdminAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_ADMIN_SUCCESS,
        payload: res.data,
      });
    }catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_ADMIN_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteAdmin = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_ADMIN_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Admin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_ADMIN_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_ADMIN_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const AnkesatAdd = (data: any,token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
    try {
        dispatch({ type: types.ADD_ANKESAT_REQUEST });
        const res: AxiosResponse<ApiResponse<any>> = await axios.post(
            "https://localhost:7157/api/Ankesat/add-ankesat",
            data , {
          headers: {
            Authorization: `Bearer ${token}`,
        }} ,
        );
  
        
        return res.data;
  
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_ANKESAT_ERROR,
        payload: err.response?.data?.message || err.message,
      });
  
      return err.response?.data || { message: 'An unknown error occurred' };
    }
};

export const GetAllAnkesat = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_ANKESAT_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Ankesat/get-all-ankesat`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_ANKESAT_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_ANKESAT_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteAnkesat = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_ANKESAT_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Ankesat/delete-ankesat-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_ANKESAT_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_ANKESAT_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const GetAllDepartment = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_DEPARTMENT_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Department/get-all-departments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_DEPARTMENT_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_DEPARTMENT_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteDepartment = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_DEPARTMENT_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Department/delete-department-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_DEPARTMENT_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_DEPARTMENT_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const GetAllInventary = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_INVENTARY_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Inventary/get-all-inventary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_INVENTARY_SUCCESS,
        payload: res.data,
      });
    }catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_INVENTARY_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteInventary = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_INVENTARY_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Inventary/delete-item-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_INVENTARY_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_INVENTARY_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const GetAllKnowledge = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_KNOWLEDGE_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Knowledge/get-all-knowledge`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_KNOWLEDGE_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_KNOWLEDGE_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteKnowledge = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_KNOWLEDGE_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Knowledge/delete-knowledge-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_KNOWLEDGE_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_KNOWLEDGE_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const GetAllMarketing = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_MARKETING_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Marketing/get-all-marketing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_MARKETING_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_MARKETING_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteMarketing = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_MARKETING_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Marketing/delete-marketing-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_MARKETING_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_MARKETING_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const MedicalRecordAdd = (data: any,token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
    try {
        dispatch({ type: types.ADD_MEDICALRECORD_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/MedicalRecord/add-medicalRecord",
            data , {
          headers: {
            Authorization: `Bearer ${token}`,
        }} ,
        );
  
        
        return res.data;
  
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_MEDICALRECORD_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
        return err.response?.data || { message: 'An unknown error occurred' };
      }
};

export const GetAllMedicalRecord = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_MEDICALRECORD_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/MedicalRecord/get-all-medicalRecord`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_MEDICALRECORD_SUCCESS,
        payload: res.data,
      });
    }catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_MEDICALRECORD_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteMedicalRecord = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_MEDICALRECORD_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/MedicalRecord/delete-medicalRecord-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_MEDICALRECORD_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_MEDICALRECORD_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const GetAllPartner = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_PARTNER_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Partner/get-all-partner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_PARTNER_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PARTNER_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeletePartner = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_PARTNER_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Partner/delete-partner-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_PARTNER_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PARTNER_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const PatientNoteAdd = (data: any,token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
    try {
        dispatch({ type: types.ADD_PATIENTNOTE_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/PatientNote/add-patientNote",
            data , {
          headers: {
            Authorization: `Bearer ${token}`,
        }} ,
        );
  
        
        return res.data;
  
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PATIENTNOTE_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
        return err.response?.data || { message: 'An unknown error occurred' };
      }
};

export const GetAllPatientNote = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_PATIENTNOTE_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/PatientNote/get-all-patientNote`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_PATIENTNOTE_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PATIENTNOTE_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeletePatientNote = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_PATIENTNOTE_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/PatientNote/delete-patientNote-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_PATIENTNOTE_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PATIENTNOTE_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const PrescriptionAdd = (data: any,token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
    try {
        dispatch({ type: types.ADD_PRESCRIPTION_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Prescription/add-prescription",
            data , {
          headers: {
            Authorization: `Bearer ${token}`,
        }} ,
        );
  
        
        return res.data;
  
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PRESCRIPTION_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
        return err.response?.data || { message: 'An unknown error occurred' };
      }
};

export const GetAllPrescription = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_PRESCRIPTION_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Prescription/get-all-prescriptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_PRESCRIPTION_SUCCESS,
        payload: res.data,
      });
    }catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PRESCRIPTION_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeletePrescription = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_PRESCRIPTION_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Prescription/delete-prescription-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_PRESCRIPTION_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_PRESCRIPTION_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const GetAllSherbimeShtese = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_SHERBIMESHTESE_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/SherbimeShtese/get-all-sherbimeShtese`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_SHERBIMESHTESE_SUCCESS,
        payload: res.data,
      });
    }catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_SHERBIMESHTESE_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteSherbimeShtese = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_SHERBIMESHTESE_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/SherbimeShtese/delete-sherbimeShtese-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_SHERBIMESHTESE_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_SHERBIMESHTESE_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const TerapiaAdd = (data: any,token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
    try {
        dispatch({ type: types.ADD_TERAPIA_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Terapia/add-terapia",
            data , {
          headers: {
            Authorization: `Bearer ${token}`,
        }} ,
        );
  
        
        return res.data;
  
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_TERAPIA_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
        return err.response?.data || { message: 'An unknown error occurred' };
      }
};

export const GetAllTerapia = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_TERAPIA_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Terapia/get-all-terapias`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_TERAPIA_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_TERAPIA_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteTerapia = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_TERAPIA_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Terapia/delete-terapia-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_TERAPIA_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_TERAPIA_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const TerminetAdd = (data: any,token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
    try {
        dispatch({ type: types.ADD_TERMINET_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Terminet/add-termini",
            data , {
          headers: {
            Authorization: `Bearer ${token}`,
        }} ,
        );
  
        
        return res.data;
  
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_TERMINET_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
        return err.response?.data || { message: 'An unknown error occurred' };
      }
};

export const GetAllTerminet = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_TERMINET_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Terminet/get-all-terminet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_TERMINET_SUCCESS,
        payload: res.data,
      });
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_TERMINET_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteTerminet = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_TERMINET_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Terminet/delete-terminet-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_TERMINET_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_TERMINET_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};

export const VlersimetAdd = (data: any,token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
    try {
        dispatch({ type: types.ADD_VLERSIMET_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Vlersimet/add-vlersimi",
            data , {
          headers: {
            Authorization: `Bearer ${token}`,
        }} ,
        );
  
        
        return res.data;
  
    } catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_VLERSIMET_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
        return err.response?.data || { message: 'An unknown error occurred' };
      }
};

export const GetAllVlersimet = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
    
      dispatch({ type: types.GET_VLERSIMET_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Vlersimet/get-all-vlersimet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({
        type: types.GET_VLERSIMET_SUCCESS,
        payload: res.data,
      });
    }catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_VLERSIMET_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
};

export const DeleteVlersimet = (id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type:types.DELETE_VLERSIMET_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Vlersimet/delete-vlersimet-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}
      );
      
      dispatch({type:types.DELETE_VLERSIMET_SUCCESS, payload:res.data});
    }
    catch (error){
      const err = error as AxiosError<ErrorResponse>;
  
      dispatch({
        type: types.GET_VLERSIMET_ERROR,
        payload: {
          message: err.response?.data?.message || err.message,
        },
      });
    }
   
};