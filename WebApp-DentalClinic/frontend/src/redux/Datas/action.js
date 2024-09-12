import * as types from "./types";
import axios from "axios";


export const SendContactUs = (data, token) => async (dispatch) => {
  try {
      console.log("Sending Contact Us message", data, token); // Debug
      dispatch({ type: types.SEND_CONTACT_REQUEST });
      const res = await axios.post(
          `https://localhost:7157/api/Kontakti/add-kontakti`, data, {
              headers: {
                  Authorization: "Bearer " + token
              }
          }
      );
      console.log("Response:", res); // Debug
      return res;
  } catch (error) {
      console.error("Error sending contact us message:", error); // Debug
      dispatch({
          type: types.SEND_CONTACT_ERROR
      });
      return error;
  }
};

export const GetAllKontaktet = (token) => async (dispatch) => {
    try {
      dispatch({type:types.GET_KONTAKTI_REQUEST});
      const res = await axios.get(
        `https://localhost:7157/api/get-all-kontakti`,{
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      dispatch({
        type: types.GET_KONTAKTI_SUCCESS,
        payload:res.data.data,
      });
      
  
    }catch(err){
      
      dispatch({
        type:types.GET_KONTAKTI_ERROR,
        payload:err.message
      })
    }
}


export const DeleteKontakti = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_KONTAKTI_REQUEST});
      const res = await axios.delete (
        `https://localhost:7157/api/delete-kontakti-by-id/${id}`,{
          headers: {
            Authorization: "Bearer " + token
        }}
        );
        dispatch({
          type: types.DELETE_KONTAKTI_SUCCESS,
          payload:res.data.data,
        });
        
  
      }catch(err){
        
        dispatch({
          type:types.DELETE_KONTAKTI_ERROR,
          payload:err.message
        })
    }
}

export const GetAllPatients = (token) => async (dispatch) => {
  try {
      dispatch({ type: types.GET_PATIENT_REQUEST });

      const res = await axios.get(`https://localhost:7157/api/Patient/PatientAll`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      console.log("API Response Data:", res.data);
      const patients = res.data.$values || [];
      dispatch({
          type: types.GET_PATIENT_SUCCESS,
          payload: patients, // Update to use the correct structure
      });
  } catch (error) {
      console.error("Error fetching patients:", error.response ? error.response.data : error.message);
      dispatch({
          type: types.GET_PATIENT_ERROR,
          payload: error.response ? error.response.data.message : error.message,
      });
  }
};



export const DeletePatient = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_PATIENT_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Patient/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_PATIENT_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_PATIENT_ERROR,
        payload:error.message

      })
    }
   
};

export const GetAllDentists = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_DENTIST_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/DentistAll`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      const dentists = res.data.$values || [];
      dispatch({
          type: types.GET_DENTIST_SUCCESS,
          payload: dentists, // Update to use the correct structure
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_DENTIST_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteDentist = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_DENTIST_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Dentist/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_DENTIST_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_DENTIST_ERROR,
        payload:error.message

      })
    }
   
};

export const GetAllAdmin = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_ADMIN_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/AdminAll`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_ADMIN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_ADMIN_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteAdmin = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_ADMIN_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Admin/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_ADMIN_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_ADMIN_ERROR,
        payload:error.message

      })
    }
   
};

export const AnkesatAdd = (data,token) => async (dispatch) => {
    try {
        dispatch({ type: types.ADD_ANKESAT_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Ankesat/add-ankesat",
            data , {
          headers: {
            Authorization: "Bearer " + token
        }} ,
        );
  
        
        return res;
  
    } catch (error) {
        
        dispatch({
            type: types.ADD_ANKESAT_ERROR,
            payload: {
                message: error.response.data,
            },
        });
        return error;
    }
};

export const GetAllAnkesat = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_ANKESAT_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Ankesat/get-all-ankesat`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_ANKESAT_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_ANKESAT_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteAnkesat = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_ANKESAT_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Ankesat/delete-ankesat-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_ANKESAT_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_ANKESAT_ERROR,
        payload:error.message

      })
    }
   
};

export const GetAllDepartment = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_DEPARTMENT_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Department/get-all-departments`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_DEPARTMENT_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_DEPARTMENT_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteDepartment = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_DEPARTMENT_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Department/delete-department-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_DEPARTMENT_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_DEPARTMENT_ERROR,
        payload:error.message

      })
    }
   
};

