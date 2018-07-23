const Treatment = require('../models/treatment');
const Data = require('../services/connect');

module.exports = {
	edit(req, res, next){
		const patientId = req.params.id;
		const props = req.body;
		var treatmentId = props._id;
		//console.log(props);

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Treatmentdb = db.model('treatment', Treatment.treatmentSchema);

		let prevTreatment;

		if(props.treatment && props.treatment.length > 0){

			for( var att in props ){
				if(props[att].procedures){
					if( props[att].status == 'IMPLANTE_TREATMENT' || props[att].status == 'MISSING_TREATMENT' ){
						props[att].status = 'NORMAL';
					}
					props[att].procedures = [];
				}	
			}
			props.treatment.map( procedure => {

				if(procedure.procedure.procedure_type == 'EXTRACTION'){

					procedure.specification.tooth.map( tooth => {
						if(props['tooth_'+tooth]){

							if(props['tooth_'+tooth].status != 'MISSING'){
								props['tooth_'+tooth].status = 'MISSING_TREATMENT';
							}
							
							props['tooth_'+tooth].procedures.push({
								list_id: procedure.list_id,
								procedure_id: procedure.procedure._id,
								face: null,
								xray: null,
								frenu: null,
							})
						}
					});
				} else if(procedure.procedure.procedure_type == 'FRENULOTOMY'){
					
					if(procedure.specification.frenu == 'SUPERIOR'){

						props['tooth_11'].procedures.push({
							list_id: procedure.list_id,
							procedure_id: procedure.procedure._id,
							face: null,
							xray: null,
							frenu: 'SUPERIOR',
						});
						props['tooth_21'].procedures.push({
							list_id: procedure.list_id,
							procedure_id: procedure.procedure._id,
							face: null,
							xray: null,
							frenu: 'SUPERIOR',
						});
					} else if(procedure.specification.frenu == 'INFERIOR'){

						props['tooth_31'].procedures.push({
							list_id: procedure.list_id,
							procedure_id: procedure.procedure._id,
							face: null,
							xray: null,
							frenu: 'INFERIOR',
						});
						props['tooth_41'].procedures.push({
							list_id: procedure.list_id,
							procedure_id: procedure.procedure._id,
							face: null,
							xray: null,
							frenu: 'INFERIOR',
						});
					}
				} else if(procedure.procedure.procedure_type == 'ADHESIVE'){

					var init = 100;
					var end = 0;
					procedure.specification.tooth.map( tooth => {
						if(tooth < init){
							init = tooth;
						}
						if(tooth > end){
							end = tooth;
						}
					});

					procedure.specification.tooth.map( tooth => {
						if(props['tooth_'+tooth]){
							props['tooth_'+tooth].procedures.push({
								list_id: procedure.list_id,
								procedure_id: procedure.procedure._id,
								face: tooth == init || tooth == end ? 'V' : 'V,D,M,L,O',
								xray: null,
								frenu: null,
							})
						}
					});
				} else if(procedure.procedure.procedure_type == 'CONEMORSE' ||	procedure.procedure.procedure_type == 'SHORT' ||
					procedure.procedure.procedure_type == 'HEXAGONAL_OUT' || procedure.procedure.procedure_type == 'HEXAGONAL_IN' || 
					procedure.procedure.procedure_type == 'ZYGOMATIC' || procedure.procedure.procedure_type == 'NOBEL_REPLACE'
				){
					procedure.specification.tooth.map( tooth => {
						if(props['tooth_'+tooth]){

							if(props['tooth_'+tooth].status != 'IMPLANTE'){
								props['tooth_'+tooth].status = 'IMPLANTE_TREATMENT';
							}
							
							props['tooth_'+tooth].procedures.push({
								list_id: procedure.list_id,
								procedure_id: procedure.procedure._id,
								face: null,
								xray: procedure.specification.xray ? procedure.specification.xray : null,
								frenu: procedure.specification.frenu ? procedure.specification.frenu : null,
							})
						}
					});
				} else if(procedure.specification.face && procedure.specification.face.length > 0){

					procedure.specification.face.map( face => {
						if(props['tooth_'+face.tooth]){
							props['tooth_'+face.tooth].procedures.push({ list_id: procedure.list_id, procedure_id: procedure.procedure._id, face: face.faces });
						}
					})
				} else if(procedure.specification.tooth && procedure.specification.tooth.length > 0) {

					procedure.specification.tooth.map( tooth => {
						if(props['tooth_'+tooth]){
							props['tooth_'+tooth].procedures.push({
								list_id: procedure.list_id,
								procedure_id: procedure.procedure._id,
								face: null,
								xray: procedure.specification.xray ? procedure.specification.xray : null,
								frenu: procedure.specification.frenu ? procedure.specification.frenu : null,
							})
						}
					});
						
				}
			});
		} else {
			props.list_id = null;
		}

		Treatmentdb.findOne({ _id: treatmentId, patient_id: patientId })
			.then(item => {
				// stores previous document
				prevTreatment = item;

				/*
				{
					list_id: values.list_id,
					dentist_id: this.state.selectedDentist,
					procedure: this.state.selectedProcedure,
					date: this.state.date,
					specification: {
						tooth: this.state.selectedTooth,
						face: this.state.faces,
						value: this.state.procedureValue,
						value_acc: this.state.toggle,
						frenu: this.state.procedure_frenu,
						xray: this.state.procedure_xray,
					},
					observation: values.observation,
				}
				*/
				if(!item){
					Treatmentdb.create(props)
					.then(item => {
						res.send(item);
					})
					.catch(next);

				}else{
					item.update(props)
					.then(() => Treatmentdb.findOne({ _id: treatmentId, patient_id: patientId }))
					.then(item => {
						item.save();
						//AuditController.compare(prevTreatment, props, treatmentId, updatedBy);
						res.send(item);
					})
					.catch(next);

				}
			})
			.catch(next);
	},
	get(req, res, next) {
		const treatmentId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Treatmentdb = db.model('treatment', Treatment.treatmentSchema);

		Treatmentdb.findOne({_id: treatmentId})
			.then(item => res.send(item))
			.catch(next);
	},
	fetch(req, res, next) {
		const treatmentId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Treatmentdb = db.model('treatment', Treatment.treatmentSchema);

		Treatmentdb.find({patient_id: treatmentId, active: true})
			.sort( { date: -1 } )
			.then(item => res.send(item))
			.catch(next);
	}
};