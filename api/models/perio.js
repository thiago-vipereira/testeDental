const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const perioSchema = new Schema({
	patient_id: {
		type: String,
		required: true
	},
	date: Date,
	active: Boolean,
	 dentes: {
		superior:{
			tooth_18:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},
			
			tooth_17:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_16:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_15:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_14:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_13:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_12:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_11:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_21:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_22:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_23:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_23:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_24:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_25:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_26:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_27:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_28:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

		},

		inferior: {

			tooth_48:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_47:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_46:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_45:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_44:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_44:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_43:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_42:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_41:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_31:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_32:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_33:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_34:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_35:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_36:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_37:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

			tooth_38:{ 
				lingual: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
				bucal: {
					//furcation: Number,
					bleeding: [Number,Number,Number],
					plaque: [Number,Number,Number],
					gingival_margin: [Number,Number,Number],
					probing_depth: [Number,Number,Number]
				},
			status: String,
			mobility: Number,
			implant: Boolean
			},

		}

	}

});

const Perio = mongoose.model('perio', perioSchema);
module.exports = Perio;