export const GetAllInventary = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_INVENTARY_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Inventary/get-all-inventary`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_INVENTARY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_INVENTARY_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteInventary = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_INVENTARY_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Inventary/delete-item-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_INVENTARY_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_INVENTARY_ERROR,
        payload:error.message

      })
    }
   
};

export const GetAllKnowledge = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_KNOWLEDGE_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Knowledge/get-all-knowledge`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_KNOWLEDGE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_KNOWLEDGE_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteKnowledge = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_KNOWLEDGE_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Knowledge/delete-knowledge-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_KNOWLEDGE_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_KNOWLEDGE_ERROR,
        payload:error.message

      })
    }
   
};

export const GetAllMarketing = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_MARKETING_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Marketing/get-all-marketing`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_MARKETING_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_MARKETING_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteMarketing = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_MARKETING_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Marketing/delete-marketing-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_MARKETING_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_MARKETING_ERROR,
        payload:error.message

      })
    }
   
};

export const MedicalRecordAdd = (data,token) => async (dispatch) => {
    try {
        dispatch({ type: types.ADD_MEDICALRECORD_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/MedicalRecord/add-medicalRecord",
            data , {
          headers: {
            Authorization: "Bearer " + token
        }} ,
        );
  
        
        return res;
  
    } catch (error) {
        
        dispatch({
            type: types.ADD_MEDICALRECORD_ERROR,
            payload: {
                message: error.response.data,
            },
        });
        return error;
    }
};

export const GetAllMedicalRecord = (token) => async (dispatch) => {
    try {
      dispatch({ type: types.GET_MEDICALRECORD_REQUEST });

      const res = await axios.get(
        `https://localhost:7157/api/MedicalRecord/get-all-medicalRecord`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("API Response: ", res.data); // Check the API response here


      dispatch({
        type: types.GET_MEDICALRECORD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.error("Error fetching medical records:", error);
      dispatch({
        type: types.GET_MEDICALRECORD_ERROR,
        payload: error.message,
      });
    }
};


export const DeleteMedicalRecord = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_MEDICALRECORD_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/MedicalRecord/delete-medicalRecord-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_MEDICALRECORD_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_MEDICALRECORD_ERROR,
        payload:error.message

      })
    }
   
};

export const GetAllPartner = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_PARTNER_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Partner/get-all-partner`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_PARTNER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_PARTNER_ERROR,
            payload: error.message,
        });
    }
};

export const DeletePartner = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_PARTNER_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Partner/delete-partner-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_PARTNER_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_PARTNER_ERROR,
        payload:error.message

      })
    }
   
};

export const PatientNoteAdd = (data,token) => async (dispatch) => {
    try {
        dispatch({ type: types.ADD_PATIENTNOTE_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/PatientNote/add-patientNote",
            data , {
          headers: {
            Authorization: "Bearer " + token
        }} ,
        );
  
        
        return res;
  
    } catch (error) {
        
        dispatch({
            type: types.ADD_PATIENTNOTE_ERROR,
            payload: {
                message: error.response.data,
            },
        });
        return error;
    }
};

export const GetAllPatientNote = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_PATIENTNOTE_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/PatientNote/get-all-patientNote`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_PATIENTNOTE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_PATIENTNOTE_ERROR,
            payload: error.message,
        });
    }
};

export const DeletePatientNote = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_PATIENTNOTE_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/PatientNote/delete-patientNote-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_PATIENTNOTE_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_PATIENTNOTE_ERROR,
        payload:error.message

      })
    }
   
};

