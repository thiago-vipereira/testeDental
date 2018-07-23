import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';

import clinicConfigReducer from './clinicConfigReducer';
import auditReducer from './auditReducer';

import procedureConfigReducer from './procedureConfigReducer'; 
import modelReducer from './modelReducer';
import anamnesisReducer from './anamnesisReducer';
import patientAnamnesisReducer from './patientAnamnesisReducer';
import patientDocumentReducer from './patientDocumentReducer';
import agendaConfigReducer from './agendaConfigReducer';

import patientsSearchReducer from './patientsSearchReducer';
import patientsPaginateReducer from './patientsPaginateReducer';
import patientsCreationReducer from './patientsCreationReducer';

import storageReducer from './storageReducer';

import systemMsgReducer from './systemMsgReducer';

import componentReducer from './componentReducer';

import treatmentReducer from './treatmentReducer';

import resumeDashboardReducer from './resumeDashboardReducer';
import agendaReducer from './agendaReducer';
import dentalStatusReducer from './dentalStatusReducer';
import odontogramReducer from './odontogramReducer';
import windowsReducer from './windowsReducer';

import perioReducer from './perioReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	systemMsg: systemMsgReducer,

	patientsSearch: patientsSearchReducer,
	patientsPaginate: patientsPaginateReducer,
	patientsCreation: patientsCreationReducer,

	clinicConfig: clinicConfigReducer,
	procedureConfig: procedureConfigReducer,
	audit: auditReducer,	
	anamnesis: anamnesisReducer,
	patientAnamnesis: patientAnamnesisReducer,
	patientDocument: patientDocumentReducer,
	model: modelReducer,
	storage: storageReducer,
	component: componentReducer,
	treatment: treatmentReducer,
	resumeDashboard: resumeDashboardReducer,
	agendaConfig: agendaConfigReducer,
	agenda: agendaReducer,
	dentalStatus: dentalStatusReducer,
	odontogram: odontogramReducer,
	windows: windowsReducer,

	periogram: perioReducer,
});
