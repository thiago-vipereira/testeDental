const AgendaConfigController = require('../controllers/agenda_config_controller');
const AnamneseController = require('../controllers/anamnese_controller');
const AnamneseModelController = require('../controllers/anamneseModel_controller');
const AppointmentController = require('../controllers/appointment_controller');
const resumeDashboardController = require('../controllers/resumeDashboardController');
const ClinicController = require('../controllers/clinic_controller');
//const ClinicalNoteController = require('../controllers/clinicalNote_controller');
//const CreditCardController = require('../controllers/creditCard_controller');
const DentistController = require('../controllers/dentist_controller');
const DocumentModelController = require('../controllers/documentModel_controller');
const EndodonticsTreatmentController = require('../controllers/endodonticsTreatment_controller');
const EstimateController = require('../controllers/estimate_controller');
const ExpenseController = require('../controllers/expense_controller');
//const FileController = require('../controllers/file_controller');
//const FolderController = require('../controllers/folder_controller');
//const GroupProcedureController = require('../controllers/groupProcedure_controller');
const InstallmentController = require('../controllers/installment_controller');
const MaterialController = require('../controllers/material_controller');
const MsgSentController = require('../controllers/msgSent_controller');
const OdontogramController = require('../controllers/odontogram_controller');
const PatientController = require('../controllers/patient_controller');
const EmailController = require('../controllers/email_controller');
const PeriodonticsSessionController = require('../controllers/periodonticsSession_controller');
const AgendaController = require('../controllers/agenda_controller');
//const PrescriptionController = require('../controllers/prescription_controller');
const ProcedureController = require('../controllers/procedure_controller');
//const ProcedureModelController = require('../controllers/procedureModel_controller');
const ProceduresListController = require('../controllers/proceduresList_controller');
const ProstheticController = require('../controllers/prosthetic_controller');
const ReminderController = require('../controllers/reminder_controller');
const RoleController = require('../controllers/role_controller');
const TreatmentController = require('../controllers/treatment_controller');
const UserController = require('../controllers/user_controller');
const VendorController = require('../controllers/vendor_controller');
const UndoController = require('../controllers/undo_controller');
const DentalStatusController = require('../controllers/dentalStatus_controller');


const AuditController = require('../controllers/audit_controller');

const InputAutoComplete = require('../controllers/component/inputAutoComplete');

