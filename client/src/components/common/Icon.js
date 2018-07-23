import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './IconStyles';

const propTypes = {
	/**  Choose one of the listed icons you can find in this section of the styleguide */
	icon: PropTypes.string.isRequired,
	/**
	* The size of the icon:
	*
	* 'small', 'normal' or 'large'
	*/
	size: PropTypes.string,
	/**
	* The color of the icon. Use some of the standard colors:
	*
	* 'blue-dark', 'grey' or 'grey-dark'
	*/
	color: PropTypes.string
};

const defaultProps = {
	icon: 'globe'
};

/**
 * A component to render Icons. These are all the current icons:
 *
 * - facebook
 * - globe
 * - phone
 */

function Icon({ icon, size, color, classAdjust, style }) {
	// This function is going to select the right SVG for the icon
	const getSvg = () => {
		// Check the size and store the right value for width and height
		let sizeValue;
		let sizeMultiplier;
		switch(size) {
			case 'extra-small':
				sizeValue = '8px';
				break;
			case 'small':
				sizeValue = '16px';
				break;
			case 'normal':
				sizeValue = '24px';
				break;
			case 'large':
				sizeValue = '32px';
				break;
			case 'extra-large':
				sizeValue = '48px'; 
				break;
			case 'ultra-large':
				sizeValue = '170px'; 
				break;
			case 'xsmall':
				sizeValue = '10px';
				sizeMultiplier = 1;
				break;
			case 'input':
				sizeValue = '18px';
				break;
			default:
				sizeValue = size?size:'24px';
				break;
		}

		switch(icon) {
			case 'globe':
				return (
					<svg width={sizeValue} height={sizeValue} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M 8 0C 3.58187 0 0 3.58187 0 8C 0 12.4181 3.58187 16 8 16C 12.4181 16 16 12.4181 16 8C 16 3.58187 12.4181 0 8 0ZM 12.5264 10.6667C 12.6693 9.99253 12.7595 9.2768 12.7888 8.53333L 14.9131 8.53333C 14.8576 9.26987 14.6859 9.98507 14.4016 10.6667L 12.5264 10.6667L 12.5264 10.6667ZM 3.4736 5.33333C 3.33067 6.00747 3.24053 6.7232 3.2112 7.46667L 1.08693 7.46667C 1.1424 6.73013 1.31413 6.01493 1.5984 5.33333L 3.4736 5.33333ZM 11.4341 5.33333C 11.5941 6.016 11.6907 6.73067 11.7221 7.46667L 8.53333 7.46667L 8.53333 5.33333L 11.4341 5.33333ZM 8.53333 4.26667L 8.53333 1.14453C 8.77653 1.21547 9.0176 1.33387 9.25387 1.5008C 9.69707 1.81333 10.1205 2.2944 10.4795 2.89227C 10.7275 3.3056 10.9419 3.76587 11.1211 4.2672L 8.53333 4.2672L 8.53333 4.26667ZM 5.52053 2.89173C 5.87947 2.29387 6.30293 1.8128 6.74613 1.50027C 6.9824 1.33333 7.22347 1.21493 7.46667 1.144L 7.46667 4.26613L 4.87893 4.26613C 5.05813 3.7648 5.27253 3.30453 5.52053 2.8912L 5.52053 2.89173ZM 7.46667 5.33333L 7.46667 7.46667L 4.27787 7.46667C 4.30933 6.73067 4.40587 6.016 4.56587 5.33333L 7.46667 5.33333ZM 1.5984 10.6667C 1.31413 9.98507 1.14293 9.26987 1.08693 8.53333L 3.2112 8.53333C 3.24053 9.2768 3.33067 9.99253 3.4736 10.6667L 1.5984 10.6667ZM 4.27787 8.53333L 7.46667 8.53333L 7.46667 10.6667L 4.56587 10.6667C 4.40587 9.984 4.30933 9.26933 4.27787 8.53333ZM 7.46667 11.7333L 7.46667 14.8555C 7.22347 14.7845 6.9824 14.6661 6.74613 14.4992C 6.30293 14.1867 5.87947 13.7056 5.52053 13.1077C 5.27253 12.6944 5.05813 12.2341 4.87893 11.7328L 7.46667 11.7328L 7.46667 11.7333ZM 10.4795 13.1083C 10.1205 13.7061 9.69707 14.1872 9.25387 14.4997C 9.0176 14.6661 8.77653 14.7851 8.53333 14.856L 8.53333 11.7339L 11.1211 11.7339C 10.9419 12.2352 10.7275 12.6949 10.4795 13.1088L 10.4795 13.1083ZM 8.53333 10.6667L 8.53333 8.53333L 11.7221 8.53333C 11.6907 9.26933 11.5941 9.984 11.4341 10.6667L 8.53333 10.6667ZM 12.7893 7.46667C 12.76 6.7232 12.6699 6.00747 12.5269 5.33333L 14.4021 5.33333C 14.6864 6.01493 14.8581 6.73013 14.9136 7.46667L 12.7893 7.46667L 12.7893 7.46667ZM 13.8443 4.26667L 12.2459 4.26667C 11.9355 3.28747 11.5061 2.42827 10.9904 1.74293C 11.6992 2.08213 12.3413 2.53653 12.9024 3.0976C 13.2603 3.45547 13.5749 3.8464 13.8443 4.26667ZM 3.0976 3.0976C 3.65867 2.53653 4.3008 2.08213 5.0096 1.74293C 4.49387 2.42827 4.06507 3.28747 3.75413 4.26667L 2.15573 4.26667C 2.42453 3.8464 2.7392 3.45547 3.0976 3.0976L 3.0976 3.0976ZM 2.15573 11.7333L 3.75413 11.7333C 4.06507 12.7125 4.49387 13.5717 5.0096 14.2571C 4.3008 13.9179 3.65867 13.4635 3.0976 12.9024C 2.73973 12.5445 2.42507 12.1536 2.15573 11.7333L 2.15573 11.7333ZM 12.9024 12.9024C 12.3413 13.4635 11.6992 13.9179 10.9904 14.2571C 11.5061 13.5717 11.9349 12.7125 12.2459 11.7333L 13.8443 11.7333C 13.5755 12.1536 13.2608 12.5445 12.9024 12.9024Z"/>
					</svg>
				);
			case 'facebook':
				return (
					<svg width={sizeValue} height={sizeValue} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z"></path>
					</svg>
				);
			case 'phone':
				return (
					<svg width={sizeValue} height={sizeValue} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z"></path>
					</svg>
				);
			case 'home':
				return (
					<svg width={sizeValue} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M 16 7.12195L 8 0L 0 7.12195L 2.85715 7.12195L 2.85715 14.2439L 5.14286 14.2439L 5.14286 9.49594L 7.42857 9.49594L 7.42857 14.2439L 13.1428 14.2439L 13.1428 7.12195L 16 7.12195ZM 9.14285 9.49594L 11.4286 9.49594L 11.4286 11.8699L 9.14285 11.8699L 9.14285 9.49594Z"/>
					</svg>
				);
			case 'person':
				return (
					<svg height={sizeValue} viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M 6 6.66667C 7.84095 6.66667 9.33333 5.17429 9.33333 3.33333C 9.33333 1.49239 7.84095 0 6 0C 4.15905 0 2.66666 1.49239 2.66666 3.33333C 2.66666 5.17429 4.15905 6.66667 6 6.66667ZM 12 10.6667C 8.79339 7.10378 3.20661 7.10378 0 10.6667L 0 16L 12 16L 12 10.6667Z"/>
					</svg>
				);
			case 'calendar':
				return (
					<svg width={sizeValue} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M 4.66667 0L 2.66667 0L 2.66667 2L 0 2L 0 16L 16 16L 16 2L 13.3333 2L 13.3333 0L 11.3333 0L 11.3333 2L 4.66667 2L 4.66667 0ZM 1.33334 5.33333L 14.6667 5.33333L 14.6667 14.6667L 1.33334 14.6667L 1.33334 5.33333ZM 3.26709 13.3333L 7.65283 13.3333L 7.65283 12.3094L 4.90186 12.3094L 6.35645 10.7757C 6.75488 10.3392 7.03613 9.95687 7.2002 9.62875C 7.36426 9.30062 7.44629 8.97836 7.44629 8.66195C 7.44629 8.0848 7.26318 7.63802 6.89697 7.32162C 6.53369 7.00521 6.02246 6.84701 5.36328 6.84701C 4.93262 6.84701 4.54736 6.93929 4.20752 7.12386C 3.86768 7.3055 3.604 7.55746 3.4165 7.87972C 3.23193 8.20199 3.13965 8.55795 3.13965 8.94759L 4.41406 8.94759C 4.41406 8.62533 4.49609 8.36605 4.66016 8.16976C 4.82715 7.97054 5.0542 7.87093 5.34131 7.87093C 5.60791 7.87093 5.81299 7.95296 5.95654 8.11703C 6.1001 8.27816 6.17188 8.50082 6.17188 8.785C 6.17188 8.993 6.10303 9.21273 5.96533 9.44418C 5.83057 9.67562 5.62109 9.94662 5.33691 10.2572L 3.26709 12.4632L 3.26709 13.3333ZM 10.2456 11.2635C 10.688 11.2635 11.0747 11.1009 11.4058 10.7757C 11.3149 11.763 10.7173 12.2816 9.61279 12.3314L 9.33154 12.3358L 9.33154 13.3949L 9.64355 13.3905C 10.6162 13.3494 11.3677 13.0243 11.8979 12.4149C 12.4282 11.8055 12.6934 10.9676 12.6934 9.90121L 12.6934 9.43099C 12.6904 8.92123 12.5981 8.46859 12.4165 8.07308C 12.2349 7.67757 11.98 7.37435 11.6519 7.16341C 11.3237 6.95248 10.9487 6.84701 10.5269 6.84701C 10.1167 6.84701 9.74756 6.94515 9.41943 7.14144C 9.09131 7.3348 8.83496 7.60726 8.65039 7.95882C 8.46875 8.30746 8.37793 8.69125 8.37793 9.11019C 8.37793 9.76937 8.54785 10.2938 8.8877 10.6834C 9.22754 11.0702 9.68018 11.2635 10.2456 11.2635ZM 11.085 10.1341C 10.9385 10.2396 10.7627 10.2923 10.5576 10.2923C 10.2676 10.2923 10.042 10.181 9.88086 9.95834C 9.72266 9.73275 9.64355 9.44564 9.64355 9.09701C 9.64355 8.74545 9.72559 8.45394 9.88965 8.2225C 10.0537 7.98812 10.2632 7.87093 10.5181 7.87093C 10.7935 7.87093 11.0132 7.98959 11.1772 8.22689C 11.3413 8.4642 11.4233 8.79818 11.4233 9.22884L 11.4233 9.75179C 11.3472 9.90121 11.2344 10.0286 11.085 10.1341Z"/>
					</svg>
				);
			case 'delete':
				return (
					<svg size={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles.path, styles[color])} d="M13.4,0a3.1,3.1,0,0,0-2,.7,3.1,3.1,0,0,0-.7,2V4h-8V5.9H4V28a4,4,0,0,0,4,4H24a4,4,0,0,0,4-4V5.9h1.4V4h-8V2.7a3.2,3.2,0,0,0-.8-2A2.6,2.6,0,0,0,18.7,0Zm0,2h5.2a.7.7,0,0,1,.7.7V4H12.7V2.7A.8.8,0,0,1,13.4,2ZM6,5.9H26V27.8A2,2,0,0,1,24.1,30H8.2A2.3,2.3,0,0,1,6,27.8Zm3.7,5.9V24.2c0,.6.4,1.1.8,1.1h.4c.5,0,.8-.5.8-1.1V11.8c0-.6-.3-1.1-.8-1.1h-.4C10.1,10.7,9.7,11.2,9.7,11.8Zm5.3,0V24.2a1,1,0,0,0,.9,1.1h.3a1,1,0,0,0,.9-1.1V11.8a1,1,0,0,0-.9-1.1h-.3A1,1,0,0,0,15,11.8Zm5.4,0V24.2c0,.6.3,1.1.8,1.1h.3c.5,0,.8-.5.8-1.1V11.8c0-.6-.3-1.1-.8-1.1h-.3C20.7,10.7,20.4,11.2,20.4,11.8Z"/></svg>
				);
			case 'finances':
				return (
					<svg width={sizeValue} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" >
						<path className={css(styles.path, styles[color])} d="M 15.9025 0L 12.9025 0L 14.0581 1.15568L 11.3679 3.94759L 9.78522 2.31828L 9.42779 1.95032L 9.06911 2.31708L 5.18985 6.28365L 3.60453 4.65161L 3.24411 4.28058L 2.88552 4.6534L 0 7.6534L 0.720718 8.34662L 3.24766 5.71942L 4.82999 7.34839L 5.18743 7.71635L 5.54611 7.34959L 9.42536 3.38303L 11.0107 5.01505L 11.3708 5.38576L 11.7294 5.01361L 14.7654 1.86291L 15.9025 3L 15.9025 0ZM 15.9024 5.33333L 13.9597 5.33333L 13.9597 16L 15.9024 16L 15.9024 5.33333ZM 9.42658 8L 11.3693 8L 11.3693 16L 9.42658 16L 9.42658 8ZM 6.83623 9.33333L 4.89347 9.33333L 4.89347 16L 6.83623 16L 6.83623 9.33333ZM 2.30312 10.6667L 0.360359 10.6667L 0.360359 16L 2.30312 16L 2.30312 10.6667Z"/>
					</svg>
				);
			case 'storage':
				return (
					<svg width={sizeValue} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M 6.11268 2.95289L 11.3852 0L 12.9073 2.55727L 7.63474 5.51017L 6.11268 2.95289ZM 1.9772 0.433945L 0 1.54128L 0.511444 2.40058L 2.05241 1.53757L 9.02644 13.255L 9.28216 13.6846L 9.71841 13.4403L 16.9682 9.38009L 16.4567 8.52077L 9.6432 12.3367L 2.66917 0.619278L 2.41344 0.189629L 1.9772 0.433945ZM 14.0489 4.47524L 8.77633 7.42812L 10.2984 9.9854L 15.5709 7.03251L 14.0489 4.47524ZM 8.95659 15.8514C 9.50258 15.5456 9.68965 14.8684 9.37442 14.3388C 9.05919 13.8092 8.36104 13.6277 7.81505 13.9335C 7.26906 14.2393 7.08199 14.9165 7.39722 15.4461C 7.71244 15.9757 8.4106 16.1572 8.95659 15.8514Z"/>
					</svg>
				);
			case 'mail':
				return (
					<svg width={sizeValue} className={css(styles.marginTop)}
						viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M15,0H1C0.45,0,0,0.45,0,1v10c0,0.55,0.45,1,1,1h14c0.55,0,1-0.45,1-1V1C16,0.45,15.55,0,15,0z M14.14,1 L8,5.386L1.86,1H14.14z M1,11V1.614l7,5l7-5V11H1z"/>
					</svg>
				);
			case 'piechart':
				return (
					<svg width={sizeValue} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M 8.91937 0.000226354C 11.4635 -0.0222241 13.9021 1.62689 14.8575 4.25966L 9.17387 6.30191L 8.91937 0.000226354ZM 4.99018 1.41204C 5.77554 1.12985 6.57716 0.985161 7.36841 0.965541L 7.55554 8.4816L 14.6601 5.92886C 16.0769 9.83328 14.0446 14.1413 10.1209 15.5512C 6.19721 16.961 1.86785 14.9388 0.451036 11.0344C -0.96578 7.12996 1.06646 2.82189 4.99018 1.41204Z"/>
					</svg>
				);
			case 'audit':
				return (
					<svg  height={sizeValue} className={css(styles.marginTop)}
						viewBox="-1 -1 14 18" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])}
							d="M12,0.999H8C8-0.104,7.104-1,6-1S4-0.104,4,0.999H0c-0.551,0-1,0.45-1,1V16c0,0.55,0.449,1,1,1h12
							c0.55,0,1-0.45,1-1V1.999C13,1.449,12.55,0.999,12,0.999z M6,0c0.552,0,1,0.448,1,1S6.552,1.999,6,1.999S5,1.552,5,1S5.448,0,6,0z
	 						M12,16H0V1.999h2V4h8V1.999h2V16z"/>
						<polygon className={css(styles.path, styles[color])} points="4.939,11.035 2.672,8.768 1.965,9.475 4.939,12.449 10.035,7.354 9.328,6.646"/>
					</svg>
				);
			case 'gear':
				return (
					<svg height={sizeValue}
						viewBox="0.34 0 15.328 16" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])}
						d="M14.004,8c0-0.461-0.057-0.907-0.155-1.338l1.791-1.465l-1.343-2.333l-2.172,0.783
						c-0.668-0.632-1.478-1.114-2.38-1.388L9.35,0H6.658l-0.37,2.252C5.375,2.524,4.554,3.01,3.879,3.649L1.737,2.877L0.401,5.213
						l1.762,1.431C2.063,7.081,2.004,7.533,2.004,8c0,0.477,0.062,0.938,0.167,1.383l-1.744,1.455l1.342,2.333l2.133-0.801
						c0.669,0.629,1.48,1.107,2.384,1.377L6.658,16H9.35l0.402-2.261c0.899-0.273,1.707-0.756,2.373-1.386l2.165,0.804l1.336-2.337
						l-1.777-1.483C13.947,8.906,14.004,8.46,14.004,8z M8.004,12c-2.209,0-4-1.791-4-4c0-2.209,1.791-4,4-4c2.209,0,4,1.791,4,4
						C12.004,10.209,10.213,12,8.004,12z"
						/>
					</svg>
				);
			case 'exit':
				return (
					<svg height={sizeValue}
						viewBox="0.475 0 14 18" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])} d="M13.475,0h-12c-0.55,0-1,0.45-1,1v16c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1v-5.879l-1,1V17h-12V1h12v4.879l1,1V1 C14.475,0.45,14.024,0,13.475,0z"/>
						<polygon className={css(styles.path, styles[color])} points="14.475,9 10.475,5 10.475,8 6.475,8 6.475,10 10.475,10 10.475,13"/>
					</svg>
				);
			case 'leftArrow':
				return (
					<svg height={sizeValue}
						viewBox="0.5 0.649 11.25 16.851" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])}
						d="M4.333,9.072l6.882-5.78c0.635-0.533,0.717-1.479,0.184-2.113C10.865,0.544,9.92,0.462,9.285,0.995 
						l-8.25,6.928C0.696,8.208,0.5,8.628,0.5,9.072c0,0.444,0.196,0.864,0.535,1.149l0,0l8.25,6.928c0.635,0.533,1.58,0.451,2.113-0.184
						s0.451-1.58-0.184-2.113L4.333,9.072z"/>
					</svg>
				);
			case 'rightArrow':
				return (
					<svg height={sizeValue} className={css(styles.mirror)}
						viewBox="0.5 0.649 11.25 16.851" xmlns="http://www.w3.org/2000/svg">
						<path className={css(styles.path, styles[color])}
						d="M4.333,9.072l6.882-5.78c0.635-0.533,0.717-1.479,0.184-2.113C10.865,0.544,9.92,0.462,9.285,0.995 
						l-8.25,6.928C0.696,8.208,0.5,8.628,0.5,9.072c0,0.444,0.196,0.864,0.535,1.149l0,0l8.25,6.928c0.635,0.533,1.58,0.451,2.113-0.184
						s0.451-1.58-0.184-2.113L4.333,9.072z"/>
					</svg>
				);
			case 'downArrow':
				return (
					<svg width={sizeValue}
						viewBox="0.804 0 10.393 4.5" xmlns="http://www.w3.org/2000/svg">
						<polygon fill='#fff' className={css(styles.path, styles[color])} points="11.238,0 6.02,4.5 0.804,0 "/>
					</svg>
				);
			case 'upArrow':
				return (
					<svg width={sizeValue}  className={css(styles.mirrorTop)}
						viewBox="0.804 0 10.393 4.5" xmlns="http://www.w3.org/2000/svg">
						<polygon fill='#fff' className={css(styles.path, styles[color])} points="11.238,0 6.02,4.5 0.804,0 "/>
					</svg>
				);
			case 'newPatient':
				return (
					<svg  height={sizeValue}
						viewBox="0 0 21 24" xmlns="http://www.w3.org/2000/svg">
						<circle className={css(styles.path, styles[color])}
							cx="8.437" cy="4.707" r="4.707"/>
						<path className={css(styles.path, styles[color])}
							d="M14.303,12.842c-1.413-0.818-3.365-1.566-5.798-1.566c-5.629,0-8.422,3.641-8.422,3.641v7.495h10.769
							c-0.59-0.986-0.936-2.137-0.936-3.37C9.916,16.177,11.748,13.747,14.303,12.842z"/>
						<polygon className={css(styles.path, styles[color])}
							points="17.576,17.966 17.576,14.502 15.422,14.502 15.422,17.966 11.959,17.966 11.959,20.119 
							15.422,20.119 15.422,23.582 17.576,23.582 17.576,20.119 21.039,20.119 21.039,17.966"/>
					</svg>
				);
			case 'x':
				return (
					<svg width={sizeValue} height={sizeValue}
						viewBox="0.471 0.472 7.057 7.057" xmlns="http://www.w3.org/2000/svg">
						<polygon className={css(styles.path, styles[color])}
						points="7.528,6.82 4.707,4 7.527,1.179 6.821,0.471 4,3.292 1.179,0.472 0.471,1.178 3.292,4 0.471,6.821
						1.178,7.528 4,4.707 6.821,7.528 "/>
					</svg>
				);
			case 'check':
				return (
					<svg width={sizeValue}
							xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 40 256 256" >
							<path className={css(styles.path, styles[color])}
							d="m77.243 163.37-41.506-41.51-35.237 35.24 76.743 76.74 178.26-178.26-36.78-33.421z" fillRule="evenodd"
							/>
					</svg>
				);
			case 'printer':
				return (
					<svg width={sizeValue} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" >
						<path className={css(styles.path, styles[color])} fillRule="evenodd" d="M 4 0L 20 0L 20 6L 24 6L 24 18L 20 18L 20 24L 4 24L 4 18L 0 18L 0 6L 4 6L 4 0ZM 18 2L 6 2L 6 6L 18 6L 18 2ZM 6 14L 18 14L 18 22L 6 22L 6 14ZM 16 16L 8 16L 8 17L 16 17L 16 16ZM 8 19L 13 19L 13 20L 8 20L 8 19ZM 21 10C 21.5522 10 22 9.55225 22 9C 22 8.44775 21.5522 8 21 8C 20.4478 8 20 8.44775 20 9C 20 9.55225 20.4478 10 21 10Z"/>
					</svg>
				);
			case 'plus':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} width={sizeValue} viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" className={css(styles.path, styles[color])}/></svg>
				)
			case 'save':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 12 12"><path className={css(styles.path, styles[color])} d="M9.3,0H.5A.5.5,0,0,0,0,.5v11a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5V4.2a.9.9,0,0,0-.1-.5L9.7.2ZM3.6,1.3c0-.1,0-.1.1-.1H5.9v1H7.1v-1h1V3.1a.2.2,0,0,1-.2.2H3.7c-.1,0-.1-.1-.1-.2Zm4.5,9.6H3.6a.3.3,0,0,1-.3-.3V7.5a.3.3,0,0,1,.3-.3H8.3a.3.3,0,0,1,.3.3v2.9A.5.5,0,0,1,8.1,10.9Zm-7,0V1.2H2.5V3.9a.5.5,0,0,0,.5.5H8.7a.5.5,0,0,0,.5-.5V1.4l1.6,2.7a.7.7,0,0,1,.1.5v6.3H9.8V6.6a.5.5,0,0,0-.5-.5H2.6a.5.5,0,0,0-.4.5v4.3H1.1"/></svg>
				)
			case 'ok':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 12 12"><path className={css(styles.path, styles[color])} d="M10.1,1.4,3.6,7,2.2,5.2a.8.8,0,0,0-1-.1L.2,6.2A.6.6,0,0,0,.1,7l3,3.8c.1.2.4.2.6.1l8.1-7.4a.8.8,0,0,0,.1-.9L11,1.5A.6.6,0,0,0,10.1,1.4Z"/></svg>
				)
			case 'edit':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 12 12"><path className={css(styles.path, styles[color])} d="M.6,11.8l2.1-.9c.2-.1.3-.3.1-.5L1.5,9.2c-.2-.2-.4-.1-.5.1L.2,11.5C.1,11.7.4,11.9.6,11.8Z"/><path className={css(styles.path, styles[color])} d="M2.3,8.2,3.8,9.7a.3.3,0,0,0,.4,0l6.5-6.5a.2.2,0,0,0,0-.3L9.2,1.3a.3.3,0,0,0-.4,0L2.3,7.8A.3.3,0,0,0,2.3,8.2Z"/><path className={css(styles.path, styles[color])} d="M11.5,2.1,9.9.6a.3.3,0,0,1,0-.4h.5a3.9,3.9,0,0,1,1.5,1.6.2.2,0,0,1,0,.3h-.1A.2.2,0,0,1,11.5,2.1Z"/></svg>
				)
			case 'atention':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 1000 1000" >
					<g><path className={css(styles.path, styles[color])} d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490S770.6,10,500,10L500,10z M500,876.9c-208.1,0-376.9-168.7-376.9-376.9S291.9,123.1,500,123.1c208.1,0,376.9,168.7,376.9,376.9S708.1,876.9,500,876.9L500,876.9z M438.8,254.5h123.7v309.3H438.8V254.5z M440.1,684.9L440.1,684.9c0,33.5,27.2,60.7,60.7,60.7c33.5,0,60.7-27.2,60.7-60.7l0,0l0,0c0-33.5-27.2-60.7-60.7-60.7C467.3,624.2,440.1,651.4,440.1,684.9L440.1,684.9L440.1,684.9z"/></g>
					</svg>
				);
			case 'folder':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 32 32"><path d="M28.1,9H13a.7.7,0,0,1-.7-.7h0A2.3,2.3,0,0,0,10,5.9H3.9A2.3,2.3,0,0,0,1.6,8.3v20a2.3,2.3,0,0,0,2.3,2.3H28.1a2.3,2.3,0,0,0,2.3-2.3v-17A2.3,2.3,0,0,0,28.1,9Z" fill="#666" className={css(styles.path, styles[color])}/></svg>
				);

				//agenda icons

				case 'not_confirmed':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M14.4,21.3c0-2.6,1.3-3.9,3.6-5.9s2.5-2.4,2.5-4.1S19,7.6,16.6,7.6a4.3,4.3,0,0,0-4.2,3.6,4.1,4.1,0,0,0-.1,1H9.6a4.1,4.1,0,0,1,.1-1c.3-3.7,4.2-5.5,7-5.5s6.2,2.4,6.2,5.4-1.8,4-3.3,5.4a5.6,5.6,0,0,0-2.2,4.8Zm3,5.3h-3v-3h3Z"/>
					<path className={css(styles[color])} d="M16,2A14,14,0,1,1,2,16,14,14,0,0,1,16,2m0-2A16,16,0,1,0,32,16,16,16,0,0,0,16,0Z"/></svg>
				);

				case 'first_attempt':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M19.5,25H15.8V10.8l-4.4,1.4v-3L19,6.4h.4Z"/>
					<path className={css(styles[color])} d="M24.7,29.4A15.9,15.9,0,0,0,31.9,16c0-4.5-2.1-9.6-7.3-13.6,3.1,3.2,5.3,5.8,5.8,11,.7,7.2-4.8,14.7-14.4,14.7C10.7,28.1,5,25,3.3,16.3,2.9,11,6.2,6.4,6.2,6.4l2.4,4.3L10.7.2.9,3,4.6,4.9c-.1,0-1.1,1.5-1.2,1.5A15,15,0,0,0,.1,15.8h0v.4A15.9,15.9,0,0,0,24.7,29.4"/></svg>				
				);

				case 'second_attempt':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M23.6,25H10.9V22.5l6-6.3a14.9,14.9,0,0,0,1.8-2.4,3.5,3.5,0,0,0,.6-1.9,2.9,2.9,0,0,0-.6-1.9,2.1,2.1,0,0,0-1.8-.7,2.4,2.4,0,0,0-1.9.8,3.6,3.6,0,0,0-.8,2.3H10.6a5.5,5.5,0,0,1,.8-3.1,6.6,6.6,0,0,1,2.2-2.2A7.4,7.4,0,0,1,17,6.3a6.6,6.6,0,0,1,4.4,1.4A4.7,4.7,0,0,1,23,11.6a7.7,7.7,0,0,1-.7,2.8,17.8,17.8,0,0,1-2.5,3.3l-4.2,4.4h8Z"/>
					<path className={css(styles[color])} d="M24.7,29.4A15.9,15.9,0,0,0,31.9,16c0-4.5-2.1-9.6-7.3-13.6,3.1,3.2,5.3,5.8,5.8,11,.7,7.2-4.8,14.7-14.4,14.7C10.7,28.1,5,25,3.3,16.3,2.9,11,6.2,6.4,6.2,6.4l2.4,4.3L10.7.2.9,3,4.6,4.9c-.1,0-1.1,1.5-1.2,1.5A15,15,0,0,0,.1,15.8h0v.4A15.9,15.9,0,0,0,24.7,29.4"/></svg>	
				);

				case 'third_attempt':
				return (
					<svg width={sizeValue} height={sizeValue}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M14.9,14.1h2a2.6,2.6,0,0,0,2-.7,2.4,2.4,0,0,0,.6-1.8,2.4,2.4,0,0,0-.6-1.7,2.4,2.4,0,0,0-1.8-.6,2.4,2.4,0,0,0-1.7.6,1.7,1.7,0,0,0-.7,1.5H11.1a4.6,4.6,0,0,1,.7-2.6A6.7,6.7,0,0,1,14,7a7.3,7.3,0,0,1,3-.6,6.9,6.9,0,0,1,4.5,1.4,4.6,4.6,0,0,1,1.6,3.8,3.9,3.9,0,0,1-.7,2.3,5.3,5.3,0,0,1-2,1.6,4.4,4.4,0,0,1,2.3,1.6,4.6,4.6,0,0,1,.7,2.6,5.1,5.1,0,0,1-1.7,3.9A7.1,7.1,0,0,1,17,25a6.3,6.3,0,0,1-4.4-1.4,4.5,4.5,0,0,1-1.8-3.8h3.6a2.1,2.1,0,0,0,.8,1.7,2.9,2.9,0,0,0,1.9.6,3.2,3.2,0,0,0,2-.6,2.4,2.4,0,0,0,.7-1.8q0-2.7-3-2.7H14.9Z"/>
					<path className={css(styles[color])} d="M24.7,29.4A15.9,15.9,0,0,0,31.9,16c0-4.5-2.1-9.6-7.3-13.6,3.1,3.2,5.3,5.8,5.8,11,.7,7.2-4.8,14.7-14.4,14.7C10.7,28.1,5,25,3.3,16.3,2.9,11,6.2,6.4,6.2,6.4l2.4,4.3L10.7.2.9,3,4.6,4.9c-.1,0-1.1,1.5-1.2,1.5A15,15,0,0,0,.1,15.8h0v.4A15.9,15.9,0,0,0,24.7,29.4"/></svg>
				);

				case 'confirmed':
				return (

					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M31.2,11.3A2.6,2.6,0,0,0,28.8,10H21.9c1.4-2.2,3.1-5.9,1.6-8.1l-.2-.3A3,3,0,0,0,21,.3a2.9,2.9,0,0,0-2.2,1l-8,8.7H0V32H23.8c2.6,0,8.1-13.1,8.1-18A4.3,4.3,0,0,0,31.2,11.3ZM6,30H2V12H6Zm17.6,0H8V12h3.6l8.7-9.4a.7.7,0,0,1,.6-.3,1.2,1.2,0,0,1,.8.4l.2.3c.9,1.4-1,5.2-2.7,7.4L18.1,12H28.8a.9.9,0,0,1,1,.8C30.9,16.8,25.2,28.6,23.6,30Z"/></svg>				

					);

				case 'waiting_room':
				return ( 
					<svg width={sizeValue} height={sizeValue}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M15.6,17.7s1-12-.5-12a64.1,64.1,0,0,0-1.4,11.9,2.2,2.2,0,0,0,.6,1.5c1.8,1.9,4.2,4,5.8,5.6C21.8,22.8,15.6,17.7,15.6,17.7Z"/>
					<path className={css(styles[color])} d="M16,.2A15.8,15.8,0,0,0,.2,15.9,16,16,0,0,0,15.9,31.8,15.8,15.8,0,1,0,16,.2Zm0,29.3A13.5,13.5,0,1,1,29.5,16,13.4,13.4,0,0,1,16,29.5Z"/></svg>
				);

				case 'attended':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M16.1.3A15.8,15.8,0,0,0,.4,16,15.8,15.8,0,0,0,16.1,31.7,15.8,15.8,0,0,0,31.8,16,15.8,15.8,0,0,0,16.1.3Zm-5,24-5.5-8,3.5-2.4,3,4.5L23.6,9.9l2.5,3.4Z"/></svg>
				);

				case 'justified_missing':
				return (
					<svg  width={sizeValue} height={sizeValue}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M14.3,15.8,7.4,7.4H9.8a1.9,1.9,0,0,1,1.7.7L16,13.9l4.5-5.8a1.8,1.8,0,0,1,1.7-.7h2.3l-6.8,8.4,7.2,8.8H22.5a2.3,2.3,0,0,1-1.7-.4l-4.9-5.9-4.7,5.9c-.4.6-1.1.4-1.7.4H7.1Z"/>
					<path className={css(styles[color])} d="M16,2A14,14,0,1,1,2,16,14,14,0,0,1,16,2m0-2A16,16,0,1,0,32,16,16,16,0,0,0,16,0Z"/></svg>
				);

				case 'unjustified_missing':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles[color])} d="M15.9,2a14,14,0,1,1-14,14,14,14,0,0,1,14-14m0-2a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/>
					<path className={css(styles[color])} d="M14.1,24.4a1.8,1.8,0,0,1,1.8-1.8,1.7,1.7,0,0,1,1.8,1.8,1.8,1.8,0,1,1-3.6,0Zm.8-4.3L13.4,5.7h5.1L16.9,20.1Z"/></svg>	
				);

				case 'calendar_datepicker': 
				return (
					<svg  width={sizeValue} height={sizeValue} id="14eb2bc7-bbe6-4b74-af6a-5887d4f55dea" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<rect x="0.5" y="7.08" width="31" height="24.42" style={{fill: "none"}}/>
					<path d="M31,7.58V31H1V7.58H31m1-1H0V32H32V6.58Z" className={css(styles[color])}/>
					<path d="M.5,8V5.1A2.61,2.61,0,0,1,3.1,2.5H28.9a2.61,2.61,0,0,1,2.6,2.6V8Z" className={css( styles[color])}/>
					<path d="M28.9,3A2.1,2.1,0,0,1,31,5.1V7.54H1V5.1A2.1,2.1,0,0,1,3.1,3H28.9m0-1H3.1A3.1,3.1,0,0,0,0,5.1V8.54H32V5.1A3.1,3.1,0,0,0,28.9,2Z" className={css(styles[color])}/>
					<rect x="6.56" y="0.25" width="2.11" height="4.48" rx="0.36" ry="0.36" className={css(styles[color])}/>
					<path d="M8.3.5a.11.11,0,0,1,.12.11V4.36a.12.12,0,0,1-.12.12H6.92a.11.11,0,0,1-.11-.12V.61A.11.11,0,0,1,6.92.5H8.3m0-.5H6.92a.61.61,0,0,0-.61.61V4.36A.61.61,0,0,0,6.92,5H8.3a.62.62,0,0,0,.62-.62V.61A.62.62,0,0,0,8.3,0Z" className={css(styles[color])}/>
					<rect x="23.5" y="0.25" width="2.1" height="4.48" rx="0.36" ry="0.36" className={css(styles[color])}/>
					<path d="M25.24.5a.11.11,0,0,1,.11.11V4.36a.11.11,0,0,1-.11.12H23.87a.12.12,0,0,1-.12-.12V.61A.11.11,0,0,1,23.87.5h1.37m0-.5H23.87a.62.62,0,0,0-.62.61V4.36a.62.62,0,0,0,.62.62h1.37a.61.61,0,0,0,.61-.62V.61A.61.61,0,0,0,25.24,0Z" className={css(styles[color])}/>
					<path d="M17.33,13.63V25h-1.9V15.83L14,16.66V14.55l1.47-.92Z" className={css(styles[color])}/></svg>
				);
				
				case 'percent':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className={css(styles.path, styles[color])} d="M24.7,18.5c-3.2,0-5.8,3-5.8,6.8S21.5,32,24.7,32s5.9-3,5.9-6.7-2.7-6.8-5.9-6.8Z"/>
					<path className={css(styles.path, styles[color])} d="M7,0C3.8,0,1.2,3,1.2,6.7S3.8,13.5,7,13.5s5.9-3,5.9-6.8S10.2,0,7,0Z"/>
					<polygon className={css(styles.path, styles[color])} points="4.8 32 0 27.6 27.3 0 32.1 4.4 4.8 32"/></svg>
				);

				case 'linechart':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<polygon className={css(styles.path, styles[color])} points="32 32 0 32 0 0 2 2 2 30 29.5 30 32 32"/>
						<path className={css(styles.path, styles[color])} d="M13.3,27.7a1.3,1.3,0,0,1-1-.4c-1.3-1.1-1.3-4.1-1.2-9.4a47.7,47.7,0,0,0-.2-7.8C10.4,6.4,9.2,5,8.6,5h0c-.8,0-2.1,1.8-2.5,5.3l-.4,4.1-.4,4.2c-.1.8-.1,1.4-.2,1.8v.2h0c-.2.9-.4,1-1.1.9H3v-1h0c.1-.5.3-3.4.6-6L4.1,10c.5-4.1,2.3-7,4.5-7s3.4.9,4.3,6.9a50.6,50.6,0,0,1,.2,8c0,2.5-.1,6.2.3,7.5a22.8,22.8,0,0,0,1-3.8c.7-3.9,1.7-8.7,5.3-8.3,1.5.2,1.9,2.3,2.3,4.8s.8,4.1,1.5,4.5h.1a8.3,8.3,0,0,0,1.2-2.5c.8-1.9,1.6-3.9,3.1-4.4a2.6,2.6,0,0,1,2.1.5,1.1,1.1,0,0,1,.2,1.4,1,1,0,0,1-1.4.2h-.3c-.6.1-1.4,2.1-1.8,3.2s-1.3,3.3-2.5,3.6a2.3,2.3,0,0,1-1.8-.2c-1.4-.8-1.8-3.2-2.3-5.8a14.8,14.8,0,0,0-.8-3.2c-1.6.1-2.4,3.9-3,6.7s-1.1,5.5-2.7,5.7Z"/>
					</svg>
				);

				case 'table':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<path className={css(styles.path, styles[color])} d="M30.2,2V30H1.8V2H30.2m2-2H-.2V32H32.2V0Z"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M1.4,6.8H31.5" style={{fill: "none"}} strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M3.8,25.7H7.7" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M14.3,25.7h3.8" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M24.4,25.7h3.8" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M3.8,19.2H7.7" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M14.3,19.2h3.8" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M24.3,19.2h3.9" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M3.8,12.7H7.7" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M14.3,12.7h3.8" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M24.3,12.7h3.9" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<line className={css(styles.path, styles[color+'_stroke'])} x1="10.9" y1="7.4" x2="10.9" y2="30.4" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<line className={css(styles.path, styles[color+'_stroke'])} x1="21.5" y1="7.4" x2="21.5" y2="30.4" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
					</svg>
				);

				case 'text':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<path className={css(styles.path, styles[color])} d="M30.2,2V30H1.8V2H30.2m2-2H-.2V32H32.2V0Z"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M6.7,8.3H25.3" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M10.9,23.2H21.1" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M6.7,17.9H25.3" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
						<path className={css(styles.path, styles[color+'_stroke'])} d="M10.9,12.8H21.1" style={{fill: "none"}} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
					</svg>
				);

				case 'image':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<path className={css(styles.path, styles[color])} d="M29.4,2.5V29.4H2.5V2.5H29.4M31.9,0H0V31.9H31.9V0Z"/>
						<polyline className={css(styles.path, styles[color+'_stroke'])} points="0.9 22.6 8.8 8.2 18.5 21.3 24.3 15.1 30.8 21.3" style={{fill: "none"}} strokeMiterlimit="10" strokeWidth="2"/>
						<circle className={css(styles.path, styles[color])} cx="22" cy="7.2" r="2.4"/>
					</svg>
				);

				case 'reminder':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<path className={css(styles.path, styles[color])} d="M29.5,2.5V19.8a1.1,1.1,0,0,1-1.2,1.1H21.1v7.4a1.9,1.9,0,0,1-.3.9,1.6,1.6,0,0,1-.9.3H2.5V2.6h27M32,0H0V32H20a3.7,3.7,0,0,0,3.7-3.7V23.4h4.7A3.6,3.6,0,0,0,32,19.8V0Z"/>
						<line className={css(styles.path, styles[color+'_stroke'])} x1="4.9" y1="8.2" x2="26.6" y2="8.2" style={{fill: "none"}} strokeMiterlimit="10" strokeWidth="2"/>
						<line className={css(styles.path, styles[color+'_stroke'])} x1="4.9" y1="12.2" x2="26.6" y2="12.2" style={{fill: "none"}} strokeMiterlimit="10" strokeWidth="2"/>
						<line className={css(styles.path, styles[color+'_stroke'])} x1="4.9" y1="16.2" x2="11.7" y2="16.2" style={{fill: "none"}} strokeMiterlimit="10" strokeWidth="2"/>
					</svg>
				);

				case 'patient':
				return (
					<svg width={sizeValue} height={sizeValue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<ellipse className={css(styles.path, styles[color])} cx="15.9" cy="8.8" rx="9.2" ry="8.8"/>
						<path className={css(styles.path, styles[color])} d="M32,26.7a21.7,21.7,0,0,0-32,.1V32H32Z"/>
					</svg>
				);

				case 'tooth':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.7 26.7">
						<path d="M13.3,1.1A4.2,4.2,0,0,1,15.4.4a15.4,15.4,0,0,1,4,.4,3.4,3.4,0,0,1,2.1,2.6c.1,1.5-1.6,6.2-1.6,6.2s-.5,1.2-.8,1.2H13.8l-7.2-.2L5.5,7.2a9.9,9.9,0,0,1-.3-2.6C5.3,3.7,5.8.8,7.9.7A44.5,44.5,0,0,1,13.3,1.1Z" fill="#fff"/><path d="M19.1,11.1H13.8l-7.4-.2L5.3,7.2A6.5,6.5,0,0,1,5,4.6c0-.9.6-4,2.9-4.1s4.7.3,5.3.3A6,6,0,0,1,15.4.2h0a16.7,16.7,0,0,1,4.1.3,3.9,3.9,0,0,1,2.2,2.9c.1,1.5-1.5,6.1-1.6,6.3S19.4,11.1,19.1,11.1ZM6.8,10.4l7,.2h5.3a4.8,4.8,0,0,0,.6-1.1s1.6-4.7,1.5-6.1S19.6,1.1,19.3,1A14.6,14.6,0,0,0,15.5.7h-.1a4.5,4.5,0,0,0-2,.6h-.1A52.9,52.9,0,0,0,7.9,1C6,1.1,5.5,3.9,5.5,4.6a5.8,5.8,0,0,0,.3,2.5Z" fill="#fff"/>
						<path d="M6.3,10.9s-1,8.1-.1,11.9a9.3,9.3,0,0,0,1.5,3.3.8.8,0,0,0,1.4-.6c0-3,.4-8.5,3.6-8.5s2.8,5.4,3,8.5c.1.9,1.1,1.4,1.7.7s1.5-5,1.6-5.9a43.3,43.3,0,0,0,.4-9.5Z" fill="#fff"/>
						<path d="M13.1,1.1A4.8,4.8,0,0,1,15.3.4a15.1,15.1,0,0,1,3.9.4,3.4,3.4,0,0,1,2.1,2.6c.1,1.5-1.6,6.2-1.6,6.2s-.5,1.2-.8,1.2H13.7l-7.3-.2-1-3.4a6.5,6.5,0,0,1-.3-2.6c0-.9.6-3.8,2.6-3.9A44.5,44.5,0,0,1,13.1,1.1Z" fill="#fff"/><path d="M18.9,11.1H13.7l-7.5-.2L5.1,7.2a9.9,9.9,0,0,1-.3-2.6c0-.9.6-4,2.9-4.1s4.8.3,5.4.3A5.4,5.4,0,0,1,15.3.2h0a15.9,15.9,0,0,1,4,.3,3.8,3.8,0,0,1,2.3,2.9C21.7,4.9,20,9.5,20,9.7S19.2,11.1,18.9,11.1ZM6.6,10.4l7.1.2h5.2a4.8,4.8,0,0,0,.6-1.1s1.7-4.7,1.6-6.1a3.4,3.4,0,0,0-2-2.4A14,14,0,0,0,15.3.7h0a4,4,0,0,0-2,.6h-.2A50.5,50.5,0,0,0,7.8,1c-2,.1-2.5,2.9-2.5,3.6a8.7,8.7,0,0,0,.3,2.5Z" fill="#fff"/>
						<path d="M6.2,10.9S5.1,19,6.1,22.8a7.8,7.8,0,0,0,1.5,3.3c.5.7,1.4.3,1.4-.6-.1-3,.3-8.5,3.5-8.5s2.8,5.4,3,8.5c.1.9,1.2,1.4,1.7.7s1.5-5,1.7-5.9a47.1,47.1,0,0,0,.3-9.5Z" fill="#fff"/>
					</svg>
				);

				//icons Archives

				case 'excel':
				return(
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 228 170" ><text transform="translate(101.5 66.8)" font-size="39.51" fill="#42b282" font-family="Roboto-Medium, Roboto">X</text><path d="M164.8,8.7H78.7a5.4,5.4,0,0,0-3.9,1.6L59.5,25.7a5.5,5.5,0,0,0-1.6,3.9V155.8a5.5,5.5,0,0,0,5.5,5.5H164.8a5.5,5.5,0,0,0,5.5-5.5V14.2A5.5,5.5,0,0,0,164.8,8.7Zm-1.4,145.8H64.7V28.5H78.3V15.5h85.1Z" fill="#42b282"/><rect x="88.3" y="87.6" width="13.2" height="5.75" fill="#42b282"/><rect x="107" y="87.6" width="13.2" height="5.75" fill="#42b282"/><rect x="125.7" y="87.6" width="13.2" height="5.75" fill="#42b282"/><rect x="88.3" y="99.6" width="13.2" height="5.75" fill="#42b282"/><rect x="107" y="99.6" width="13.2" height="5.75" fill="#42b282"/><rect x="125.7" y="99.6" width="13.2" height="5.75" fill="#42b282"/><rect x="88.3" y="111.5" width="13.2" height="5.75" fill="#42b282"/><rect x="107" y="111.5" width="13.2" height="5.75" fill="#42b282"/><rect x="125.7" y="111.5" width="13.2" height="5.75" fill="#42b282"/></svg>
				);

				case 'pdf':
				return(
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 228 170"><path d="M87.4,67.3V77H82.9V50.9h10a10.1,10.1,0,0,1,6.9,2.3,7.6,7.6,0,0,1,2.6,6,7.4,7.4,0,0,1-2.6,6c-1.6,1.4-4,2.1-7,2.1Zm0-3.6h5.5a4.9,4.9,0,0,0,3.6-1.2,3.8,3.8,0,0,0,1.3-3.2,4.4,4.4,0,0,0-1.3-3.4A4.8,4.8,0,0,0,93,54.6H87.4Z" fill="#e9bb8e"/><path d="M106.3,77V50.9H114a12.3,12.3,0,0,1,6.1,1.6,10.9,10.9,0,0,1,4.2,4.3,15.1,15.1,0,0,1,1.4,6.5v1.3a14.5,14.5,0,0,1-1.4,6.5,10.5,10.5,0,0,1-4.2,4.4,13,13,0,0,1-6.3,1.5Zm4.5-22.4V73.4h3a6.8,6.8,0,0,0,5.4-2.2,9.6,9.6,0,0,0,2-6.4V63.3c0-2.8-.6-5-1.9-6.5a6.4,6.4,0,0,0-5.3-2.2Z" fill="#e9bb8e"/><path d="M145.3,66H134.8V77h-4.6V50.9h16.6v3.7h-12v7.7h10.5Z" fill="#e9bb8e"/><rect x="82.1" y="90.4" width="62.6" height="5.75" fill="#e9bb8e"/><rect x="82.1" y="101.3" width="62.6" height="5.75" fill="#e9bb8e"/><rect x="82.1" y="111.3" width="19.6" height="5.75" fill="#e9bb8e"/><path d="M164.7,8.7H78.6a5.4,5.4,0,0,0-3.9,1.6L59.4,25.7a5.5,5.5,0,0,0-1.6,3.9V155.8a5.5,5.5,0,0,0,5.5,5.5H164.7a5.5,5.5,0,0,0,5.5-5.5V14.2A5.5,5.5,0,0,0,164.7,8.7Zm-1.4,145.8H64.6V28.5H78.2V15.5h85.1Z" fill="#e9bb8e"/></svg>
				);

				case 'ppt':
				return(
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 228 170"><text transform="translate(101.3 65.5)" font-size="39.51" fill="#fc7f54" font-family="Roboto-Medium, Roboto">P</text><path d="M164.8,8.7H78.7a5.4,5.4,0,0,0-3.9,1.6L59.5,25.7a5.5,5.5,0,0,0-1.6,3.9V155.8a5.5,5.5,0,0,0,5.5,5.5H164.8a5.5,5.5,0,0,0,5.5-5.5V14.2A5.5,5.5,0,0,0,164.8,8.7Zm-1.4,145.8H64.7V28.5H78.3V15.5h85.1Z" fill="#fc7f54"/><path d="M93.1,100.9l-5.9-9.7A11.7,11.7,0,0,0,83,95.8a11.4,11.4,0,1,0,19.1-1.9Z" fill="#fc7f54"/><rect x="108.9" y="109.3" width="5.7" height="5.75" fill="#fc7f54"/><rect x="117.8" y="109.3" width="27.5" height="5.75" fill="#fc7f54"/><rect x="108.9" y="98.4" width="5.7" height="5.75" fill="#fc7f54"/><rect x="117.8" y="98.4" width="27.5" height="5.75" fill="#fc7f54"/><rect x="108.9" y="87.6" width="5.7" height="5.75" fill="#fc7f54"/><rect x="117.8" y="87.6" width="27.5" height="5.75" fill="#fc7f54"/></svg>
				);

				case 'word':
				return(
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 228 170"><path d="M121.4,71.3l4.2-20.6h4.8L124,78.1h-4.5l-5.3-20-5.3,20h-4.6L98,50.7h4.7L107,71.3l5.2-20.6h4Z" fill="#78a9ff"/><rect x="81.8" y="90.5" width="63.3" height="5.8" fill="#78a9ff"/><rect x="81.8" y="101.5" width="63.3" height="5.8" fill="#78a9ff"/><rect x="81.8" y="111.6" width="19.8" height="5.8" fill="#78a9ff"/><path d="M165.3,7.9H78.4a5.9,5.9,0,0,0-4,1.6L58.9,25.1A5.9,5.9,0,0,0,57.3,29V156.5a5.6,5.6,0,0,0,5.6,5.6H165.3a5.6,5.6,0,0,0,5.5-5.6V13.5A5.6,5.6,0,0,0,165.3,7.9Zm-1.4,147.3H64.2V27.9H78v-13h85.9Z" fill="#78a9ff"/></svg>
				);

				case 'zip':
				return(
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 228 170"><text transform="translate(77.5 127) scale(0.98 1)" font-size="47.76" fill="#848484" font-family="Roboto-Medium, Roboto">ZIP</text><path d="M173.5,12.1H71.4a6.5,6.5,0,0,0-4.7,2L48.5,32.7a7,7,0,0,0-1.9,4.7V151.9a6.6,6.6,0,0,0,6.5,6.7H173.5a6.6,6.6,0,0,0,6.5-6.7V18.8A6.6,6.6,0,0,0,173.5,12.1Zm-1.6,138.2H54.7V37.7L72.6,20.4h99.3Z" fill="#848484"/><path d="M112.6,62.9h0a3.9,3.9,0,0,0-3.8,4.1v4c0,.9-1.9,7.1-1.5,7.7s2.5-5,5.3-5,3.3,3.7,5.1,5-1.4-6.8-1.4-7.7V67A3.9,3.9,0,0,0,112.6,62.9Z" fill="#848484"/><path d="M112.6,73.5a5.9,5.9,0,0,0,0,11.8,5.9,5.9,0,0,0,0-11.8Zm0,10.2a4.3,4.3,0,0,1,0-8.6,4.3,4.3,0,0,1,0,8.6Z" fill="#848484"/><polygon points="109.8 59 109.8 56.4 118 56.4 118 51.6 109.8 51.6 109.8 49 118 49 118 42.9 109.9 42.9 109.9 40.3 118 40.3 118 33.9 109.8 33.9 109.8 31.3 118 31.3 118 24.6 109.8 24.6 109.8 22 118 22 118 19.4 106.3 19.4 106.3 26.7 114.1 26.7 114.1 29.3 106.3 29.3 106.3 35.9 114.4 35.9 114.4 38.5 106.3 38.5 106.3 44.8 114.4 44.8 114.4 47.3 106.3 47.3 106.3 52.9 114.5 52.9 114.5 55.5 106.3 55.5 106.3 60.3 114.5 60.3 114.5 62.9 118 62.9 118 59 109.8 59" fill="#848484"/></svg>
				);

				case 'unknown':
				return(
					<svg xmlns="http://www.w3.org/2000/svg" width={sizeValue} height={sizeValue} viewBox="0 0 228 170"><path d="M164.8,8.7H78.7a5.4,5.4,0,0,0-3.9,1.6L59.5,25.7a5.5,5.5,0,0,0-1.6,3.9V155.8a5.5,5.5,0,0,0,5.5,5.5H164.8a5.5,5.5,0,0,0,5.5-5.5V14.2A5.5,5.5,0,0,0,164.8,8.7Zm-1.4,145.8H64.7V28.5H78.3V15.5h85.1Z" fill="#00a99d"/><rect x="84.3" y="67.6" width="59.5" height="6.21" fill="#00a99d"/><rect x="84.3" y="78.6" width="59.5" height="6.21" fill="#00a99d"/><polygon points="143.8 95.8 114 102.4 84.3 95.8 84.3 89.7 143.8 89.7 143.8 95.8" fill="#00a99d"/></svg>
				);
				
			default:
				return '';
		}
	};

	return (
		<span className={css(styles.icon, styles[size], styles[classAdjust])}>
			{getSvg()}
		</span>
	);
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
