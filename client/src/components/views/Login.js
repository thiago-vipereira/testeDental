import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './LogInStyles';
import logoImg from '../assets/logo.png';

import LinkExternal from '../navigation/LinkExternal';
import Logo from '../assets/Logo';
import LogInForm from '../forms/LogInForm';
import ClinicsList from '../lists/ClinicsList';

import Particles from 'react-particles-js';

class LogIn extends Component {
	constructor(props) {
		super(props);

		this.renderForm = this.renderForm.bind(this);
	}

	renderForm() {
		const { history, auth } = this.props;

		if (auth.message && auth.message === 'loading clinic') {
			return <ClinicsList history={history} />
		} else {
			return <LogInForm history={history}/>
		}
	}

	render(){
	
		return (
			
			<div className={css(styles.grid)}>
			
				<div className={css(styles.column, styles.columnForm)}>
					<div className={css(styles.formContainer)}>
						<Logo src={logoImg} alt="A logo da DentalQI"/>

						{this.renderForm()}
					</div>

					<div className={css(styles.bottomAbsolute, styles.subscription)}>
						<span className={css(styles.subscriptionTxt)}>Não tem uma conta ainda?</span>
						<LinkExternal
							text="Cadastre-se aqui"
							url="http://www.softmanager.com.br/contato/"
						/>
					</div>
				</div>

				<div className={css(styles.column, styles.columnLog)}>
				<Particles className={css(styles.wrapper)}  params={{
							"particles": {
								"number": {
								"value": 80,
								"density": {
									"enable": true,
									"value_area": 800
								}
								},
								"color": {
								"value": "#ffffff"
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

								},
								"opacity": {
								"value": 0.5,
								"random": false,
								"anim": {
									"enable": false,
									"speed": 1,
									"opacity_min": 0.1,
									"sync": false
								}
								},
								"size": {
								"value": 3,
								"random": true,
								"anim": {
									"enable": false,
									"speed": 40,
									"size_min": 0.1,
									"sync": false
								}
								},
								"line_linked": {
								"enable": true,
								"distance": 190,
								"color": "#ffffff",
								"opacity": 0.4,
								"width": 1
								},
								"move": {
								"enable": true,
								"speed": 3,
								"direction": "none",
								"random": false,
								"straight": false,
								"out_mode": "out",
								"bounce": false,
								"attract": {
									"enable": false,
									"rotateX": 600,
									"rotateY": 1200
								}
								}
							},
							"interactivity": {
								"detect_on": "canvas",
								"events": {
								"onhover": {
									"enable": true,
									"mode": "repulse"
								},
								"onclick": {
									"enable": true,
									"mode": "push"
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
									"distance": 400,
									"size": 40,
									"duration": 2,
									"opacity": 8,
									"speed": 3
								},
								"repulse": {
									"distance": 100,
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
				
					<div className={css(styles.tips)}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet velit augue.
						Maecenas ut arcu vel enim tempus finibus in vitae elit. Maecenas nec tincidunt nisl, quis convallis magna.
						Sed a lorem ac est placerat vehicula. Suspendisse accumsan placerat condimentum.
						Sed dignissim vel augue sed vehicula. Etiam fringilla varius ipsum nec ultricies.
						Mauris nec malesuada enim. Duis eget egestas odio, ut posuere diam.
					</div>

					<div className={css(styles.bottomAbsolute, styles.bottomLinks)}>
						<LinkExternal
							text="dentalqi.com/suporte"
							url="http://www.softmanager.com.br/contato/"
							icon="globe"
							decoration={false}
						/>
						<LinkExternal
							text="facebook/dentalqi"
							url="https://www.facebook.com/softmanageronline/"
							icon="facebook"
							decoration={false}
						/>
						<LinkExternal
							text="0800 006 1900"
							url="tel:08000061900"
							icon="phone"
							decoration={false}
						/>
					</div> 
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(LogIn);
