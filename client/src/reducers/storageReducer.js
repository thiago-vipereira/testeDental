import {
    CREATE_VENDOR,
    FETCH_VENDORS,
    GET_VENDOR,
    DELETE_VENDOR,
    UPDATE_VENDOR,

    CREATE_MATERIAL,
    FETCH_MATERIALS,
    FETCH_MATERIALS_BY_DATE,
    GET_MATERIAL,
    DELETE_MATERIAL,
    UPDATE_MATERIAL,

    ADD_STORAGE_TO_MATERIAL

} from '../actions/storage';

export default function(state = {}, action) { 
    switch(action.type) { 
        case CREATE_VENDOR: 
            return { ...state, selectedVendor: action.payload };
        case FETCH_VENDORS: 
            return { ...state, vendorsById: action.payload };
        case GET_VENDOR: 
            return { ...state, selectedVendor: action.payload };
        case UPDATE_VENDOR:
            return { ...state, selectedVendor: action.payload };
        case DELETE_VENDOR: 
            return { ...state, selectedVendor: action.payload };
       
        case CREATE_MATERIAL: 
            return { ...state, selectedMaterial: action.payload };
        case FETCH_MATERIALS: 
            return { ...state, materialsById: action.payload };
        case FETCH_MATERIALS_BY_DATE:
            return { ...state, materialsByDate: action.payload };
        case GET_MATERIAL: 
            return { ...state, selectedMaterial: action.payload };
        case UPDATE_MATERIAL:
            return { ...state, selectedMaterial: action.payload };
        case DELETE_MATERIAL: 
            return { ...state, selectedMaterial: action.payload };
            
        case ADD_STORAGE_TO_MATERIAL: 
            return { ...state, selectedStorage: action.payload };
       

        default: 
            return state; 
    } 
}