export const PrescriptionAdd = (data,token) => async (dispatch) => {
    try {
        dispatch({ type: types.ADD_PRESCRIPTION_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Prescription/add-prescription",
            data , {
          headers: {
            Authorization: "Bearer " + token
        }} ,
        );
  
        
        return res;
  
    } catch (error) {
        
        dispatch({
            type: types.ADD_PRESCRIPTION_ERROR,
            payload: {
                message: error.response.data,
            },
        });
        return error;
    }
};

export const GetAllPrescription = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_PRESCRIPTION_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Prescription/get-all-prescriptions`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_PRESCRIPTION_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_PRESCRIPTION_ERROR,
            payload: error.message,
        });
    }
};

export const DeletePrescription = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_PRESCRIPTION_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Prescription/delete-prescription-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_PRESCRIPTION_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_PRESCRIPTION_ERROR,
        payload:error.message

      })
    }
   
};

export const GetAllSherbimeShtese = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_SHERBIMESHTESE_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/SherbimeShtese/get-all-sherbimeShtese`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_SHERBIMESHTESE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_SHERBIMESHTESE_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteSherbimeShtese = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_SHERBIMESHTESE_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/SherbimeShtese/delete-sherbimeShtese-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_SHERBIMESHTESE_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_SHERBIMESHTESE_ERROR,
        payload:error.message

      })
    }
   
};

export const TerapiaAdd = (data,token) => async (dispatch) => {
    try {
        dispatch({ type: types.ADD_TERAPIA_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Terapia/add-terapia",
            data , {
          headers: {
            Authorization: "Bearer " + token
        }} ,
        );
  
        
        return res;
  
    } catch (error) {
        
        dispatch({
            type: types.ADD_TERAPIA_ERROR,
            payload: {
                message: error.response.data,
            },
        });
        return error;
    }
};

export const GetAllTerapia = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_TERAPIA_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Terapia/get-all-terapias`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_TERAPIA_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_TERAPIA_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteTerapia = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_TERAPIA_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Terapia/delete-terapia-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_TERAPIA_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_TERAPIA_ERROR,
        payload:error.message

      })
    }
   
};

export const TerminetAdd = (data,token) => async (dispatch) => {
    try {
        dispatch({ type: types.ADD_TERMINET_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Terminet/add-termini",
            data , {
          headers: {
            Authorization: "Bearer " + token
        }} ,
        );
  
        
        return res;
  
    } catch (error) {
        
        dispatch({
            type: types.ADD_TERMINET_ERROR,
            payload: {
                message: error.response.data,
            },
        });
        return error;
    }
};

export const GetAllTerminet = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_TERMINET_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Terminet/get-all-terminet`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_TERMINET_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_TERMINET_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteTerminet = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_TERMINET_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Terminet/delete-terminet-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_TERMINET_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_TERMINET_ERROR,
        payload:error.message

      })
    }
   
};

export const VlersimetAdd = (data,token) => async (dispatch) => {
    try {
        dispatch({ type: types.ADD_VLERSIMET_REQUEST });
        const res = await axios.post(
            "https://localhost:7157/api/Vlersimet/add-vlersimi",
            data , {
          headers: {
            Authorization: "Bearer " + token
        }} ,
        );
  
        
        return res;
  
    } catch (error) {
        
        dispatch({
            type: types.ADD_VLERSIMET_ERROR,
            payload: {
                message: error.response.data,
            },
        });
        return error;
    }
};

export const GetAllVlersimet = (token) => async (dispatch) => {
    try {
    
      dispatch({ type: types.GET_VLERSIMET_REQUEST });
      const res = await axios.get(
        `https://localhost:7157/api/Vlersimet/get-all-vlersimet`,
        {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({
        type: types.GET_VLERSIMET_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
        
        dispatch({
            type: types.GET_VLERSIMET_ERROR,
            payload: error.message,
        });
    }
};

export const DeleteVlersimet = (id,token) => async (dispatch) => {
    try {
      dispatch({type:types.DELETE_VLERSIMET_REQUEST});
      const res = await axios.delete(
        `https://localhost:7157/api/Vlersimet/delete-vlersimet-by-id/${id}`, {
          headers: {
            Authorization: "Bearer " + token
        }}
      );
      
      dispatch({type:types.DELETE_VLERSIMET_SUCCESS, payload:res.data});
    }
    catch (error){
      ;
      dispatch({
        type:types.GET_VLERSIMET_ERROR,
        payload:error.message

      })
    }
   
};