module.exports = app => {

	app.put('/api/fetch_audit', AuditController.fetch);
	app.get('/api/reverse_audit/:id', AuditController.justDiffApply);

	app.post('/api/image/clinic', ClinicController.imageCreate);
	app.delete('/api/image/clinic', ClinicController.imageDelete);
	app.get('/api/image/clinic', ClinicController.imageFetch);
	app.get('/api/image/clinic/:name', ClinicController.imageGet);
	app.post('/api/anamnese', AnamneseController.create);
	app.put('/api/anamnese/:id', AnamneseController.edit);
	app.delete('/api/anamnese/:id', AnamneseController.delete);
	app.get('/api/anamnese/:id', AnamneseController.get);

	app.post('/api/anamnese_model', AnamneseModelController.create);
	app.put('/api/anamnese_model/:id', AnamneseModelController.edit);
	app.delete('/api/anamnese_model/:id', AnamneseModelController.delete);
	app.get('/api/anamnese_model', AnamneseModelController.fetch);
	app.get('/api/anamnese_model/:id', AnamneseModelController.get);

	app.post('/api/agenda', AgendaController.checkDentistSchedule);
	app.post('/api/agenda_config', AgendaConfigController.edit);
	app.get('/api/agenda_fetch', AgendaConfigController.fetch);

	app.post('/api/appointment', AppointmentController.create);
	app.put('/api/appointment/:id', AppointmentController.edit);
	app.delete('/api/appointment/:id', AppointmentController.delete);
	app.get('/api/appointment/:id', AppointmentController.get);

	app.put('/api/resume', resumeDashboardController.update);
	app.get('/api/resume', resumeDashboardController.fetch);
	app.post('/api/resume/saved', resumeDashboardController.save);
	app.delete('/api/resume/saved/:id', resumeDashboardController.deleteSaved);
	app.put('/api/resume/saved', resumeDashboardController.getSaved);
	
	app.post('/api/clinic', ClinicController.create);
	app.put('/api/:db/clinic/:id', ClinicController.edit); 
	app.delete('/api/clinic/:id', ClinicController.delete);
	app.get('/api/:db/clinic/:id', ClinicController.get);
	app.post('/api/subscription', ClinicController.subscription);
	app.post('/api/clinic/validate', ClinicController.nameValidate);
	// get clinics for login process
	app.post('/api/clinics', ClinicController.getClinics);

	//app.post('/api/clinical_note', ClinicalNoteController.create);
	//app.put('/api/clinical_note/:id', ClinicalNoteController.edit);
	//app.delete('/api/clinical_note/:id', ClinicalNoteController.delete);
	//app.get('/api/clinical_note/:id', ClinicalNoteController.get);

	//app.post('/api/credit_card', CreditCardController.create);
	//app.put('/api/credit_card/:id', CreditCardController.edit);
	//app.delete('/api/credit_card/:id', CreditCardController.delete);
	//app.get('/api/credit_card/:id', CreditCardController.get);

	app.post('/api/dentist/schema', DentistController.getSchema);
	app.post('/api/dentist', DentistController.create);
	app.put('/api/dentist/:id', DentistController.edit);
	app.delete('/api/dentist/:id', DentistController.delete);
	app.get('/api/dentist/:id', DentistController.get);
	app.get('/api/dentists', DentistController.fetchDentists);
	app.get('/api/dentist_delete/:id', DentistController.delete);
	app.post('/api/dentist/bind_user', DentistController.bindUser);

	app.post('/api/document_model', DocumentModelController.create);
	app.put('/api/document_model', DocumentModelController.fetch);
	app.put('/api/document_model/:id', DocumentModelController.edit);
	app.delete('/api/document_model/:id', DocumentModelController.delete);
	app.get('/api/document_model/:id', DocumentModelController.get);

	app.post('/api/endodontics_treatment', EndodonticsTreatmentController.create);
	app.put('/api/endodontics_treatment/:id', EndodonticsTreatmentController.edit);
	app.delete('/api/endodontics_treatment/:id', EndodonticsTreatmentController.delete);
	app.get('/api/endodontics_treatment/:id', EndodonticsTreatmentController.get);

	app.post('/api/estimate', EstimateController.create);
	app.put('/api/estimate/:id', EstimateController.edit);
	app.delete('/api/estimate/:id', EstimateController.delete);
	app.get('/api/estimate/:id', EstimateController.get);

	app.post('/api/expense', ExpenseController.create);
	app.put('/api/expense/:id', ExpenseController.edit);
	app.delete('/api/expense/:id', ExpenseController.delete);
	app.get('/api/expense/:id', ExpenseController.get);

	//app.post('/api/file', FileController.create);
	//app.put('/api/file/:id', FileController.edit);
	//app.delete('/api/file/:id', FileController.delete);
	//app.get('/api/file/:id', FileController.get);

	//app.post('/api/folder', FolderController.create);
	//app.put('/api/folder/:id', FolderController.edit);
	//app.delete('/api/folder/:id', FolderController.delete);
	//app.get('/api/folder/:id', FolderController.get);

	//app.post('/api/group_procedure', GroupProcedureController.create);
	//app.put('/api/group_procedure/:id', GroupProcedureController.edit);
	//app.delete('/api/group_procedure/:id', GroupProcedureController.delete);
	//app.get('/api/group_procedure/:id', GroupProcedureController.get);
	//app.get('/api/group_procedure/list/:id', GroupProcedureController.listByList);

	app.post('/api/installment', InstallmentController.create);
	app.put('/api/installment/:id', InstallmentController.edit);
	app.delete('/api/installment/:id', InstallmentController.delete);
	app.get('/api/installment/:id', InstallmentController.get);

	app.post('/api/msg_sent', MsgSentController.create);
	app.put('/api/msg_sent/:id', MsgSentController.edit);
	app.delete('/api/msg_sent/:id', MsgSentController.delete);
	app.get('/api/msg_sent/:id', MsgSentController.get);

	app.get('/api/odontograms/:id', OdontogramController.fetch);
	app.get('/api/odontogram/:id', OdontogramController.get);
	app.put('/api/odontogram/:id', OdontogramController.edit);

	app.post('/api/patient/schema', PatientController.getSchema);
	app.post('/api/patient', PatientController.create);
	//app.post('/api/patient/list', PatientController.list);
	app.put('/api/patient/:id', PatientController.edit);
	app.post('/api/patient/edit', PatientController.editArray);
	app.delete('/api/patient/:id', PatientController.delete);
	app.get('/api/patient/:id', PatientController.get);
	app.post('/api/patient/search', PatientController.search);
	app.post('/api/patient/paginate', PatientController.paginate);
	app.post('/api/patient/filter', PatientController.filter);
	app.post('/api/patient/selectall', PatientController.selectAll);
	app.post('/api/patient/agenda_validation', PatientController.agendaValidation);

	app.post('/api/file/patient/:id', PatientController.createFile);
	app.put('/api/file/patient/:id/delete', PatientController.deleteFile);
	app.put('/api/file/patient/:id', PatientController.renameFile);
	app.get('/api/file/patient/:id/:hash', PatientController.getFile);

	app.post('/api/directory/patient/:id', PatientController.createDirectory);
	app.get('/api/directory/patient/:id', PatientController.fetchDirectory);
	app.post('/api/directory/patient/:id/delete', PatientController.deleteDirectory);
	app.put('/api/directory/patient/:id', PatientController.renameDirectory);

	app.get('/api/anamnesis/patient/:id', PatientController.fetchAnamnesis);
	app.get('/api/anamnesis/patient/:id/:anamnesisId', PatientController.getAnamnesis);
	app.post('/api/anamnesis/patient/:id', PatientController.createAnamnesis);

	app.put('/api/document/patient/:id', PatientController.fetchDocument);
	app.get('/api/document/patient/:id/:documentId', PatientController.getDocument);
	app.post('/api/document/patient/:id', PatientController.createDocument);

	app.post('/api/email', EmailController.send);
	app.get('/api/email', EmailController.fetch);
	app.get('/api/email/:emailId', EmailController.get);
	app.get('/api/periodontics_session/:id', PeriodonticsSessionController.fetch);
	app.get('/api/periodontic_session/:id', PeriodonticsSessionController.get);
	app.put('/api/periodontic_session/:id', PeriodonticsSessionController.edit);

	app.post('/api/agenda/filter', AgendaController.filter);

	//app.post('/api/prescription', PrescriptionController.create);
	//app.put('/api/prescription/:id', PrescriptionController.edit);
	//app.delete('/api/prescription/:id', PrescriptionController.delete);
	//app.get('/api/prescription/:id', PrescriptionController.get);

	app.post('/api/procedure', ProcedureController.create);
	app.put('/api/procedure/:id', ProcedureController.edit);
	app.delete('/api/procedure/:id', ProcedureController.delete);
	app.get('/api/procedure/:id', ProcedureController.get);

	//app.post('/api/procedure_model', ProcedureModelController.create);
	//app.put('/api/procedure_model/:id', ProcedureModelController.edit);
	//app.delete('/api/procedure_model/:id', ProcedureModelController.delete);
	//app.get('/api/procedure_model/:id', ProcedureModelController.get);
	//app.get('/api/procedure_model/list/:id', ProcedureModelController.listByGroup);

	app.post('/api/procedures_list', ProceduresListController.create);
	app.put('/api/procedures_list/:id', ProceduresListController.edit);
	app.put('/api/delete_list/:id', ProceduresListController.delete);
	app.get('/api/procedures_list/:id', ProceduresListController.get);
	app.get('/api/procedures_lists', ProceduresListController.listByClinic);
	app.put('/api/group_create/:id', ProceduresListController.creatGroup); // creat group
	app.put('/api/group_edit/:id', ProceduresListController.editGroup); // edit group
	app.put('/api/group_delete/:id/:idgroup', ProceduresListController.deleteGroup); // delete group
	app.get('/api/fetch_groups/:id', ProceduresListController.fetchGroups); // fetch groups
	app.put('/api/procedure_create/:id', ProceduresListController.createProcedure); // create Procedure
	app.put('/api/procedure_delete/:id/:idgroup/:idprocedure', ProceduresListController.deleteProcedure); // delete Procedure
	app.get('/api/fetch_procedures/:id/:idgroup', ProceduresListController.fetchProcedure); // fetch procedures
	app.get('/api/get_procedure/:id/:idgroup/:idprocedure', ProceduresListController.getProcedure); // get procedure
	app.put('/api/edit_procedure/:id/:idgroup/:idprocedure', ProceduresListController.editProcedure); // edit procedure

	app.post('/api/prosthetic', ProstheticController.create);
	app.put('/api/prosthetic/:id', ProstheticController.edit);
	app.delete('/api/prosthetic/:id', ProstheticController.delete);
	app.get('/api/prosthetic/:id', ProstheticController.get);

	app.post('/api/reminder', ReminderController.create);
	app.put('/api/reminder/:id', ReminderController.edit);
	app.delete('/api/reminder/:id', ReminderController.delete);
	app.get('/api/reminder/:id', ReminderController.get);

	app.post('/api/role', RoleController.create);
	app.put('/api/role/:id', RoleController.edit);
	app.delete('/api/role/:id', RoleController.delete);
	app.get('/api/role/:id', RoleController.get);

	app.get('/api/treatments/:id', TreatmentController.fetch);
	app.get('/api/treatment/:id', TreatmentController.get);
	app.put('/api/treatment/:id', TreatmentController.edit);

	app.post('/api/user/schema', UserController.getSchema);
	app.post('/api/user', UserController.create);
	app.put('/api/user_update/:id', UserController.edit);
	app.delete('/api/user/:id', UserController.delete);
	app.get('/api/user/:id', UserController.get);
	app.post('/api/users', UserController.getUsers);
	app.post('/api/user/email_validate', UserController.emailValidate);
	// changing password inside the app
	app.post('/api/user/change_pass', UserController.changePassword);

	// changing password from the Remember Password form
	app.post('/api/user/send_pass', UserController.sendForgotPass);

	// changing password from the New Password form after sending the link to the user's email
	app.post('/api/user/receive_pass', UserController.receiveForgotPass);

	app.put('/api/user/dashboard', UserController.updateDashboard);
	app.post('/api/user/dashboard/:type', UserController.deleteCard);
	app.delete('/api/user/dashboard/:type', UserController.saveCard);

	app.post('/api/vendor/schema', VendorController.getSchema);
	app.post('/api/vendor', VendorController.create);
	app.put('/api/edit_vendor/:id', VendorController.edit);
	app.put('/api/delete_vendor/:id', VendorController.delete);
	app.get('/api/vendor/:id', VendorController.get);
	app.get('/api/vendor', VendorController.listByClinic);
////////////
	app.post('/api/material', MaterialController.create);
	app.put('/api/edit_material/:id', MaterialController.edit);
	app.put('/api/delete_material/:id', MaterialController.delete);
	app.get('/api/material/:id', MaterialController.get);
	app.get('/api/material', MaterialController.listByClinic);
	app.put('/api/materialsByDate', MaterialController.listByDate);

	app.get('/api/dental_status/:id', DentalStatusController.get);
	app.put('/api/dental_status/:id', DentalStatusController.edit);

	app.put('/api/add_storage_to_material/:id', MaterialController.addStorage);

	app.put('/api/undo/:db', UndoController.unmake);

	app.post('/api/input_auto_complete/', InputAutoComplete.fetch);
	app.post('/api/patient_auto_complete/', InputAutoComplete.patientFetch);
};
