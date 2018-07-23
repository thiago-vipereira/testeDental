const path = require('path');

module.exports = {
	title: 'DentalQI Styleguide',
	assetsDir: './public/css',
	require: [
		path.join(__dirname, 'public/css/normalize.css'),
		path.join(__dirname, 'public/css/main.css')
	],
	theme: {
		fontFamily: {
			base: '"Roboto", sans-serif'
		}
	},
	showCode: true,
	showUsage: true,
	sections: [
		{ name: 'Assets', components: './src/components/assets/*.js' },
		{ name: 'Bars', components: './src/components/bars/*.js' },
		{ name: 'Common', components: './src/components/common/*.js' },
		{ name: 'Forms', components: './src/components/forms/*.js',
			section: [
				{ name: 'Clinic', components : './src/components/forms/clinic/*.js' }
			]
		},
		
		{ name: 'Lists', components: './src/components/lists/*.js' },
		{ name: 'Modals', components: './src/components/modals/*.js' },
		{ name: 'Navigation', components: './src/components/navigation/*.js' },
		{ name: 'Notifications', components: './src/components/notifiations/*.js' }
	],
	ignore: [
		'**/App.js',
		'**/views/*.js',
		'**/**Styles.js',

		'**/bars/TopBar.js',

		'**/forms/**Form.js',
		'**/forms/PatientsSearch.js',
		'**/forms/AutocompleteInput.js',
		'**/forms/RadioInput.js',

		'**/navigation/SideMenu.js',
	]
};
