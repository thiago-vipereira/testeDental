import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';

import Particles from 'react-particles-js';

import { logOutUser, getClinic } from '../../actions/auth';
import { fetchMaterials } from '../../actions/storage';

import { css } from 'aphrodite/no-important';
import { styles } from './SideMenuStyles';

import UserOptions from './UserOptions';
import SideLink from './SideLink';
import Icon from '../common/Icon';

const LINKS = [
	{ text: 'Resumo', path: '', icon: 'home', exact: true },
	{ text: 'Pacientes', path: 'patients', icon: 'person' },
	{ text: 'Agenda', path: 'agenda', icon: 'calendar' },
	{ text: 'Finanças', path: 'finances', icon: 'finances' },
	{ text: 'Estoque', path: 'storage', icon: 'storage' },
	{ text: 'Comunicação', path: 'communication', icon: 'mail' },
	{ text: 'Inteligência Empresarial', path: 'bi', icon: 'piechart' },
	{ text: 'Auditoria', path: 'audit', icon: 'audit' }
];

// 'SideMenu' will manage the main navigationof the app
class SideMenu extends Component {
	constructor(props) {
		super(props);

		this.onLogOut = this.onLogOut.bind(this);
		this.renderLinks = this.renderLinks.bind(this);
	}

	componentDidMount(){
		const { fetchMaterials, getClinic, clinic } = this.props;
		fetchMaterials();

	
		if (clinic) {  
			const clinicId = clinic._id; 
			const clinicDb = clinic.clinic_data; 
			 
			getClinic({ clinicId, clinicDb }, () => {
				const { clinic } = this.props;
				this.setState({ loading: false, logo: {src: clinic.logo_clinic, file: ''}});
			});  
		} 
	}

	onLogOut() {
		const { history, logOutUser } = this.props;
		
		logOutUser(() => {
			history.push('/login');
		});
	}


	renderLinks() {
		const { match, materialsById, clinic } = this.props;
	
		
		return LINKS.map((link, index) => {
			if(link.path == 'storage'){
				let warnings = null;
				
				for (var key in materialsById) {
				
					if( (materialsById[key].quantity <= materialsById[key].min) ){
						warnings++;
					}
						
				}
				return (
					<li key={index}>
						<SideLink
							text={link.text}
							path={match.url + link.path}
							icon={link.icon}
							exact={link.exact}
							warning={warnings}
						/>
					</li>
				);
			}else{
				return (
					
					<li key={index}>
						<SideLink
							text={link.text}
							path={match.url + link.path}
							icon={link.icon}
							exact={link.exact}
						/>
					</li>
				);
			}
		});
	}

	render() {
		const { history, match, clinic } = this.props;

		return (
			<div className={css(styles.sideMenu)}>
			<Particles className={css(styles.wrapper)} params={{
				"particles": {
					"number": {
					"value": 160,
					"density": {
						"enable": true,
						"value_area": 800
					}
					},
					"color": {
					"value": "#bcbcbc"
					},
					"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#000000"
					},
					"polygon": {
						"nb_sides": 5
					},
					"image": {
						"src": "img/github.svg",
						"width": 100,
						"height": 100
					}
					},
					"opacity": {
					"value": 1,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 1,
						"opacity_min": 0,
						"sync": false
					}
					},
					"size": {
					"value": 3,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 4,
						"size_min": 0.3,
						"sync": false
					}
					},
					"line_linked": {
					"enable": false,
					"distance": 150,
					"color": "#bcbcbc",
					"opacity": 0.4,
					"width": 1
					},
					"move": {
					"enable": true,
					"speed": 1,
					"direction": "none",
					"random": true,
					"straight": false,
					"out_mode": "out",
					"bounce": false,
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 600
					}
					}
				},
				"interactivity": {
					"detect_on": "canvas",
					"events": {
					"onhover": {
						"enable": false,
						"mode": "bubble"
					},
					"onclick": {
						"enable": false,
						"mode": "repulse"
					},
					"resize": true
					},
					"modes": {
					"grab": {
						"distance": 400,
						"line_linked": {
						"opacity": 1
						}
					},
					"bubble": {
						"distance": 250,
						"size": 0,
						"duration": 2,
						"opacity": 0,
						"speed": 3
					},
					"repulse": {
						"distance": 400,
						"duration": 0.4
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
					}
				},
				"retina_detect": true
				}}/>
				<UserOptions history={history} />
				
				<ul className={css(styles.navList)}>
					{this.renderLinks()}
				</ul>

				<ul className={css(styles.navList, styles.navListBottom)}>
					<li>
						<SideLink
							text="Configurações"
							path={`${match.url}configuration`}
							icon="gear"
						/>
					</li>

					<li className={css(styles.navLink)} onClick={this.onLogOut}>
						<Icon
							icon="exit"
							size="small"
							color="red"
						/>
						<span className={css(styles.navText)}>Sair</span>
					</li>
				</ul>
			</div>
		);
	}
}



function mapStateToProps(state) {
	const {auth} = state;
	return {
		materialsById: state.storage.materialsById,
		clinic: auth.clinic
	};

}

export default connect(mapStateToProps, { logOutUser, fetchMaterials, getClinic })(SideMenu);
