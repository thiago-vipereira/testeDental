import React from 'react';
import { css } from 'aphrodite/no-important';
import { styles } from './IconStyles';
import ReactTooltip from 'react-tooltip';

function IconOdontogram({number, crown, tooth, width, height, style}) {
	var rootColor = '#eace8b';
	var backRootColor = '#d6b980';
	
	const getSvg = (icon, color1, color2) => {
		let width = width ? width : '70px';
		let height = height ? height : '175px';

		if(!color1){
			color1 = "#f2f2f2";
		}
		if(!color2){
			color2 = "#ddd";
		}

		switch(icon) {
			case 'tooth_11':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M36,161.9s10.7-4.7,17.6-19.9c3.1-6.6-3.8-19-6.1-26.3-3.5-10.9-9-12.5-13-12.5s-8.8,3-11.8,10.4-7.8,22.7-5.7,27.8C21.3,151.5,30.3,161.9,36,161.9Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M25.1,113.1s-7.4,14.1-6.9,26.3c.2,4.1,9.5,16.4,11.1,16.8C29.3,156.2,16.7,132.1,25.1,113.1Z" fill={color2}/><path d="M37.1,111.2c6.6-.7,12.2,14.2,14,26.1.8,5.5-8.9,20.2-14.7,16.7-3-1.8-2.5-12.4-2.4-19.3C34.3,122.5,32.7,111.6,37.1,111.2Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_11':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M36.5,23.7c.1,6.6,2.5,16.5,6.9,42,2.5,14.3.9,29.7,4,54.4.6,5.1-1.3-15.4-12-15.4S23.6,117,23.6,117,23.6,46.1,36.5,23.7Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M42.4,103.1s-1.9-38-3.5-41.5c-5.5-12.5-4.6-20.3-3.5-23.5,0,0-4.8,8.5-8.2,65C27.2,103.1,34.8,94.8,42.4,103.1Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_12':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M46.9,150.4c4.7-3.6.2-31.6-2.1-38.9-3.5-10.9-8.2-12.2-12.2-12.2s-8,3.9-11,11.3-8.8,33.9-5.8,38.5C19.7,155.2,42.1,154,46.9,150.4Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M25.2,105.8c-2.4-1.5-9.6,24.9-9.6,39.6,0,4,2.5,5.8,2.3,4.2C16,135.6,26.1,106.3,25.2,105.8Z" fill={color2}/><path d="M32.9,108.3c5.6,0,8.6,9.9,9,21.1.1,3.7,1.7,14-3.3,15.9-2.2.8-9.6.1-11.7,0-6.5-.3-2.7-9.9-1.9-16.3C26.4,117.8,29.2,108.3,32.9,108.3Z" fill="#fff" opacity="0.4"/><path d="M41,105.5c2.5-1.3,8.2,25.3,7.4,39.8-.2,4.1-2.9,5.7-2.6,4.1C48.6,135.6,40.2,106,41,105.5Z" fill={color2}/></svg>
				);
				break;
			case 'root_12':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M37.6,29.4c0,5.8-2.1,14.5-5.9,36.7-2.2,12.4-5.5,25.3-8.1,46.8-.6,4.4.9-8.5,10.1-8.5s10.9,13.4,10.9,13.4S48.7,49,37.6,29.4Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M28.5,102.5S33.9,71.2,35.1,68C39,57.5,39.7,49.6,39,46.7c0,0,3.5,7.8,2.5,57.1C41.5,103.8,35.6,96,28.5,102.5Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_13':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M35.4,165.1s10.7-4.7,17.6-19.9c3-6.6-3.9-19-6.2-26.3-3.4-10.9-8.9-12.5-12.9-12.5s-8.8,3-11.8,10.4-7.9,22.7-5.7,27.9C20.7,154.7,29.6,165.1,35.4,165.1Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M24.5,116.3s-7.4,14.1-6.9,26.3c.2,4.1,9.5,16.4,11.1,16.8C28.7,159.4,16.1,135.3,24.5,116.3Z" fill={color2}/><path d="M36.5,114.4c6.6-.7,12.2,14.2,14,26.1.8,5.5-9,20.2-14.7,16.7-3-1.8-2.6-12.4-2.4-19.3C33.7,125.7,32.1,114.8,36.5,114.4Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_13':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M35.9,25.1c0,6.6,2.4,16.5,6.9,42,2.5,14.3.9,29.7,3.9,54.4.7,5.1-1.2-15.4-11.9-15.4S23,118.5,23,118.5,23,47.5,35.9,25.1Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M41.8,104.5s-1.9-38-3.5-41.5c-5.6-12.5-4.6-20.3-3.5-23.5,0,0-4.8,8.5-8.2,65C26.6,104.5,34.2,96.3,41.8,104.5Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M35.3,154.9s11.1-.6,18.2-13.8c2.1-4-4.5-17.7-6.9-25.4s-7-11.7-12.3-11.5c-3.7.2-6.8.6-9.8,7.1s-11.4,27.1-9.2,31.6C19.6,151.6,29.5,155,35.3,154.9Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M25.5,120.7s-9,16.9-7.6,20.8,8.5,8.9,10,9.4S17.3,133.4,25.5,120.7Z" fill={color2}/><path d="M36.1,118.6c5.6,0,13.1,6.7,14.9,18.7.8,5.4-9.1,15.9-14.8,12.4-3-1.8-6-9.7-6-16.6A22,22,0,0,1,36.1,118.6Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M43.6,93.7s-8.2-50.1-5.5-55.4,7-15.5,6.7-12.3C43,45.8,43.6,70.1,43.5,93.3" fill={backRootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M38,21.1l7.9,95.4s-1-12.2-11.7-12.2-10.4,11.4-10.4,11.4S26.2,44,38,21.1Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M39.6,101s-2.2-63.6-3.3-63.3-4.8,8.5-8.2,65C28.1,102.7,31.4,98.3,39.6,101Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_15':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M34.2,146.5s-11.9.1-19.7-14.5c-4.1-7.6,8.5-27.3,8.5-27.3a44.8,44.8,0,0,1,12.1-1.2c10.7,0,11.3,2.4,11.3,2.4s10.4,14.1,8,21.2C49.8,140.6,41.9,148.4,34.2,146.5Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M24.4,107.7s-9.8,17.7-8.2,22,9.8,12.1,11.6,12.6S15.4,121.9,24.4,107.7Z" fill={color2}/><path d="M35.1,106.1c6.1,0,14.4,7.6,16.4,20.9.9,6.1-10,17.7-16.3,13.8-3.3-2-6.6-10.8-6.6-18.5A24.8,24.8,0,0,1,35.1,106.1Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_15':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M52.5,18.4S35.6,35.4,34,43.1L22.3,107.5s0-.8,10.8-1.6,14.3,3.4,14.3,3.4S39.9,42.1,52.5,18.4Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M28.2,101.9c-.5.1,6.6-46.8,9.2-57.1,1.5-6,8.2-15.3,8.2-15.3s-8.7,11.7-8.2,72.4C37.4,101.9,35.6,101,28.2,101.9Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M10.4,129.1c.8,8.1,6.5,14.8,12.2,14.8,11,0,12.5-7.4,12.5-7.4s1,5.3,7.8,6.6,13.4-.5,15.3-6.5-1.2-16.5-1.7-18.3l-4-15.1H19.4S9.9,123,10.4,129.1Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M18.2,111.9s5.1-6.3,11.1-4.2,18.9,8.5,23,16,0,13.5-5,14.5c-.9.2-9.2.4-10.9-9.1s-2.9-.8-2.9-.8-.4,5.9-2.4,8.3-10,4.6-14.5-.9S13.2,118,18.2,111.9Z" fill="#fff" opacity="0.4"/><path d="M34.8,128.6s-1.5,12.4-12,11c0,0-8.6-2-11.1-12.6a16.1,16.1,0,0,0,3.9,12c8,8.6,19,1.4,19.4-5,.1-3.1-.2,4,3.7,6.3,9.9,5.8,18.6.1,18.9-4.8a40.5,40.5,0,0,0-.7-9.6s.5,7.1-2.7,10.2C47.6,142.6,40.2,140.7,34.8,128.6Z" fill={color2}/><path d="M34.6,104.6l15.8.3c1.8,1.4,5.7,18.6,5.7,19.1S51.6,109.2,34.6,104.6Z" fill={color2}/></svg>
				);
				break;
			case 'root_16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M38.5,50.8c.2-.5,7.4-7.7,7.4-7.7v6.2l-3.7,30L36,89.9l-1.4,1.3s-2.2-14.5-2.2-15,1.5-21.9,1.5-21.9Z" fill={backRootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M52.3,104.8,33,104.6l-13.8.2s2.6-31,5.2-38.9c1.7-5.3,5.8-14.4,10.4-19.1s6.3-7,6.3-7,.2,6-.2,6.3S35.1,57,34.8,61.7s0,26.8,0,26.8,6.3-7.2,6.9-14.5,2.8-22.5,2.8-22.5,4.3-6.5,4.8-9.7S51,52.5,51.1,65.6C51.1,72.7,52.3,104.8,52.3,104.8Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M27.4,65.1c-2.8,5.5-2,11.4-3,25.3-.4,5-1.6,12.4-1.6,12.4H49.2s.5-50.7-1.5-46.8a10.3,10.3,0,0,0-1.6,4.1c-1.5,7.2-2.1,19.4-3.7,22.1C39.1,87.5,33.8,95,33.8,95a130.6,130.6,0,0,1-3.2-19.7c-.1-1.3,0-12.6.8-15.9C31.4,59.4,28.4,63.3,27.4,65.1Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M11.8,125.5c.6,7.1,5.6,13,10.7,13,9.5,0,10.9-6.4,10.9-6.4s.8,4.6,6.8,5.7,11.6-.4,13.3-5.6-1-14.5-1.5-16.1l-3.4-13.2h-29S11.3,120.2,11.8,125.5Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M18.6,110.6s4.5-5.6,9.6-3.8,16.6,7.5,20.2,14.1,0,11.7-4.4,12.6c-.8.2-8.1.4-9.5-7.9s-2.5-.7-2.5-.7-.4,5.2-2.1,7.2-8.8,4-12.8-.8S14.2,115.9,18.6,110.6Z" fill="#fff" opacity="0.4"/><path d="M33.1,125.2s-1.3,10.7-10.5,9.6c0,0-7.5-1.8-9.7-11a14.1,14.1,0,0,0,3.4,10.5c7,7.5,16.6,1.2,16.9-4.5.1-2.6-.1,3.6,3.2,5.6,8.8,5,16.3.1,16.6-4.2a33.5,33.5,0,0,0-.6-8.4s.4,6.2-2.4,8.9C44.2,137.3,37.8,135.7,33.1,125.2Z" fill={color2}/><path d="M32.9,104.2l13.8.3c1.6,1.2,5,16.1,5,16.6S47.8,108.2,32.9,104.2Z" fill={color2}/></svg>
				);
				break;
			case 'root_17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M36.3,58c.2-.5,6.5-6.7,6.5-6.7v5.4L39.5,82.9l-5.3,9.3-1.3,1.1S31,80.6,31,80.2,32.3,61,32.3,61Z" fill={backRootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M48.4,105.2,31.5,105l-12.1.2s2.3-27.1,4.6-34c1.5-4.7,5.1-12.6,9.1-16.7a63.1,63.1,0,0,0,5.4-6.2s.3,5.3-.1,5.6-5.1,9.5-5.3,13.6,0,23.4,0,23.4,5.4-6.2,6-12.6,2.5-19.7,2.5-19.7,3.2-4.6,2.8-13.4c-.2-3.7,7.2,10.4,7.3,21.8C51.7,73.3,48.4,105.2,48.4,105.2Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M26.6,70.5c-2.5,4.8-1.7,10-2.6,22.1a60,60,0,0,0,0,9.1H47.1c2.9-13.7,2-46,1-42.2s-2.8,5.3-3.3,7.5c-1.3,6.3-3.7,16.1-5.1,18.4a84.3,84.3,0,0,1-7.8,10.1,122.5,122.5,0,0,1-2.5-16.1c0-1.1,0-11,.7-13.9C30.1,65.5,27.5,68.9,26.6,70.5Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M22.8,105.2s-11,21-.7,26.7c8.1,4.5,18.3,2.4,19-.1s7-.5,9.1-1.3,3.1-.8,2.4-7.9.8-14.9-.7-16.8S40.4,104,40.4,104A42.6,42.6,0,0,1,22.8,105.2Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M37.3,111.6s-1.5,15.7-6.6,17.3-8.8.5-9.6-5.3,2.5-12.5,3.7-12.9S35.1,109.6,37.3,111.6Z" fill="#fff" opacity="0.4"/><path d="M39.8,130.3a39.6,39.6,0,0,0-3.8,1.3c-2.6,1-7.4.6-7.4.6S39.8,134.6,39.8,130.3Z" fill="#fff" opacity="0.4"/><path d="M41,127.4c1.8,1,4.6,3.2,5.6,1.4,1.9-3.6-4.6-10.9-5.5-16S39.3,126.4,41,127.4Z" fill="#fff" opacity="0.4"/><path d="M38.9,112.5c0-.6.1,16.2-1.1,17a15.6,15.6,0,0,1-7.6,2.1C27.7,131.4,38.2,130.4,38.9,112.5Z" fill={color2}/></svg>
				);
				break;
			case 'root_18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M40.1,53.5s1.6-8.6,3.7-11.5l2.1-2.8.2,7.1Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M52.9,41c-9.4,18.1-1.5,67.7-1.5,67.7s-11.6-1.3-14.8.1-13.2.4-13.8.4,2.1-17.9,4.7-26.8C40.6,38.2,52.9,41,52.9,41Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M26.9,103.1c-.9-7,6.6-40,20.6-57.9,0,0-8.7,10.1-8,37.8a123.1,123.1,0,0,0,2.1,18.4s-3.4-.4-5.4.8C32.6,104.3,26.7,104,26.9,103.1Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M34.9,161.9S24.1,157.2,17.2,142c-3-6.6,3.9-19,6.2-26.3,3.4-10.9,8.9-12.5,13-12.5s8.7,3,11.7,10.4,7.9,22.7,5.7,27.8C49.5,151.5,40.6,161.9,34.9,161.9Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M45.7,113.1s7.4,14.1,6.9,26.3c-.1,4.1-9.5,16.4-11,16.8C41.6,156.2,54.2,132.1,45.7,113.1Z" fill={color2}/><path d="M33.7,111.2c-6.5-.7-12.2,14.2-14,26.1-.8,5.5,9,20.2,14.7,16.7,3-1.8,2.6-12.4,2.4-19.3C36.5,122.5,38.2,111.6,33.7,111.2Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M34,21.7c0,6.6-2.4,16.5-6.9,42-2.4,14.3-.8,29.7-3.9,54.4-.6,5.1,1.2-15.4,12-15.4S47,115,47,115,46.9,44.1,34,21.7Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M28.2,101.1s1.9-38,3.4-41.5c5.6-12.5,4.7-20.3,3.6-23.5,0,0,4.8,8.5,8.2,65C43.4,101.1,35.8,92.8,28.2,101.1Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_22':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M21,156.4c-4.7-3.6-.2-31.6,2.1-38.9,3.4-10.9,8.1-12.2,12.2-12.2s8,3.9,11,11.3,8.8,33.9,5.8,38.5C48.2,161.2,25.7,160,21,156.4Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M42.6,111.8c2.4-1.5,9.7,24.9,9.7,39.6,0,4-2.6,5.8-2.3,4.2C51.9,141.6,41.8,112.3,42.6,111.8Z" fill={color2}/><path d="M34.9,114.3c-5.5,0-8.6,9.9-8.9,21.1-.1,3.7-1.8,14,3.3,15.9,2.2.8,9.6.1,11.6,0,6.6-.3,2.8-9.9,2-16.3C41.5,123.8,38.7,114.3,34.9,114.3Z" fill="#fff" opacity="0.4"/><path d="M26.9,111.5c-2.5-1.3-8.3,25.3-7.4,39.8.2,4.1,2.9,5.7,2.6,4.1C19.3,141.6,27.7,112,26.9,111.5Z" fill={color2}/></svg>
				);
				break;
			case 'root_22':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M30.3,30.4c0,5.8,2.1,14.5,5.9,36.7,2.1,12.4,5.5,25.3,8.1,46.8.5,4.4-.9-8.5-10.2-8.5s-10.8,13.4-10.8,13.4S19.2,50,30.3,30.4Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M39.4,103.5S33.9,72.2,32.8,69c-3.9-10.5-4.6-18.4-3.9-21.3,0,0-3.6,7.8-2.6,57.1C26.3,104.8,32.3,97,39.4,103.5Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_23':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M32.5,159.1s-10.7-4.7-17.6-19.9c-3.1-6.6,3.8-19,6.1-26.3,3.5-10.9,9-12.5,13-12.5s8.8,3,11.8,10.4,7.8,22.7,5.7,27.9C47.2,148.7,38.2,159.1,32.5,159.1Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M43.4,110.3s7.4,14.1,6.9,26.3c-.2,4.1-9.5,16.4-11.1,16.8C39.2,153.4,51.8,129.3,43.4,110.3Z" fill={color2}/><path d="M31.4,108.4c-6.6-.7-12.2,14.2-14,26.1-.8,5.5,8.9,20.2,14.7,16.7,3-1.8,2.5-12.4,2.4-19.3C34.2,119.7,35.8,108.8,31.4,108.4Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_23':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M32.7,20.4c0,6.6-2.4,16.5-6.9,42-2.4,14.3-.8,29.7-3.9,54.4-.6,5.1,1.2-15.4,12-15.4s11.8,12.4,11.8,12.4S45.6,42.8,32.7,20.4Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M26.9,99.8s1.9-38,3.4-41.5C35.9,45.8,35,38,33.9,34.8c0,0,4.8,8.5,8.2,65C42.1,99.8,34.5,91.5,26.9,99.8Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M34.1,154.9s-11.1-.6-18.2-13.8c-2.2-4,4.4-17.7,6.8-25.4s7.1-11.7,12.4-11.5c3.6.2,6.8.6,9.8,7.1s11.3,27.1,9.2,31.6C49.8,151.6,39.8,155,34.1,154.9Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M43.8,120.7s9.1,16.9,7.7,20.8-8.5,8.9-10.1,9.4S52.1,133.4,43.8,120.7Z" fill={color2}/><path d="M33.2,118.6c-5.5,0-13.1,6.7-14.9,18.7-.8,5.4,9.1,15.9,14.9,12.4,3-1.8,6-9.7,6-16.6A21.9,21.9,0,0,0,33.2,118.6Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M26.8,93.7S35,43.6,32.2,38.3s-7-15.5-6.6-12.3c2.4,20.1,1.2,42.8,1.2,67.3" fill={backRootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M31.4,21.1l-7.9,95.4s1-12.2,11.7-12.2,10.3,11.4,10.3,11.4S43.1,44,31.4,21.1Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M29.8,101S32,37.4,33.1,37.7s4.8,8.5,8.2,65C41.3,102.7,38,98.3,29.8,101Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_25':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M35.2,148.5s11.9.1,19.7-14.5c4-7.6-8.5-27.3-8.5-27.3a44.8,44.8,0,0,0-12.1-1.2c-10.7,0-11.3,2.4-11.3,2.4S12.6,122,15,129.1C19.6,142.6,27.5,150.4,35.2,148.5Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M44.9,109.7s9.8,17.7,8.2,22-9.8,12.1-11.5,12.6S54,123.9,44.9,109.7Z" fill={color2}/><path d="M34.3,108.1c-6.2,0-14.5,7.6-16.4,20.9-.9,6.1,10,17.7,16.3,13.8,3.3-2,6.6-10.8,6.6-18.5A24.8,24.8,0,0,0,34.3,108.1Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_25':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M16.8,20.4s17,17,18.6,24.7l11.7,64.4s0-.8-10.8-1.6S22,111.3,22,111.3,29.4,44.1,16.8,20.4Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M41.1,103.9c.6.1-6.6-46.8-9.1-57.1-1.5-6-8.2-15.3-8.2-15.3s8.7,11.7,8.2,72.4C32,103.9,33.7,103,41.1,103.9Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M60.2,129.1c-.7,8.1-6.5,14.8-12.2,14.8-11,0-12.5-7.4-12.5-7.4s-1,5.3-7.8,6.6-13.4-.5-15.2-6.5,1.1-16.5,1.6-18.3,4-15.1,4-15.1H51.2S60.8,123,60.2,129.1Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M52.5,111.9s-5.2-6.3-11.1-4.2-19,8.5-23.1,16,0,13.5,5,14.5c.9.2,9.3.4,10.9-9.1s2.9-.8,2.9-.8.4,5.9,2.4,8.3,10,4.6,14.6-.9S57.4,118,52.5,111.9Z" fill="#fff" opacity="0.4"/><path d="M35.8,128.6s1.5,12.4,12,11c0,0,8.6-2,11.2-12.6a15.9,15.9,0,0,1-4,12c-7.9,8.6-19,1.4-19.3-5-.2-3.1.1,4-3.7,6.3-10,5.8-18.6.1-18.9-4.8a37.6,37.6,0,0,1,.6-9.6s-.5,7.1,2.7,10.2C23.1,142.6,30.5,140.7,35.8,128.6Z" fill={color2}/><path d="M36,104.6l-15.8.3c-1.8,1.4-5.7,18.6-5.6,19.1S19,109.2,36,104.6Z" fill={color2}/></svg>
				);
				break;
			case 'root_26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M31.4,50.8c-.2-.5-7.5-7.7-7.5-7.7v6.2l3.8,30,6.1,10.6,1.5,1.3s2.1-14.5,2.1-15S36,54.3,36,54.3Z" fill={backRootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M17.6,104.8l19.3-.2,13.8.2s-2.6-31-5.2-38.9c-1.7-5.3-5.8-14.4-10.4-19.1s-6.3-7-6.3-7-.3,6,.2,6.3S34.8,57,35.1,61.7s0,26.8,0,26.8-6.3-7.2-7-14.5-2.8-22.5-2.8-22.5-4.2-6.5-4.7-9.7-1.7,10.7-1.8,23.8C18.8,72.7,17.6,104.8,17.6,104.8Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M42.5,65.1c2.8,5.5,1.9,11.4,3,25.3.4,5,1.6,12.4,1.6,12.4H20.7S20.1,52.1,22.2,56a12.2,12.2,0,0,1,1.6,4.1c1.5,7.2,2.1,19.4,3.7,22.1C30.8,87.5,36.1,95,36.1,95a138,138,0,0,0,3.1-19.7c.1-1.3.1-12.6-.7-15.9C38.5,59.4,41.5,63.3,42.5,65.1Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M57.1,125.5c-.7,7.1-5.7,13-10.7,13-9.6,0-10.9-6.4-10.9-6.4s-.9,4.6-6.8,5.7-11.7-.4-13.3-5.6,1-14.5,1.4-16.1,3.5-13.2,3.5-13.2h29S57.6,120.2,57.1,125.5Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M50.3,110.6s-4.5-5.6-9.7-3.8-16.5,7.5-20.1,14.1,0,11.7,4.3,12.6c.8.2,8.1.4,9.6-7.9s2.5-.7,2.5-.7.4,5.2,2.1,7.2,8.7,4,12.7-.8S54.7,115.9,50.3,110.6Z" fill="#fff" opacity="0.4"/><path d="M35.8,125.2s1.3,10.7,10.5,9.6c0,0,7.5-1.8,9.7-11a13.9,13.9,0,0,1-3.5,10.5c-6.9,7.5-16.5,1.2-16.8-4.5-.2-2.6.1,3.6-3.3,5.6-8.7,5-16.2.1-16.5-4.2a33.5,33.5,0,0,1,.6-8.4s-.4,6.2,2.3,8.9C24.6,137.3,31.1,135.7,35.8,125.2Z" fill={color2}/><path d="M36,104.2l-13.9.3c-1.5,1.2-4.9,16.1-4.9,16.6S21.1,108.2,36,104.2Z" fill={color2}/></svg>
				);
				break;
			case 'root_27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M32.6,58c-.2-.5-6.5-6.7-6.5-6.7v5.4l3.2,26.2,5.4,9.3L36,93.3s1.9-12.7,1.9-13.1S36.6,61,36.6,61Z" fill={backRootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M20.5,105.2l16.9-.2,12.1.2s-2.4-27.1-4.6-34c-1.5-4.7-5.1-12.6-9.1-16.7a81,81,0,0,1-5.5-6.2s-.2,5.3.1,5.6,5.1,9.5,5.4,13.6,0,23.4,0,23.4-5.5-6.2-6.1-12.6-2.4-19.7-2.4-19.7S24,54,24.5,45.2c.1-3.7-7.2,10.4-7.3,21.8C17.2,73.3,20.5,105.2,20.5,105.2Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M42.2,70.5c2.5,4.8,1.8,10,2.7,22.1a80,80,0,0,1,0,9.1H21.8c-2.9-13.7-2-46-1-42.2S23.6,64.8,24,67c1.4,6.3,3.8,16.1,5.2,18.4A84.3,84.3,0,0,0,37,95.5a113.5,113.5,0,0,0,2.4-16.1c.1-1.1.1-11-.6-13.9A48.7,48.7,0,0,1,42.2,70.5Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M48.8,105.2s11,21,.7,26.7c-8.1,4.5-18.3,2.4-19-.1s-7-.5-9.1-1.3-3.1-.8-2.4-7.9-.9-14.9.6-16.8S31.2,104,31.2,104A42.6,42.6,0,0,0,48.8,105.2Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M34.2,111.6s1.6,15.7,6.7,17.3,8.8.5,9.6-5.3-2.5-12.5-3.7-12.9S36.5,109.6,34.2,111.6Z" fill="#fff" opacity="0.4"/><path d="M31.7,130.3s1.5.4,3.9,1.3,7.4.6,7.4.6S31.8,134.6,31.7,130.3Z" fill="#fff" opacity="0.4"/><path d="M30.6,127.4c-1.8,1-4.7,3.2-5.6,1.4-2-3.6,4.6-10.9,5.4-16S32.3,126.4,30.6,127.4Z" fill="#fff" opacity="0.4"/><path d="M32.7,112.5c0-.6-.1,16.2,1,17a15.9,15.9,0,0,0,7.6,2.1C43.8,131.4,33.4,130.4,32.7,112.5Z" fill={color2}/></svg>
				);
				break;
			case 'root_28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M30.7,53.5S29.2,44.9,27.1,42L25,39.2l-.3,7.1Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M18,41c9.4,18.1,1.4,67.7,1.4,67.7s11.6-1.3,14.8.1,13.3.4,13.8.4-2.1-17.9-4.7-26.8C30.3,38.2,18,41,18,41Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M44,103.1c.8-7-6.7-40-20.7-57.9,0,0,8.7,10.1,8,37.8a130.5,130.5,0,0,1-2,18.4s3.4-.4,5.4.8C38.3,104.3,44.2,104,44,103.1Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_31':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M36.4,8.9H48.2s1.8,0,1.8,4.3-3.9,40.4-3.9,40.4-4.3,8.8-8.2,8.7-9.8-7-11.4-12.5-4.9-35.4-4.8-36.6-.5-4.3,7.1-4.3Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M29.5,47.3s10.4,3,15.2-12.7c.6-1.8,2.9-21.9-.1-22.8s-4.1-.8-8.4-.6-10.7,1.2-10.6,4.6S29.5,47.3,29.5,47.3Z" fill="#fff" opacity="0.4"/><path d="M28.4,53.3c-.5-.6,3.9,8.2,8.8,5.9,6.9-3,6.3-16,6-15C37.2,64,29.5,54.5,28.4,53.3Z" fill={color2}/></svg>
				);
				break;
			case 'root_31':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M26,47c-.4-2.7,10.1,28.4,18.8,4,2-5.6.7,29.8-2.8,39.7-5.6,15.5-6.9,27.1-10.8,30.1C31.2,120.8,29.1,66.8,26,47Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M40.5,63.4a5.8,5.8,0,0,1-4.5,2,6.6,6.6,0,0,1-4.8-2l2.7,42.8s1.7-9.3,2.8-15.6S40.5,63.4,40.5,63.4Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_32':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M34.4,5.7H46.5s1.9,0,1.9,4.4-4,41.5-4,41.5-4.5,9.1-8.5,8.9-10-7.2-11.7-12.8-5-36.4-4.9-37.6-.5-4.5,7.3-4.4Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M26.4,45.1S37,48.2,42,32.1c.6-1.9,3-22.5-.1-23.5s-4.2-.8-8.6-.6-11,1.2-10.9,4.8S26.4,45.1,26.4,45.1Z" fill="#fff" opacity="0.4"/><path d="M27.9,51.3c-.5-.6,3.9,8.4,9,6.1C44,54.3,43.4,40.9,43.1,42,36.9,62.3,29,52.5,27.9,51.3Z" fill={color2}/></svg>
				);
				break;
			case 'root_32':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M25.2,44.9c-.4-3,10.4,31.1,19.4,4.4,2.1-6.2.7,32.6-2.9,43.4-5.7,17.1-7.3,33.6-11.3,36.9C30.4,129.6,28.4,66.6,25.2,44.9Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M41.2,61.8a6,6,0,0,1-4.7,2,6.6,6.6,0,0,1-4.8-2L33.3,112s2.8-15.8,4-22.3S41.2,61.8,41.2,61.8Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_33':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M35,13.1c8.2,0,16.5,9.9,16.6,10.2s-3,27.8-4.1,31.1-9.3,5.4-11.9,5.2S26,57.9,24.7,54.4,18.1,31,18.1,31,27.6,13.1,35,13.1Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M24.5,44.7s11.6,3.5,20-2.8c1.5-1.1,4.3-16.8,2.1-18.7C42.8,19.9,36.2,13,32.5,14.4S20.9,27.8,21,31.1,24.5,44.7,24.5,44.7Z" fill="#fff" opacity="0.4"/><path d="M26,52.1c.3,3.1,11,7.2,17.5,3.2,2.7-1.7,4.4-15.2,3.9-14.3C39.1,57.1,25.9,50.6,26,52.1Z" fill={color2}/></svg>
				);
				break;
			case 'root_33':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M46.2,54.3S44.9,73.7,43.1,100c-.4,6.9-.8,19.1-1.9,23.8-1.7,7.1-4.3,20.5-3.3,23.9s-5.3-4.6-5.8-10.3-2.8-37-4.3-50.1-2.9-33.7-2.9-33.7S32.9,65.3,46.2,54.3Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M39.2,62.6s-3.8,3-7.6.1c-1-.7,4.3,58.5,4.3,66.5,0,1.3.5-3.4,1.4-6.9S39.2,62.6,39.2,62.6Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_34':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M42.3,15.2S23.9,13.4,17.1,25.6c-2.1,3.7,4,18.9,6.1,26.1s6.8,7.8,11.9,7.6c3.5-.1,8.2-.3,10.5-4.4,3.3-5.7,10.2-20.5,8.1-24.6C49.5,22.2,47.8,15.2,42.3,15.2Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M45.7,50.2S53,36.7,52,32.4s-6.3-13.7-7.8-14.3S53.7,34.6,45.7,50.2Z" fill={color2}/><path d="M33.6,51.7c-8.4,0-13-9.5-14.8-22.2-.8-5.8,9.1-14.4,14.8-10.7,2.9,1.9,5.4,10.3,5.9,17.6,1,16.3-5.9,15.3-5.9,15.3" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_34':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M38.2,137.7c-.1,1.4-3.4-.2-3.6-1.6L22.6,49s.2,9.6,12.4,9.5c9.5,0,9-2,11.9-8.7C46.9,49.5,40.7,114.4,38.2,137.7Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M30.7,63.3c-.3-.2,5.4,64.3,5.4,64.3s2.2-16.1,3.5-64.3C39.6,63.3,34.3,64.5,30.7,63.3Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_35':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M35.2,12.1s-10.1.6-16.6,13.4c-2,3.9,4,17.1,6.2,24.6s6.5,8.4,11.3,8.2,6.8.4,9-3.9c3.1-6,10.4-26.3,8.4-30.6A21,21,0,0,0,35.2,12.1Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M45.3,47.5s7.9-17.9,6.5-22-8-9.5-9.5-9.9S51.4,32.4,45.3,47.5Z" fill={color2}/><path d="M34.4,50c-5.3,0-12.5-8.8-14.1-21.5-.5-4,8.6-15.1,14-11.4C37.1,19,40,27.3,40,34.6,40,51.3,34.4,50,34.4,50" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_35':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M43,135.2s-3.2-1.7-5.1-8.2L24.5,48.7s.8,7.8,9.7,8.1,9.2-1.1,11.7-7.4C45.9,49.1,41.7,116.2,43,135.2Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M32.9,60.7c-.4-.1,4.6,49.3,6.6,59,.8,3.8,1,3.2,1,3.2s-.3-5.9-.9-62.4A10.7,10.7,0,0,1,32.9,60.7Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M53.1,62.7s5.4-8.1,7.3-15.8c1.3-5,1.4-6.2.5-8.1C59,35,49.8,28.5,47.6,28.1c-3.7-.8-6.2,3.1-7.8,3.4S30.6,28.7,26,28.7,7.4,34.4,8.2,40.8s6.2,21.9,6.2,21.9Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M57.9,39.4c-.7,0-6.6-3.6-8.7-3s-5.6,2.3-5.1,4.8,3.1,15.6,5.1,16.1,6.4-1.6,6.6-2.3S62.3,39.8,57.9,39.4Z" fill="#fff" opacity="0.4"/><path d="M29.9,36.3c.6.2,7.5,1.2,8.9,5.1s1.3,11.2,0,13.3a9.6,9.6,0,0,1-8.3,4.1s-6.7-.5-9.1,0-6.9-14.3-7.2-16.1S25.2,34.9,29.9,36.3Z" fill="#fff" opacity="0.4"/><path d="M54.1,36.3c.2.1-7.3-4.2-10-3.3s-7.9,3.4-6,6.6a15.4,15.4,0,0,1,2.4,8.3c.1,3.3,3.1,9.1,3.2,9s-1.8-14.9.2-16.8,3.2-3.5,5.1-3.8A14.3,14.3,0,0,1,54.1,36.3Z" fill={color2}/><path d="M21.9,32.9c6.7-.5,4.9,0,4.9,0S10.9,39.3,12,45.1s2.2,9.4,2.2,9.4a31.7,31.7,0,0,1-3.8-9.2C9.6,40.8,10.6,33.6,21.9,32.9Z" fill={color2}/></svg>
				);
				break;
			case 'root_36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M52.6,59.4c.3.1,2.1,25.7,0,35.5C45.1,131.7,38,128.1,38,128.1s-.5-26-.9-34.7c-.2-4.2,0-16.7-3.4-16.1s-4.8.8-5.1,6.8-4,20.5-6.1,27.7-5.3,11.8-7,11.6-1.5-3.6-1.5-4.3-.1-59.7-.1-59.7Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M49.5,93.8c-1.2,6.4-6.4,20.8-6.4,20.8s-.2-38.2-8.5-38.9c-5.4-.5-7.8,1.1-8.7,7.4-1.4,10.7-7.8,26.1-7.9,29.4,0,.7.2-45.9.2-50.5h31C49.7,62.4,50.2,90.2,49.5,93.8Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M36.5,30.3a13.8,13.8,0,0,1,6.6-2.1c.9.1,9.9,0,12.5,1.1s6.2,3.5,6.5,8.1S57.2,57,57.2,57s-1.6,3.7-2.6,3.7H38.2l-22.7-.6L12.2,49.3a24.3,24.3,0,0,1-1-8.1c.1-2.7,1.9-11.8,8.4-12.1C24.2,28.8,36.5,30.3,36.5,30.3Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M44.4,34.9s7.4-1,10.2,1.9,4.9,10.6.8,16.6-2.9,5-2.9,5H21.2s-5.7-16.3-2.6-20.5,17.1-1.1,17.1-1.1Z" fill="#fff" opacity="0.4"/><path d="M53,30.5s5.5.2,6.5,4.5a17.8,17.8,0,0,1,0,8.7C59.2,44.3,59.4,33.2,53,30.5Z" fill="#fff" opacity="0.4"/><path d="M15.8,59.5s-3.5-11.7-3.8-14-.3-9.7,2.5-12.6,3.6-3.1,6.5-3,10.4.7,14.5,1.2,2.6-.9,5-1.5,6.5-.1,8.3-.1c5.5,0,8.9,7.6,8.9,7.6s-5-4.7-6.9-5a20.2,20.2,0,0,0-8.2,0c-3,.6-7.2,2.2-9.1,2-3.6-.3-11.8-2.4-13.9-1s-4.7,2-4.7,6.7,4.3,19.8,4.3,19.8Z" fill={color2}/></svg>
				);
				break;
			case 'root_37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M54.9,59.6s-4.8,25-6,30.9a39.4,39.4,0,0,1-7.1,16.4L27.7,125v-2.1a37.9,37.9,0,0,1,3.6-16.2c1.4-3.1,2.7-6.2,2.9-7.8.4-3.4-.6-18.2-.6-18.2S25.4,87.5,23.3,92,16,106.4,16,111.9s-4.2-.8-4.5-5.5S11.5,93,14.4,86s-.2-27,1.4-27h3.9Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M43.3,97c-2.8,4.1-9.1,16.4-9.1,16.4s4.2-16.9,5.4-19.6c2-4.4-3-22.6-3-22.6S28,77.5,24.3,82.7s-9.4,16.1-9.5,19.4c0,.7,2.2-16.7,5.1-23.4s3-18.6,3.2-17.1l27.4.5S46.1,93,43.3,97Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M40.4,29.1c1.6-.8,1.5-1.4,6.8-1.4s13.6-2.3,14.2,1.4,0,8.9-1.8,15.1S56,57.6,53.4,60.5c-.7.8-36.9.5-36.9.5s-5.9-10.8-6.2-17-.6-15.1,2.9-15.1,7.7,1.3,9.7,0,6.6-2.5,12.1,0C36.1,29.4,39.1,29.8,40.4,29.1Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M55.7,32.3c-4.5,0-9,.1-9.6,2.6s-1.6,21.9-1.6,21.9a42.3,42.3,0,0,0,5.9,0C53.6,56.7,60.5,32.3,55.7,32.3Z" fill="#fff" opacity="0.4"/><path d="M37.8,34.4s.3,19-1.2,21.4-13.7,2.8-15.8-1.2-3.3-18.3,0-19.9S37.7,32.3,37.8,34.4Z" fill="#fff" opacity="0.4"/><path d="M44.9,31.8s-2.3,23-3.8,25.4,0-6.1-.4-11.6-.8-13.5-.9-13.8S44.3,29,44.9,31.8Z" fill={color2}/><path d="M18.6,32.6s-4.9,9.8-1.5,27.5c.6,2.8-5.4-10.5-5.9-14.2S9.9,32.6,12.3,30.5C12.6,30.2,12.8,32.4,18.6,32.6Z" fill={color2}/><path d="M60.1,28.4s.9-1.2-5.9-.7a77.3,77.3,0,0,0-8.2.7s-3-.1-4.4.9-3,1.7-6.4.7-4.5-2.3-7.1-2-2.3.9-4,1.6-1.7.9-3.1.6-6.8-.9-7-.8a1.6,1.6,0,0,0-2,1c-.6,1.4-1.2,2.8.2,3.1s5.8-.2,8.9-1.1A32.9,32.9,0,0,1,31,30.8c2.5,0,5.7,1.7,10.6,1.5s14.3-2.8,15.8-1.5,2.4,5.5,1.1,11.3-.9,5.9-.9,5.8,2.7-9,3-12.3S60.9,28.6,60.1,28.4Z" fill={color2}/></svg>
				);
				break;
			case 'root_38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M16.5,59.8l1.1,31.3s3,20.6,8.7,25.5,7.6,7.9,7.6,7.9,11.8-10.9,14.2-23.7,2.8-19.5,2.8-19.5l2.5-21.5Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M35,123.7c-.7,0-2.9-8.4-2.7-18.1s1.5-25.4-1.5-29.5" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M34.9,75.4s-1.8,3.5-2.2,16.3" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M49.1,62.8s-2.9,29.6-5.3,37.9a99.7,99.7,0,0,1-6.5,16s.8-10.1.9-16.7c.3-12.8,3.8-27.9,3-37.2Z" fill="#fff" opacity="0.4"/><path d="M29.7,114.6c.1.6-5.4-8.9-6.4-20.4s-2.4-31.4-2.4-31.4h8a26.6,26.6,0,0,0-2.3,12.4c.4,4.4,2.2,14.1,1.8,17.8S28.4,109.2,29.7,114.6Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_41':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M34.5,9.6H22.7s-1.9,0-1.9,4.3,3.9,40.5,3.9,40.5S29.1,63.1,33,63s9.8-7,11.4-12.4,4.8-35.5,4.8-36.7.5-4.3-7.1-4.3Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M41.4,48S31,51.1,26.2,35.4c-.6-1.9-2.9-21.9.1-22.9s4-.8,8.3-.6,10.7,1.2,10.6,4.7S41.4,48,41.4,48Z" fill="#fff" opacity="0.4"/><path d="M42.5,54c.4-.5-3.9,8.2-8.8,6-7-3.1-6.3-16-6-15C33.7,64.8,41.4,55.2,42.5,54Z" fill={color2}/></svg>
				);
				break;
			case 'root_41':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M44.9,47.7c.4-2.7-10.1,28.4-18.8,4-2.1-5.6-.7,29.8,2.8,39.7,5.5,15.5,6.8,27.1,10.7,30.1C39.6,121.5,41.8,67.6,44.9,47.7Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M30.4,64.2a5.7,5.7,0,0,0,4.5,1.9,6.6,6.6,0,0,0,4.7-1.9L37,107s-1.7-9.3-2.8-15.6S30.4,64.2,30.4,64.2Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_42':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M34.5,9.4H22.4s-2,0-2,4.4,4.1,41.6,4.1,41.6,4.4,9,8.4,8.9S43,57.1,44.6,51.5s5-36.5,5-37.7.5-4.4-7.3-4.4Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M42.5,48.9S31.8,52,26.9,35.9c-.6-2-3-22.6.1-23.5s4.2-.8,8.6-.7,11,1.3,10.9,4.8S42.5,48.9,42.5,48.9Z" fill="#fff" opacity="0.4"/><path d="M41,55c.5-.5-4,8.4-9.1,6.2-7.1-3.2-6.4-16.5-6.1-15.4C32,66.1,39.9,56.3,41,55Z" fill={color2}/></svg>
				);
				break;
			case 'root_42':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M44.6,48.6c.5-3-10.4,31.2-19.3,4.4-2.1-6.2-.7,32.7,2.9,43.5,5.7,17,7.3,33.6,11.3,36.9C39.5,133.4,41.4,70.4,44.6,48.6Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M28.7,65.5a5.9,5.9,0,0,0,4.6,2,6.7,6.7,0,0,0,4.9-2l-1.6,50.2s-2.8-15.8-4-22.2S28.7,65.5,28.7,65.5Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M34.8,15.8c-8.2,0-16.5,10-16.6,10.3s3,27.8,4.2,31.1,9.3,5.3,11.9,5.2,9.5-1.8,10.9-5.2,6.6-23.4,6.6-23.4S42.3,15.8,34.8,15.8Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M45.4,47.5s-11.6,3.4-20.1-2.8c-1.5-1.1-4.2-16.9-2-18.8,3.7-3.2,10.3-10.2,14.1-8.8S49,30.6,48.9,33.8,45.4,47.5,45.4,47.5Z" fill="#fff" opacity="0.4"/><path d="M43.9,54.9c-.3,3-11.1,7.1-17.6,3.1-2.6-1.6-4.3-15.1-3.8-14.2C30.7,59.9,44,53.4,43.9,54.9Z" fill={color2}/></svg>
				);
				break;
			case 'root_43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M23.2,57s1.3,19.4,3,45.8c.5,6.8.8,19,1.9,23.7,1.7,7.1,4.3,20.5,3.4,23.9s5.2-4.5,5.7-10.2,2.9-37,4.3-50.1,3-33.8,3-33.8S36.4,68.1,23.2,57Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M30.1,65.4s3.9,3,7.7.1c1-.8-4.3,58.5-4.3,66.5,0,1.3-.5-3.5-1.4-6.9S30.1,65.4,30.1,65.4Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_44':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M28.1,17.2s18.3-1.8,25.1,10.4c2.1,3.7-3.9,18.9-6,26.1s-6.8,7.8-11.9,7.6c-3.5-.1-8.2-.3-10.6-4.4-3.2-5.7-10.1-20.5-8-24.6C20.8,24.2,22.5,17.2,28.1,17.2Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M24.7,52.2s-7.3-13.5-6.4-17.8,6.4-13.7,7.9-14.3S16.6,36.6,24.7,52.2Z" fill={color2}/><path d="M36.7,53.7c8.5,0,13.1-9.5,14.9-22.2.8-5.8-9.1-14.4-14.8-10.7-3,1.9-5.5,10.3-5.9,17.6-1.1,16.3,5.8,15.3,5.8,15.3" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_44':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M32.1,139.7c.2,1.4,3.5-.2,3.7-1.6L47.8,51c-.1,0-.2,9.6-12.5,9.5-9.4,0-8.9-2-11.8-8.7C23.5,51.5,29.7,116.4,32.1,139.7Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M39.6,65.3c.4-.2-5.4,64.3-5.4,64.3s-2.1-16.1-3.4-64.3C30.8,65.3,36.1,66.5,39.6,65.3Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M35.8,14.6s10.1.6,16.6,13.4c2,3.9-4,17.2-6.2,24.6S39.7,61,34.9,60.8s-6.8.4-9-3.9c-3.1-6-10.4-26.2-8.4-30.6C21.4,17.8,30.5,14.6,35.8,14.6Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M25.7,50.1s-7.9-18-6.5-22.1,8-9.5,9.5-9.9S19.6,34.9,25.7,50.1Z" fill={color2}/><path d="M36.6,52.5c5.3,0,12.5-8.8,14.1-21.5.5-4-8.6-15.1-14-11.4C33.9,21.5,31,29.9,31,37.2c0,16.6,5.6,15.3,5.6,15.3" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'root_45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M27.4,137.2s3.2-1.7,5-8.2L45.9,50.7s-.8,7.8-9.7,8.1S27,57.7,24.5,51.4C24.4,51.1,28.7,118.2,27.4,137.2Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M37.5,62.7c.4-.1-4.7,49.3-6.6,59-.8,3.8-1,3.2-1,3.2s.2-5.9.8-62.4A11,11,0,0,0,37.5,62.7Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M18,60.7s-5.4-8.1-7.3-15.8c-1.3-5-1.4-6.2-.5-8.1C12.1,33,21.3,26.5,23.5,26.1c3.7-.8,6.2,3.1,7.8,3.4s9.2-2.8,13.8-2.8,18.6,5.7,17.8,12.1-6.2,21.9-6.2,21.9Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M13.2,37.4c.7,0,6.6-3.6,8.7-3s5.6,2.3,5.1,4.8-3.1,15.6-5.1,16.1-6.5-1.6-6.6-2.3S8.7,37.8,13.2,37.4Z" fill="#fff" opacity="0.4"/><path d="M41.2,34.3c-.6.2-7.5,1.2-8.9,5.1s-1.3,11.2,0,13.3a9.6,9.6,0,0,0,8.3,4.1s6.7-.5,9.1,0,6.9-14.3,7.2-16.1S45.9,32.9,41.2,34.3Z" fill="#fff" opacity="0.4"/><path d="M17,34.3c-.2.1,7.3-4.2,10-3.3s7.9,3.4,6,6.6a15.4,15.4,0,0,0-2.4,8.3c-.1,3.3-3.1,9.1-3.2,9s1.8-14.9-.2-16.8-3.2-3.5-5.1-3.8A14.3,14.3,0,0,0,17,34.3Z" fill={color2}/><path d="M49.2,30.9c-6.7-.5-4.9,0-4.9,0s15.9,6.4,14.8,12.2-2.2,9.4-2.2,9.4a31.7,31.7,0,0,0,3.8-9.2C61.5,38.8,60.5,31.6,49.2,30.9Z" fill={color2}/></svg>
				);
				break;
			case 'root_46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M18.4,60.4c-.2.1-2,25.7,0,35.5,7.6,36.8,14.7,33.2,14.7,33.2s.5-26,.9-34.7c.2-4.2,0-16.7,3.4-16.1s4.8.8,5.1,6.8,4,20.5,6,27.7,5.4,11.8,7.1,11.6,1.5-3.6,1.5-4.3.1-59.7.1-59.7Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M21.6,94.8c1.2,6.4,6.4,20.8,6.4,20.8s.2-38.2,8.5-38.9c5.4-.5,7.8,1.1,8.7,7.4,1.4,10.7,7.8,26.1,7.9,29.4,0,.7-.2-45.9-.2-50.5h-31C21.4,63.4,20.9,91.2,21.6,94.8Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M35.6,31.3a14,14,0,0,0-6.7-2.1c-.8.1-9.8,0-12.4,1.1s-6.2,3.5-6.5,8.1S14.9,58,14.9,58s1.6,3.7,2.6,3.7H33.9l22.7-.6,3.3-10.8a24.3,24.3,0,0,0,1-8.1c-.1-2.7-1.9-11.8-8.4-12.1C47.9,29.8,35.6,31.3,35.6,31.3Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M27.7,35.9s-7.4-1-10.2,1.9-5,10.6-.8,16.6,2.9,5,2.9,5H50.9s5.7-16.3,2.6-20.5-17.1-1.1-17.1-1.1Z" fill="#fff" opacity="0.4"/><path d="M19.1,31.5s-5.6.2-6.5,4.5a17.8,17.8,0,0,0,0,8.7C12.9,45.3,12.7,34.2,19.1,31.5Z" fill="#fff" opacity="0.4"/><path d="M56.3,60.5s3.5-11.7,3.8-14,.3-9.7-2.5-12.6-3.6-3.1-6.5-3-10.4.7-14.5,1.2-2.6-.9-5.1-1.5-6.4-.1-8.3-.1c-5.4,0-8.8,7.6-8.8,7.6s5-4.7,6.9-5a20.2,20.2,0,0,1,8.2,0c3,.6,7.2,2.2,9.1,2,3.6-.3,11.8-2.4,13.9-1s4.7,2,4.7,6.7-4.3,19.8-4.3,19.8Z" fill={color2}/></svg>
				);
				break;
			case 'root_47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M17.2,60.6s4.8,25,6,30.9a39.4,39.4,0,0,0,7.1,16.4L44.4,126v-2.1a37.9,37.9,0,0,0-3.6-16.2c-1.4-3.1-2.7-6.2-2.9-7.8-.4-3.4.6-18.2.6-18.2S46.7,88.5,48.8,93s7.3,14.4,7.3,19.9,4.1-.8,4.5-5.5,0-13.4-3-20.4.3-27-1.3-27H52.4Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M28.8,98c2.8,4.1,9.1,16.4,9.1,16.4s-4.2-16.9-5.4-19.6c-2-4.4,3-22.6,3-22.6s8.6,6.3,12.3,11.5,9.4,16.1,9.5,19.4c0,.7-2.2-16.7-5.1-23.4s-3-18.6-3.2-17.1l-27.4.5S26,94,28.8,98Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			case 'tooth_48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M30.4,29.3C28.9,28.5,29,28,23.7,28S10.1,25.6,9.5,29.3s0,9,1.7,15.2,3.7,13.3,6.3,16.3c.6.7,36.9.4,36.9.4s5.9-10.7,6.2-17,.6-15-3-15-7.6,1.2-9.6,0-6.7-2.6-12.1-.1C34.7,29.6,31.8,30,30.4,29.3Z" fill={color1} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M15.2,32.5c4.5,0,9,.2,9.5,2.7s1.7,21.9,1.7,21.9-1.8.1-6,0S10.4,32.5,15.2,32.5Z" fill="#fff" opacity="0.4"/><path d="M33,34.7s-.3,19,1.3,21.4S48,58.9,50.1,54.9s3.3-18.4,0-19.9S33.2,32.6,33,34.7Z" fill="#fff" opacity="0.4"/><path d="M26,32s2.2,23.1,3.8,25.5,0-6.1.4-11.6.8-13.6.9-13.9S26.6,29.3,26,32Z" fill={color2}/><path d="M52.2,32.9s5,9.7,1.5,27.4c-.5,2.8,5.4-10.5,6-14.1S61,32.8,58.6,30.7C58.3,30.4,58.1,32.6,52.2,32.9Z" fill={color2}/><path d="M10.8,28.6s-.9-1.1,5.9-.7l8.2.7s3-.1,4.4.9,2.9,1.8,6.4.7,4.5-2.2,7-1.9,2.4.9,4.1,1.5a4.9,4.9,0,0,0,3.1.7c1.1-.3,6.7-.9,7-.9a1.9,1.9,0,0,1,2,1.1c.6,1.4,1.2,2.7-.2,3.1s-5.8-.2-8.9-1.2a36.7,36.7,0,0,0-9.9-1.5c-2.6,0-5.7,1.6-10.6,1.4S15,29.8,13.5,31.1s-2.4,5.4-1.1,11.2.9,6,.9,5.8-2.8-8.9-3-12.2S10,28.9,10.8,28.6Z" fill={color2}/></svg>
				);
				break;
			case 'root_48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 70 175"><path d="M54.3,60l-1,31.4s-3,20.6-8.8,25.4-7.5,8-7.5,8-11.8-10.9-14.2-23.7A175.1,175.1,0,0,1,20,81.5L17.4,60.1Z" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M35.9,124c.7-.1,2.8-8.4,2.7-18.1s-1.5-25.5,1.5-29.6" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M35.9,75.6s1.9,3.6,2.3,16.4" fill={rootColor} stroke="gray" strokeMiterlimit="10" strokeWidth="0.75"/><path d="M21.8,63.1s2.8,29.5,5.3,37.8A98.5,98.5,0,0,0,33.6,117s-.8-10.2-1-16.8c-.2-12.7-3.8-27.8-3-37.1Z" fill="#fff" opacity="0.4"/><path d="M41.2,114.8c-.2.7,5.3-8.9,6.4-20.3S50,63.1,50,63.1H41.9a27.9,27.9,0,0,1,2.4,12.3c-.4,4.5-2.3,14.1-1.9,17.8S42.5,109.5,41.2,114.8Z" fill="#fff" opacity="0.4"/></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getCrownSvg = (icon, colorD, colorV, colorL, colorM, colorO) => {
		switch(icon) {
			case 'crown_11':
			case 'crown_12':
			case 'crown_13':
			case 'crown_21':
			case 'crown_22':
			case 'crown_23':
			case 'crown_31':
			case 'crown_32':
			case 'crown_33':
			case 'crown_41':
			case 'crown_42':
			case 'crown_43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'50px'} height={'50px'} viewBox="0 0 50 50"><g id="6e4eaec5-778e-4923-a606-6b45010281d7" data-name="Incisivo"><g id="d571920e-68c6-4dbc-87f6-471c49667dfc" data-name="Incisivo"><path id="93fa42ea-ce19-43c8-a1cb-81ef844d17da" data-name="mesial" d="M2.3,3.8A9,9,0,0,0,.5,9.2v32a9.1,9.1,0,0,0,2.3,6L17,25.2Z" fill={colorM} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="f13220d9-6e67-428e-9088-5230f1fb0b93" data-name="distal" d="M33.6,25.2,47.5,46.8a8.5,8.5,0,0,0,2-5.6V9.2A8.1,8.1,0,0,0,48,4.3Z" fill={colorD} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="0b34759b-e950-4a47-964a-d2be74903738" data-name="lingual" d="M48.1,4.1A8.2,8.2,0,0,0,41.5.5H8.8A8,8,0,0,0,2.4,3.8L17,25H33.7Z" fill={colorL} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="6c2b3101-35aa-4143-9c6e-859d61eb51f2" data-name="vestibular" d="M47.6,46.6,33.6,25H17.1L2.8,47.2a7.2,7.2,0,0,0,5.6,2.3H41.6A7.6,7.6,0,0,0,47.6,46.6Z" fill={colorV} stroke="#b3b3b3" strokeMiterlimit="10"/></g></g></svg>
				);
				break;
			case 'crown_14':
			case 'crown_15':
			case 'crown_16':
			case 'crown_17':
			case 'crown_18':
			case 'crown_24':
			case 'crown_25':
			case 'crown_26':
			case 'crown_27':
			case 'crown_28':
			case 'crown_34':
			case 'crown_35':
			case 'crown_36':
			case 'crown_37':
			case 'crown_38':
			case 'crown_44':
			case 'crown_45':
			case 'crown_46':
			case 'crown_47':
			case 'crown_48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'50px'} height={'50px'} viewBox="0 0 50 50"><g id="99bb9878-73eb-4295-9f10-72017a1bdb6b" data-name="molar" opacity="0.9"><g id="5d30e689-6ae6-49b1-8a2b-aff8c6c6e906" data-name="Molar"><path id="c5921645-91d4-42f3-88a2-bbbe913c06de" data-name="vestibular" d="M27.6,35.6H22.5A7.7,7.7,0,0,1,17,33.1L3,47a7.9,7.9,0,0,0,5.6,2.5H41.4A7.9,7.9,0,0,0,47,47L33.1,33.1A7.5,7.5,0,0,1,27.6,35.6Z" fill={colorV} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="bdc42ffd-bd2a-4391-832f-57420ed5b1ba" data-name="distal" d="M46.7,3.4,33.1,17a9.9,9.9,0,0,1,2.6,6.8v2.6a9.8,9.8,0,0,1-2.6,6.7L47,47a10.3,10.3,0,0,0,2.5-6.8V10.7a10.1,10.1,0,0,0-1.4-5.2A6,6,0,0,0,46.7,3.4Z" fill={colorD} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="8e3a2fba-27fc-44aa-a5c0-ea7c972fed07" data-name="mesial" d="M14.5,26.4V23.8A9.6,9.6,0,0,1,17,17.1L3,3.2A10.2,10.2,0,0,0,.5,9.9v.5h0V40.2A10.3,10.3,0,0,0,3,47L17,33.1A9.7,9.7,0,0,1,14.5,26.4Z" fill={colorM} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="8813f65e-316d-4323-9caf-2edfc2dc462e" data-name="lingual" d="M22.5,14.5h5.1A7.8,7.8,0,0,1,33.1,17L46.7,3.4A7.4,7.4,0,0,0,41,.6H8.6A7.6,7.6,0,0,0,3,3.2L17,17.1A7.4,7.4,0,0,1,22.5,14.5Z" fill={colorL} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="f03b3654-eaa3-492e-8458-3cb496ace568" data-name="oclusal" d="M27.5,35.6h-5a7.9,7.9,0,0,1-5.6-2.5,10.2,10.2,0,0,1-2.5-6.7V23.8a10,10,0,0,1,2.5-6.7,7.6,7.6,0,0,1,5.6-2.6h5A7.7,7.7,0,0,1,33,17a9.9,9.9,0,0,1,2.6,6.8v2.6A9.8,9.8,0,0,1,33,33.1,7.3,7.3,0,0,1,27.5,35.6Z" fill={colorO} stroke="#b3b3b3" strokeMiterlimit="10"/></g></g></svg>
				);
				break;
			case 'crown_55':
			case 'crown_54':
			case 'crown_64':
			case 'crown_65':
			case 'crown_74':
			case 'crown_75':
			case 'crown_84':
			case 'crown_85':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'34px'} height={'34px'} viewBox="0 0 34 34"><g id="c7c12c66-e36b-47e0-8712-fe6244752933" data-name="molar" opacity="0.9"><g id="ad48faf5-d8a6-434d-9a16-c8332994592c" data-name="Molar"><path id="dcf38189-f977-40d8-8f21-4b8428e8c1cd" data-name="vestibular" d="M18.7,24.1H15.4a4.9,4.9,0,0,1-3.6-1.7L2.7,31.5a4.8,4.8,0,0,0,3.6,1.6H27.7a4.8,4.8,0,0,0,3.6-1.6l-9-9.1A5.1,5.1,0,0,1,18.7,24.1Z" fill={colorV} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="e81ac59b-0097-4c5f-9dc2-73aa73b0d263" data-name="distal" d="M31.2,2.9l-8.9,9A6.5,6.5,0,0,1,24,16.3V18a6.7,6.7,0,0,1-1.7,4.4l9,9.1A6.2,6.2,0,0,0,33,27.1V7.7a6.7,6.7,0,0,0-.9-3.4A4.2,4.2,0,0,0,31.2,2.9Z" fill={colorD} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="98b584f6-d033-4ec2-8759-36e2908c7922" data-name="mesial" d="M10.1,18V16.3a6.2,6.2,0,0,1,1.7-4.4L2.7,2.8A6.2,6.2,0,0,0,1,7.2v.3H1V27.1a6.2,6.2,0,0,0,1.7,4.4l9.1-9.1A6.2,6.2,0,0,1,10.1,18Z" fill={colorM} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="84aa088e-cf1c-4cc7-aaf9-74ee627646d7" data-name="lingual" d="M15.4,10.2h3.3a4.8,4.8,0,0,1,3.6,1.7l8.9-9a5.1,5.1,0,0,0-3.7-1.8H6.3A4.9,4.9,0,0,0,2.7,2.8l9.1,9.1A4.9,4.9,0,0,1,15.4,10.2Z" fill={colorL} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="3c5d05f9-f67b-4650-8cdc-ebbbe248b49e" data-name="oclusal" d="M18.6,24.1H15.4a5.2,5.2,0,0,1-3.7-1.7A6.6,6.6,0,0,1,10.1,18V16.3a6.6,6.6,0,0,1,1.6-4.4,5.2,5.2,0,0,1,3.7-1.7h3.2a4.6,4.6,0,0,1,3.6,1.7,6,6,0,0,1,1.7,4.4V18a6.2,6.2,0,0,1-1.7,4.4A4.9,4.9,0,0,1,18.6,24.1Z" fill={colorO} stroke="#b3b3b3" strokeMiterlimit="10"/></g></g></svg>
				);
				break;
			case 'crown_53':
			case 'crown_52':
			case 'crown_51':
			case 'crown_61':
			case 'crown_62':
			case 'crown_63':
			case 'crown_71':
			case 'crown_72':
			case 'crown_73':
			case 'crown_81':
			case 'crown_82':
			case 'crown_83':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'34px'} height={'34px'} viewBox="0 0 34 34"><g id="cfc81d92-8b31-4e9e-8c5f-d8b4481ff1c1" data-name="Incisivo"><g id="0860b513-228d-4631-8bb2-772f7054e60f" data-name="Incisivo"><path id="ab171ec0-66da-436d-929c-51c2ccd111d8" data-name="mesial" d="M2.2,3.2A5.1,5.1,0,0,0,1,6.7V27.6a5.9,5.9,0,0,0,1.5,3.9l9.3-14.4Z" fill={colorM} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="ae0900ab-5034-4525-8f07-ba656fa7ff8a" data-name="distal" d="M22.6,17.1l9.1,14.1A5.5,5.5,0,0,0,33,27.6V6.7a5.1,5.1,0,0,0-1-3.2Z" fill={colorD} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="15464e1b-d4aa-4864-9db1-fa91d7904fcc" data-name="lingual" d="M32.1,3.4A5.3,5.3,0,0,0,27.8,1H6.4A5.4,5.4,0,0,0,2.2,3.2L11.8,17H22.7Z" fill={colorL} stroke="#b3b3b3" strokeMiterlimit="10"/><path id="2ba55a51-d727-44a5-9a8d-c8adfaf90bb0" data-name="vestibular" d="M31.8,31.1,22.6,17H11.8L2.5,31.5A5,5,0,0,0,6.2,33H27.8A5.1,5.1,0,0,0,31.8,31.1Z" fill={colorV} stroke="#b3b3b3" strokeMiterlimit="10"/></g></g></svg>
					);
				break;
			default:
				return '';
				break;
		}
	};

	const getApicectomiaSvg = (icon, auto, mesial, distal, vestibular, palatina) => {
		switch(icon) {
			case '11':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="0c20dd2f-b3c0-48ea-bbe3-f4e7e812a947" data-name="Procedimentos - 11"><circle id="cbfe8721-001e-4feb-86c9-e0d0916164e4" data-name="Apicectomia 11" cx="35.5" cy="27.5" r="7" fill={auto} /></g></svg>
				);
				break;
			case '12':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="46ca5f6b-e37a-4660-aa68-f96c2aab05ee" data-name="Procedimentos - 12"><circle id="3e95f258-109f-48c4-8e82-bb00b5aec49c" data-name="Apicectomia 12" cx="38.2" cy="29.5" r="7" fill={auto}/></g></svg>
				);
				break;
			case '13':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="82d8c897-861e-4ce1-aec3-328c65d22fea" data-name="Procedimentos - 13"><circle id="6c6a7c4f-8a7a-4222-8132-16f7247ea99b" data-name="Apicectomia 13" cx="35.6" cy="29.5" r="7.4" fill={auto}/></g></svg>
				);
				break;
			case '14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="fde6b114-2e12-4b0f-aa7d-2909dbd1ffc4" data-name="Procedimentos - 14"><g id="46c1c93c-39c2-4433-bde9-b1739e308cc0" data-name="Apicectomia 14"><circle id="2bff96f4-afd6-4350-89d2-97729b5850d8" data-name="distal" cx="35.8" cy="23.8" r="5.3" fill={distal}/><circle id="15ca6178-2c35-4be1-bb80-8b94394b8973" data-name="mesial" cx="43.2" cy="29.5" r="5.3" fill={mesial}/></g></g></svg>
				);
				break;
			case '15':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="4d7ec94d-112c-4ecb-8353-7f4bf34a15f4" data-name="Procedimentos - 15"><circle id="aed3b218-0564-4efb-a378-1e32951d0ef5" data-name="Apicectomia 15" cx="50.9" cy="20.1" r="7.7" fill={auto}/></g></svg>
				);
				break;
			case '16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="e0ede946-19e0-46c6-8f81-310252a9060e" data-name="Procedimentos - 16"><g id="75125f13-2904-4716-ba65-9550abf2db22" data-name="Apicectomia 16"><circle id="3b353a3a-f80a-4a33-8121-8fdd666a5f71" data-name="distal" cx="40.3" cy="43.6" r="5.3" fill={distal}/><circle id="d9634ed4-e703-41b2-9fff-e48d27cd8411" data-name="palatina" cx="45.9" cy="43.1" r="5.3" fill={palatina}/><circle id="0dc916ee-49d8-42ef-80ce-291b2e8edcf7" data-name="mesial" cx="48.9" cy="48.3" r="5.3" fill={mesial}/></g></g></svg>
				);
				break;
			case '17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="3095f09d-d4bb-431d-b5de-252698ec9ad9" data-name="Procedimentos - 17"><g id="268a1c25-6bf6-42d6-bb0c-51da96300ac5" data-name="Apicectomia 17"><circle id="33f3a304-b9f9-4661-bb2d-7bc387fdb6fe" data-name="distal" cx="36.4" cy="51.3" r="5.3" fill={distal}/><circle id="99d27770-09dd-4a47-af4a-a76690375b45" data-name="palatina" cx="40.9" cy="53.9" r="5.3" fill={palatina}/><circle id="b3d48ae7-3061-43f1-996e-e862b4252d99" data-name="mesial" cx="46.3" cy="48" r="5.3" fill={mesial}/></g></g></svg>
				);
				break;
			case '18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="1bf4e27b-9683-4ea7-b22a-15ece5114910" data-name="Procedimentos - 18"><g id="9b902926-c51d-4cfe-aee2-d247c15e1aa8" data-name="Apicectomia 18"><circle id="342019fd-3bef-4c89-a9a6-4ccffd9c2b6b" data-name="mesial" cx="50.4" cy="42.8" r="5.5" fill={mesial}/><circle id="d4e7e15c-3fa8-4e10-b6d1-8aa7013c9dea" data-name="distal" cx="45.7" cy="41.2" r="5.5" fill={distal}/></g></g></svg>
				);
				break;
			case '21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="8b69e13f-156c-474f-8b1a-94573793ad34" data-name="Procedimentos - 21"><circle id="8dced5b0-be2a-4a4a-b133-4b80665d45b7" data-name="Apicectomia 21" cx="36.2" cy="27.5" r="7" fill={auto}/></g></svg>
				);
				break;
			case '22':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="c706c88c-e606-4f97-8931-f72e520c49ac" data-name="Procedimentos - 22"><circle id="3526448f-e346-4512-a552-7494b4f00522" data-name="Apicectomia 22" cx="30.5" cy="29.5" r="7" fill={auto}/></g></svg>
				);
				break;
			case '23':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="a2ce5c6a-f32b-4b5b-b159-eb6a0b8f663b" data-name="Procedimentos - 23"><circle id="226150d8-c1dc-4eac-872f-57fab66c976b" data-name="Apicectomia 23" cx="34.6" cy="26.5" r="7.4" fill={auto}/></g></svg>
				);
				break;
			case '24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="6f0bab65-5a53-4675-8a70-2b634cc0b5ed" data-name="Procedimentos - 24"><g id="3ef51d1c-a82f-42f7-b889-87374d5d03b8" data-name="Apicectomia 24"><circle id="b405a3dc-b35d-4544-92f6-c6e3e7d9e365" data-name="distal" cx="31.9" cy="23.8" r="5.3" fill={distal}/><circle id="cebafba1-5093-4dca-b582-75e64933c6d4" data-name="mesial" cx="24.4" cy="29.5" r="5.3" fill={mesial}/></g></g></svg>
				);
				break;
			case '25':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="a68b0f9d-7c0e-45cb-9006-15f44327725a" data-name="Procedimentos - 25"><circle id="d96366fd-9ae0-48ab-b34c-1aadcd911d51" data-name="Apicectomia 25" cx="21.8" cy="24.1" r="7.7" fill={auto}/></g></svg>
				);
				break;
			case '26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="da96a224-5239-473d-bbb4-c9ce246c67cf" data-name="Procedimentos - 26"><g id="6670d8f3-e12e-4770-b09f-be30f348637c" data-name="Apicectomia 26"><circle id="a0d641bc-5ae4-4c97-9c63-7b3b6f5c5bae" data-name="distal" cx="31.8" cy="42.6" r="5.3" fill={distal}/><circle id="7c3f1c80-1aa5-452c-8a77-843cb0966db3" data-name="palatina" cx="26.2" cy="42.1" r="5.3" fill={palatina}/><circle id="fc1ac3d3-8aa2-4793-8404-a44f17dcd539" data-name="mesial" cx="23.2" cy="47.3" r="5.3" fill={mesial}/></g></g></svg>
				);
				break;
			case '27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="91156667-7635-4978-8487-601feb4b2be7" data-name="Procedimentos - 27"><g id="ba9f1e62-aa1c-44ae-a098-8a162765f556" data-name="Apicectomia 27"><circle id="0387e984-aeb8-4b97-923d-abadad72f064" data-name="distal" cx="37.2" cy="51.3" r="5.3" fill={distal}/><circle id="33d1dca5-642f-4983-9950-40a9af9b6cbd" data-name="palatina" cx="32.8" cy="53.9" r="5.3" fill={palatina}/><circle id="1e5d9758-5a2f-4b3e-ab2c-aa76c86dcc70" data-name="mesial" cx="27.3" cy="48" r="5.3" fill={mesial}/></g></g></svg>
				);
				break;
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="af3d94ba-a15e-4f03-8f29-64f1f951358f" data-name="Procedimentos - 28"><g id="c61f33aa-8b0a-4d66-9f83-89f2103ae151" data-name="Apicectomia 28"><circle id="70aabdaf-5c94-4ec7-88cb-33067433db78" data-name="mesial" cx="22.4" cy="41.3" r="5.5" fill={mesial}/><circle id="322c97e3-8bd2-4b41-bdfa-fcc256dcdc5e" data-name="distal" cx="27.1" cy="39.7" r="5.5" fill={distal}/></g></g></svg>
				);
				break;
			case '31':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 31"><g data-name="Apicectomia 31"><circle data-name="vestibular" cx="31.2" cy="118.6" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '32':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 32"><g data-name="Apicectomia 32"><circle data-name="vestibular" cx="33.7" cy="129.6" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '33':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 33"><g data-name="Apicectomia 33"><circle data-name="vestibular" cx="39.8" cy="147.2" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '34':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 34"><g data-name="Apicectomia 34"><circle data-name="vestibular" cx="35.9" cy="137.2" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '35':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 35"><g data-name="Apicectomia 35"><circle data-name="vestibular" cx="40.7" cy="134.5" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 36"><g data-name="Apicectomia 36"><circle data-name="distal" cx="43" cy="126" r="7" fill={distal}/><circle data-name="mesial" cx="18.1" cy="121.4" r="7" fill={mesial}/></g></g></svg>
				);
				break;
			case '37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 37"><g data-name="Apicectomia 37"><circle data-name="distal" cx="29.9" cy="122.1" r="7" fill={distal}/><circle data-name="mesial" cx="14.6" cy="112.1" r="7" fill={mesial}/></g></g></svg>
				);
				break;
			case '38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 38"><g data-name="Apicectomia 38"><circle data-name="distal" cx="39.6" cy="116.1" r="7" fill={distal}/><circle data-name="mesial" cx="25.9" cy="116.1" r="7" fill={mesial}/></g></g></svg>
				);
				break;
			case '41':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 41"><g data-name="Apicectomia 41"><circle data-name="vestibular" cx="39.6" cy="118.9" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '42':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 42"><g data-name="Apicectomia 42"><circle data-name="vestibular" cx="38.2" cy="130.3" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 43"><g data-name="Apicectomia 43"><circle data-name="vestibular" cx="32.6" cy="147.2" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '44':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 44"><g data-name="Apicectomia 44"><circle data-name="vestibular" cx="34" cy="137.2" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 45"><g data-name="Apicectomia 45"><circle data-name="vestibular" cx="29.2" cy="134.5" r="7" fill={auto}/></g></g></svg>
				);
				break;
			case '46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 46"><g data-name="Apicectomia 46"><circle data-name="distal" cx="29.4" cy="126" r="7" fill={distal}/><circle data-name="mesial" cx="54.3" cy="121.4" r="7" fill={mesial}/></g></g></svg>
				);
				break;
			case '47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 47"><g data-name="Apicectomia 47"><circle  data-name="distal" cx="42" cy="121.4" r="7" fill={distal}/><circle data-name="mesial" cx="57.3" cy="111.3" r="7" fill={mesial}/></g></g></svg>
				);
				break;
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 48"><g data-name="Apicectomia 48"><circle data-name="distal" cx="31.2" cy="115.7" r="7" fill={distal}/><circle data-name="mesial" cx="44.9" cy="115.7" r="7" fill={mesial}/></g></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getExternoSvg = (icon, color) => {
		switch(icon) {
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
			case '17':
			case '18':
			case '21':
			case '22':
			case '23':
			case '24':
			case '25':
			case '26':
			case '27':
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Incisivo"><path d="M35.1,106.1h.8L69.1,77.7V53.9L1.6,111.6A103,103,0,0,1,35.1,106.1Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M1.1,111.8l.5-.2L69.1,53.9V30.2L1.1,88.3Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M69.1,111.8V101.4l-9,7.7A86.6,86.6,0,0,1,69.1,111.8Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M60.1,109.1l9-7.7V77.7L35.9,106.1A106.6,106.6,0,0,1,60.1,109.1Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 88.3 69.1 30.2 69.1 16.6 57.1 16.6 1.1 64.5 1.1 88.3" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 17 1.5 16.6 1.1 16.6 1.1 17" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 40.7 29.3 16.6 1.5 16.6 1.1 17 1.1 40.7" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 64.5 57.1 16.6 29.3 16.6 1.1 40.7 1.1 64.5" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></g></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
			case '36':
			case '37':
			case '38':
			case '41':
			case '42':
			case '43':
			case '44':
			case '45':
			case '46':
			case '47':
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Incisivo"><path d="M35.1,71.3h-.8L1.1,99.7v23.8L68.6,65.8A106,106,0,0,1,35.1,71.3Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M69.1,65.6l-.5.2L1.1,123.5v23.7l68-58.1Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M1.1,65.6V75.9l9-7.6A86.6,86.6,0,0,1,1.1,65.6Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M10.1,68.3l-9,7.6V99.7L34.3,71.3A112.6,112.6,0,0,1,10.1,68.3Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69.1 89.1 1.1 147.2 1.1 160.8 13.1 160.8 69.1 112.9 69.1 89.1" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69.1 160.4 68.7 160.8 69.1 160.8 69.1 160.4" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69.1 136.6 40.9 160.8 68.7 160.8 69.1 160.4 69.1 136.6" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69.1 112.9 13.1 160.8 40.9 160.8 69.1 136.6 69.1 112.9" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></g></svg>
				);
			break;
			default:
				return '';
				break;
		}
	};

	const getMalhaPeriodentalSvg = (icon, color) => {
		switch(icon) {
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
			case '17':
			case '18':
			case '21':
			case '22':
			case '23':
			case '24':
			case '25':
			case '26':
			case '27':
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="53df4c26-210e-465e-9e57-83d4fe8da4a6" data-name="Incisivo"><path d="M35.1,105.6h.7L69,77.3V53.6L1.7,111.1A104.5,104.5,0,0,1,35.1,105.6Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M1.1,111.3l.6-.2L69,53.6V29.9L1.1,87.9Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M69,111.3V101l-9,7.7A75.7,75.7,0,0,1,69,111.3Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M60,108.7l9-7.7V77.3L35.8,105.6A105.9,105.9,0,0,1,60,108.7Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 87.9 69 29.9 69 16.4 57 16.4 1.1 64.2 1.1 87.9" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 16.8 1.5 16.4 1.1 16.4 1.1 16.8" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 40.5 29.3 16.4 1.5 16.4 1.1 16.8 1.1 40.5" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 64.2 57 16.4 29.3 16.4 1.1 40.5 1.1 64.2" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M35.1,105.6h-.8L1.1,77.3V53.6l67.3,57.5A104.2,104.2,0,0,0,35.1,105.6Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M69,111.3l-.6-.2L1.1,53.6V29.9L69,87.9Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M1.1,111.3V101l9,7.7A75.7,75.7,0,0,0,1.1,111.3Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M10.1,108.7l-9-7.7V77.3l33.2,28.3A105.9,105.9,0,0,0,10.1,108.7Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69 87.9 1.1 29.9 1.1 16.4 13.1 16.4 69 64.2 69 87.9" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69 16.8 68.6 16.4 69 16.4 69 16.8" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69 40.5 40.8 16.4 68.6 16.4 69 16.8 69 40.5" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69 64.2 13.1 16.4 40.8 16.4 69 40.5 69 64.2" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></g></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
			case '36':
			case '37':
			case '38':
			case '41':
			case '42':
			case '43':
			case '44':
			case '45':
			case '46':
			case '47':
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="41fdbbbd-a86c-47fc-af21-17784d370f6b" data-name="Incisivo"><path d="M35.1,71.1h-.8L1.1,99.4v23.7L68.4,65.6A104.2,104.2,0,0,1,35.1,71.1Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M69,65.4l-.6.2L1.1,123.1v23.7L69,88.9Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M1.1,65.4V75.7l9-7.6A86.6,86.6,0,0,1,1.1,65.4Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M10.1,68.1l-9,7.6V99.4L34.3,71.1A112.6,112.6,0,0,1,10.1,68.1Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69 88.9 1.1 146.8 1.1 160.3 13.1 160.3 69 112.6 69 88.9" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69 160 68.6 160.3 69 160.3 69 160" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69 136.3 40.8 160.3 68.6 160.3 69 160 69 136.3" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="69 112.6 13.1 160.3 40.8 160.3 69 136.3 69 112.6" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M35.1,71.1h.7L69,99.4v23.7L1.7,65.6A104.5,104.5,0,0,0,35.1,71.1Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M1.1,65.4l.6.2L69,123.1v23.7L1.1,88.9Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M69,65.4V75.7l-9-7.6A86.6,86.6,0,0,0,69,65.4Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M60,68.1l9,7.6V99.4L35.8,71.1A112.6,112.6,0,0,0,60,68.1Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 88.9 69 146.8 69 160.3 57 160.3 1.1 112.6 1.1 88.9" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 160 1.5 160.3 1.1 160.3 1.1 160" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 136.3 29.3 160.3 1.5 160.3 1.1 160 1.1 136.3" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><polygon points="1.1 112.6 57 160.3 29.3 160.3 1.1 136.3 1.1 112.6" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></g></svg>
				);
			break;
			default:
				return '';
				break;
		}
	};

	const getRaspagemSvg = (icon, color) => {
		switch(icon) {
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
			case '17':
			case '18':
			case '21':
			case '22':
			case '23':
			case '24':
			case '25':
			case '26':
			case '27':
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><polygon points="21.7 157.5 23.1 158.9 15.8 166.2 9.2 159.5 10.6 158.1 15.8 163.3 21.7 157.5" fill={color}/><polygon points="20 154.1 21.4 155.5 16 160.9 10.9 155.7 12.3 154.3 16 158 20 154.1" fill={color}/></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
			case '36':
			case '37':
			case '38':
			case '41':
			case '42':
			case '43':
			case '44':
			case '45':
			case '46':
			case '47':
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><polygon points="10.6 17.8 9.2 16.4 16.5 9.1 23.1 15.7 21.7 17.2 16.5 12 10.6 17.8" fill={color}/><polygon points="12.3 21.2 10.9 19.8 16.3 14.4 21.4 19.6 20 21 16.3 17.3 12.3 21.2" fill={color}/></svg>
				);
			break;
			default:
				return '';
				break;
		}
	};

	const getFenulotomiaSvg = (icon, color) => {
		switch(icon) {
			case '11':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><rect x="44.2" y="15" width="15" height="3" transform="translate(3.5 41.4) rotate(-45)" fill={color}/><rect x="36.7" y="14.9" width="15.2" height="3" transform="translate(1.4 36.2) rotate(-45)" fill={color}/></svg>
				);
				break;
			case '21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><rect x="17.6" y="15.1" width="15" height="3" transform="translate(-4.4 22.6) rotate(-45)" fill={color}/><rect x="10.1" y="15.1" width="15.2" height="3" transform="translate(-6.5 17.4) rotate(-45)" fill={color}/></svg>
				);
				break;
			case '31':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><rect x="17.6" y="158.4" width="15" height="3" transform="translate(-105.7 64.6) rotate(-45)" fill={color}/><rect x="10.1" y="158.3" width="15.2" height="3" transform="translate(-107.8 59.3) rotate(-45)" fill={color}/></svg>
				);
				break;
			case '41':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><rect x="44.2" y="158.2" width="15" height="3" transform="translate(-97.8 83.3) rotate(-45)" fill={color}/><rect x="36.7" y="158.2" width="15.2" height="3" transform="translate(-99.9 78.1) rotate(-45)" fill={color}/></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getRizectomiaSvg = (icon, vestibular, distal, mesial, palatina) => {
		switch(icon) {
			case '14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 14"><g data-name="Rizectomia 14"><path data-name="palatina" fill={palatina} d="M37.1,35.6l-3.5-3.4a.9.9,0,0,1-.1-1.3h.1a.9.9,0,0,1,1.3,0l3.7,3.4,3.6-3.4a1,1,0,0,1,1.4,0h0a.9.9,0,0,1,0,1.3L40,35.6l3.6,3.3a1,1,0,0,1,0,1.4h0a1,1,0,0,1-1.4.1L38.6,37l-3.7,3.4a.9.9,0,0,1-1.3-.1h-.1a1.1,1.1,0,0,1,.1-1.4Z" /><path data-name="vestibular" fill={vestibular} d="M31.8,25.4l-3.5-3.3a1,1,0,0,1-.1-1.4h.1a.9.9,0,0,1,1.3-.1l3.7,3.5,3.6-3.5a1.1,1.1,0,0,1,1.4.1h0a1,1,0,0,1,0,1.4l-3.6,3.3,3.6,3.4a1,1,0,0,1,0,1.4h0a1.1,1.1,0,0,1-1.4.1l-3.6-3.5-3.7,3.5a.9.9,0,0,1-1.3-.1h-.1a1,1,0,0,1,.1-1.4Z" /></g></g></svg>
				);
				break;
			case '16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 16"><g data-name="Rizectomia 16"><path data-name="distal" fill={distal} d="M34.7,50.1l-3.6-3.3a1,1,0,0,1,0-1.4h0a1,1,0,0,1,1.4,0l3.6,3.4,3.7-3.4a.9.9,0,0,1,1.3,0h.1a1.1,1.1,0,0,1-.1,1.4l-3.5,3.3,3.5,3.3a1.1,1.1,0,0,1,.1,1.4h-.1a.9.9,0,0,1-1.3,0l-3.7-3.4-3.6,3.4a1,1,0,0,1-1.4,0h0a1,1,0,0,1,0-1.4Z" /><path data-name="palatina" fill={palatina} d="M38.1,60.2l-3.5-3.3a1.1,1.1,0,0,1-.1-1.4h.1a.9.9,0,0,1,1.3-.1l3.7,3.5,3.6-3.5a1.1,1.1,0,0,1,1.4.1h0a1,1,0,0,1,0,1.4L41,60.2l3.6,3.4a1,1,0,0,1,0,1.4h0a1,1,0,0,1-1.4,0l-3.6-3.4L35.9,65a.9.9,0,0,1-1.3,0h-.1a1.1,1.1,0,0,1,.1-1.4Z" /><path data-name="mesial" fill={mesial} d="M48.2,50.1l-3.6-3.3a1,1,0,0,1,0-1.4h0a1,1,0,0,1,1.4,0l3.6,3.4,3.7-3.4a.9.9,0,0,1,1.3,0h.1a1.1,1.1,0,0,1-.1,1.4l-3.5,3.3,3.5,3.3a1.1,1.1,0,0,1,.1,1.4h-.1a.9.9,0,0,1-1.3,0l-3.7-3.4L46,54.9a1,1,0,0,1-1.4,0h0a1,1,0,0,1,0-1.4Z" /></g></g></svg>
				);
				break;
			case '17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 17"><g data-name="Rizectomia 17"><path data-name="distal" fill={distal} d="M31.6,56.8l-3.5-3.4a.9.9,0,0,1-.1-1.3h.1a.9.9,0,0,1,1.3,0l3.7,3.4L36.7,52a1,1,0,0,1,1.4,0h0a.9.9,0,0,1,0,1.3l-3.6,3.4,3.6,3.3a1,1,0,0,1,0,1.4h0a1.1,1.1,0,0,1-1.4,0l-3.6-3.4-3.7,3.4a.9.9,0,0,1-1.3,0H28a1.1,1.1,0,0,1,.1-1.4Z" /><path data-name="palatina" fill={palatina} d="M34.6,68.2l-3.5-3.3a1,1,0,0,1,0-1.4h0a1.1,1.1,0,0,1,1.4,0l3.6,3.4,3.6-3.4a1.1,1.1,0,0,1,1.4,0h0a1,1,0,0,1,0,1.4l-3.5,3.3,3.5,3.4a.9.9,0,0,1,0,1.3h0a1,1,0,0,1-1.4,0l-3.6-3.4L32.5,73a1,1,0,0,1-1.4,0h0a.9.9,0,0,1,0-1.3Z" /><path data-name="mesial" fill={mesial} d="M45.8,57.2l-3.5-3.4a1,1,0,0,1,0-1.4h0a1,1,0,0,1,1.4,0l3.6,3.4,3.6-3.4a1,1,0,0,1,1.4,0h0a1,1,0,0,1,0,1.4l-3.5,3.4,3.5,3.3a1,1,0,0,1,0,1.4h0a1.1,1.1,0,0,1-1.4.1l-3.6-3.5L43.7,62a1.1,1.1,0,0,1-1.4-.1h0a1,1,0,0,1,0-1.4Z" /></g></g></svg>
				);
				break;
			case '18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 18"><g data-name="Rizectomia 18"><path data-name="palatina" fill={palatina} d="M41,45.3l-3.5-3.4a.9.9,0,0,1-.1-1.3h.1a1,1,0,0,1,1.4,0l3.6,3.4,3.6-3.4a1,1,0,0,1,1.4,0h0a.9.9,0,0,1,0,1.3l-3.6,3.4,3.6,3.3a1,1,0,0,1,0,1.4h0a1.1,1.1,0,0,1-1.4,0l-3.6-3.4-3.6,3.4a1.1,1.1,0,0,1-1.4,0h-.1a1.1,1.1,0,0,1,.1-1.4Z" /><path data-name="vestibular" fill={vestibular} d="M49,44.3l-3.5-3.4a1,1,0,0,1,0-1.4h0a1,1,0,0,1,1.4,0l3.6,3.4,3.6-3.4a1,1,0,0,1,1.4,0h0a1,1,0,0,1,0,1.4L52,44.3l3.5,3.3a1,1,0,0,1,0,1.4h0a1.1,1.1,0,0,1-1.4.1l-3.6-3.5-3.6,3.5a1.1,1.1,0,0,1-1.4-.1h0a1,1,0,0,1,0-1.4Z" /></g></g></svg>
				);
				break;
			case '24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 24"><g data-name="Rizectomia 24"><path data-name="palatina" fill={palatina} d="M28.9,35.6l3.6-3.4a.9.9,0,0,0,0-1.3h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.6-3.4a1,1,0,0,0-1.4,0h-.1a.9.9,0,0,0,.1,1.3L26,35.6l-3.5,3.3a1.1,1.1,0,0,0-.1,1.4h.1a1,1,0,0,0,1.4.1L27.5,37l3.6,3.4a1,1,0,0,0,1.4-.1h0a1,1,0,0,0,0-1.4Z" /><path data-name="vestibular" fill={vestibular} d="M34.2,25.4l3.6-3.3a1,1,0,0,0,0-1.4h0a1.1,1.1,0,0,0-1.4-.1l-3.6,3.5-3.6-3.5a1.1,1.1,0,0,0-1.4.1h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.3-3.5,3.4a1.1,1.1,0,0,0-.1,1.4h.1a1.1,1.1,0,0,0,1.4.1l3.6-3.5,3.6,3.5a1.1,1.1,0,0,0,1.4-.1h0a1,1,0,0,0,0-1.4Z" /></g></g></svg>
				);
				break;
			case '26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 26"><g data-name="Rizectomia 26"><path data-name="distal" fill={distal} d="M35.6,51.1l3.5-3.3a1.1,1.1,0,0,0,.1-1.4h-.1a.9.9,0,0,0-1.3,0l-3.7,3.4-3.6-3.4a1,1,0,0,0-1.4,0h0a1,1,0,0,0,0,1.4l3.6,3.3-3.6,3.3a1,1,0,0,0,0,1.4h0a1,1,0,0,0,1.4,0l3.6-3.4,3.7,3.4a.9.9,0,0,0,1.3,0h.1a1.1,1.1,0,0,0-.1-1.4Z" /><path data-name="palatina" fill={palatina} d="M32.1,61.2l3.6-3.3a1,1,0,0,0,0-1.4h0a1.1,1.1,0,0,0-1.4-.1l-3.6,3.5-3.6-3.5a1.1,1.1,0,0,0-1.4.1h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.3-3.5,3.4a1.1,1.1,0,0,0-.1,1.4h.1a1,1,0,0,0,1.4,0l3.6-3.4L34.3,66a1,1,0,0,0,1.4,0h0a1,1,0,0,0,0-1.4Z" /><path data-name="mesial" fill={mesial} d="M22.1,51.1l3.5-3.3a1.1,1.1,0,0,0,.1-1.4h-.1a1,1,0,0,0-1.4,0l-3.6,3.4L17,46.3a1,1,0,0,0-1.4,0h0a1,1,0,0,0,0,1.4l3.6,3.3-3.6,3.3a1,1,0,0,0,0,1.4h0a1,1,0,0,0,1.4,0l3.6-3.4,3.6,3.4a1,1,0,0,0,1.4,0h.1a1.1,1.1,0,0,0-.1-1.4Z" /></g></g></svg>
				);
				break;
			case '27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 27"><g data-name="Rizectomia 27"><path data-name="distal" fill={distal} d="M36.5,55.8,40,52.4a.9.9,0,0,0,0-1.3h0a1,1,0,0,0-1.4,0L35,54.4,31.4,51A1,1,0,0,0,30,51h0a.9.9,0,0,0,0,1.3l3.5,3.4L30,59.1a1,1,0,0,0,0,1.4h0a1.1,1.1,0,0,0,1.4,0L35,57.2l3.6,3.4a1.1,1.1,0,0,0,1.4,0h0a1,1,0,0,0,0-1.4Z" /><path data-name="palatina" fill={palatina} d="M33.4,67.2,37,63.9a1,1,0,0,0,0-1.4h0a1.1,1.1,0,0,0-1.4,0L32,65.8l-3.7-3.4a.9.9,0,0,0-1.3,0h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.3L27,70.6a.9.9,0,0,0-.1,1.3H27a.9.9,0,0,0,1.3,0L32,68.6,35.6,72A1,1,0,0,0,37,72h0a.9.9,0,0,0,0-1.3Z" /><path data-name="mesial" fill={mesial} d="M22.2,56.2l3.6-3.4a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.7-3.4a.9.9,0,0,0-1.3,0h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.4-3.5,3.3a1.1,1.1,0,0,0-.1,1.4h.1a.9.9,0,0,0,1.3.1l3.7-3.5L24.4,61a1.1,1.1,0,0,0,1.4-.1h0a1,1,0,0,0,0-1.4Z" /></g></g></svg>
				);
				break;
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 28"><g data-name="Rizectomia 28"><path data-name="vestibular" fill={vestibular} d="M28,43.3l3.6-3.4a.9.9,0,0,0,0-1.3h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.7-3.4a.9.9,0,0,0-1.3,0h-.1a.9.9,0,0,0,.1,1.3l3.5,3.4-3.5,3.3a1.1,1.1,0,0,0-.1,1.4h.1a.9.9,0,0,0,1.3,0l3.7-3.4,3.6,3.4a1.1,1.1,0,0,0,1.4,0h0a1,1,0,0,0,0-1.4Z" /><path data-name="palatina" fill={palatina} d="M20,42.3l3.6-3.4a1.1,1.1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.7-3.4a.9.9,0,0,0-1.3,0h-.1a1,1,0,0,0,.1,1.4l3.5,3.4-3.5,3.3a1,1,0,0,0-.1,1.4h.1a.9.9,0,0,0,1.3.1l3.7-3.5,3.6,3.5a1.1,1.1,0,0,0,1.4-.1h0a1.1,1.1,0,0,0,0-1.4Z" /></g></g></svg>
				);
			case '36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 36"><g data-name="Rizectomia 36"><path d="M17.6,116.5l3.6-3.4a1.1,1.1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.7-3.4a.9.9,0,0,0-1.3,0h-.1a1,1,0,0,0,.1,1.4l3.5,3.4-3.5,3.3a1,1,0,0,0-.1,1.4h.1a.9.9,0,0,0,1.3.1l3.7-3.5,3.6,3.5a1.1,1.1,0,0,0,1.4-.1h0a1.1,1.1,0,0,0,0-1.4Z" data-name="mesial" fill={mesial} /><path d="M42.5,121.5l3.6-3.3a1,1,0,0,0,0-1.4h0a1.1,1.1,0,0,0-1.4-.1l-3.6,3.5-3.7-3.5a.9.9,0,0,0-1.3.1H36a1.1,1.1,0,0,0,.1,1.4l3.5,3.3-3.5,3.4a1.1,1.1,0,0,0-.1,1.4h.1a.9.9,0,0,0,1.3,0l3.7-3.4,3.6,3.4a1,1,0,0,0,1.4,0h0a1,1,0,0,0,0-1.4Z" data-name="distal" fill={distal} /></g></g></svg>
				);
				break;
			case '37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 37"><g data-name="Rizectomia 37"><path d="M13,105.1l3.6-3.4a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.7-3.4a.9.9,0,0,0-1.3,0H6.5a1,1,0,0,0,.1,1.4l3.5,3.4-3.5,3.3a1,1,0,0,0-.1,1.4h.1a.9.9,0,0,0,1.3.1l3.7-3.5,3.6,3.5a1.1,1.1,0,0,0,1.4-.1h0a1,1,0,0,0,0-1.4Z" data-name="mesial" fill={mesial} /><path d="M29.9,114.9l3.6-3.4a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.7-3.4a.9.9,0,0,0-1.3,0h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.4-3.5,3.3a1.1,1.1,0,0,0-.1,1.4h.1a.9.9,0,0,0,1.3.1l3.7-3.5,3.6,3.5a1.1,1.1,0,0,0,1.4-.1h0a1,1,0,0,0,0-1.4Z" data-name="distal" fill={distal} /></g></g></svg>
				);
				break;
			case '38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 38"><g data-name="Rizectomia 38"><path d="M41.3,109.8l3.5-3.3a1.1,1.1,0,0,0,.1-1.4h-.1a.9.9,0,0,0-1.3,0l-3.7,3.4L36.2,105a1,1,0,0,0-1.4,0h0a1,1,0,0,0,0,1.4l3.6,3.3-3.6,3.4a.9.9,0,0,0,0,1.3h0a1,1,0,0,0,1.4,0l3.6-3.4,3.7,3.4a.9.9,0,0,0,1.3,0h.1a.9.9,0,0,0-.1-1.3Z" data-name="distal" fill={distal} /><path d="M26.3,109.8l3.6-3.3a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4L21.2,105a.9.9,0,0,0-1.3,0h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.3-3.5,3.4a.9.9,0,0,0-.1,1.3h.1a.9.9,0,0,0,1.3,0l3.7-3.4,3.6,3.4a1,1,0,0,0,1.4,0h0a.9.9,0,0,0,0-1.3Z" data-name="mesial" fill={mesial} /></g></g></svg>
				);
				break;
			case '46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 46"><g data-name="Rizectomia 46"><g data-name="Rizectomia 46"><path d="M55.8,116.5l3.5-3.4a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.6-3.4a1,1,0,0,0-1.4,0h0a1,1,0,0,0,0,1.4l3.5,3.4-3.5,3.3a1,1,0,0,0,0,1.4h0a1.1,1.1,0,0,0,1.4.1l3.6-3.5,3.6,3.5a1.1,1.1,0,0,0,1.4-.1h0a1,1,0,0,0,0-1.4Z" data-name="mesial" fill={mesial} /><path d="M30.8,121.5l3.6-3.3a1,1,0,0,0,0-1.4h0a1.1,1.1,0,0,0-1.4-.1l-3.6,3.5-3.6-3.5a1.1,1.1,0,0,0-1.4.1h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.3-3.5,3.4a1.1,1.1,0,0,0-.1,1.4h.1a1,1,0,0,0,1.4,0l3.6-3.4,3.6,3.4a1,1,0,0,0,1.4,0h0a1,1,0,0,0,0-1.4Z" data-name="distal" fill={distal}/></g></g></g></svg>
				);
				break;
			case '47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 47"><g data-name="Rizectomia 47"><g data-name="Rizectomia 47"><path d="M59.4,105.1l3.5-3.4a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4-3.6-3.4a1,1,0,0,0-1.4,0h0a1,1,0,0,0,0,1.4l3.5,3.4-3.5,3.3a1,1,0,0,0,0,1.4h0a1.1,1.1,0,0,0,1.4.1l3.6-3.5,3.6,3.5a1.1,1.1,0,0,0,1.4-.1h0a1,1,0,0,0,0-1.4Z" data-name="mesial" fill={mesial} /><path d="M42.4,114.9l3.6-3.4a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0L41,113.5l-3.6-3.4a1,1,0,0,0-1.4,0h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.4L36,118.2a1.1,1.1,0,0,0-.1,1.4H36a1.1,1.1,0,0,0,1.4.1l3.6-3.5,3.6,3.5a1.1,1.1,0,0,0,1.4-.1h0a1,1,0,0,0,0-1.4Z" data-name="distal" fill={distal} /></g></g></g></svg>
				);
				break;
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g data-name="Procedimentos - 48"><g data-name="Rizectomia 48"><path d="M32.1,109.8l3.5-3.3a1.1,1.1,0,0,0,.1-1.4h-.1a.9.9,0,0,0-1.3,0l-3.7,3.4L27,105a1,1,0,0,0-1.4,0h0a1,1,0,0,0,0,1.4l3.6,3.3-3.6,3.4a.9.9,0,0,0,0,1.3h0a1,1,0,0,0,1.4,0l3.6-3.4,3.7,3.4a.9.9,0,0,0,1.3,0h.1a.9.9,0,0,0-.1-1.3Z" data-name="distal" fill={distal} /><path d="M47,109.8l3.6-3.3a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0l-3.6,3.4L42,105a1,1,0,0,0-1.4,0h-.1a1.1,1.1,0,0,0,.1,1.4l3.5,3.3-3.5,3.4a.9.9,0,0,0-.1,1.3h.1a1,1,0,0,0,1.4,0l3.6-3.4,3.6,3.4a1,1,0,0,0,1.4,0h0a.9.9,0,0,0,0-1.3Z" data-name="mesial" fill={mesial} /></g></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getChannelSvg = (icon, auto, mesial, distal, vestibular, palatina) => {
	
		switch(icon) {
			case '11':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="10cac460-3af3-42dd-8f57-3847f08d6bec" data-name="Procedimentos - 11"><line id="fe5d7443-da7e-4b48-ac99-6df8e7ece68b" data-name="Canal 11" x1="34.9" y1="36.2" x2="34.1" y2="100.8" fill="none" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '12':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="75d4b641-c6f8-4992-bbfd-0aed0594af55" data-name="Procedimentos - 12"><line id="6244b326-19d2-4762-8f28-6ecaafa4f614" data-name="Canal 12" x1="39.7" y1="43.1" x2="36.7" y2="99" fill="none" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '13':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="ed087bf5-f00b-412a-b766-6e749b14b389" data-name="Procedimentos - 13"><line id="7491afe3-3d47-419e-8ba6-c35fd64fb3c3" data-name="Canal 13" x1="35" y1="36.2" x2="34.2" y2="100.8" fill="none" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="93920a3d-f8c8-4834-840e-ec5a95b4d1a2" data-name="Procedimentos - 14"><g id="c78fb93f-e998-4f37-8799-1599b85eed81" data-name="Canal 14"><line id="4ef03f3a-ff4d-4532-87c7-e20fa98909cf" data-name="distal" x1="35.8" y1="33.2" x2="34.2" y2="100.4" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><path id="1c778411-de98-4d4f-b1fe-5e991114b176" data-name="mesial" d="M43.2,32.5a221,221,0,0,0-3.6,35.1c-.5,20-.2,28.3-.2,28.3" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '15':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="60b90455-39e3-4f66-956f-4241c3cee1c2" data-name="Procedimentos - 15"><polyline id="a0dba516-0d4d-438c-a366-f45b968c7397" data-name="Canal 15" points="45.6 29.4 40.6 46.6 33.4 99.7" fill="none" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="18bc7b82-162a-4802-8035-2eaf056d9493" data-name="Procedimentos - 16"><g id="ae1af889-1931-4368-8d40-934af346e4bf" data-name="Canal 16"><polyline id="69744712-92bb-438f-a5cc-42c14e2fa93f" data-name="distal" points="39.2 45.1 26.5 67.1 25.2 101.4" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><polyline id="e86a9ee8-e362-4545-a5bf-3a37c7087823" data-name="mesial" points="48.1 49.2 45.7 87.5 43.1 102.8" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/><polyline id="02dcec45-d07e-40b3-9358-bf38ff0a22b9" data-name="palatina" points="43.1 49.2 38.4 66.2 34.4 96.2" fill="none" stroke={palatina} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="0c4f670f-612f-40ac-a719-26011a722c69" data-name="Procedimentos - 17"><g id="2f3d3035-a7ed-4004-a026-9d6543f0d3d6" data-name="Canal 17"><polyline id="b4ecba1a-bf8f-4251-8d93-f43f2691b766" data-name="mesial" points="45.7 49.2 47.6 71.2 41.2 101.7" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/><polyline id="150d668a-02a5-4e89-9e26-eb9a12eda9ba" data-name="distal" points="36.4 53.4 26.7 72.3 24 101.7" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><polyline id="b4454a75-5074-4835-a651-281dc327eacd" data-name="palatina" points="40.4 55.1 36.4 67.4 33.2 95.7" fill="none" stroke={palatina} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="7b1f192f-25f8-4d93-8cc5-c89f1b5d5368" data-name="Procedimentos - 18"><g id="b513bfc0-fca1-42e6-bc33-206452f70641" data-name="Canal 18"><line id="4a2b751e-5c70-4e16-8831-b60d329f9f28" data-name="distal" x1="44.4" y1="45.2" x2="33.6" y2="101.8" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><line id="29ef0e76-dde4-4bc7-9ca3-cef7062d654f" data-name="mesial" x1="47.8" y1="44.5" x2="39.4" y2="106.5" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="6ced4f5c-5afc-428e-b0c1-7b596fe59021" data-name="Procedimentos - 21"><line id="795f1776-da9b-44d8-8277-50b66a98226f" data-name="Canal 21" x1="35.3" y1="37.2" x2="36.2" y2="101.8" fill="none" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '22':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="bebcb1e5-1ed3-44a5-914e-03b1d40acdd8" data-name="Procedimentos - 22"><line id="74b2a713-cef0-4296-9836-39c127f96a38" data-name="Canal 22" x1="28.6" y1="44.1" x2="31.5" y2="100" fill="none" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '23':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="338e0205-4ac8-44a7-aea9-c253638d8e63" data-name="Procedimentos - 23"><line id="569fd249-4688-4027-8965-e405f7fe4a4f" data-name="Canal 23" x1="34.2" y1="37.2" x2="35.1" y2="101.8" fill="none" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="620fb603-010d-4952-a19e-a12072eae8e9" data-name="Procedimentos - 24"><g id="891f4e2c-4d75-4cbe-8c8f-6376e71ef9c3" data-name="Canal 24"><line id="156eaf59-ef17-463c-ad06-2271fbcb3f41" data-name="distal" x1="34.4" y1="34.2" x2="36" y2="101.4" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><path id="5463d864-9b6a-4df4-a487-a6a85ae5be8e" data-name="mesial" d="M27,33.5a221,221,0,0,1,3.6,35.1c.5,20,.2,28.3.2,28.3" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '25':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="84aef915-663e-459f-930b-6157f61e9760" data-name="Procedimentos - 25"><polyline id="19474219-7d77-46a3-82ba-86502c149e17" data-name="Canal 25" points="24.7 32.5 29.6 49.6 36.8 102.7" fill="none" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="ae5655c6-0ce9-4551-982c-9230c3a5a1c0" data-name="Procedimentos - 26"><g id="0d61e8a0-42b0-4fe1-a769-92c8eb682309" data-name="Canal 26"><polyline id="4b27acaf-77dd-497e-aaaa-6cf066462bb8" data-name="distal" points="31.1 46.1 43.7 68.1 45 102.4" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><polyline id="0e51efb9-b154-4a98-b431-5e1783388f67" data-name="mesial" points="22.2 50.2 24.5 88.5 27.2 103.8" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/><polyline id="f5dd5890-567b-4843-a476-8b75918419e3" data-name="palatina" points="27.2 50.2 31.8 67.2 35.8 97.2" fill="none" stroke={palatina} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="aa065ad7-3291-46a6-8251-2f18d943a32b" data-name="Procedimentos - 27"><g id="afe68704-20ae-4a44-80cb-9e7b70e96b5d" data-name="Canal 27"><polyline id="0db2b993-c382-4aea-abee-3a36aaa206b3" data-name="mesial" points="23.5 50.2 21.7 72.2 28 102.7" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/><polyline id="f93050f5-f57e-4908-8ce3-c738b11aef73" data-name="distal" points="32.8 54.4 42.5 73.3 45.2 102.7" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><polyline id="30f7519b-9ad8-4015-85e1-93c2767d2f2a" data-name="palatina" points="28.8 56.1 32.8 68.4 36 96.7" fill="none" stroke={palatina} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="75cdc9fb-716c-4b25-b45e-b022fb281220" data-name="Procedimentos - 28"><g id="ca9e76cf-2dc3-4d41-85fe-523844930816" data-name="Canal 28"><line id="b38bc19e-8ad2-4dd3-b42f-5a7712d6c9df" data-name="distal" x1="25.9" y1="46.2" x2="36.6" y2="102.8" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><line id="af0afd78-b446-4534-847a-b6267015463b" data-name="mesial" x1="22.4" y1="45.5" x2="30.8" y2="107.5" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '31':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="2766f40a-70a5-4705-8ac9-1f32265b96e1" data-name="Procedimentos - 31"><path id="35c1f4f5-f5bc-45aa-8b7c-92a74cfe93ab" data-name="Canal 41" d="M35.1,64.1s.5,26-1,34.9" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '32':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="50eb062a-0aed-4186-9a68-b214a3dc1629" data-name="Procedimentos - 32"><line id="4c31ec0a-d478-44b3-b7f7-8e7f9715f210" data-name="Canal 32" x1="39.3" y1="68.2" x2="34.4" y2="113.7" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '33':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="e71942b9-fbef-4a57-9ff1-0994cab967cd" data-name="Procedimentos - 33"><line id="125d4283-497c-469b-92a4-be78532e9125" data-name="Canal 43" x1="40.2" y1="64.7" x2="40.5" y2="130" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '34':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="4122a1a1-815c-4882-a88b-fecf362d54cc" data-name="Procedimentos - 34"><line id="a6aaedd8-04da-4615-90f6-150b3aa47802" data-name="Canal 34" x1="34.5" y1="63.8" x2="35.6" y2="124.5" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '35':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="348aca45-cefc-4897-9ee1-fe7b6a2fccaf" data-name="Procedimentos - 35"><line id="818d47c7-d366-474c-9424-4d7c0c978079" data-name="Canal 35" x1="35.6" y1="63.8" x2="38" y2="114.5" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="4d3731b5-4376-429c-8030-07fa36313517" data-name="Procedimentos - 36"><g id="595e2aea-9982-4a7c-8fec-dd7721afd509" data-name="Canal 36"><polyline id="274ab998-7219-4127-8360-58568f6cc1c0" data-name="mesial" points="16.7 119.3 22.3 84.8 21.7 63.4" fill="none" stroke={mesial} stroke-linejoin="round" stroke-width="2"/><polyline id="5d09e924-d3a8-48f3-9c1d-eab614222fc9" data-name="distal" points="48.6 63.4 49.2 94.3 42.7 119.8" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><path id="27ee2caf-e1a2-4e18-9b16-ccd197a5f28c" data-name="palatina" d="M42.7,63.4s.9,31.8.6,32.5-3.5,13.8-3.5,13.8" fill="none" stroke={palatina} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="4680b443-6fe4-4c7a-9dd5-f8331c63ece3" data-name="Procedimentos - 37"><g id="64139746-f2b4-49e4-abd2-ef61ed0e742f" data-name="Canal 37"><polyline id="63ba71b0-1a3f-4eb2-aece-b43397f334b8" data-name="distal" points="29 115.8 40.5 94.5 43.5 61.4" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><polyline id="a334c9ad-5d4a-44cc-852c-665489b296a4" data-name="mesial" points="26.4 61.5 14.3 91.5 12.1 108.2" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="4c5de869-3d4e-4233-8056-28a91671037a" data-name="Procedimentos - 38"><g id="6b2d3a45-5fbb-41b1-bbf9-cbec94db2dfc" data-name="Canal - 38"><polyline id="63033eee-b734-4e2a-ad59-e3d73e68b7bc" data-name="distal" points="41.6 62.1 42.2 97.8 35.7 113.8" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><polyline id="d42bd161-b481-4946-84b0-a6f5b0d1b309" data-name="mesial" points="24.9 63.3 23.7 97 28.1 113.8" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '41':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="e352849d-9dda-442a-895d-fd625f0846b4" data-name="Procedimentos - 41"><path id="1668c21a-baa1-48f5-b78e-6f00dcd21ee5" data-name="Canal 41" d="M34.9,64.1s-.5,26,1,34.9" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '42':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="ba59f3e2-e69b-4394-b381-39fb19b27db9" data-name="Procedimentos - 42"><line id="38cfbb5c-3dfa-42dd-b1cc-a7d1fc3fcba2" data-name="Canal 42" x1="31.7" y1="68.2" x2="36.6" y2="113.7" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="484e993c-6bd0-474b-add8-55721dc603a5" data-name="Procedimentos - 43"><line id="991104dc-577a-4420-afcd-18a5638b01e8" data-name="Canal 43" x1="30.3" y1="64.7" x2="30" y2="130" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '44':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="3dd48e31-c9e7-4dbf-9f86-c18a95fc7b10" data-name="Procedimentos - 44"><line id="6e0c0f15-fe89-4d79-9d04-b83f5301e07f" data-name="Canal 44" x1="35" y1="63.8" x2="33.9" y2="124.5" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="ee432bd8-b603-42a8-bd1c-513ee1adcf94" data-name="Procedimentos - 45"><line id="d815ea22-219a-4732-8c22-e9fce7a309b0" data-name="Canal 45" x1="33.9" y1="63.8" x2="31.5" y2="114.5" fill="#eae173" stroke={auto} stroke-miterlimit="10" stroke-width="2"/></g></svg>
				);
				break;
			case '46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="edf88aff-03d6-443e-a3af-f862ca32af1a" data-name="Procedimentos - 46"><g id="4a06b9fd-9e22-4d43-a3ee-0d19aa634fdc" data-name="Canal 46"><polyline id="e7800515-df95-43ae-831e-739592a39afd" data-name="mesial" points="54.3 119.3 48.7 84.8 49.3 63.4" fill="none" stroke={mesial} stroke-linejoin="round" stroke-width="2"/><polyline id="252af9d8-61f7-4d45-909a-95c52eaa8c5e" data-name="distal" points="22.4 63.4 21.7 94.3 28.3 119.8" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><path id="04bb549a-6d2e-4be9-a707-b114049d0895" data-name="palatina" d="M28.3,63.4s-1,31.8-.6,32.5,3.5,13.8,3.5,13.8" fill="none" stroke={palatina} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="68e293da-f123-4a55-8d36-7d36ba92807f" data-name="Procedimentos - 47"><g id="1b9be1a6-f1e6-4e11-914f-4e8291e3af97" data-name="Canal 47"><polyline id="e6bd9798-7e0c-420f-a925-01ed56edc111" data-name="distal" points="41 115.8 29.5 94.5 26.5 61.4" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><polyline id="587d964d-d14d-48d2-be07-7ae8556b6f87" data-name="mesial" points="43.6 61.5 55.6 91.5 57.9 108.2" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="11341c67-9136-40a1-b50c-201749cbe2c5" data-name="Procedimentos - 48"><g id="1e74bbad-a04a-4a47-8e88-5ce3394ef258" data-name="Canal - 48"><polyline id="e2eb6cc8-a91a-468a-b4d3-530b1dca3824" data-name="Mesial" points="28.4 62.1 27.8 97.8 34.3 113.8" fill="none" stroke={distal} stroke-miterlimit="10" stroke-width="2"/><polyline id="afce0e11-c010-4b65-b24e-566e32e6d57f" data-name="Distal" points="45 63.3 46.3 97 41.9 113.8" fill="none" stroke={mesial} stroke-miterlimit="10" stroke-width="2"/></g></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getRestorationSvg = (icon, vestibular, distal, mesial, oclusal) => {
		switch(icon) {
			case '11':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="834ef8d4-595c-485e-b941-f0acd43bd2c9" data-name="Procedimentos - 11"><g id="f49779a9-5d48-4fda-8982-3fc2399540d7" data-name="Restauração 11"><rect id="96f42008-4f45-408e-8df3-f225b1f2155c" data-name="vestibular" fill={vestibular} x="29.1" y="118.5" width="13.8" height="32.8" rx="2.8" ry="2.8" transform="translate(72 269.8) rotate(180)"  /><path id="ebab72ff-fac0-45a5-bd01-24b53d5b4ead" data-name="distal" fill={distal} d="M23.3,119.9a1.8,1.8,0,0,0-.5-.7,2.6,2.6,0,0,0-1.5-.7c-2.6,7.9-5.4,18.8-3.7,22.9a56.5,56.5,0,0,0,5,9.4,2.5,2.5,0,0,0,1-1.5,2.2,2.2,0,0,0,.1-.8V139A53,53,0,0,1,23.3,119.9Z"  /><path id="021e6724-d952-4704-a2de-be64d91ce745" data-name="mesial" fill={mesial} d="M48.5,120a2.8,2.8,0,0,0-.3,1.3v27.2a3.2,3.2,0,0,0,.3,1.4,48.3,48.3,0,0,0,4.4-7.9C55.3,136.5,51.2,127.2,48.5,120Z"  /></g></g></svg>
				);
				break;
			case '12':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="7156eeb0-0956-49a7-9d50-f63ca7e854d5" data-name="Procedimentos - 12"><g id="f7d7be05-0b1e-4632-b045-b1d752b9b327" data-name="Restauração 12"><rect id="aebb5d24-52fa-48b9-abeb-2029f5773f56" data-name="vestibular" fill={vestibular} x="25.8" y="115.5" width="13.8" height="32.8" rx="2.8" ry="2.8" transform="translate(65.4 263.8) rotate(180)"  /><path id="b6d15c07-24bd-4993-a8de-7de7e3082444" data-name="distal" fill={distal} d="M20.5,117.3l-.6-.2c-2.8,9.8-6,27.7-4,31.2a8.1,8.1,0,0,0,1.9,1.4h1.1a2.8,2.8,0,0,0,2.8-2.8V119.7A3,3,0,0,0,20.5,117.3Z"  /><path id="ac411eec-1660-4624-9fbc-cbc2abf5e4b9" data-name="mesial" fill={mesial} d="M45.4,116.1a2.6,2.6,0,0,0-1.9,2.3v.2l-.4,27.3a2.8,2.8,0,0,0,2.7,2.8h1.6a7.2,7.2,0,0,0,.8-3C48.8,137.3,47.3,124.8,45.4,116.1Z"  /></g></g></svg>
				);
				break;
			case '13':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="a5f72505-4335-4f6d-b047-be8ab81afc7f" data-name="Procedimentos - 13"><g id="a711fb70-c1d8-4012-9825-fd8337296c9b" data-name="Restauração 13"><path id="3b644110-c845-414d-bbe7-869bf6a28fd0" data-name="mesial" fill={mesial} d="M46.9,151.2c2.1-1.7,5.8-4.9,6.3-8,1.2-6.5-3.6-15.1-6.8-23.4A81.4,81.4,0,0,1,46.9,151.2Z"  /><path id="399f8dbd-ae1f-4a83-9d17-b10adac45980" data-name="distal" fill={distal} d="M23,151.4c-2.1-1.7-5.1-3.8-6.1-6.7-2.1-6.1,1.5-15.7,4.7-24.1C19,133.7,21.5,142.9,23,151.4Z"  /><rect id="ff42911a-f43e-47ff-a8a9-17deb5e8a120" data-name="vestibular" fill={vestibular} x="28" y="119.8" width="13.8" height="32.8" rx="2.8" ry="2.8" transform="translate(69.7 272.3) rotate(180)"  /></g></g></svg>
				);
				break;
			case '14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b402348d-f164-4e7d-a791-2b0a14439e23" data-name="Procedimentos - 14"><g id="b4fe6e1f-141e-437f-b5d3-ccc130d0bde7" data-name="Restauração 14"><path id="e6487911-2316-48ae-9077-959ef221818c" data-name="mesial" fill={mesial} d="M46.4,148.3c2.1-1.7,5.8-5,6.3-8,1.1-6.5-4.2-14.6-7.4-22.9C47.8,130.4,47.9,139.7,46.4,148.3Z"  /><path id="d1e677c4-a716-4ba3-a5d9-0c1956536c2f" data-name="distal" fill={distal} d="M22.1,150.3c-2-1.8-5.1-3.9-6.1-6.8-2-6.1,2-15.1,5.2-23.5C18.6,133,20.7,141.7,22.1,150.3Z"  /><rect id="aed7ba66-bd8f-4eaa-bd66-ef3bed7bb0f8" data-name="vestibular" fill={vestibular} x="28.5" y="119" width="13.8" height="32.8" rx="2.8" ry="2.8" transform="translate(70.9 270.8) rotate(180)"  /></g></g></svg>
				);
				break;
			case '15':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="e0633c14-e8c1-41c7-ae5b-6e7bda8983a7" data-name="Procedimentos - 15"><g id="97fbd229-5abb-4cd2-a279-60e0553ab298" data-name="Restauração 15"><path id="4c6c5822-6402-4ba7-9d39-73a773d5b1b0" data-name="mesial" fill={mesial} d="M45.6,141.6c2.1-1.7,7.3-10.3,7.8-13.3,1.1-6.5-.5-11.8-5.7-18.1C50.3,123.2,47.1,133,45.6,141.6Z"  /><path id="91354dda-62c0-4b87-b4c2-4e01f75013bd" data-name="distal" fill={distal} d="M21.6,140c-2.1-1.7-6.7-6.4-7-9.4-.9-9,3.8-13.9,7-22.3A81.6,81.6,0,0,0,21.6,140Z"  /><rect id="6259fbe3-8a3b-47e4-b573-9324ab10574d" data-name="vestibular" fill={vestibular} x="27.3" y="109.5" width="13.8" height="32.8" rx="2.8" ry="2.8" transform="translate(68.4 251.8) rotate(180)"  /></g></g></svg>
				);
				break;
			case '16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="3aa5f55a-bad0-464d-bfa2-e2836a686e39" data-name="Procedimentos - 16"><g id="8eaa637d-9ace-4909-be15-54315487abee" data-name="Restauração 16"><rect id="ebe36b39-17f3-453e-811f-0b860b8b429f" data-name="distal" fill={distal} x="14.7" y="106.7" width="8.5" height="21.23" rx="3.9" ry="3.9" transform="translate(41.1 0.6) rotate(19.9)"  /><rect id="15b68042-d2cb-45ff-8fb2-591bfadc70a9" data-name="distal" fill={distal} x="46.7" y="107.3" width="8.5" height="21.23" rx="3.9" ry="3.9" transform="translate(128.8 220) rotate(166.1)"  /><rect id="497d7742-16b3-486f-8bfe-58867285c062" data-name="vestibular" fill={vestibular} x="29.7" y="107.7" width="11.7" height="21.03" rx="3.9" ry="3.9" transform="translate(71 236.4) rotate(180)"  /><path d="M38.8,139.4c-2.2-1.4-3.1-4.6-3.4-6.4H35c-.8,7-11.7,14.3-19.5,5a15.4,15.4,0,0,1-1.9-2.8,2.2,2.2,0,0,0-.5,1.1c2.4,4.3,5.9,7,9.5,7.1,11.1,0,12.7-8.1,12.7-8.1s1,5.8,7.9,7.2,12.3-.2,14.8-5.5l-.3-1.2C55.9,140.7,47.9,145.2,38.8,139.4Z" data-name="oclusal" fill={oclusal}  /><path d="M35,133s-10.7,14.9-19.6.4a4.5,4.5,0,0,0-1.8,1.8,15.4,15.4,0,0,0,1.9,2.8C23.3,147.3,34.2,140,35,133Z" data-name="oclusal" fill={oclusal} /><path d="M35.4,133c.3,1.8,1.2,5,3.4,6.4,9.1,5.8,17.1,1.3,18.9-3.6a5.2,5.2,0,0,0-2.1-2.3C47.1,146.5,35.4,133,35.4,133Z" data-name="oclusal" fill={oclusal} /></g></g></svg>
				);
				break;
			case '17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="23479cf8-a332-4014-9418-b403c4e452c4" data-name="Procedimentos - 17"><g id="9b7a427b-b5bb-44dc-b6e4-fb09cde2f629" data-name="Restauração 17"><rect id="c63047f2-2285-4600-85ef-4d7ada102341" data-name="distal" fill={distal} x="14.4" y="107.7" width="7.8" height="19.41" rx="3.9" ry="3.9" transform="translate(41.1 0.8) rotate(19.9)"  /><rect id="df8afa2a-c28a-4cd8-9719-afa9ec6fe0f5" data-name="mesial" fill={mesial} x="43.7" y="108.2" width="7.8" height="19.41" rx="3.9" ry="3.9" transform="translate(122.2 220.8) rotate(166.1)"  /><rect id="777d96e6-9f64-4475-9b2c-8ee03a26404d" data-name="vestibular" fill={vestibular} x="28.2" y="108.6" width="10.7" height="19.23" rx="3.9" ry="3.9" transform="translate(67 236.4) rotate(180)"  /><path d="M36.4,134.9c-2-1.1-2.7-3.6-3-5.1h-.3c-.7,5.6-10.1,11.4-16.9,4.1a16,16,0,0,1-1.6-2.3l-.5.9c2.1,3.4,5.2,5.6,8.3,5.6,9.5,0,10.9-6.4,10.9-6.4s.9,4.6,6.8,5.7,10.7-.2,12.8-4.4l-.3-.9C51.1,136,44.2,139.5,36.4,134.9Z" data-name="oclusal" fill={oclusal}  /><path d="M33.1,129.8s-9.3,11.9-16.9.4a3.6,3.6,0,0,0-1.6,1.4,16,16,0,0,0,1.6,2.3C23,141.2,32.4,135.4,33.1,129.8Z" data-name="oclusal" fill={oclusal} /><path d="M33.4,129.8c.3,1.5,1,4,3,5.1,7.8,4.6,14.7,1.1,16.2-2.8a3.9,3.9,0,0,0-1.8-1.8C43.5,140.5,33.4,129.8,33.4,129.8Z" data-name="oclusal" fill={oclusal} /></g></g></svg>
				);
				break;
			case '18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="cd164d56-9262-40b5-9958-33893ab4baa7" data-name="Procedimentos - 18"><g id="90aa48ea-f45b-407b-a5c1-903754aeb0af" data-name="Restauracao 18"><rect id="abf71289-caed-4839-b340-70feb1a1f8e9" data-name="mesial" fill={mesial} x="44.1" y="110.8" width="7.8" height="14.58" rx="3.9" ry="3.9" transform="matrix(-1, 0.06, -0.06, -1, 103.31, 232.8)"  /><rect id="02a31ee6-c0c4-4cfe-bab4-eea970ff67a9" data-name="distal" fill={distal} x="18.7" y="110.8" width="7.8" height="14.58" rx="3.9" ry="3.9" transform="translate(28.2 -2) rotate(13.5)"  /><rect id="188ed683-1c68-46bb-8a91-22559185cbfe" data-name="vestibular" fill={vestibular} x="30.2" y="110.8" width="10.7" height="14.58" rx="3.9" ry="3.9" transform="translate(71.2 236.1) rotate(180)"  /><path id="448e7158-611a-46b5-8089-3a02e4d3d030" data-name="oclusal" fill={oclusal} d="M46.5,127.8c0,.2-.1.3-.2.5s-2.1,0-4.3-.7c0,0-16.2,0-17.6,1a3.8,3.8,0,0,0-1.3,2.9v.4c7.8,3.7,17.1,1.8,17.7-.6s5.5-.8,8.1-1.1A3.8,3.8,0,0,0,46.5,127.8Z"  /></g></g></svg>
				);
				break;
			case '21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="78ebf799-f24c-4a26-8f19-0d5f71756bcd" data-name="Procedimentos - 21"><g id="b45cc6ef-7b2f-46ad-a8b0-cf8f65bbb4d1" data-name="Restauração 21"><rect id="df310889-5573-4790-9ca7-d21b1192b941" data-name="vestibular" fill={vestibular} x="28.2" y="118.5" width="13.8" height="32.8" rx="2.8" ry="2.8"  /><path id="94556717-016d-4b07-8945-44793f765c4a" data-name="distal" fill={distal} d="M49.8,118.5a2.6,2.6,0,0,0-1.5.7,1.8,1.8,0,0,0-.5.7,53,53,0,0,1-.4,19.1v9.5a2.2,2.2,0,0,0,.1.8,2.5,2.5,0,0,0,1,1.5,56.5,56.5,0,0,0,5-9.4C55.2,137.3,52.4,126.4,49.8,118.5Z"  /><path id="edf070ba-c06e-43bf-b41b-b23d59eb7e64" data-name="mesial" fill={mesial} d="M22.6,120c-2.7,7.2-6.8,16.5-4.4,22a48.3,48.3,0,0,0,4.3,7.9,2.3,2.3,0,0,0,.4-1.4V121.3A2.8,2.8,0,0,0,22.6,120Z"  /></g></g></svg>
				);
				break;
			case '22':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="2e78803c-de98-4fbc-bd18-f5dc26ea6f11" data-name="Procedimentos - 22"><g id="173596ac-282e-4189-9589-a1d8775e41b5" data-name="Restauração 22"><rect id="400c0d00-fd17-4a89-a1e4-f9af06916d8d" data-name="vestibular" fill={vestibular} x="27.5" y="121.5" width="13.8" height="32.8" rx="2.8" ry="2.8"  /><path id="d57958fe-01ce-4182-8b40-b4fe34b5122d" data-name="distal" fill={distal} d="M47.2,123.1l-.6.2a3,3,0,0,0-1.2,2.4v27.2a2.8,2.8,0,0,0,2.7,2.8h1.2a8.1,8.1,0,0,0,1.9-1.4C53.1,150.8,50,132.9,47.2,123.1Z"  /><path id="f4a9cd60-41e2-48d3-bd1c-2c5dadfc1dcc" data-name="mesial" fill={mesial} d="M23.6,124.6v-.2a2.7,2.7,0,0,0-1.9-2.3c-1.9,8.7-3.4,21.2-2.8,29.6a7.2,7.2,0,0,0,.8,3h1.6a2.8,2.8,0,0,0,2.7-2.8Z"  /></g></g></svg>
				);
				break;
			case '23':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="a7de0e6e-4812-4bc3-9503-a512f9ed4727" data-name="Procedimentos - 23"><g id="5aa1c681-3724-44a6-9ad0-947a57a45a66" data-name="Restauração 23"><path id="171c4fd9-ba56-4c9d-bb28-7ffce5b27d39" data-name="distal" fill={distal} d="M45,145.3c2-1.7,5.1-3.9,6.1-6.8,2-6.1-2-15.1-5.2-23.5C48.5,128.1,46.4,136.7,45,145.3Z"  /><path id="13869a4a-5c5b-4f8b-8682-2d40466e635d" data-name="mesial" fill={mesial} d="M21.2,145.2c-2.1-1.7-5.8-4.9-6.3-8-1.2-6.5,3.6-15.1,6.8-23.4A81.4,81.4,0,0,0,21.2,145.2Z"  /><rect id="8bd50f0e-302a-4ba0-b31b-866fe33f9c1c" data-name="vestibular" fill={vestibular} x="26.3" y="113.8" width="13.8" height="32.8" rx="2.8" ry="2.8"  /></g></g></svg>
				);
				break;
			case '24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="1d48e171-7267-4745-9967-7ec94670ee71" data-name="Procedimentos - 24"><g id="6e9bcc2a-0bf4-44f5-b553-e09dc7b2a7b9" data-name="Restauração 24"><path id="f5098fce-b971-4462-bb5a-dcec4b57c1d7" data-name="mesial" fill={mesial} d="M22.7,148.3c-2.1-1.7-5.8-5-6.3-8-1.1-6.5,4.2-14.6,7.4-22.9C21.2,130.4,21.2,139.7,22.7,148.3Z"  /><path id="61b1a8ee-bb58-4ecd-8fa0-0a858635cb15" data-name="distal" fill={distal} d="M47,150.3c2-1.8,5.1-3.9,6-6.8,2.1-6.1-1.9-15.1-5.1-23.5C50.4,133,48.4,141.7,47,150.3Z"  /><rect id="7acd8bdb-22ef-4820-b40d-06cb3e6354bf" data-name="vestibular" fill={vestibular} x="26.7" y="119" width="13.8" height="32.8" rx="2.8" ry="2.8"  /></g></g></svg>
				);
				break;
			case '25':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="a711cc29-cff9-4097-b70f-fee49732ebb7" data-name="Procedimentos - 25"><g id="1ffcae51-b633-4e2e-a389-29214ed5d6dc" data-name="Restauração 25"><path id="1372e126-e9c3-4b07-9f22-253fb2ca9f37" data-name="mesial" fill={mesial} d="M23.4,143.6c-2-1.7-7.2-10.3-7.7-13.3-1.1-6.5.5-11.8,5.7-18.1C18.8,125.2,22,135,23.4,143.6Z"  /><path id="75d5e97d-e28c-49cb-ab58-1a096cfc3b87" data-name="distal" fill={distal} d="M47.5,142c2.1-1.7,6.7-6.4,7-9.4.9-9-3.8-13.9-7-22.3A81.6,81.6,0,0,1,47.5,142Z"  /><rect id="70a1a8ea-c9b5-409d-a051-aebac07e6433" data-name="vestibular" fill={vestibular} x="28" y="111.5" width="13.8" height="32.8" rx="2.8" ry="2.8"  /></g></g></svg>
				);
				break;
			case '26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="219ea9c3-330d-4855-838d-afddd480aeb8" data-name="Procedimentos - 26"><g id="ef32645c-96ce-47e3-906f-ff97922cc4c9" data-name="Restauração 26"><rect id="577c1db7-21ca-4cc2-979f-2d2de70f179d" data-name="distal" fill={distal} x="47.9" y="106.7" width="8.5" height="21.23" rx="3.9" ry="3.9" transform="translate(141.2 209.8) rotate(160.1)"  /><rect id="2f4154e3-1388-4c08-9035-bcb66e7d9d5b" data-name="mesial" fill={mesial} x="15.9" y="107.3" width="8.5" height="21.23" rx="3.9" ry="3.9" transform="translate(29 -1.4) rotate(13.9)"  /><rect id="bd2df6ac-85c0-4785-b7eb-9ee8925e018e" data-name="vestibular" fill={vestibular} x="29.7" y="107.7" width="11.7" height="21.03" rx="3.9" ry="3.9"  /><path id="47895cd8-ea35-492d-a954-e4fe24c3116b" data-name="oclusal" fill={oclusal} d="M57.5,135.2a4.1,4.1,0,0,0-1.9-1.8c-8.8,14.5-19.5-.4-19.5-.4h-.4s-11.7,13.5-20.2.5a5.2,5.2,0,0,0-2.1,2.3l-.3,1.2c2.5,5.3,8.6,6.9,14.8,5.5s7.9-7.2,7.9-7.2,1.6,8.1,12.7,8.1c3.6-.1,7.1-2.8,9.5-7.1A3.7,3.7,0,0,0,57.5,135.2Z"  /></g></g></svg>
				);
				break;
			case '27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="53abd4d8-0cd7-4ca1-be7f-476149f6a8b8" data-name="Procedimentos - 27"><g id="95b2d583-df13-4998-9e04-55aabc1d70fb" data-name="Restauração 27"><rect id="6e96bca8-8374-41fc-98f8-0caff4b1e760" data-name="distal" fill={distal} x="46.9" y="107.7" width="7.8" height="19.41" rx="3.9" ry="3.9" transform="translate(138.5 210.4) rotate(160.1)"  /><rect id="4804052c-f73f-45f4-b1b6-6e15e015f2c8" data-name="mesial" fill={mesial} x="17.6" y="108.2" width="7.8" height="19.41" rx="3.9" ry="3.9" transform="translate(29 -1.7) rotate(13.9)"  /><rect id="83484ae1-bae2-4298-abc1-d32774ec3a0f" data-name="vestibular" fill={vestibular} x="30.2" y="108.6" width="10.7" height="19.23" rx="3.9" ry="3.9"  /><path id="bd61a500-214d-49a5-9a92-eac090eb3900" data-name="oclusal" fill={oclusal} d="M54.5,131.6a4.3,4.3,0,0,0-1.6-1.4c-7.7,11.5-16.9-.4-16.9-.4h-.3s-10.1,10.7-17.4.5a3.9,3.9,0,0,0-1.8,1.8l-.3.9c2.1,4.2,7.5,5.5,12.8,4.4s6.8-5.7,6.8-5.7,1.3,6.4,10.9,6.4c3.1,0,6.2-2.2,8.2-5.6A3.6,3.6,0,0,0,54.5,131.6Z"  /></g></g></svg>
				);
				break;
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="ad65f63b-643c-406d-823a-593dfb5bc7aa" data-name="Procedimentos - 28"><g id="3005ff34-521b-46d1-8602-ef30e690c395" data-name="Restauração 28"><rect id="690ff1ac-3c89-41cb-a884-e1245f9efc4b" data-name="mesial" fill={mesial} x="19.3" y="110.8" width="7.8" height="14.58" rx="3.9" ry="3.9" transform="translate(7.6 -1.2) rotate(3.7)"  /><rect id="3b68cdb2-1369-406e-b422-17f6bb46ebf0" data-name="distal" fill={distal} x="44.6" y="110.8" width="7.8" height="14.58" rx="3.9" ry="3.9" transform="translate(123.2 221.5) rotate(166.5)"  /><rect id="8351ba8b-4c18-4906-9ba7-bfabac7fb721" data-name="vestibular" fill={vestibular} x="30.1" y="110.8" width="10.7" height="14.58" rx="3.9" ry="3.9"  /><path d="M22.1,130.2c2.7.3,7.8-.3,8.2,1.1s9.9,4.3,17.7.6v-.4a3.8,3.8,0,0,0-1.3-2.9c-1.5-1-17.6-1-17.6-1-2.2.7-3.6,2.1-4.3.7s-.2-.3-.2-.5A4,4,0,0,0,22.1,130.2Z" data-name="oclusal" fill={oclusal} /></g></g></svg>
				);
				break;
			case '31':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="3eddde99-4b22-4b45-b82f-5c69b3827677" data-name="Procedimentos - 31"><g id="8e367312-5815-40ff-a8e5-c83ad0f65701" data-name="Restauração 41"><rect id="886b5856-d189-4ae1-97ef-c2fde5d636d8" data-name="vestibular" fill={vestibular} x="29.1" y="19.9" width="11.6" height="27.95" rx="2.8" ry="2.8" transform="translate(69.8 67.8) rotate(-180)"  /><path id="19de2d9f-1182-4043-be93-23660b5c2d7b" data-name="distal" fill={distal} d="M43,44.9s.3-24.2.9-24.4a2.6,2.6,0,0,1,1.9-.8h2.5c-.7,8.2-2,20.6-2.8,27.9A3.1,3.1,0,0,1,43,44.9Z"  /><path id="49afafce-9a6f-4694-a4f7-325052308342" data-name="mesial" fill={mesial} d="M23.7,19.9h.5a2.9,2.9,0,0,1,2.3,2.8V45.1a2.6,2.6,0,0,1-1.4,2.4c-1.1-6.1-2.6-19.2-3.5-27.6Z"  /></g></g></svg>
				);
				break;
			case '32':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="f9223bfc-3edc-4059-93d4-0c2cf304a36f" data-name="Procedimentos - 32"><g id="59fbb274-3089-403c-bef1-aad212e40ef3" data-name="Restauração 32"><rect id="a5e8a94f-97d1-421c-94f5-b5f558388ae9" data-name="vestibular" fill={vestibular} x="29" y="20" width="11.9" height="27.95" rx="2.8" ry="2.8" transform="translate(69.9 68) rotate(-180)"  /><path id="782e1a62-895e-462a-92bf-6f7ef7c2de4d" d="M43.3,45s.3-24.2.9-24.4a2.7,2.7,0,0,1,1.9-.8h2.6c-.7,8.2-2,20.6-2.8,27.9A3,3,0,0,1,43.3,45Z" data-name="distal" fill={distal} /><path id="b24e2cf5-0378-439f-903e-b7e423e4b9d7" data-name="mesial" fill={mesial} d="M23.5,20H24a2.7,2.7,0,0,1,2.3,2.7V45.2a2.8,2.8,0,0,1-1.5,2.5c-1.2-6.1-2.5-19.3-3.4-27.7Z" /></g></g></svg>
				);
				break;
			case '33':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="8b5068a3-76d4-4809-bbcc-cf3ceea0f4a8" data-name="Procedimentos - 33"><g id="0dfcd7e1-0160-430d-9e1b-2cd0eded95ec" data-name="Restauração 43"><path id="d3866187-e908-4623-a53e-726f6681b168" data-name="distal" fill={distal} d="M46.4,20.1a29.6,29.6,0,0,1,6,5.7c.1.2-1.3,11.6-2.7,21.9C50.9,26.2,47.9,28.7,46.4,20.1Z"  /><path id="1c1dbbe8-789f-43ea-891e-f1683955a8f1" data-name="mesial" fill={mesial} d="M28.4,20.7c-2.1,1.8-7.5,9.9-8.8,12.7,0,0,1.9,8.4,4.8,17.6C21.8,37.9,26.9,29.3,28.4,20.7Z"  /><rect id="8576a4aa-a01c-4e87-a2ef-a06de6b1be2e" data-name="vestibular" fill={vestibular} x="30.6" y="21" width="11.9" height="27.95" rx="2.8" ry="2.8" transform="translate(73.1 69.9) rotate(-180)"  /></g></g></svg>
				);
				break;
			case '34':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="9ad36e80-ba10-4acc-822b-ed91469c53b0" data-name="Procedimentos - 34"><g id="79003b0f-c3b8-4b55-8269-5c6eda6f9a6f" data-name="Restrauração 34"><path id="f617181a-110d-49a4-be64-02c1cbb53625" data-name="distal" fill={distal} d="M46.5,21.2c1.6,2.1,4.7,9,6,11.8s-1.3,9.3-4.7,17.6C50.4,37.5,48,29.8,46.5,21.2Z"  /><path id="3a0e9726-e8d5-4871-8e94-2f8ae1e58b51" data-name="mesial" fill={mesial} d="M23.5,21.2c-2.5,1.3-5.9,4.3-7.1,7.1s1.3,12.4,4.7,20.6C19,35.6,22,29.8,23.5,21.2Z"  /><rect id="4c1b9e73-54e2-403e-b2b3-5c57347b0ccb" data-name="vestibular" fill={vestibular} x="28.5" y="21" width="11.9" height="27.95" rx="2.8" ry="2.8" transform="translate(68.9 69.9) rotate(-180)"  /></g></g></svg>
				);
				break;
			case '35':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="68a2d058-6b2e-4db4-bc61-50b0011509d5" data-name="Procedimentos - 35"><g id="54456176-08c1-48ad-a54c-d16ffa10e319" data-name="Restauração 35"><path id="924b4627-3cc3-409c-944f-7f2cdda99b83" data-name="distal" fill={distal} d="M46.5,20.8a19.5,19.5,0,0,1,5.1,6.7c1.5,3.2-2,14.8-5.2,23.2C49,37.7,47.9,29.4,46.5,20.8Z"  /><path id="655fd154-6e14-47b4-808e-b5837359c9b7" data-name="mesial" fill={mesial} d="M23.1,21.4a24.9,24.9,0,0,0-5.8,7.9c-1.5,3.2,2.8,14,6,22.4A78.8,78.8,0,0,1,23.1,21.4Z"  /><rect id="0ac26791-1867-4604-bc91-1af0ad240be6" data-name="vestibular" fill={vestibular} x="28.8" y="21.7" width="11.9" height="27.95" rx="2.8" ry="2.8" transform="translate(69.5 71.3) rotate(-180)"  /></g></g></svg>
				);
				break;
			case '36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="9b65d6f7-49d4-4587-9790-f65b05a3048e" data-name="Procedimentos - 36"><g id="a83271ea-0ce4-464e-ab9b-5da48a4746bf" data-name="Restauração 36"><rect id="722590f2-3e11-48d0-9067-c7b0f51a9720" data-name="vestibular" fill={vestibular} x="24.2" y="40.3" width="22.7" height="11.82" rx="3.9" ry="3.9" transform="translate(71 92.4) rotate(-180)"  /><rect id="813e01b0-31f4-4d5d-87bb-12f5678172fe" data-name="distal" fill={distal} x="52.1" y="40.3" width="6.3" height="11.82" rx="2.8" ry="2.8" transform="translate(92 108.1) rotate(-160.6)"  /><rect id="81a0c90c-443e-4004-a972-f5cd521951cd" data-name="mesial" fill={mesial} x="12.5" y="40.3" width="6.3" height="11.82" rx="2.8" ry="2.8" transform="translate(-14.5 7.8) rotate(-19.4)"  /><path id="7228c0bd-08e9-4fdf-b11b-ce63d8dfc039" data-name="oclusal" fill={oclusal} d="M52.2,33.9h-.8c-2.3-1.1-5.5-2.4-7.1-1.9a15.5,15.5,0,0,0-3.9,1.9H23.6l4.3-2s1.7-.4-4.7,0a16,16,0,0,0-6.1,1.5A3.6,3.6,0,0,1,16,32c4-2.4,9-4,11.1-4,4.4,0,10.8,3,13.2,2.6s3.8-4,7.3-3.2c1.2.2,4.5,2.3,7.4,4.7A3.1,3.1,0,0,1,52.2,33.9Z"  /></g></g></svg>
				);
				break;
			case '37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="73b2915f-516d-4675-868d-05acbaed5624" data-name="Procedimentos - 37"><g id="e5adb88b-2984-453d-bf3e-5a9f8fc7abe8" data-name="Restauração - 37"><rect id="6d9b3fd6-981c-4003-829b-315f6aa71a13" data-name="vestibular" fill={vestibular} x="23.9" y="42.9" width="20" height="12.55" rx="3.9" ry="3.9" transform="translate(67.8 98.3) rotate(-180)"  /><rect id="03967bc7-bba3-4586-b01d-bdf90979efa2" data-name="distal" fill={distal} x="51.7" y="42.9" width="6.7" height="12.55" rx="3.3" ry="3.3" transform="translate(90.6 113.8) rotate(-160.6)"  /><rect id="e57e47c3-3d78-4254-92f8-49a152ba6db2" data-name="mesial" fill={mesial} x="11.5" y="42.9" width="6.7" height="12.55" rx="3.3" ry="3.3" transform="translate(-15.5 7.8) rotate(-19.4)"  /><path id="2765357c-db73-42fe-84c5-fe1211875ed0" data-name="oclusal" fill={oclusal} d="M18.3,32.2c4.6-.2,16.8,1.2,16.8,1.2a14.3,14.3,0,0,1,6.6-2c.9,0,9.9,0,12.4,1l2.1,1.2V34a10.2,10.2,0,0,1-1.9,3,3.2,3.2,0,0,1-1.4.3,10.6,10.6,0,0,0-3.5-2.1,20.2,20.2,0,0,0-8.2,0c-3,.6-7.2,2.2-9.1,2-3.6-.3-11.8-2.4-13.8-1l-1.8,1.1h-.2a3.3,3.3,0,0,1-2.8-1.5,3,3,0,0,1-.4-.8A6.8,6.8,0,0,1,18.3,32.2Z"  /></g></g></svg>
				);
				break;
			case '38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="3aafc26c-6a60-4e46-9d5a-e529138ab46f" data-name="Procedimentos - 38"><g id="a5be86f7-df20-4ff5-b0f3-0092371dc2c1" data-name="Restauração - 38"><rect id="e2f01b0e-e21f-4384-9c5e-d09f91159d82" data-name="distal" fill={distal} x="50" y="41" width="7.8" height="14.58" rx="3.9" ry="3.9" transform="translate(88.6 111.8) rotate(-160.6)"  /><rect id="475b8a7d-2766-4802-922f-c6e9e6430d1a" data-name="mesial" fill={mesial} x="10.9" y="41" width="7.8" height="14.58" rx="3.9" ry="3.9" transform="translate(-15.2 7.7) rotate(-19.4)"  /><rect id="1925b68e-f10c-4f26-ad8f-e44cd6f4c25b" data-name="vestibular" fill={vestibular} x="25.1" y="41" width="18.4" height="14.58" rx="3.9" ry="3.9" transform="translate(68.7 96.6) rotate(-180)"  /><g id="4ac359d3-9995-4c08-916e-f371ee296d00" data-name="oclusal" fill={oclusal}><path d="M12.4,32.1c3.6,0,7.7,1.2,9.7,0s6.6-2.5,12.1-.1c1.1.5,4.1.9,5.5.2s1.4-1.3,6.7-1.3c3.7,0,8.7-1.1,11.7-.6.1.2.1.4.2.6v.7h0a3.7,3.7,0,0,1-3.9,3.8H44c0-.1,0-.3.1-.3v-.2c-.6-2.7-5.2-.3-5.1,0v.5c-3.9-.2-6.6-1.4-8.8-1.4a37,37,0,0,0-9.5,1.4H15.8a3.8,3.8,0,0,1-3.7-2.7,1.1,1.1,0,0,1-.1-.5Z"  /><path d="M44.1,35.1l-3.3.3Z"  /></g></g></g></svg>
				);
				break;
			case '41':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="0cca809a-f6ed-4d8a-aaf4-d8a804cb2cde" data-name="Procedimentos - 41"><g id="57f55576-b48f-44a5-8bbe-1382634763ad" data-name="Restauração 41"><rect id="36d8a071-3f36-4fa6-9948-9ccf00b49dae" data-name="vestibular" fill={vestibular} x="29.3" y="19.9" width="11.6" height="27.95" rx="2.8" ry="2.8"  /><path id="aaefe67c-0c70-496e-b60f-be5456955972" data-name="distal" fill={distal} d="M26.9,44.9s-.3-24.2-.9-24.4a2.3,2.3,0,0,0-1.8-.8H21.7c.7,8.2,2,20.6,2.7,27.9A3.1,3.1,0,0,0,26.9,44.9Z"  /><path id="a6f0b717-638b-4dab-b47d-73526b1df820" data-name="mesial" fill={mesial} d="M46.2,19.9h-.4a2.9,2.9,0,0,0-2.3,2.8V45.1a2.6,2.6,0,0,0,1.4,2.4c1.1-6.1,2.5-19.2,3.4-27.6Z"  /></g></g></svg>
				);
				break;
			case '42':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="588bafeb-76c8-4dd5-8eed-deb5be8c4588" data-name="Procedimentos - 42"><g id="745dae9a-011b-456e-ab02-4a7511a0ca25" data-name="Restauração 42"><rect id="d257674b-6885-4239-a67f-3aa0c4ae0746" data-name="vestibular" fill={vestibular} x="29.1" y="20" width="11.9" height="27.95" rx="2.8" ry="2.8"  /><path id="ad6a4b67-bac4-4e64-b836-9d835195a2a1" data-name="distal" fill={distal} d="M26.6,45s-.3-24.2-.9-24.4a2.6,2.6,0,0,0-1.9-.8H21.2c.8,8.2,2.1,20.6,2.9,27.9A3,3,0,0,0,26.6,45Z"  /><path id="8cbf5fe1-91a7-44a0-8acd-8a6a065a451b" data-name="mesial" fill={mesial} d="M46.4,20H46a2.8,2.8,0,0,0-2.4,2.7V45.2a2.9,2.9,0,0,0,1.6,2.5c1.2-6.1,2.5-19.3,3.4-27.7Z"  /></g></g></svg>
				);
				break;
			case '43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="2a37639c-a758-430e-9c0b-af507fa2b209" data-name="Procedimentos - 43"><g id="8440c701-b96c-45b4-ab31-191dca6ce0c6" data-name="Restauração 43"><path id="0714228b-b124-410f-9256-0ab24002523c" data-name="distal" fill={distal} d="M24.5,20.1a31.9,31.9,0,0,0-5.9,5.7c-.1.2,1.3,11.6,2.6,21.9C20.1,26.2,23.1,28.7,24.5,20.1Z"  /><path id="f2875a00-0e9e-42b0-9023-4ae91a1b77d0" data-name="mesial" fill={mesial} d="M42.6,20.7c2,1.8,7.4,9.9,8.7,12.7,0,0-1.8,8.4-4.7,17.6C49.2,37.9,44,29.3,42.6,20.7Z"  /><rect id="9d99885a-dc04-46aa-b556-09a43a98f4ca" data-name="vestibular" fill={vestibular} x="28.5" y="21" width="11.9" height="27.95" rx="2.8" ry="2.8"  /></g></g></svg>
				);
				break;
			case '44':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b5b1acae-9f79-4b7b-8be8-cde6df2b143c" data-name="Procedimentos - 44"><g id="23f249b4-3855-48f5-aca8-62150c06d2b0" data-name="Restrauração 44"><path id="a55e9382-5716-484c-ade2-da7247eee8af" data-name="distal" fill={distal} d="M23,21.2c-1.6,2.1-4.7,9-6,11.8s1.3,9.3,4.7,17.6C19.1,37.5,21.5,29.8,23,21.2Z"  /><path id="a9176cd9-95ef-4a90-9d6e-4d41e8961f2b" data-name="mesial" fill={mesial} d="M46,21.2c2.4,1.3,5.9,4.3,7.1,7.1s-1.3,12.4-4.7,20.6C50.4,35.6,47.4,29.8,46,21.2Z"  /><rect id="9e59e85d-9d51-46d7-9709-b4d08b4baebb" data-name="vestibular" fill={vestibular} x="29.1" y="21" width="11.9" height="27.95" rx="2.8" ry="2.8"  /></g></g></svg>
				);
				break;
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="d1f04e04-e790-4bfe-96e1-aad647eecf82" data-name="Procedimentos - 45"><g id="677ec78c-4587-4217-9adf-d65644ec3ea7" data-name="Restauração 45"><path id="e80ab79c-8617-45c9-941d-0829f95aa6f6" data-name="distal" fill={distal} d="M23,20.8a18.6,18.6,0,0,0-5.2,6.7c-1.4,3.2,2.1,14.8,5.2,23.2C20.5,37.7,21.5,29.4,23,20.8Z"  /><path id="a7095f62-3db3-47b0-808c-5efe402e25cf" data-name="mesial" fill={mesial} d="M46.3,21.4a25.2,25.2,0,0,1,5.9,7.9c1.5,3.2-2.9,14-6.1,22.4A75,75,0,0,0,46.3,21.4Z"  /><rect id="84b31c9c-7fc4-4577-bebe-1220beb2c9e1" data-name="vestibular" fill={vestibular} x="28.8" y="21.7" width="11.9" height="27.95" rx="2.8" ry="2.8"  /></g></g></svg>
				);
				break;
			case '46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="a1ffdff3-3fa0-4464-8979-26d34701004c" data-name="Procedimentos - 46"><g id="b7d94ba9-1b22-4e29-8942-d602619be963" data-name="Restauração 46"><rect id="ba8324b5-9918-4011-afdb-25529140a297" data-name="vestibular" fill={vestibular} x="23.6" y="40.3" width="22.7" height="11.82" rx="3.9" ry="3.9"  /><rect id="7cb1c6a9-97b3-4760-9862-062b41513c7c" data-name="distal" fill={distal} x="12" y="40.3" width="6.3" height="11.82" rx="2.8" ry="2.8" transform="translate(-14.5 7.7) rotate(-19.4)"  /><rect id="fedffc7a-26ca-4edd-bf97-0f1783749f1b" data-name="mesial" fill={mesial} x="51.7" y="40.3" width="6.3" height="11.82" rx="2.8" ry="2.8" transform="translate(91.2 108) rotate(-160.6)"  /><path id="c21c7d9c-ce37-42d4-a435-1eff55214396" data-name="oclusal" fill={oclusal} d="M18.3,33.9h.8c2.2-1.1,5.5-2.4,7.1-1.9a17.3,17.3,0,0,1,3.9,1.9H46.9l-4.3-2s-1.8-.4,4.6,0a16.6,16.6,0,0,1,6.2,1.5A3.6,3.6,0,0,0,54.5,32c-4-2.4-9-4-11.1-4-4.4,0-10.9,3-13.2,2.6s-3.8-4-7.4-3.2c-1.1.2-4.4,2.3-7.4,4.7A3.1,3.1,0,0,0,18.3,33.9Z"  /></g></g></svg>
				);
				break;
			case '47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="8c3b20d0-96fd-45b6-b0d7-573be366c803" data-name="Procedimentos - 47"><g id="d35c5473-6f98-4a9a-84e8-6cf01c17bbca" data-name="Restauração - 47"><path id="8cd8e26f-f396-45e6-8767-b0354ccbf79e" data-name="oclusal" fill={oclusal} d="M52.7,32.2c-4.6-.2-16.8,1.2-16.8,1.2a14.4,14.4,0,0,0-6.7-2c-.9,0-9.8,0-12.4,1l-2.1,1.2V34a12.8,12.8,0,0,0,1.9,3,3.7,3.7,0,0,0,1.5.3,10.6,10.6,0,0,1,3.5-2.1,20.2,20.2,0,0,1,8.2,0c2.9.6,7.1,2.2,9.1,2,3.5-.3,11.7-2.4,13.8-1l1.8,1.1h.2a3.3,3.3,0,0,0,2.8-1.5c.1-.3.3-.5.3-.8A6.6,6.6,0,0,0,52.7,32.2Z"  /><rect id="f836b1cb-6614-4426-b358-28d3f9063674" data-name="vestibular" fill={vestibular} x="27.1" y="42.9" width="20" height="12.55" rx="3.9" ry="3.9"  /><rect id="2400682f-4884-4f77-9a2f-befb2dacba11" data-name="distal" fill={distal} x="12.6" y="42.9" width="6.7" height="12.55" rx="3.3" ry="3.3" transform="translate(-15.5 8.1) rotate(-19.4)"  /><rect id="c107e41a-1fb5-4bd7-9f88-d1f9d7465dd3" data-name="mesial" fill={mesial} x="52.7" y="42.9" width="6.7" height="12.55" rx="3.3" ry="3.3" transform="translate(92.6 114.2) rotate(-160.6)"  /></g></g></svg>
				);
				break;
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="f870b248-552f-4a00-ace6-a3843e59fde8" data-name="Procedimentos - 48"><g id="24d1ca3a-4b8b-4756-9237-ff5835c1a090" data-name="Restauração - 48"><rect id="f4bf4f9c-bec5-4098-bfb8-da959aca0325" data-name="distal" fill={distal} x="12.2" y="41" width="7.8" height="14.58" rx="3.9" ry="3.9" transform="translate(-15.2 8.1) rotate(-19.4)"  /><rect id="d3464706-cb61-474f-a321-654f26e356df" data-name="mesial" fill={mesial} x="51.3" y="41" width="7.8" height="14.58" rx="3.9" ry="3.9" transform="translate(91.1 112.2) rotate(-160.6)"  /><rect id="6e344187-86ed-484e-a9ff-0b7b795f522a" data-name="vestibular" fill={vestibular} x="26.4" y="41" width="18.4" height="14.58" rx="3.9" ry="3.9"  /><g id="fc9a9578-47c8-4bbb-9873-dd486969c101" data-name="oclusal" fill={oclusal}><path d="M57.5,32.1c-3.5,0-7.6,1.2-9.7,0s-6.6-2.5-12-.1c-1.2.5-4.2.9-5.5.2s-1.4-1.3-6.8-1.3c-3.6,0-8.6-1.1-11.6-.6a1.4,1.4,0,0,0-.2.6c0,.2-.1.4-.1.7h0A4,4,0,0,0,13,34.5a3.7,3.7,0,0,0,2.5.9H25.9v-.5c.6-2.7,5.2-.3,5.1,0a1.3,1.3,0,0,1-.1.5c3.9-.2,6.6-1.4,8.8-1.4a37.8,37.8,0,0,1,9.6,1.4h4.9a3.9,3.9,0,0,0,3.7-2.7,4.3,4.3,0,0,1,.1-.5Z"  /><path d="M25.9,35.1l3.2.3Z"  /></g></g></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getCoreSvg = (icon, color) => {
		switch(icon) {
			case '11':
			case '13':
			case '14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="eacf9e18-2249-4688-b4d9-fae15e5a3a66" data-name="Pino"><path id="d72cd57f-b4de-4912-b181-82014d464b7b" data-name="Pino 15-25" d="M30.1,102h6.2s1.7.1,1.7-3.1S36.8,73,36.8,73a8.4,8.4,0,0,0-3.3-6.8,10.1,10.1,0,0,0-3.6,7.1c-.7,7.3-1,18.8-.9,25.6C29.1,101.6,29.7,101.6,30.1,102Z" fill={color}/></g></svg>
				);
				break;
			case '12':
			case '15':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="13f2a1a3-6102-46f2-81d9-fbf2005f6765" data-name="Pino"><path id="4d62125c-8e58-45e4-ba00-f4e712474100" data-name="Pino 15-25" d="M30.6,101.6l6.1.5s1.8.3,2-2.9,1-25.9,1-25.9a8.2,8.2,0,0,0-2.7-7A10.3,10.3,0,0,0,32.8,73c-1.3,7.3-2.6,18.7-3,25.4C29.6,101.2,30.2,101.3,30.6,101.6Z" fill={color}/></g></svg>
				);
				break;
			case '16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M22.4,99.8c1.8-31.9,9.1-42.2,8.9-40S30.7,79.5,33,79.9,39.4,58,39.4,58s-.7,22.5.2,22.6c4.5.4,7.7-20.5,7.7-20.5,2.3,5.1,1.1,43.1-.2,43.1H23.9C22.4,103.2,22.3,100.6,22.4,99.8Z" fill={color}/></svg>
				);
				break;
			case '17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M28.3,70.5c-2.5,4.8-1.8,10-2.7,22.1a68.9,68.9,0,0,0,.1,9.1h23c3-13.7,2-46,1-42.2S47,64.8,46.5,67c-1.3,6.3-3.7,16.1-5.2,18.4a77.6,77.6,0,0,1-7.7,10.1,105.6,105.6,0,0,1-2.5-16.1c-.1-1.1,0-11,.7-13.9A45.2,45.2,0,0,0,28.3,70.5Z" fill="#fff" opacity="0.4"/><path d="M23.3,99.8c1.7-31.9,9.1-42.2,8.8-40s-1.2,23,1,23.5,4.1-12.7,4.1-12.7-.1,13.2.8,13.3c4.4.5,10.2-23.8,10.2-23.8,2.3,5.1-1.7,43.1-3.4,43.1h-20C23.3,103.2,23.2,100.6,23.3,99.8Z" fill={color}/></svg>
				);
				break;
			case '18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M27,102.5c6.3-29.8,19.5-53.2,19.3-51.1-2,17.5-1.8,35.7,1.4,50,.8,3.4-1,4.2-1.5,4.2l-17.7.3C27,105.9,26.8,103.3,27,102.5Z" fill={color}/></svg>
				);
				break;
			case '21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M31.1,102h6.2s1.7.1,1.7-3.1S37.8,73,37.8,73a8.4,8.4,0,0,0-3.3-6.8,10.1,10.1,0,0,0-3.6,7.1c-.7,7.3-1,18.8-.9,25.6C30.1,101.6,30.7,101.6,31.1,102Z" fill={color}/></svg>
				);
				break;
			case '22':
			case '25':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="61b01c55-f971-4ad0-b8c7-0d6c525cad3b" data-name="Pino"><path id="4ca3fac0-ea4a-4fee-934b-23a1a0085220" data-name="Pino 15-25" d="M28.3,102.2l6.1-.4s1.8-.1,1.6-3.2-2.9-25.8-2.9-25.8a8.4,8.4,0,0,0-3.8-6.6,10.4,10.4,0,0,0-3.1,7.3c-.2,7.4.2,18.9.8,25.6C27.3,101.9,27.9,101.9,28.3,102.2Z" fill={color}/></g></svg>
				);
				break;
			case '23':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b5579389-12db-4eef-8e34-b89fe3d97e61" data-name="Pino"><path id="7a633171-f975-487a-8c42-67da5742d16d" data-name="Pino 15-25" d="M29.1,100h6.2s1.7.1,1.7-3.1S35.8,71,35.8,71a8.4,8.4,0,0,0-3.3-6.8,10.1,10.1,0,0,0-3.6,7.1c-.7,7.3-1,18.8-.9,25.6C28.1,99.6,28.7,99.6,29.1,100Z" fill={color}/></g></svg>
				);
				break;
			case '24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="fc58af37-2ca8-42d4-b8b1-e5dec4c07cf7" data-name="Pino"><path id="490e3218-57ed-454b-85aa-2a1a6da6d23f" data-name="Pino 15-25" d="M30.1,100h6.2s1.7.1,1.7-3.1S36.8,71,36.8,71a8.4,8.4,0,0,0-3.3-6.8,10.1,10.1,0,0,0-3.6,7.1c-.7,7.3-1,18.8-.9,25.6C29.1,99.6,29.7,99.6,30.1,100Z" fill={color}/></g></svg>
				);
				break;
			case '26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M47.2,99.8c-1.8-31.9-9.2-42.2-8.9-40s.5,19.7-1.7,20.1S30.1,58,30.1,58s.7,22.5-.2,22.6c-4.4.4-7.7-20.5-7.7-20.5-2.3,5.1-1,43.1.2,43.1H45.7C47.2,103.2,47.2,100.6,47.2,99.8Z" fill={color}/></svg>
				);
				break;
			case '27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M44.2,70.5c2.5,4.8,1.8,10,2.7,22.1a80,80,0,0,1,0,9.1H23.8c-2.9-13.7-2-46-1-42.2S25.6,64.8,26,67c1.4,6.3,3.8,16.1,5.2,18.4A84.3,84.3,0,0,0,39,95.5a113.5,113.5,0,0,0,2.4-16.1c.1-1.1.1-11-.6-13.9A48.7,48.7,0,0,1,44.2,70.5Z" fill="#fff" opacity="0.4"/><path d="M46.3,99.8c-1.8-31.9-9.2-42.2-8.9-40s1.3,23-1,23.5-4.1-12.7-4.1-12.7.2,13.2-.7,13.3c-4.4.5-10.3-23.8-10.3-23.8-2.3,5.1,1.7,43.1,3.5,43.1h20C46.3,103.2,46.3,100.6,46.3,99.8Z" fill={color}/></svg>
				);
				break;
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M44.6,102.5C38.2,72.7,25,49.3,25.2,51.4c2,17.5,1.8,35.7-1.4,50-.7,3.4,1.1,4.2,1.5,4.2l17.8.3C44.6,105.9,44.7,103.3,44.6,102.5Z" fill={color}/></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M41.9,61l-10.1.6s-1.8.1-1.4,3.2,4,25.7,4,25.7a8,8,0,0,0,4.1,6.3,10.5,10.5,0,0,0,2.8-7.4C41.1,82,42.3,61.3,41.9,61Z" fill={color}/></svg>
				);
				break;
			case '36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M19,64.1l.6,30.3a1.4,1.4,0,0,0,2.7.4s3.2-13.1,5.6-18.6c.9-2.2,7.9-3.2,9,0,2.4,6.9,3.8,15.5,5.4,20.9a1.4,1.4,0,0,0,2.6.1c.7-1.8,1.8-10.3,2-12.6.6-6.9,1-13.3,1.1-20.6a1.4,1.4,0,0,0-1.4-1.4H20.4A1.4,1.4,0,0,0,19,64.1Z" fill={color}/></svg>
				);
				break;
			case '37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M17.5,90.2a1.4,1.4,0,0,0,2.5,1S35,74.4,35.2,75.7c1.1,8.6,3,17.4,3.3,23.1a1.4,1.4,0,0,0,2.5.6,28,28,0,0,0,3.1-5.7c2.2-6.6,6.9-31,6.1-31.1H19.3Z" fill={color}/></svg>
				);
				break;
			case '38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M19.3,64.7l2.9,31a1.4,1.4,0,0,0,2.7.3l6.9-19.7a1.4,1.4,0,0,1,2.6.1c2.1,6.9,5.4,17.3,7,22.7a1.4,1.4,0,0,0,2.6.1,26.1,26.1,0,0,0,1.6-6.4c.6-6.9,2.6-20.9,2.7-28.2A1.4,1.4,0,0,0,47,63.2H20.7A1.5,1.5,0,0,0,19.3,64.7Z" fill={color}/></svg>
				);
				break;
			case '41':
			case '42':
			case '43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="3b1e0ad8-45d1-4d76-8a00-47decbd2c5c4" data-name="Pino"><path id="c431ab4d-7188-4b26-9858-9e41a21fbb08" data-name="Pino 15-25" d="M34.9,63.2H28.7S27,63.1,27,66.3s1.2,25.9,1.2,25.9A8.4,8.4,0,0,0,31.5,99a10.4,10.4,0,0,0,3.6-7.1c.7-7.3,1-18.8.9-25.6C35.9,63.6,35.3,63.5,34.9,63.2Z" fill={color}/></g></svg>
				);
				break;
			case '44':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="5004d1fb-e4bf-4be5-8f9c-fcde0e1ce4a7" data-name="Pino"><path id="7320fe16-876a-4489-bcf1-0cccc118cfca" data-name="Pino 15-25" d="M36.9,63.2H30.7S29,63.1,29,66.3s1.2,25.9,1.2,25.9A8.4,8.4,0,0,0,33.5,99a10.4,10.4,0,0,0,3.6-7.1c.7-7.3,1-18.8.9-25.6C37.9,63.6,37.3,63.5,36.9,63.2Z" fill={color}/></g></svg>
				);
				break;
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M38.2,63.9l-8.1-1s-1.7-.3-2.1,2.9-.2,26-.2,26a8.1,8.1,0,0,0,2.4,7.1,10.5,10.5,0,0,0,4.5-6.5c1.6-7.2,3.4-18.6,4.1-25.3C39.1,64.4,38.5,64.3,38.2,63.9Z" fill={color}/></svg>
				);
				break;
			case '46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M51.3,66.7l-.6,30.4a1.3,1.3,0,0,1-2.6.3s-3.3-13.1-5.7-18.6c-.9-2.1-7.9-3.2-9,.1C31,85.8,29.7,94.4,28,99.8a1.4,1.4,0,0,1-2.6,0,116.6,116.6,0,0,1-2-12.5c-.6-6.9-1-13.4-1.1-20.7a1.4,1.4,0,0,1,1.4-1.4H50A1.3,1.3,0,0,1,51.3,66.7Z" fill={color}/></svg>
				);
				break;
			case '47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M49.3,64.2l5,27.2a1.4,1.4,0,0,1-2.5.9S36.7,74.9,36.6,76.2c-.4,7.3-1.1,18.2-1.4,23.8a1.4,1.4,0,0,1-2.5.7,24.4,24.4,0,0,1-3-5.8c-2.3-6.6-7.3-23.1-9.1-30.2a1.3,1.3,0,0,1,1-1.6h26A1.4,1.4,0,0,1,49.3,64.2Z" fill={color}/></svg>
				);
				break;
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M50.5,63.1l-2.9,31a1.3,1.3,0,0,1-2.6.3L38,74.7a1.4,1.4,0,0,0-2.6.1c-2.1,6.9-5.4,17.3-7,22.7a1.4,1.4,0,0,1-2.6.1,31.6,31.6,0,0,1-1.6-6.4c-.6-6.9-2.6-20.9-2.7-28.2a1.4,1.4,0,0,1,1.4-1.4H49.1A1.4,1.4,0,0,1,50.5,63.1Z" fill={color}/></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getConemorseSvg = (icon) => {
		switch(icon) {
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '21':
			case '22':
			case '23':
			case '24':
			case '25':
			case '16':
			case '17':
			case '18':
			case '26':
			case '27':
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="dbf5c1e6-e1bc-4668-8278-dae25f924c7f" data-name="Incisivo"><path d="M19.4,98.1H50.8L49.3,52,43.5,27.1c0-2-3.8-3.6-8.6-3.6s-8.6,1.6-8.6,3.6L21,55.3Z" fill="#999"/><path d="M34.9,22.7c5.1,0,9.1,1.8,9.1,4.2s3.9,16.6,5.8,24.8h0l1.5,46.7H18.7L20.3,55c1.8-9.4,5.2-27.2,5.4-28.1S29.7,22.7,34.9,22.7ZM48.6,51.9c-5.7-24.8-5.7-24.9-5.7-25s-3.3-2.9-8-2.9-8.1,1.5-8.1,2.9,0,.3-5.3,28.3L19.9,97.3H50.1Z" fill="#4d4d4d"/><polygon points="15.9 66.8 19.3 63.4 50.5 61.5 53.4 64.6 15.9 66.8" fill="#b3b3b3"/><polygon points="53.8 64.4 50.3 67.9 19.2 69.8 16.3 66.6 53.8 64.4" fill="#e6e6e6"/><line x1="16.7" y1="66.9" x2="53.8" y2="64.4" fill="#fff"/><path d="M18.9,70.2l31.7-1.9,4-3.9-3.7-3.1L19.2,63.2l-3.7,3.4ZM50,67.5,19.4,69.3l-1.8-2L52.5,65ZM19.8,64.1l30.7-1.8,2,1.7L17.3,66.4Z" fill="#4d4d4d"/><polygon points="15.9 74.8 19.3 71.3 50.5 69.5 53.4 72.6 15.9 74.8" fill="#b3b3b3"/><polygon points="53.8 72.4 50.3 75.8 19.2 77.7 16.3 74.6 53.8 72.4" fill="#e6e6e6"/><line x1="16.7" y1="74.9" x2="53.8" y2="72.4" fill="#fff"/><path d="M19.9,71.1h-.7l-3.7,3.4,3.4,3.6,31.7-1.9,4-4-3.7-3-31,1.8M50,75.4,19.4,77.2l-1.8-1.9,34.9-2.4ZM19.8,72.1l30.7-1.9,2,1.8L17.3,74.4Z" fill="#4d4d4d"/><polygon points="46.9 30.7 45.1 30.9 44 32.6 45.5 32.5 46.9 30.7" fill="#e6e6e6"/><polygon points="44.3 28.4 45.9 28.3 47 29.5 44.8 29.7 44.9 30.7 46.9 30.7 45.5 32.5 44 32.6 43.9 33.8 46.1 33.6 48.9 30 46.4 27.1 43.9 27.4 44.3 28.4" fill="#4d4d4d"/><polygon points="45.9 28.1 44.3 28.2 45 29.7 47.1 29.5 45.9 28.1" fill="#b3b3b3"/><polygon points="20.7 60.6 48.3 58.8 50.6 55.9 47.3 56.2 44.9 59.2 34.6 59.7 34 57.2 19.1 58.3 20.7 60.6" fill="#e6e6e6"/><polygon points="18.8 57.2 34.1 56 34.5 53.7 21 54.5 18.8 57.2" fill="#b3b3b3"/><polygon points="48.8 52.7 46.1 52.9 47.5 55 50.6 54.8 48.8 52.7" fill="#b3b3b3"/><polygon points="46 52.9 48.7 52.7 50.5 54.8 47.5 55 47.9 55.5 47.6 56.3 50.5 55.9 48.3 58.8 20.6 60.6 19 58.3 33.9 57.2 34.1 56 18.7 57.2 21 54.5 34.4 53.7 34.6 52.5 20.4 53.4 17 57.5 20 61.9 48.8 60 52.5 55.3 49.2 51.5 45.3 51.8 46 52.9" fill="#4d4d4d"/><polygon points="22.7 51 34.2 50.3 33.8 48.1 21.3 49 22.7 51" fill="#e6e6e6"/><polygon points="48.2 43.9 45.9 44.1 47.3 45.9 49.8 45.7 48.2 43.9" fill="#b3b3b3"/><polygon points="21.1 47.9 34 46.9 34.4 44.8 23 45.6 21.1 47.9" fill="#b3b3b3"/><polygon points="49.7 46.9 47.2 47.1 45.9 49.5 47.8 49.4 49.7 46.9" fill="#e6e6e6"/><polygon points="34.2 50.3 22.7 51 21.3 49 33.8 48.1 33.8 48 34 46.9 21.1 47.9 23 45.6 34.4 44.8 34.6 43.7 22.5 44.4 19.4 48.2 22.1 52.2 34.5 51.4 34.2 50.3" fill="#4d4d4d"/><polygon points="45.9 44.1 48.2 43.9 49.8 45.7 47.3 45.9 47.6 46.3 47.2 47.1 49.7 46.9 47.8 49.4 45.9 49.5 45.3 50.7 48.4 50.5 51.7 46.2 48.7 42.7 44.9 43 45.9 44.1" fill="#4d4d4d"/><polygon points="48.2 38 45.8 38.2 44.9 40.4 46.5 40.3 48.2 38" fill="#e6e6e6"/><polygon points="22.9 38.9 33.9 38.1 34 36.2 24.6 36.8 22.9 38.9" fill="#b3b3b3"/><polygon points="46.9 35.3 44.3 35.5 45.7 37.1 48.3 36.9 46.9 35.3" fill="#b3b3b3"/><polygon points="24.3 41.8 34.3 41.2 33.9 39.2 23.1 40 24.3 41.8" fill="#e6e6e6"/><polygon points="44.3 35.5 46.9 35.3 48.3 36.9 45.7 37.1 46.2 37.6 45.8 38.2 48.2 38 46.5 40.3 45.2 40.4 44.6 41.6 47.1 41.4 50.2 37.3 47.4 34.1 43.7 34.3 44.3 35.5" fill="#4d4d4d"/><polygon points="34.3 41.2 24.3 41.8 23.1 40 33.9 39.2 33.9 39.1 33.9 38.1 22.9 38.9 24.6 36.8 34 36.2 34.1 35 24.1 35.7 21.1 39.2 23.7 43 34.5 42.3 34.3 41.2" fill="#4d4d4d"/><polygon points="24.8 31.1 33 30.4 33.4 29 26.2 29.4 24.8 31.1" fill="#b3b3b3"/><polygon points="25.9 33.6 33.1 33.1 32.8 31.6 24.9 32.2 25.9 33.6" fill="#e6e6e6"/><polygon points="33.1 33.1 25.9 33.6 24.9 32.2 32.8 31.6 32.8 31.5 33 30.4 24.8 31.1 26.2 29.4 33.4 29 33.6 27.8 25.6 28.3 23 31.4 25.3 34.8 33.3 34.3 33.1 33.1" fill="#4d4d4d"/><path d="M45.1,60.1l-.7-.6,3.4-3.9-3-4.5,2.5-4.5-3-4,.8-4.4s-2.1-3.8-2.1-4l1.4-4-1.4-3,.7-.3,1.5,3.4-1.3,4.2,2.2,3.4-.9,4.6,3,3.8L45.7,51l3,4.7" fill="#4d4d4d"/><path d="M33.7,27.7c.2,0,.6.1.5.3L33,30.7l1,3.5a28.7,28.7,0,0,1-.1,4.2l.9,4.1h0L34,47.3l.9,4.4h0l-.6,4.6.6,3.7c0,.2-.1.4-.3.4s-.4-.1-.5-.3l-.6-3.7h0l.6-4.6-.9-4.4h0l.8-4.7-.9-4h0V34.3l-1-3.7L33.4,28A.3.3,0,0,1,33.7,27.7Z" fill="#4d4d4d"/><polygon points="15.5 95.9 19.1 93.6 51 92.3 53.9 94.3 15.5 95.9" fill="#b3b3b3"/><polygon points="54.2 94.1 50.5 96.4 18.6 97.7 15.7 95.7 54.2 94.1" fill="#e6e6e6"/><path d="M18.4,97.9l32.4-1.3,4-2.5-3.5-2L18.9,93.5l-3.8,2.1Zm31.9-1.8L18.9,97.4l-2.2-1.5L53,94.4ZM19.4,93.9l31.5-1.2,2.2,1.2L16.9,95.4Z" fill="#4d4d4d"/><polygon points="16.2 91.2 19.8 88.9 51.1 87.6 53.9 89.6 16.2 91.2" fill="#b3b3b3"/><polygon points="54.2 89.4 50.6 91.7 19.3 93 16.4 91 54.2 89.4" fill="#e6e6e6"/><path d="M19,93.2l31.9-1.3,3.9-2.6-3.4-1.9L19.5,88.7l-3.7,2.2Zm31.4-1.8L19.5,92.7l-2.1-1.5,35.7-1.5ZM20,89.2l30.9-1.3,2.2,1.3L17.6,90.6Z" fill="#4d4d4d"/><polygon points="16.2 86.3 19.8 84.1 51.1 82.7 53.9 84.8 16.2 86.3" fill="#b3b3b3"/><polygon points="54.2 84.6 50.6 86.9 19.3 88.2 16.4 86.2 54.2 84.6" fill="#e6e6e6"/><path d="M19,88.4,50.9,87l3.9-2.5-3.4-1.9L19.5,83.9l-3.7,2.2Zm31.4-1.9L19.5,87.8l-2.1-1.5,35.7-1.5ZM20,84.4l30.9-1.3,2.2,1.2L17.6,85.8Z" fill="#4d4d4d"/><polygon points="16.2 81.4 19.8 79.1 51.1 77.8 53.9 79.8 16.2 81.4" fill="#b3b3b3"/><polygon points="54.2 79.7 50.6 81.9 19.3 83.3 16.4 81.2 54.2 79.7" fill="#e6e6e6"/><path d="M19,83.4l31.9-1.3,3.9-2.5-3.4-2L19.5,79l-3.7,2.1Zm31.4-1.8L19.5,82.9l-2.1-1.5,35.7-1.5ZM20,79.5l8.4-.4,22.5-.9,2.2,1.2L17.6,80.9Z" fill="#4d4d4d"/><path d="M18,98.1H48.3a6.8,6.8,0,0,1,6.8,6.8v.6a0,0,0,0,1,0,0H14.9a0,0,0,0,1,0,0v-4.4A3.1,3.1,0,0,1,18,98.1Z" transform="translate(70 203.6) rotate(180)" fill="#e6e6e6"/><path d="M14.3,97.5H55.7v5.3a3.4,3.4,0,0,1-3.4,3.3H17.7a3.4,3.4,0,0,1-3.4-3.3Zm40.2,1.2h-39v4.1a2.2,2.2,0,0,0,2.2,2.2H52.3a2.2,2.2,0,0,0,2.2-2.2Z" fill="#4d4d4d"/></g></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
			case '41':
			case '42':
			case '43':
			case '44':
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b36c838a-b1eb-47e8-ba8f-6609c59b91fe" data-name="Incisivo"><path d="M50.6,65.7H19.2l1.5,46.1s5.8,24.7,5.8,24.9c0,1.9,3.8,3.5,8.6,3.5s8.6-1.6,8.6-3.5c0-.2,5.3-28.2,5.3-28.2Z" fill="#999"/><path d="M35.1,141c-5.1,0-9.1-1.8-9.1-4.1s-3.9-16.6-5.8-24.9h0L18.7,65.2H51.3l-1.6,43.5c-1.8,9.4-5.2,27.2-5.4,28.1S40.3,141,35.1,141ZM21.4,111.8c5.7,24.8,5.7,24.9,5.7,25s3.3,3,8,3,8.1-1.6,8.1-3,0-.2,5.3-28.3l1.6-42.1H19.9Z" fill="#4d4d4d"/><polygon points="54.1 96.9 50.7 100.4 19.5 102.2 16.6 99.1 54.1 96.9" fill="#b3b3b3"/><polygon points="16.2 99.3 19.7 95.8 50.8 94 53.7 97.1 16.2 99.3" fill="#e6e6e6"/><line x1="53.3" y1="96.8" x2="16.2" y2="99.3" fill="#fff"/><path d="M51.1,93.5,19.4,95.4l-4,3.9,3.7,3.1,31.7-1.9,3.7-3.4ZM20,96.3l30.6-1.8,1.8,1.9L17.5,98.8Zm30.2,3.3-30.7,1.8-2-1.7,35.2-2.4Z" fill="#4d4d4d"/><polygon points="54.1 88.9 50.7 92.4 19.5 94.3 16.6 91.2 54.1 88.9" fill="#b3b3b3"/><polygon points="16.2 91.4 19.7 87.9 50.8 86 53.7 89.1 16.2 91.4" fill="#e6e6e6"/><line x1="53.3" y1="88.8" x2="16.2" y2="91.4" fill="#fff"/><path d="M50.1,92.6h.7l3.7-3.4-3.4-3.6L19.4,87.4l-4,4,3.7,3,31-1.8M20,88.3l30.6-1.8,1.8,1.9L17.5,90.8Zm30.2,3.4L19.5,93.5l-2-1.8,35.2-2.4Z" fill="#4d4d4d"/><polygon points="23.1 133 24.9 132.9 26 131.1 24.5 131.2 23.1 133" fill="#e6e6e6"/><polygon points="25.7 135.3 24.1 135.4 23 134.2 25.2 134 25.1 133 23.1 133 24.5 131.2 26 131.1 26.1 129.9 23.9 130.1 21.1 133.7 23.6 136.6 26.1 136.3 25.7 135.3" fill="#4d4d4d"/><polygon points="24.1 135.6 25.7 135.5 25 134 22.9 134.2 24.1 135.6" fill="#b3b3b3"/><polygon points="49.3 103.1 21.7 104.9 19.4 107.8 22.7 107.5 25.1 104.5 35.4 104 36 106.5 50.9 105.4 49.3 103.1" fill="#e6e6e6"/><polygon points="51.2 106.5 35.9 107.7 35.5 110.1 49 109.2 51.2 106.5" fill="#b3b3b3"/><polygon points="21.2 111 23.9 110.8 22.5 108.7 19.4 109 21.2 111" fill="#b3b3b3"/><polygon points="24 110.8 21.3 111 19.5 109 22.5 108.7 22.1 108.2 22.4 107.4 19.5 107.8 21.7 104.9 49.4 103.1 51 105.4 36.1 106.5 35.9 107.7 51.3 106.5 49 109.2 35.6 110.1 35.4 111.2 49.6 110.3 53 106.3 50 101.9 21.2 103.8 17.5 108.5 20.8 112.2 24.7 111.9 24 110.8" fill="#4d4d4d"/><polygon points="47.3 112.7 35.8 113.5 36.2 115.6 48.7 114.7 47.3 112.7" fill="#e6e6e6"/><polygon points="21.8 119.8 24.1 119.6 22.7 117.8 20.2 118 21.8 119.8" fill="#b3b3b3"/><polygon points="48.9 115.8 36 116.8 35.6 118.9 47 118.2 48.9 115.8" fill="#b3b3b3"/><polygon points="20.3 116.8 22.8 116.7 24.1 114.2 22.2 114.3 20.3 116.8" fill="#e6e6e6"/><polygon points="35.8 113.5 47.3 112.7 48.7 114.7 36.2 115.6 36.2 115.8 36 116.8 48.9 115.8 47 118.2 35.6 118.9 35.4 120.1 47.5 119.3 50.6 115.5 47.9 111.5 35.5 112.3 35.8 113.5" fill="#4d4d4d"/><polygon points="24.1 119.6 21.8 119.8 20.2 118 22.7 117.8 22.4 117.5 22.8 116.7 20.3 116.8 22.2 114.3 24.1 114.2 24.7 113 21.6 113.2 18.3 117.5 21.3 121 25.1 120.7 24.1 119.6" fill="#4d4d4d"/><polygon points="21.8 125.7 24.2 125.5 25.1 123.3 23.5 123.4 21.8 125.7" fill="#e6e6e6"/><polygon points="47.1 124.8 36.1 125.7 36 127.5 45.4 126.9 47.1 124.8" fill="#b3b3b3"/><polygon points="23.1 128.4 25.7 128.3 24.3 126.7 21.7 126.9 23.1 128.4" fill="#b3b3b3"/><polygon points="45.7 121.9 35.7 122.6 36.1 124.5 46.9 123.7 45.7 121.9" fill="#e6e6e6"/><polygon points="25.7 128.3 23.1 128.4 21.7 126.9 24.3 126.7 23.8 126.1 24.2 125.5 21.8 125.7 23.5 123.4 24.8 123.3 25.4 122.1 22.9 122.3 19.8 126.4 22.6 129.6 26.3 129.4 25.7 128.3" fill="#4d4d4d"/><polygon points="35.7 122.6 45.7 121.9 46.9 123.7 36.1 124.5 36.1 124.6 36.1 125.7 47.1 124.8 45.4 126.9 36 127.5 35.9 128.7 45.9 128 48.9 124.5 46.3 120.7 35.5 121.4 35.7 122.6" fill="#4d4d4d"/><polygon points="45.2 132.7 37 133.3 36.6 134.8 43.8 134.3 45.2 132.7" fill="#b3b3b3"/><polygon points="44.1 130.1 36.9 130.6 37.2 132.1 45.1 131.5 44.1 130.1" fill="#e6e6e6"/><polygon points="36.9 130.6 44.1 130.1 45.1 131.5 37.2 132.1 37.2 132.2 37 133.3 45.2 132.7 43.8 134.3 36.6 134.8 36.4 136 44.4 135.4 47 132.3 44.7 128.9 36.7 129.4 36.9 130.6" fill="#4d4d4d"/><path d="M24.9,103.6l.7.6-3.4,3.9,3,4.6-2.5,4.5,3,3.9-.8,4.4s2.1,3.8,2.1,4l-1.4,4,1.4,3-.7.3-1.5-3.3,1.3-4.2-2.2-3.5.9-4.6-3-3.8,2.5-4.7-3-4.6" fill="#4d4d4d"/><path d="M36.3,136c-.2,0-.6,0-.5-.3L37,133l-1-3.5a29.1,29.1,0,0,1,.1-4.2l-.9-4.1h0l.8-4.7-.9-4.4h0l.6-4.6-.6-3.7c0-.2.1-.4.3-.4a.5.5,0,0,1,.5.3l.6,3.7h0l-.6,4.6.9,4.4v.2l-.8,4.6.9,4.1h0v4.1l1,3.7-1.2,2.6A.3.3,0,0,1,36.3,136Z" fill="#4d4d4d"/><polygon points="54.5 67.8 50.9 70.1 19 71.4 16.1 69.4 54.5 67.8" fill="#b3b3b3"/><polygon points="15.8 69.6 19.5 67.3 51.4 66 54.3 68 15.8 69.6" fill="#e6e6e6"/><path d="M51.6,65.8,19.2,67.1l-4,2.6,3.5,1.9,32.4-1.3,3.8-2.2ZM19.7,67.6l31.4-1.3,2.2,1.6L17,69.4Zm30.9,2.2L19.1,71.1l-2.2-1.2,36.2-1.5Z" fill="#4d4d4d"/><polygon points="53.8 72.5 50.2 74.8 18.9 76.1 16.1 74.1 53.8 72.5" fill="#b3b3b3"/><polygon points="15.8 74.3 19.4 72 50.7 70.7 53.6 72.7 15.8 74.3" fill="#e6e6e6"/><path d="M51,70.5,19.1,71.8l-3.9,2.6,3.4,1.9L50.5,75l3.7-2.2ZM19.6,72.3,50.5,71l2.1,1.6L16.9,74.1ZM50,74.5,19.1,75.8l-2.2-1.2,35.5-1.5Z" fill="#4d4d4d"/><polygon points="53.8 77.4 50.2 79.7 18.9 81 16.1 79 53.8 77.4" fill="#b3b3b3"/><polygon points="15.8 79.1 19.4 76.9 50.7 75.5 53.6 77.6 15.8 79.1" fill="#e6e6e6"/><path d="M51,75.4,19.1,76.7l-3.9,2.5,3.4,2,31.9-1.4,3.7-2.2ZM19.6,77.2l30.9-1.3,2.1,1.5L16.9,78.9ZM50,79.3,19.1,80.6l-2.2-1.2,35.5-1.5Z" fill="#4d4d4d"/><polygon points="53.8 82.3 50.2 84.6 18.9 85.9 16.1 83.9 53.8 82.3" fill="#b3b3b3"/><polygon points="15.8 84.1 19.4 81.8 50.7 80.5 53.6 82.5 15.8 84.1" fill="#e6e6e6"/><path d="M51,80.3,19.1,81.6l-3.9,2.6,3.4,1.9,31.9-1.3,3.7-2.2ZM19.6,82.1l30.9-1.3,2.1,1.6L16.9,83.9ZM50,84.3l-8.4.3-22.5,1-2.2-1.2,35.5-1.5Z" fill="#4d4d4d"/><path d="M18,58.2H48.3A6.8,6.8,0,0,1,55.1,65v.6a0,0,0,0,1,0,0H14.9a0,0,0,0,1,0,0V61.2A3.1,3.1,0,0,1,18,58.2Z" fill="#e6e6e6"/><path d="M55.7,66.2H14.3V60.9a3.4,3.4,0,0,1,3.4-3.3H52.3a3.4,3.4,0,0,1,3.4,3.3ZM15.5,65.1h39V60.9a2.1,2.1,0,0,0-2.2-2.1H17.7a2.1,2.1,0,0,0-2.2,2.1Z" fill="#4d4d4d"/></g></svg>
				);
				break;
			case '36':
			case '37':
			case '38':
			case '46':
			case '47':
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="51abccde-cf33-4535-b3b0-cd4692a758bd" data-name="Incisivo"><path d="M53.9,66.7h-38l1.8,46.1s7,24.7,7,24.9c0,1.9,4.6,3.5,10.4,3.5s10.4-1.6,10.4-3.5c0-.2,6.5-28.2,6.5-28.2Z" fill="#999"/><path d="M35.2,142c-6.3,0-11-1.8-11.1-4.1s-4.6-16.6-7-24.9h0L15.3,66.2H54.7l-1.9,43.5c-2.2,9.4-6.3,27.2-6.5,28.1S41.5,142,35.2,142ZM18.5,112.8c7,24.8,7,24.9,7,25s4,3,9.7,3,9.7-1.6,9.7-3,0-.2,6.5-28.3l1.8-42.1H16.8Z" fill="#4d4d4d"/><polygon points="58.1 97.9 54 101.4 16.3 103.2 12.8 100.1 58.1 97.9" fill="#b3b3b3"/><polygon points="12.3 100.3 16.5 96.8 54.2 95 57.7 98.1 12.3 100.3" fill="#e6e6e6"/><line x1="57.1" y1="97.8" x2="12.3" y2="100.3" fill="#fff"/><path d="M54.5,94.5,16.1,96.4l-4.8,3.9,4.4,3.1,38.4-1.9,4.5-3.4ZM16.8,97.3l37-1.8L56,97.4,13.9,99.8Zm36.6,3.3-37.1,1.8-2.5-1.7,42.7-2.4Z" fill="#4d4d4d"/><polygon points="58.1 89.9 54 93.4 16.3 95.3 12.8 92.2 58.1 89.9" fill="#b3b3b3"/><polygon points="12.3 92.4 16.5 88.9 54.2 87 57.7 90.1 12.3 92.4" fill="#e6e6e6"/><line x1="57.1" y1="89.8" x2="12.3" y2="92.4" fill="#fff"/><path d="M53.2,93.6h.9l4.5-3.4-4.1-3.6L16.1,88.4l-4.8,4,4.4,3,37.5-1.8M16.8,89.3l37-1.8L56,89.4,13.9,91.8Zm36.6,3.4L16.3,94.5l-2.5-1.8,42.7-2.4Z" fill="#4d4d4d"/><polygon points="20.6 134 22.8 133.9 24.1 132.1 22.3 132.2 20.6 134" fill="#e6e6e6"/><polygon points="23.8 136.3 21.8 136.4 20.5 135.2 23.1 135 23 134 20.6 134 22.3 132.2 24.1 132.1 24.2 130.9 21.6 131.1 18.2 134.7 21.3 137.6 24.2 137.3 23.8 136.3" fill="#4d4d4d"/><polygon points="21.9 136.6 23.7 136.5 22.9 135 20.3 135.2 21.9 136.6" fill="#b3b3b3"/><polygon points="52.3 104.1 18.9 105.9 16.2 108.8 20.2 108.5 23 105.5 35.5 105 36.2 107.5 54.2 106.4 52.3 104.1" fill="#e6e6e6"/><polygon points="54.6 107.5 36.1 108.7 35.7 111.1 51.9 110.2 54.6 107.5" fill="#b3b3b3"/><polygon points="18.3 112 21.6 111.8 19.9 109.7 16.2 110 18.3 112" fill="#b3b3b3"/><polygon points="21.6 111.8 18.4 112 16.2 110 19.9 109.7 19.4 109.2 19.7 108.4 16.3 108.8 19 105.9 52.4 104.1 54.3 106.4 36.3 107.5 36.1 108.7 54.7 107.5 51.9 110.2 35.7 111.1 35.5 112.2 52.6 111.3 56.7 107.3 53.1 102.9 18.3 104.8 13.9 109.5 17.8 113.2 22.6 112.9 21.6 111.8" fill="#4d4d4d"/><polygon points="49.9 113.7 35.9 114.5 36.4 116.6 51.5 115.7 49.9 113.7" fill="#e6e6e6"/><polygon points="19 120.8 21.9 120.6 20.1 118.8 17.1 119 19 120.8" fill="#b3b3b3"/><polygon points="51.8 116.8 36.2 117.8 35.7 119.9 49.5 119.2 51.8 116.8" fill="#b3b3b3"/><polygon points="17.2 117.8 20.3 117.7 21.8 115.2 19.5 115.3 17.2 117.8" fill="#e6e6e6"/><polygon points="35.9 114.5 49.9 113.7 51.5 115.7 36.4 116.6 36.4 116.8 36.2 117.8 51.8 116.8 49.5 119.2 35.7 119.9 35.5 121.1 50.1 120.3 53.9 116.5 50.6 112.5 35.7 113.3 35.9 114.5" fill="#4d4d4d"/><polygon points="21.9 120.6 19 120.8 17.1 119 20.1 118.8 19.7 118.5 20.3 117.7 17.2 117.8 19.5 115.3 21.8 115.2 22.5 114 18.8 114.2 14.8 118.5 18.4 122 23 121.7 21.9 120.6" fill="#4d4d4d"/><polygon points="19 126.7 21.9 126.5 23.1 124.3 21.1 124.4 19 126.7" fill="#e6e6e6"/><polygon points="49.7 125.8 36.3 126.7 36.2 128.5 47.5 127.9 49.7 125.8" fill="#b3b3b3"/><polygon points="20.6 129.4 23.8 129.3 22.1 127.7 18.9 127.9 20.6 129.4" fill="#b3b3b3"/><polygon points="47.9 122.9 35.9 123.6 36.3 125.5 49.4 124.7 47.9 122.9" fill="#e6e6e6"/><polygon points="23.7 129.3 20.6 129.4 18.9 127.9 22.1 127.7 21.5 127.1 21.9 126.5 19 126.7 21.1 124.4 22.6 124.3 23.4 123.1 20.4 123.3 16.6 127.4 20 130.6 24.4 130.4 23.7 129.3" fill="#4d4d4d"/><polygon points="35.9 123.6 47.9 122.9 49.4 124.7 36.3 125.5 36.4 125.6 36.3 126.7 49.7 125.8 47.5 127.9 36.2 128.5 36.1 129.7 48.2 129 51.8 125.5 48.6 121.7 35.6 122.4 35.9 123.6" fill="#4d4d4d"/><polygon points="47.4 133.7 37.4 134.3 37 135.8 45.7 135.3 47.4 133.7" fill="#b3b3b3"/><polygon points="46 131.1 37.3 131.6 37.6 133.1 47.2 132.5 46 131.1" fill="#e6e6e6"/><polygon points="37.3 131.6 46 131.1 47.2 132.5 37.6 133.1 37.7 133.2 37.4 134.3 47.4 133.7 45.7 135.3 37 135.8 36.7 137 46.3 136.4 49.5 133.3 46.7 129.9 37.1 130.4 37.3 131.6" fill="#4d4d4d"/><path d="M22.8,104.6l.8.6-4,3.9,3.6,4.6-3.1,4.5,3.6,3.9-.9,4.4s2.5,3.8,2.5,4l-1.6,4,1.6,3-.9.3-1.8-3.3,1.6-4.2-2.7-3.5,1.1-4.6L19,118.4l3.1-4.7-3.7-4.6" fill="#4d4d4d"/><path d="M36.6,137c-.3,0-.7,0-.7-.3l1.5-2.7-1.2-3.5c-.3-.1.2-4.2.2-4.2l-1.1-4.1s-.1-.1,0-.1l.9-4.7L35.1,113h0l.7-4.6-.6-3.7c-.1-.2.1-.4.3-.4a.6.6,0,0,1,.6.3l.7,3.7h0l-.8,4.6,1.1,4.4v.2l-.9,4.6,1.1,4.1h0l-.2,4.1,1.3,3.7L37,136.7C36.9,136.9,36.9,137,36.6,137Z" fill="#4d4d4d"/><polygon points="58.6 68.8 54.2 71.1 15.6 72.4 12.2 70.4 58.6 68.8" fill="#b3b3b3"/><polygon points="11.8 70.6 16.2 68.3 54.8 67 58.3 69 11.8 70.6" fill="#e6e6e6"/><path d="M55.1,66.8,15.9,68.1,11,70.7l4.3,1.9,39.2-1.3,4.6-2.2ZM16.5,68.6l38-1.3,2.6,1.6L13.2,70.4Zm37.4,2.2L15.8,72.1l-2.7-1.2,43.7-1.5Z" fill="#4d4d4d"/><polygon points="57.8 73.5 53.4 75.8 15.5 77.1 12.1 75.1 57.8 73.5" fill="#b3b3b3"/><polygon points="11.8 75.3 16.1 73 54 71.7 57.4 73.7 11.8 75.3" fill="#e6e6e6"/><path d="M54.3,71.5,15.8,72.8,11,75.4l4.2,1.9L53.7,76l4.5-2.2ZM16.4,73.3,53.7,72l2.6,1.6L13.1,75.1Zm36.7,2.2L15.7,76.8l-2.6-1.2L56,74.1Z" fill="#4d4d4d"/><polygon points="57.8 78.4 53.4 80.7 15.5 82 12.1 80 57.8 78.4" fill="#b3b3b3"/><polygon points="11.8 80.1 16.1 77.9 54 76.5 57.4 78.6 11.8 80.1" fill="#e6e6e6"/><path d="M54.3,76.4,15.8,77.7,11,80.2l4.2,2,38.5-1.4,4.5-2.2ZM16.4,78.2l37.3-1.3,2.6,1.5L13.1,79.9Zm36.7,2.1L15.7,81.6l-2.6-1.2L56,78.9Z" fill="#4d4d4d"/><polygon points="57.8 83.3 53.4 85.6 15.5 86.9 12.1 84.9 57.8 83.3" fill="#b3b3b3"/><polygon points="11.8 85.1 16.1 82.8 54 81.5 57.4 83.5 11.8 85.1" fill="#e6e6e6"/><path d="M54.3,81.3,15.8,82.6,11,85.2l4.2,1.9,38.5-1.3,4.5-2.2ZM16.4,83.1l37.3-1.3,2.6,1.6L13.1,84.9Zm36.7,2.2L43,85.6l-27.3,1-2.6-1.2L56,83.9Z" fill="#4d4d4d"/><path d="M17.5,59.2H55.1a4.2,4.2,0,0,1,4.2,4.2v3.3a0,0,0,0,1,0,0H10.7a0,0,0,0,1,0,0V66a6.8,6.8,0,0,1,6.8-6.8Z" fill="#e6e6e6"/><path d="M60,67.2H10V61.9c0-1.8,1.8-3.3,4-3.3H56c2.2,0,4,1.5,4,3.3ZM11.4,66.1H58.6V61.9A2.4,2.4,0,0,0,56,59.8H14a2.4,2.4,0,0,0-2.6,2.1Z" fill="#4d4d4d"/></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getShortSvg = (icon) => {
		switch(icon) {
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '21':
			case '22':
			case '23':
			case '24':
			case '25':
			case '16':
			case '17':
			case '18':
			case '26':
			case '27':
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M16.7,99H53.8L52,68.5s-6.8-16.3-6.8-16.4-4.5-2.4-10.1-2.4-10.2,1.1-10.2,2.4-6.3,18.6-6.3,18.6Z" fill="#999"/><path d="M35,49.2c6.1,0,10.8,1.2,10.8,2.7s4.6,11,6.8,16.5h0l1.8,30.9H15.9l1.9-28.8c2.1-6.2,6.1-17.9,6.3-18.6S28.8,49.2,35,49.2ZM51.3,68.5c-6.8-16.4-6.6-16.2-6.7-16.3s-3.8-1.4-9.4-1.4-9.4.8-9.5,1.4-.2-.1-6.5,18.5L17.3,98.5H53Z" fill="#4d4d4d"/><polygon points="12.6 95.7 16.8 92.3 53.3 90.3 56.6 93.4 12.6 95.7" fill="#b3b3b3"/><polygon points="56.9 93.1 52.8 96.5 16.2 98.4 12.9 95.4 56.9 93.1" fill="#e6e6e6"/><path d="M15.9,98.7l37.2-2,4.6-3.8-4-2.8-37.2,2-4.3,3.2ZM52.5,96l-36,1.9L14,95.7l41.7-2.3ZM17.1,92.8l36.1-1.9,2.5,1.8L14.3,94.9Z" fill="#4d4d4d"/><polygon points="13.4 88.2 17.5 84.8 53.4 82.9 56.6 85.9 13.4 88.2" fill="#b3b3b3"/><polygon points="56.9 85.6 52.8 89 16.9 91 13.7 88 56.9 85.6" fill="#e6e6e6"/><path d="M16.6,91.2l36.6-1.9,4.5-3.8-4-2.9-36.4,2L13,87.8Zm36-2.7-35.4,2-2.4-2.3,40.9-2.3ZM17.8,85.3l35.4-1.9,2.5,1.8L15.1,87.4Z" fill="#4d4d4d"/><polygon points="13.4 81 17.5 77.6 53.4 75.6 56.6 78.6 13.4 81" fill="#b3b3b3"/><polygon points="56.9 78.4 52.8 81.8 16.9 83.7 13.7 80.7 56.9 78.4" fill="#e6e6e6"/><path d="M16.6,84l36.6-2,4.5-3.8-4-2.9-36.4,2L13,80.6Zm36-2.7L17.2,83.2l-2.4-2.3,40.9-2.2ZM17.8,78.1l35.4-2,2.5,1.8L15.1,80.2Z" fill="#4d4d4d"/><polygon points="13.4 73.6 17.5 70.2 53.4 68.3 56.6 71.3 13.4 73.6" fill="#b3b3b3"/><polygon points="56.9 71 52.8 74.4 16.9 76.4 13.7 73.4 56.9 71" fill="#e6e6e6"/><path d="M16.6,76.7l36.6-2,4.5-3.8-4-2.9L17.3,70,13,73.3Zm36-2.8-35.4,2-2.4-2.3,40.9-2.2ZM17.8,70.7l35.4-1.9,2.5,1.8L15.1,72.8Z" fill="#4d4d4d"/><polygon points="15.4 66.2 19.1 62.8 51.1 60.9 54 63.9 15.4 66.2" fill="#b3b3b3"/><polygon points="54.2 63.6 50.6 67 18.6 69 15.7 66 54.2 63.6" fill="#e6e6e6"/><path d="M18.3,69.3l32.6-2,4-3.8-3.5-2.9-32.5,2-3.8,3.3Zm32-2.8-31.4,2-2.2-2.3L53.1,64ZM19.4,63.3l31.5-1.9,2.3,1.8L16.9,65.4Z" fill="#4d4d4d"/><polygon points="19.1 59.1 22 56 47.5 54.2 49.8 56.9 19.1 59.1" fill="#b3b3b3"/><polygon points="50 56.7 47.1 59.8 21.6 61.6 19.3 58.8 50 56.7" fill="#e6e6e6"/><path d="M21.4,61.8,47.3,60l3.3-3.4L47.7,54,21.9,55.8l-3.1,2.9Zm25.5-2.4-25,1.7L20.1,59l29-2Zm-24.6-3,25.1-1.7,1.8,1.6-28.9,2Z" fill="#4d4d4d"/><path d="M14,106.7H30v-2.3H40v2.3H56a3.2,3.2,0,0,0,3.4-2.8V99H10.6v4.9A3.2,3.2,0,0,0,14,106.7Z" fill="#e6e6e6"/><path d="M10,98.4H60v5.5c0,1.9-1.8,3.4-4,3.4H39.4V105H30.7v2.3H14c-2.2,0-4-1.5-4-3.4Zm48.7,1.2H11.3v4.3a2.5,2.5,0,0,0,2.7,2.2H29.4v-2.4H40.6v2.4H56a2.5,2.5,0,0,0,2.7-2.2Z" fill="#4d4d4d"/></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
			case '41':
			case '42':
			case '43':
			case '44':
			case '45':
			case '36':
			case '37':
			case '38':
			case '46':
			case '47':
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M54.5,64.7H17.4l1.7,30.5,6.8,16.4c0,1.3,4.6,2.4,10.2,2.4s10.2-1.1,10.2-2.4L52.6,93Z" fill="#999"/><path d="M36.2,114.5c-6.1,0-10.8-1.2-10.9-2.7s-4.5-11-6.7-16.5h-.1L16.8,64.4H55.3L53.4,93.1,47,111.7C47,113.3,42.3,114.5,36.2,114.5ZM19.9,95.2c6.8,16.4,6.6,16.2,6.6,16.3s3.9,1.4,9.5,1.4,9.4-.8,9.5-1.4.2.1,6.5-18.5l1.8-27.8H18.2Z" fill="#4d4d4d"/><polygon points="58.6 68 54.4 71.4 17.8 73.3 14.5 70.3 58.6 68" fill="#b3b3b3"/><polygon points="14.2 70.6 18.4 67.2 55 65.2 58.3 68.2 14.2 70.6" fill="#e6e6e6"/><path d="M55.3,65,18.1,66.9l-4.7,3.8,4.1,2.9,37.2-2L59,68.4ZM18.7,67.7l36-2L57.2,68,15.5,70.3Zm35.4,3.2L18,72.8,15.5,71l41.4-2.2Z" fill="#4d4d4d"/><polygon points="57.8 75.5 53.7 78.9 17.8 80.8 14.5 77.8 57.8 75.5" fill="#b3b3b3"/><polygon points="14.2 78.1 18.3 74.7 54.2 72.7 57.5 75.7 14.2 78.1" fill="#e6e6e6"/><path d="M54.5,72.4,18,74.4l-4.6,3.8,4,2.9,36.5-2,4.3-3.2ZM18.6,75.2l35.3-2,2.5,2.3L15.5,77.8Zm34.8,3.2L17.9,80.3l-2.5-1.8,40.7-2.2Z" fill="#4d4d4d"/><polygon points="57.8 82.7 53.7 86.1 17.8 88.1 14.5 85.1 57.8 82.7" fill="#b3b3b3"/><polygon points="14.2 85.3 18.3 81.9 54.2 80 57.5 83 14.2 85.3" fill="#e6e6e6"/><path d="M54.5,79.7,18,81.7l-4.6,3.8,4,2.8,36.5-2,4.3-3.2ZM18.6,82.4l35.3-1.9,2.5,2.2L15.5,85Zm34.8,3.2L17.9,87.5l-2.5-1.8,40.7-2.2Z" fill="#4d4d4d"/><polygon points="57.8 90 53.7 93.4 17.8 95.4 14.5 92.4 57.8 90" fill="#b3b3b3"/><polygon points="14.2 92.7 18.3 89.3 54.2 87.3 57.5 90.3 14.2 92.7" fill="#e6e6e6"/><path d="M54.5,87,18,89l-4.6,3.8,4,2.9,36.5-2,4.3-3.3ZM18.6,89.7l35.3-1.9,2.5,2.3L15.5,92.3ZM53.4,93,17.9,94.9l-2.5-1.8,40.7-2.2Z" fill="#4d4d4d"/><polygon points="55.7 97.4 52.1 100.8 20.1 102.8 17.2 99.8 55.7 97.4" fill="#b3b3b3"/><polygon points="16.9 100.1 20.6 96.7 52.6 94.7 55.5 97.7 16.9 100.1" fill="#e6e6e6"/><path d="M52.8,94.4l-32.5,2-4.1,3.8,3.6,2.9,32.5-2,3.8-3.3Zm-32,2.7,31.5-1.9,2.2,2.3L18,99.7Zm31,3.3-31.6,1.9L18,100.5l36.3-2.2Z" fill="#4d4d4d"/><polygon points="52 104.6 49.1 107.7 23.6 109.5 21.4 106.7 52 104.6" fill="#b3b3b3"/><polygon points="21.1 107 24.1 103.9 49.5 102.1 51.8 104.8 21.1 107" fill="#e6e6e6"/><path d="M49.7,101.9l-25.9,1.8-3.2,3.4,2.8,2.6,25.9-1.8,3-2.9Zm-25.5,2.4,25.1-1.7,1.8,2.1-29.1,2Zm24.7,3L23.8,109,22,107.4l28.9-2Z" fill="#4d4d4d"/><path d="M57.2,57H41.1v2.3H31.2V57h-16c-1.9,0-3.4,1.2-3.4,2.8v4.9H60.5V59.8A3.1,3.1,0,0,0,57.2,57Z" fill="#e6e6e6"/><path d="M61.2,65.3h-50V59.8a3.8,3.8,0,0,1,4-3.5H31.8v2.4h8.7V56.3H57.2a3.8,3.8,0,0,1,4,3.5ZM12.4,64.1H59.9V59.8a2.5,2.5,0,0,0-2.7-2.2H41.8V60H30.5V57.6H15.2c-1.6,0-2.8,1-2.8,2.2Z" fill="#4d4d4d"/></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getHexagonalOutSvg = (icon) => {
		switch(icon) {
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '21':
			case '22':
			case '23':
			case '24':
			case '25':
			case '16':
			case '17':
			case '18':
			case '26':
			case '27':
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M20.9,92H50.4L49,49.6,43.6,26.8c0-1.9-3.7-3.3-8.1-3.3s-8.1,1.4-8.1,3.3L22.3,52.7Z" fill="#999"/><path d="M47.9,49.7C42.5,27,42.5,26.8,42.5,26.8S39.4,24,35,24s-7.6,1.5-7.6,2.8,0,.2-5,25.9L20.9,91.4H49.3ZM35,22.9c4.8,0,8.5,1.6,8.6,3.8L49,49.5h0l1.4,42.9H19.8l1.5-39.9c1.7-8.7,4.9-25,5-25.9S30.1,22.9,35,22.9Z" fill="#4d4d4d"/><line x1="15.7" y1="87.5" x2="56.3" y2="81.4" fill="#fff"/><path d="M52.5,86,19.3,91l-2.6-3.1,38.4-5.8ZM19.2,83.5l33.3-5L55.1,81,16.9,86.7Zm-.3,8.7,33.8-5.1L57,81.3l-4.2-4L18.6,82.5l-3.6,5Z"/><line x1="17.5" y1="77.4" x2="53.9" y2="71.2" fill="#fff"/><path d="M20,81.4l31.2-5,3.4-5.3-3.8-3.6L19.6,72.4l-3.3,4.7Zm30.5-6L20.4,80.2l-2-2.4,34.4-5.9ZM20.2,73.5l30.2-4.9,2.3,2.2-34.8,6Z"/><polygon points="53.9 71.2 50.9 75.9 20.2 80.8 17 77.1 53.9 71.2" fill="#e6e6e6"/><polygon points="52.7 61.6 49.8 66 21.2 70.6 18.3 67.1 52.7 61.6" fill="#e6e6e6"/><polygon points="22.1 60.3 48.6 56.1 50.5 53.1 47.1 53.7 44.8 56.7 35.5 58.2 34.7 55.8 20.4 58.3 22.1 60.3" fill="#e6e6e6"/><polygon points="23.2 51 34.3 49.2 33.7 47.2 21.7 49.2 23.2 51" fill="#e6e6e6"/><polygon points="48.9 44.6 46.5 45 45.5 47.4 47.3 47.2 48.9 44.6" fill="#e6e6e6"/><polygon points="47.8 36.3 45.5 36.6 44.5 38.8 46.3 38.5 47.8 36.3" fill="#e6e6e6"/><polygon points="23.6 42.1 33.1 40.6 32.6 38.8 22.2 40.6 23.6 42.1" fill="#e6e6e6"/><polygon points="46 29.2 44.3 29.5 43.4 31.3 44.8 31.1 46 29.2" fill="#e6e6e6"/><polygon points="24.8 34.2 31.7 33 31.3 31.6 23.8 32.9 24.8 34.2" fill="#e6e6e6"/><polygon points="56.3 81.4 52.9 86.6 19.1 91.6 15.7 87.5 56.3 81.4" fill="#e6e6e6"/><rect x="24.7" y="101.1" width="21.8" height="6.16" fill="#e6e6e6"/><path d="M15.9,100.2h39a1.5,1.5,0,0,0,1.2-.5,1.1,1.1,0,0,0,.3-.9l-1.2-6.3H15.7l-1.2,6.3a1,1,0,0,0,.2.9A1.7,1.7,0,0,0,15.9,100.2Z" fill="#e6e6e6"/><polygon points="18.3 67.5 21.1 63.1 49.7 58.5 52.7 62 18.3 67.5" fill="#999"/><polygon points="20 57.2 34.7 54.7 34.8 52.4 21.9 54.5 20 57.2" fill="#999"/><polygon points="48.5 50.2 45.9 50.6 47.5 52.5 50.4 52 48.5 50.2" fill="#999"/><polygon points="47.2 41.9 44.9 42.3 46.5 43.9 48.9 43.5 47.2 41.9" fill="#999"/><polygon points="20.9 48.2 33.3 46.1 33.5 44.1 22.6 45.8 20.9 48.2" fill="#999"/><polygon points="21.9 39.5 32.5 37.7 32.4 35.9 23.4 37.4 21.9 39.5" fill="#999"/><polygon points="46.3 33.8 43.7 34.2 45.3 35.6 47.7 35.1 46.3 33.8" fill="#999"/><polygon points="23.6 31.8 31.5 30.5 31.7 29 24.8 30.1 23.6 31.8" fill="#999"/><polygon points="44.9 26.8 43.3 27.2 44 28.4 45.7 28.1 44.9 26.8" fill="#999"/><polygon points="15.4 87.9 18.8 82.7 52.6 77.6 56 81.8 15.4 87.9" fill="#999"/><polygon points="17 77.7 20.1 72.9 50.7 68 53.9 71.8 17 77.7" fill="#999"/><path d="M46.9,106.7l6.6-.4c.5,0,.7-.2.7-.3v-4.4H46.9Z" fill="#999"/><path d="M54.3,106.6Z" fill="#999"/><path d="M23.7,106.7l-6.4-.4c-.4,0-.6-.2-.6-.3v-4.4h7Z" fill="#999"/><path d="M16.3,106.6h0Z" fill="#999"/><line x1="18.7" y1="67.4" x2="52.7" y2="61.6" fill="#fff"/><path d="M20.6,71.2l29.1-4.7,3.2-5-3.6-3.4L20.2,62.7l-3.1,4.4ZM49,65.5,21,70l-1.8-2.2,31.9-5.5ZM20.8,63.8,49,59.3l2,1.9L18.7,66.7Z" fill="#4d4d4d"/><polygon points="45.9 50.6 48.5 50.2 50.4 52 47.5 52.5 47.9 53 47 53.7 50 53.1 48.6 56.1 22.1 60.3 20.3 58.3 34.6 55.8 34.6 54.7 20 57.2 21.9 54.5 34.8 52.4 34.8 51.3 21.3 53.5 18.3 57.6 21.6 61.5 49.2 57.1 52.3 52.3 48.8 49 45.1 49.7 45.9 50.6" fill="#4d4d4d"/><polygon points="34.3 49.2 23.2 51 21.7 49.2 33.7 47.2 33.7 47.1 33.8 46.1 21 48.2 23.1 45.8 34 44.1 34.1 42.9 22.4 44.8 19.7 48.6 22.8 52.2 34.6 50.3 34.3 49.2" fill="#4d4d4d"/><polygon points="44.9 42.3 47.2 41.9 48.9 43.5 46.5 43.9 46.8 44.2 46.5 45 48.9 44.6 47.3 47.2 45.5 47.4 45 48.6 47.9 48.2 50.3 43.7 47.1 40.8 44 41.3 44.9 42.3" fill="#4d4d4d"/><polygon points="43.8 34.2 46.3 33.8 47.3 35.1 45.3 35.6 45.8 36 45.5 36.6 47.8 36.3 46.3 38.5 44.5 38.8 44 40 47 39.6 49.6 35.4 46.6 32.6 42.8 33.1 43.8 34.2" fill="#4d4d4d"/><polygon points="33.1 40.6 23.5 42.1 22.2 40.6 32.5 38.8 32.5 38.7 32.5 37.7 21.9 39.5 23.4 37.4 32.4 35.9 32.3 34.8 22.8 36.3 20.2 39.9 23.1 43.3 33.4 41.7 33.1 40.6" fill="#4d4d4d"/><polygon points="43.3 27.2 44.8 27 45.5 28.1 43.9 28.5 44.4 29.3 44.3 29.5 46 29.2 44.8 31.1 43.4 31.3 42.8 32.5 45.5 32.1 47.9 28.4 45.1 25.9 42.8 26.4 43.3 27.2" fill="#4d4d4d"/><polygon points="31.9 33 25 34.2 23.9 32.9 31.5 31.6 31.5 31.5 31.6 30.5 23.7 31.8 24.9 30.1 31.8 29 31.9 27.9 24.3 29.1 22 32.3 24.5 35.3 32.2 34.1 31.9 33" fill="#4d4d4d"/><polyline points="45.2 57.7 44.5 57.3 47.3 53.2 44.1 49.2 46.1 44.7 43 41.2 44.8 36.4 41.8 33.1 43.6 29.2 42 26.5 42.6 26.1 44.4 29.2 42.6 33 45.8 36 43.8 41.1 47 44.4 44.9 49.1 48.3 53.2" fill="#4d4d4d"/><path d="M32,28h0c.2,0,.4.2.3.4L32,30.9l.8,3.3h.1v3.9L34.2,42h0l-.4,4.5L35,50.7v.2l-.3,4.4.8,3.4c.1.2-.1.4-.3.4s-.3-.1-.4-.3L34,55.4h0l.2-4.4-1.1-4.1c-.1-.1-.1-.1-.1-.2l.5-4.5-1.2-3.7h0l-.2-4L31.3,31h0l.3-2.6C31.6,28.1,31.8,28,32,28Z" fill="#4d4d4d"/><line x1="15.7" y1="87.5" x2="56.3" y2="81.4" fill="#fff"/><path d="M52.5,86,19.3,91l-2.6-3.1,38.4-5.8ZM19.2,83.5l33.3-5L55.1,81,16.9,86.7Zm-.8,8.7,34.3-5.1L57,81.3l-4.2-4L18.6,82.5l-3.6,5Z" fill="#4d4d4d"/><line x1="17.5" y1="77.4" x2="53.9" y2="71.2" fill="#fff"/><path d="M20,81.4l31.2-5,3.4-5.3-3.8-3.6L19.6,72.4l-3.3,4.7Zm30.5-6L20.4,80.2l-2-2.4,34.4-5.9ZM20.2,73.5l30.2-4.9,1.9,2.2-34.4,6Z" fill="#4d4d4d"/><path d="M17.3,107.4l7.5.5H46.5l6.7-.5a1.7,1.7,0,0,0,1.9-1.4v-5.6H15.4V106A1.7,1.7,0,0,0,17.3,107.4ZM53.7,106c0,.1-.3.3-.6.3l-5.8.4v-5.1h6.4Zm-29.2-4.4H45.9v5.2H24.5Zm-7.7,0h6.3v5.2l-5.7-.5c-.4,0-.6-.2-.6-.3Z" fill="#4d4d4d"/><path d="M14.9,91.4H56.2l1.3,7.2a1.9,1.9,0,0,1-.4,1.8,3.7,3.7,0,0,1-2.6.9H16a2.7,2.7,0,0,1-2.1-.9,2.4,2.4,0,0,1-.5-1.8Zm40.4,1.1H15.8l-1.3,6.3a1.1,1.1,0,0,0,.3.9,1.5,1.5,0,0,0,1.2.5H55a1.7,1.7,0,0,0,1.2-.5,1.6,1.6,0,0,0,.3-.9Z" fill="#4d4d4d"/></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
			case '41':
			case '42':
			case '43':
			case '44':
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M49.6,71.4H20.1l1.4,42.3,5.4,22.9c0,1.8,3.7,3.3,8.1,3.3s8.1-1.5,8.1-3.3c0-.2,5.1-25.9,5.1-25.9Z" fill="#999"/><path d="M22.6,113.6c5.4,22.8,5.4,22.9,5.4,23s3.1,2.7,7.5,2.7,7.6-1.4,7.6-2.7,0-.2,5-26L49.6,72H21.2Zm12.9,26.8c-4.8,0-8.5-1.6-8.6-3.7s-3.6-15.3-5.4-22.9h0L20.1,70.8H50.7l-1.5,40c-1.7,8.6-4.9,25-5,25.8S40.4,140.4,35.5,140.4Z" fill="#4d4d4d"/><line x1="54.9" y1="75.9" x2="14.2" y2="82" fill="#fff"/><path d="M18,77.3l33.2-5,2.6,3.2L15.4,81.3Zm33.3,2.6L18,84.9l-2.6-2.5,38.2-5.8Zm.3-8.8L17.8,76.3l-4.3,5.8L17.7,86l34.2-5.1,3.6-5Z"/><line x1="53" y1="86" x2="16.6" y2="92.2" fill="#fff"/><path d="M50.5,81.9l-31.2,5-3.4,5.4,3.8,3.6,31.2-5,3.3-4.6ZM20,87.9l30.1-4.8,2,2.5L17.7,91.4Zm30.3,2L20.1,94.7l-2.3-2.1,34.8-6Z"/><polygon points="16.6 92.2 19.6 87.4 50.3 82.5 53.5 86.3 16.6 92.2" fill="#e6e6e6"/><polygon points="17.8 101.8 20.7 97.3 49.3 92.8 52.2 96.3 17.8 101.8" fill="#e6e6e6"/><polygon points="48.4 103.1 21.9 107.3 20 110.2 23.4 109.7 25.7 106.6 35 105.2 35.8 107.5 50.1 105.1 48.4 103.1" fill="#e6e6e6"/><polygon points="47.3 112.4 36.2 114.1 36.8 116.2 48.8 114.1 47.3 112.4" fill="#e6e6e6"/><polygon points="21.6 118.8 24 118.3 25 115.9 23.2 116.2 21.6 118.8" fill="#e6e6e6"/><polygon points="22.7 127.1 25 126.7 26 124.5 24.2 124.8 22.7 127.1" fill="#e6e6e6"/><polygon points="47 121.2 37.4 122.8 37.9 124.6 48.3 122.8 47 121.2" fill="#e6e6e6"/><polygon points="24.5 134.1 26.2 133.8 27.1 132.1 25.7 132.3 24.5 134.1" fill="#e6e6e6"/><polygon points="45.7 129.2 38.8 130.3 39.2 131.7 46.7 130.4 45.7 129.2" fill="#e6e6e6"/><polygon points="14.2 82 17.6 76.8 51.4 71.7 54.8 75.9 14.2 82" fill="#e6e6e6"/><rect x="23.9" y="56.1" width="21.8" height="6.16" fill="#e6e6e6"/><path d="M54.6,63.1h-39a1.3,1.3,0,0,0-1.2.6.8.8,0,0,0-.3.8l1.2,6.3H54.8L56,64.6a1,1,0,0,0-.2-.9A1.4,1.4,0,0,0,54.6,63.1Z" fill="#e6e6e6"/><polygon points="52.2 95.8 49.4 100.3 20.8 104.8 17.8 101.3 52.2 95.8" fill="#999"/><polygon points="50.5 106.1 35.8 108.7 35.7 110.9 48.6 108.9 50.5 106.1" fill="#999"/><polygon points="22 113.1 24.6 112.7 23 110.9 20.1 111.3 22 113.1" fill="#999"/><polygon points="23.3 121.4 25.6 121 24 119.5 21.6 119.9 23.3 121.4" fill="#999"/><polygon points="49.6 115.2 37.2 117.3 37 119.3 47.9 117.6 49.6 115.2" fill="#999"/><polygon points="48.6 123.9 38 125.7 38.1 127.4 47.1 126 48.6 123.9" fill="#999"/><polygon points="24.2 129.6 26.8 129.2 25.2 127.8 22.8 128.2 24.2 129.6" fill="#999"/><polygon points="46.9 131.5 39 132.9 38.8 134.3 45.7 133.2 46.9 131.5" fill="#999"/><polygon points="25.6 136.5 27.2 136.1 26.5 134.9 24.8 135.3 25.6 136.5" fill="#999"/><polygon points="55.1 75.5 51.7 80.7 17.9 85.8 14.5 81.6 55.1 75.5" fill="#999"/><polygon points="53.5 85.7 50.4 90.4 19.8 95.3 16.6 91.6 53.5 85.7" fill="#999"/><path d="M23.6,56.6,17,57c-.5,0-.7.2-.7.4v4.4h7.3Z" fill="#999"/><path d="M16.2,56.8Z" fill="#999"/><path d="M46.8,56.6l6.4.4c.4,0,.6.2.6.4v4.4h-7Z" fill="#999"/><path d="M54.2,56.8h0Z" fill="#999"/><line x1="51.8" y1="96" x2="17.8" y2="101.8" fill="#fff"/><path d="M49.9,92.2,20.8,96.8l-3.2,5.1,3.6,3.4,29.1-4.7,3.1-4.4ZM21.5,97.8l28-4.4,1.8,2.2L19.4,101Zm28.2,1.8-28.1,4.5-2.1-2,32.3-5.5Z" fill="#4d4d4d"/><polygon points="24.6 112.7 22 113.1 20.1 111.3 23 110.9 22.6 110.4 23.5 109.7 20.5 110.2 21.9 107.3 48.5 103 50.2 105.1 35.9 107.5 35.9 108.7 50.5 106.1 48.6 108.9 35.7 110.9 35.7 112.1 49.2 109.9 52.2 105.7 48.9 101.9 21.3 106.3 18.2 111.1 21.7 114.3 25.4 113.7 24.6 112.7" fill="#4d4d4d"/><polygon points="36.2 114.1 47.3 112.4 48.8 114.1 36.8 116.2 36.8 116.3 36.7 117.3 49.5 115.2 47.4 117.6 36.5 119.3 36.4 120.4 48.1 118.6 50.8 114.8 47.7 111.2 35.9 113.1 36.2 114.1" fill="#4d4d4d"/><polygon points="25.6 121 23.3 121.4 21.6 119.9 24 119.5 23.7 119.2 24 118.3 21.6 118.8 23.2 116.2 25 115.9 25.5 114.7 22.6 115.2 20.2 119.6 23.4 122.6 26.5 122 25.6 121" fill="#4d4d4d"/><polygon points="26.7 129.2 24.2 129.6 23.2 128.2 25.2 127.8 24.7 127.3 25 126.7 22.7 127.1 24.2 124.8 26 124.5 26.6 123.3 23.5 123.8 20.9 128 23.9 130.8 27.7 130.2 26.7 129.2" fill="#4d4d4d"/><polygon points="37.4 122.8 47 121.2 48.3 122.8 38 124.6 38 124.7 38.1 125.7 48.6 123.9 47.1 126 38.1 127.4 38.2 128.6 47.8 127 50.3 123.4 47.4 120 37.1 121.7 37.4 122.8" fill="#4d4d4d"/><polygon points="27.2 136.1 25.7 136.3 25 135.3 26.6 134.9 26.1 134.1 26.2 133.8 24.5 134.1 25.7 132.3 27.1 132.1 27.7 130.9 25 131.3 22.6 135 25.4 137.5 27.7 137 27.2 136.1" fill="#4d4d4d"/><polygon points="38.6 130.3 45.5 129.2 46.6 130.4 39 131.7 39 131.8 38.9 132.9 46.8 131.5 45.6 133.2 38.7 134.3 38.6 135.5 46.2 134.2 48.5 131 46 128 38.3 129.2 38.6 130.3" fill="#4d4d4d"/><polyline points="25.3 105.6 26 106.1 23.2 110.1 26.4 114.2 24.4 118.7 27.5 122.1 25.7 127 28.8 130.2 26.9 134.1 28.5 136.9 27.9 137.2 26.1 134.2 27.9 130.4 24.7 127.3 26.7 122.3 23.5 119 25.6 114.3 22.2 110.2" fill="#4d4d4d"/><path d="M38.5,135.4h0c-.2,0-.4-.2-.3-.4l.3-2.5-.8-3.3h-.1v-3.9l-1.2-3.8v-.2l.4-4.5-1.1-4.1h-.1l.3-4.4-.8-3.4c-.1-.2.1-.4.3-.5s.4.1.4.3l.8,3.5h0l-.2,4.4,1.1,4.1a.1.1,0,0,1,.1.1l-.5,4.5,1.2,3.8h0l.2,3.9.8,3.4h0l-.3,2.6C38.9,135.3,38.7,135.4,38.5,135.4Z" fill="#4d4d4d"/><line x1="54.9" y1="75.9" x2="14.2" y2="82" fill="#fff"/><path d="M18,77.3l33.2-5,2.6,3.2L15.4,81.3Zm33.3,2.6L18,84.9l-2.6-2.5,38.2-5.8Zm.8-8.8L17.8,76.3l-4.3,5.8L17.7,86l34.2-5.1,3.6-5Z" fill="#4d4d4d"/><line x1="53" y1="86" x2="16.6" y2="92.2" fill="#fff"/><path d="M50.5,81.9l-31.2,5-3.4,5.4,3.8,3.6,31.2-5,3.3-4.6ZM20,87.9l30.1-4.8,2,2.5L17.7,91.4Zm30.3,2L20.1,94.7l-1.9-2.1,34.4-6Z" fill="#4d4d4d"/><path d="M53.2,55.9l-7.5-.5H24l-6.7.5c-1.1.1-1.9.7-1.9,1.5v5.5H55.1V57.4C55.1,56.6,54.3,56,53.2,55.9ZM16.8,57.4c0-.2.3-.4.6-.4l5.8-.4v5.2H16.8ZM46,61.8H24.6V56.6H46Zm7.7,0H47.4V56.6l5.7.4c.4.1.6.2.6.4Z" fill="#4d4d4d"/><path d="M55.6,72H14.3L13,64.7a2.1,2.1,0,0,1,.4-1.7A3.8,3.8,0,0,1,16,62H54.5a2.8,2.8,0,0,1,2.1,1,2.3,2.3,0,0,1,.5,1.8ZM15.2,70.8H54.7L56,64.6c0-.3,0-.7-.3-.9a1.3,1.3,0,0,0-1.2-.6h-39a1.4,1.4,0,0,0-1.2.6,1.1,1.1,0,0,0-.3.8Z" fill="#4d4d4d"/></svg>
				);
				break;
			case '36':
			case '37':
			case '38':
			case '46':
			case '47':
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M51.8,73.4H17.4l1.7,42.3,6.3,22.9c0,1.8,4.2,3.3,9.4,3.3s9.4-1.5,9.4-3.3c0-.2,5.9-25.9,5.9-25.9Z" fill="#999"/><path d="M20.3,115.6c6.3,22.8,6.3,22.9,6.3,23s3.6,2.7,8.8,2.7,8.8-1.4,8.8-2.7,0-.2,5.9-26L51.7,74h-33Zm15.1,26.8c-5.7,0-10-1.6-10.1-3.7s-4.2-15.3-6.3-22.9h0L17.4,72.8H53.1l-1.8,40c-1.9,8.6-5.7,25-5.9,25.8S41.1,142.4,35.4,142.4Z" fill="#4d4d4d"/><line x1="57.9" y1="77.9" x2="10.5" y2="84" fill="#fff"/><path d="M14.9,79.3l38.7-5,3.1,3.2L11.9,83.3Zm38.9,2.6L15,86.9l-3.1-2.5,44.6-5.8Zm.3-8.8L14.7,78.3l-5,5.8L14.5,88l40-5.1,4.2-5Z"/><line x1="55.7" y1="88" x2="13.3" y2="94.2" fill="#fff"/><path d="M52.9,83.9l-36.4,5-4.1,5.4,4.5,3.6,36.4-5,3.8-4.6Zm-35.7,6,35.1-4.8,2.4,2.5L14.6,93.4Zm35.4,2L17.4,96.7l-2.7-2.1,40.6-6Z"/><polygon points="13.3 94.2 16.8 89.4 52.6 84.5 56.3 88.3 13.3 94.2" fill="#e6e6e6"/><polygon points="14.7 103.8 18.1 99.3 51.4 94.8 54.8 98.3 14.7 103.8" fill="#e6e6e6"/><polygon points="50.3 105.1 19.4 109.3 17.2 112.2 21.2 111.7 23.9 108.6 34.8 107.2 35.7 109.5 52.4 107.1 50.3 105.1" fill="#e6e6e6"/><polygon points="49.1 114.4 36.2 116.1 36.8 118.2 50.8 116.1 49.1 114.4" fill="#e6e6e6"/><polygon points="19.1 120.8 22 120.3 23.1 117.9 21 118.2 19.1 120.8" fill="#e6e6e6"/><polygon points="20.4 129.1 23.1 128.7 24.3 126.5 22.2 126.8 20.4 129.1" fill="#e6e6e6"/><polygon points="48.7 123.2 37.5 124.8 38.2 126.6 50.2 124.8 48.7 123.2" fill="#e6e6e6"/><polygon points="22.5 136.1 24.5 135.8 25.6 134.1 23.9 134.3 22.5 136.1" fill="#e6e6e6"/><polygon points="47.2 131.2 39.2 132.3 39.6 133.7 48.4 132.4 47.2 131.2" fill="#e6e6e6"/><polygon points="10.5 84 14.5 78.8 53.9 73.7 57.9 77.9 10.5 84" fill="#e6e6e6"/><rect x="21.8" y="58.1" width="25.5" height="6.16" fill="#e6e6e6"/><path d="M57.6,65.1H12.1a1.7,1.7,0,0,0-1.4.6.7.7,0,0,0-.3.8l1.3,6.3H57.8l1.5-6.2a.8.8,0,0,0-.3-.9A1.7,1.7,0,0,0,57.6,65.1Z" fill="#e6e6e6"/><polygon points="54.8 97.8 51.5 102.3 18.2 106.8 14.7 103.3 54.8 97.8" fill="#999"/><polygon points="52.8 108.1 35.7 110.7 35.6 112.9 50.6 110.9 52.8 108.1" fill="#999"/><polygon points="19.6 115.1 22.6 114.7 20.7 112.9 17.4 113.3 19.6 115.1" fill="#999"/><polygon points="21.1 123.4 23.8 123 21.9 121.5 19.2 121.9 21.1 123.4" fill="#999"/><polygon points="51.8 117.2 37.4 119.3 37.1 121.3 49.8 119.6 51.8 117.2" fill="#999"/><polygon points="50.6 125.9 38.3 127.7 38.4 129.4 48.9 128 50.6 125.9" fill="#999"/><polygon points="22.2 131.6 25.1 131.2 23.4 129.8 20.5 130.2 22.2 131.6" fill="#999"/><polygon points="48.6 133.5 39.4 134.9 39.2 136.3 47.2 135.2 48.6 133.5" fill="#999"/><polygon points="23.8 138.5 25.6 138.1 24.9 136.9 22.9 137.3 23.8 138.5" fill="#999"/><polygon points="58.2 77.5 54.2 82.7 14.9 87.8 10.8 83.6 58.2 77.5" fill="#999"/><polygon points="56.3 87.7 52.7 92.4 17 97.3 13.3 93.6 56.3 87.7" fill="#999"/><path d="M21.4,58.6l-7.7.4c-.5,0-.8.2-.8.4v4.4h8.5Z" fill="#999"/><path d="M12.8,58.8Z" fill="#999"/><path d="M48.5,58.6,56,59c.4,0,.7.2.7.4v4.4H48.5Z" fill="#999"/><path d="M57.2,58.8Z" fill="#999"/><line x1="54.3" y1="98" x2="14.7" y2="103.8" fill="#fff"/><path d="M52.2,94.2l-34,4.6-3.8,5.1,4.3,3.4,33.9-4.7,3.6-4.4ZM19,99.8l32.7-4.4,2.1,2.2L16.6,103Zm32.9,1.8-32.8,4.5-2.5-2,37.7-5.5Z" fill="#4d4d4d"/><polygon points="22.6 114.7 19.6 115.1 17.4 113.3 20.8 112.9 20.3 112.4 21.3 111.7 17.8 112.2 19.5 109.3 50.4 105 52.4 107.1 35.8 109.5 35.7 110.7 52.9 108.1 50.6 110.9 35.6 112.9 35.5 114.1 51.4 111.9 54.8 107.7 50.9 103.9 18.8 108.3 15.1 113.1 19.2 116.3 23.6 115.7 22.6 114.7" fill="#4d4d4d"/><polygon points="36.2 116.1 49.1 114.4 50.8 116.1 36.8 118.2 36.9 118.3 36.8 119.3 51.7 117.2 49.2 119.6 36.5 121.3 36.4 122.4 50 120.6 53.1 116.8 49.6 113.2 35.8 115.1 36.2 116.1" fill="#4d4d4d"/><polygon points="23.8 123 21.1 123.4 19.2 121.9 21.9 121.5 21.6 121.2 22 120.3 19.1 120.8 21 118.2 23.1 117.9 23.7 116.7 20.2 117.2 17.4 121.6 21.2 124.6 24.9 124 23.8 123" fill="#4d4d4d"/><polygon points="25.1 131.2 22.2 131.6 21 130.2 23.4 129.8 22.8 129.3 23.1 128.7 20.4 129.1 22.2 126.8 24.3 126.5 24.9 125.3 21.4 125.8 18.3 130 21.8 132.8 26.2 132.2 25.1 131.2" fill="#4d4d4d"/><polygon points="37.6 124.8 48.7 123.2 50.3 124.8 38.2 126.6 38.3 126.7 38.3 127.7 50.6 125.9 48.9 128 38.4 129.4 38.5 130.6 49.6 129 52.6 125.4 49.2 122 37.2 123.7 37.6 124.8" fill="#4d4d4d"/><polygon points="25.7 138.1 23.9 138.3 23.1 137.3 24.9 136.9 24.4 136.1 24.5 135.8 22.5 136.1 23.9 134.3 25.6 134.1 26.3 132.9 23.1 133.3 20.4 137 23.5 139.5 26.2 139 25.7 138.1" fill="#4d4d4d"/><polygon points="39 132.3 47 131.2 48.2 132.4 39.4 133.7 39.5 133.8 39.3 134.9 48.5 133.5 47.1 135.2 39.1 136.3 38.9 137.5 47.9 136.2 50.5 133 47.5 130 38.6 131.2 39 132.3" fill="#4d4d4d"/><polyline points="23.5 107.6 24.3 108.1 20.9 112.1 24.8 116.2 22.3 120.7 26.1 124.1 23.9 129 27.5 132.2 25.4 136.1 27.2 138.9 26.4 139.2 24.4 136.2 26.4 132.4 22.8 129.3 25.1 124.3 21.3 121 23.8 116.3 19.9 112.2" fill="#4d4d4d"/><path d="M38.9,137.4h-.1a.4.4,0,0,1-.4-.4l.4-2.5-.9-3.3h-.1l-.2-3.9-1.3-3.8v-.2l.5-4.5-1.4-4.1h0l.3-4.4-1-3.4a.5.5,0,0,1,.3-.5.6.6,0,0,1,.6.3l.9,3.5h0l-.3,4.4,1.4,4.1h0l-.5,4.5,1.4,3.8h0l.2,3.9,1,3.4h0l-.4,2.6C39.2,137.3,39.1,137.4,38.9,137.4Z" fill="#4d4d4d"/><line x1="57.9" y1="77.9" x2="10.5" y2="84" fill="#fff"/><path d="M14.9,79.3l38.7-5,3.1,3.2L11.9,83.3Zm38.9,2.6L15,86.9l-3.1-2.5,44.6-5.8Zm.8-8.8L14.7,78.3l-5,5.8L14.5,88l40-5.1,4.2-5Z" fill="#4d4d4d"/><line x1="55.7" y1="88" x2="13.3" y2="94.2" fill="#fff"/><path d="M52.9,83.9l-36.4,5-4.1,5.4,4.5,3.6,36.4-5,3.8-4.6Zm-35.7,6,35.1-4.8,2.4,2.5L14.6,93.4Zm35.4,2L17.4,96.7l-2.2-2.1,40.1-6Z" fill="#4d4d4d"/><path d="M56,57.9l-8.7-.5H21.9l-7.8.5c-1.2.1-2.2.7-2.2,1.5v5.5H58.2V59.4C58.2,58.6,57.2,58,56,57.9ZM13.6,59.4c0-.2.2-.4.7-.4l6.7-.4v5.2H13.6Zm34,4.4h-25V58.6h25Zm9,0H49.2V58.6l6.6.4c.5.1.8.2.8.4Z" fill="#4d4d4d"/><path d="M58.8,74H10.6L9.1,66.7A1.6,1.6,0,0,1,9.6,65a4.8,4.8,0,0,1,2.9-1h45a3.1,3.1,0,0,1,2.4,1,2,2,0,0,1,.6,1.8ZM11.7,72.8h46l1.5-6.2a.8.8,0,0,0-.3-.9,1.7,1.7,0,0,0-1.4-.6H12a1.8,1.8,0,0,0-1.4.6,1.1,1.1,0,0,0-.3.8Z" fill="#4d4d4d"/></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getHexagonalInterSvg = (icon) => {
		switch(icon) {
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
			case '17':
			case '18':
			case '21':
			case '22':
			case '23':
			case '24':
			case '25':
			case '26':
			case '27':
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="5589f174-96ae-4199-9a34-38a24e4af86a" data-name="Incisivo"><path d="M19.8,96.8H49.9L48.5,52.9S43,29.2,43,29.1c0-1.9-3.7-3.4-8.3-3.4s-8.2,1.5-8.2,3.4c0,.2-5.2,26.9-5.2,26.9Z" fill="#999"/><path d="M34.6,25c5,0,8.8,1.7,8.8,3.9s3.7,15.8,5.5,23.7H49l1.4,44.6H19.2l1.5-41.5c1.7-9,5-26,5.1-26.9S29.7,25,34.6,25ZM47.8,52.8C42.3,29.2,42.3,29.1,42.3,29s-3.1-2.9-7.7-2.9S27,27.6,27,29s0,.2-5.2,26.9L20.3,96.1H49.2Z" fill="#4d4d4d"/><polygon points="17 71.3 19.9 66.7 49 61.9 52 65.6 17 71.3" fill="#b3b3b3"/><polygon points="55.7 85.7 52.2 91.1 17.8 96.3 14.3 92 55.7 85.7" fill="#fff"/><line x1="14.3" y1="92" x2="55.7" y2="85.7" fill="#fff"/><path d="M17.6,96.9l34.9-5.3,3.9-6-4.2-4.1L17.3,86.8,13.6,92Zm34.3-6.4L18,95.7l-2.6-3.3,39.1-6Zm-34-2.6,33.9-5.2,2.7,2.6-39,5.9Z"/><polygon points="53.3 75.1 50.2 80 18.9 85.1 15.7 81.2 53.3 75.1" fill="#e6e6e6"/><line x1="16.2" y1="81.5" x2="53.3" y2="75.1" fill="#fff"/><path d="M18.7,85.7l31.8-5.2L54,75l-3.9-3.8L18.3,76.4,15,81.2Zm31.1-6.2-30.7,5-2-2.5,35-6.1Zm-30.9-2,30.8-5,2.4,2.2L16.6,80.9Z"/><polygon points="52 65.1 49.1 69.7 20 74.5 17 70.8 52 65.1" fill="#e6e6e6"/><line x1="17.4" y1="71.2" x2="52" y2="65.1" fill="#fff"/><path d="M19.8,75.1l29.6-4.8L52.8,65,49,61.5,19.4,66.3l-3.2,4.6Zm29-5.9L20.2,73.9l-1.9-2.3,32.6-5.7ZM20,67.4l28.7-4.7,2.1,2.1L17.9,70.5Z" fill="#4d4d4d"/><polygon points="20.9 63.8 47.9 59.4 49.8 56.3 46.4 56.9 44 60.1 34.5 61.6 33.7 59.2 19.1 61.7 20.9 63.8" fill="#e6e6e6"/><polygon points="18.7 60.6 33.7 58 33.8 55.6 20.7 57.8 18.7 60.6" fill="#b3b3b3"/><polygon points="47.8 53.3 45.1 53.8 46.8 55.7 49.7 55.2 47.8 53.3" fill="#b3b3b3"/><polygon points="45.1 53.8 47.8 53.3 49.7 55.2 46.7 55.7 47.1 56.2 46.3 57 49.8 56.3 47.8 59.4 20.8 63.8 19.1 61.7 33.6 59.2 33.7 58 18.7 60.6 20.6 57.8 33.8 55.6 33.8 54.4 20 56.7 17 61 20.4 65.1 48.5 60.5 51.7 55.5 48.1 52.1 44.3 52.7 45.1 53.8" fill="#4d4d4d"/><polygon points="22 54.1 33.3 52.3 32.7 50.2 20.5 52.3 22 54.1" fill="#e6e6e6"/><polygon points="46.5 44.7 44.1 45.1 45.7 46.8 48.2 46.3 46.5 44.7" fill="#b3b3b3"/><polygon points="20.1 51.2 32.8 49 33 46.9 21.9 48.7 20.1 51.2" fill="#b3b3b3"/><polygon points="48.2 47.5 45.7 47.9 44.7 50.5 46.5 50.2 48.2 47.5" fill="#e6e6e6"/><polygon points="33.3 52.3 22 54.1 20.5 52.3 32.7 50.2 32.7 50.1 32.8 49 20.1 51.2 21.9 48.7 33 46.9 33.1 45.8 21.2 47.7 18.5 51.7 21.6 55.4 33.6 53.4 33.3 52.3" fill="#4d4d4d"/><polygon points="44.1 45.1 46.5 44.7 48.2 46.3 45.7 46.8 46.1 47.1 45.7 47.9 48.2 47.5 46.5 50.2 44.7 50.5 44.2 51.7 47.2 51.2 50.1 46.6 46.8 43.5 43.1 44.1 44.1 45.1" fill="#4d4d4d"/><polygon points="47 38.8 44.7 39.2 43.7 41.5 45.5 41.2 47 38.8" fill="#e6e6e6"/><polygon points="21.1 42.2 31.9 40.3 31.8 38.5 22.6 40 21.1 42.2" fill="#b3b3b3"/><polygon points="45.5 36.3 42.9 36.7 44.5 38.1 47 37.7 45.5 36.3" fill="#b3b3b3"/><polygon points="22.7 44.9 32.5 43.3 31.9 41.5 21.4 43.3 22.7 44.9" fill="#e6e6e6"/><polygon points="43 36.7 45.5 36.3 47 37.7 44.5 38.1 45 38.6 44.7 39.2 47 38.8 45.5 41.2 43.7 41.5 43.1 42.8 46.2 42.3 48.9 38 45.8 35 42 35.6 43 36.7" fill="#4d4d4d"/><polygon points="32.5 43.3 22.7 44.9 21.4 43.3 31.9 41.5 31.9 41.3 31.9 40.3 21.1 42.2 22.6 40 31.8 38.5 31.7 37.3 22 38.9 19.4 42.7 22.3 46.2 32.8 44.4 32.5 43.3" fill="#4d4d4d"/><polygon points="45.2 31.5 43.4 31.8 42.6 33.7 44 33.4 45.2 31.5" fill="#e6e6e6"/><polygon points="22.9 34.2 31 32.8 31.2 31.4 24.2 32.5 22.9 34.2" fill="#b3b3b3"/><polygon points="24.3 36.7 31.3 35.5 30.9 34 23.2 35.4 24.3 36.7" fill="#e6e6e6"/><polygon points="42.4 29.5 44 29.3 45.2 30.4 43.1 30.7 43.6 31.6 43.4 31.8 45.2 31.5 44 33.4 42.6 33.7 41.9 34.9 44.7 34.5 47.1 30.7 44.4 28 42 28.6 42.4 29.5" fill="#4d4d4d"/><polygon points="31.3 35.5 24.3 36.7 23.2 35.4 30.9 34 30.8 33.9 31 32.8 22.9 34.2 24.2 32.5 31.2 31.4 31.3 30.2 23.5 31.4 21.2 34.8 23.8 37.9 31.6 36.6 31.3 35.5" fill="#4d4d4d"/><polygon points="44 29.3 42.7 29.5 43.4 30.7 45.2 30.4 44 29.3" fill="#b3b3b3"/><polyline points="44.4 61.2 43.7 60.6 46.6 56.5 43.3 52.3 45.4 47.6 42.1 44 44 39 40.9 35.6 42.7 31.5 41.2 28.7 41.8 28.3 43.6 31.5 41.8 35.4 45 38.6 43 43.8 46.3 47.3 44.1 52.2 47.5 56.4" fill="#4d4d4d"/><path d="M31.2,30.2h.1c.2,0,.3.2.3.5l-.3,2.6.8,3.4h0l.2,4.1,1.2,3.9h0l-.4,4.7,1.2,4.3h0L34,58.6l.9,3.5a.4.4,0,1,1-.8.2l-.8-3.6h0l.2-4.6-1.2-4.2v-.2l.5-4.7L31.6,41h0l-.2-4-.9-3.5v-.2l.4-2.6A.4.4,0,0,1,31.2,30.2Z" fill="#4d4d4d"/><polygon points="14 92.4 17.5 87 51.9 81.8 55.4 86.1 14 92.4" fill="#b3b3b3"/><polygon points="55.7 85.7 52.2 91.1 17.8 96.3 14.3 92 55.7 85.7" fill="#e6e6e6"/><line x1="14.3" y1="92" x2="55.7" y2="85.7" fill="#fff"/><path d="M17.6,96.9l34.9-5.3,3.9-6-4.2-4.1L17.3,86.8,13.6,92Zm34.3-6.4L18,95.7l-2.6-3.3,39.1-6Zm-34-2.6,33.9-5.2,2.7,2.6-39,5.9Z" fill="#4d4d4d"/><polygon points="15.7 81.9 18.8 76.9 50.1 71.8 53.3 75.7 15.7 81.9" fill="#b3b3b3"/><line x1="16.2" y1="81.5" x2="53.3" y2="75.1" fill="#fff"/><path d="M18.7,85.7l31.8-5.2L54,75l-3.9-3.8L18.3,76.4,15,81.2Zm31.1-6.2-30.7,5-2-2.5,35-6.1Zm-30.9-2,30.8-5,2.4,2.2L16.6,80.9Z" fill="#4d4d4d"/><path d="M18.2,97.1H50.8a4.2,4.2,0,0,1,4.2,4.2v4.8a0,0,0,0,1,0,0H14.6a0,0,0,0,1,0,0v-5.4A3.6,3.6,0,0,1,18.2,97.1Z" transform="translate(69.6 203.1) rotate(180)" fill="#e6e6e6"/><path d="M14.1,96.6H55.5v7a3.1,3.1,0,0,1-3,3H17a3,3,0,0,1-2.9-3Zm40.3,1H15.1v6a1.9,1.9,0,0,0,1.9,1.9H52.5a1.8,1.8,0,0,0,1.9-1.9Z" fill="#4d4d4d"/></g></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
			case '41':
			case '42':
			case '43':
			case '44':
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="f5ffd488-0df5-4c8a-8f58-d0c5491f7121" data-name="Incisivo"><path d="M50.7,67.3H20.6l1.5,44L27.6,135c0,1.9,3.7,3.5,8.2,3.5s8.3-1.6,8.3-3.5l5.1-26.9Z" fill="#999"/><path d="M35.9,139.2c-5,0-8.7-1.7-8.8-4s-3.7-15.8-5.5-23.7h0L20.1,66.9H51.4l-1.6,41.5c-1.7,8.9-5,25.9-5.1,26.8S40.9,139.2,35.9,139.2ZM22.7,111.3c5.5,23.7,5.5,23.8,5.5,23.9s3.2,2.8,7.7,2.8,7.7-1.5,7.7-2.8,0-.3,5.1-27L50.2,68H21.3Z" fill="#4d4d4d"/><polygon points="53.6 92.8 50.7 97.5 21.5 102.2 18.5 98.6 53.6 92.8" fill="#b3b3b3"/><polygon points="14.8 78.5 18.3 73.1 52.7 67.8 56.2 72.1 14.8 78.5" fill="#fff"/><line x1="56.2" y1="72.1" x2="14.8" y2="78.5" fill="#fff"/><path d="M52.9,67.2,18,72.5l-3.9,6.1,4.2,4.1,35-5.4L57,72.1ZM18.7,73.6l33.8-5.2,2.7,3.3L16,77.7Zm33.9,2.6L18.7,81.4l-2.6-2.5,38.9-6Z"/><polygon points="17.2 89.1 20.4 84.1 51.6 79 54.9 82.9 17.2 89.1" fill="#e6e6e6"/><line x1="54.4" y1="82.6" x2="17.2" y2="89.1" fill="#fff"/><path d="M51.8,78.4,20,83.6l-3.5,5.6,3.9,3.7,31.8-5.2,3.4-4.8ZM20.7,84.7l30.7-5,2.1,2.5L18.4,88.3Zm30.9,2-30.8,5-2.4-2.3L54,83.3Z"/><polygon points="18.5 99 21.4 94.4 50.5 89.7 53.6 93.3 18.5 99" fill="#e6e6e6"/><line x1="53.1" y1="93" x2="18.5" y2="99" fill="#fff"/><path d="M50.8,89,21.1,93.9l-3.3,5.2,3.7,3.5,29.7-4.8,3.1-4.5Zm-29,5.9,28.5-4.6,1.9,2.3L19.7,98.2Zm28.7,1.8-28.6,4.7-2.2-2,33-5.8Z" fill="#4d4d4d"/><polygon points="49.6 100.3 22.6 104.7 20.7 107.8 24.2 107.2 26.5 104.1 36 102.6 36.9 105 51.4 102.4 49.6 100.3" fill="#e6e6e6"/><polygon points="51.8 103.5 36.9 106.2 36.7 108.5 49.9 106.4 51.8 103.5" fill="#b3b3b3"/><polygon points="22.8 110.8 25.4 110.4 23.8 108.4 20.8 109 22.8 110.8" fill="#b3b3b3"/><polygon points="25.4 110.4 22.8 110.8 20.8 109 23.8 108.4 23.4 107.9 24.2 107.2 20.8 107.8 22.7 104.7 49.7 100.3 51.5 102.4 36.9 105 36.9 106.2 51.9 103.5 49.9 106.4 36.8 108.5 36.7 109.7 50.5 107.4 53.5 103.1 50.2 99.1 22 103.7 18.9 108.7 22.4 112 26.3 111.4 25.4 110.4" fill="#4d4d4d"/><polygon points="48.5 110 37.2 111.8 37.8 113.9 50 111.8 48.5 110" fill="#e6e6e6"/><polygon points="24.1 119.4 26.4 119 24.8 117.4 22.4 117.8 24.1 119.4" fill="#b3b3b3"/><polygon points="50.4 112.9 37.8 115.1 37.6 117.2 48.7 115.4 50.4 112.9" fill="#b3b3b3"/><polygon points="22.3 116.6 24.8 116.2 25.8 113.7 24 114 22.3 116.6" fill="#e6e6e6"/><polygon points="37.2 111.8 48.5 110 50 111.8 37.8 113.9 37.9 114.1 37.8 115.1 50.4 112.9 48.7 115.4 37.6 117.2 37.5 118.4 49.3 116.5 52.1 112.5 49 108.8 36.9 110.7 37.2 111.8" fill="#4d4d4d"/><polygon points="26.4 119 24.1 119.4 22.4 117.8 24.8 117.4 24.5 117.1 24.8 116.2 22.3 116.6 24 114 25.8 113.7 26.3 112.4 23.3 112.9 20.4 117.5 23.7 120.6 27.4 120 26.4 119" fill="#4d4d4d"/><polygon points="23.5 125.3 25.8 124.9 26.8 122.6 25 122.9 23.5 125.3" fill="#e6e6e6"/><polygon points="49.4 122 38.7 123.8 38.8 125.7 47.9 124.2 49.4 122" fill="#b3b3b3"/><polygon points="25 127.9 27.6 127.5 26.1 126 23.5 126.5 25 127.9" fill="#b3b3b3"/><polygon points="47.8 119.2 38 120.8 38.6 122.7 49.1 120.8 47.8 119.2" fill="#e6e6e6"/><polygon points="27.5 127.5 25 127.9 23.5 126.5 26.1 126 25.5 125.6 25.8 124.9 23.5 125.3 25 122.9 26.8 122.6 27.4 121.4 24.3 121.9 21.6 126.2 24.7 129.1 28.5 128.5 27.5 127.5" fill="#4d4d4d"/><polygon points="38 120.8 47.8 119.2 49.1 120.8 38.6 122.7 38.6 122.8 38.7 123.8 49.4 122 47.9 124.2 38.8 125.7 38.8 126.8 48.6 125.2 51.1 121.5 48.2 118 37.7 119.7 38 120.8" fill="#4d4d4d"/><polygon points="25.3 132.6 27.1 132.3 28 130.5 26.5 130.7 25.3 132.6" fill="#e6e6e6"/><polygon points="47.6 129.9 39.6 131.3 39.4 132.8 46.4 131.6 47.6 129.9" fill="#b3b3b3"/><polygon points="46.3 127.5 39.3 128.6 39.7 130.1 47.3 128.8 46.3 127.5" fill="#e6e6e6"/><polygon points="28.1 134.7 26.5 134.9 25.4 133.8 27.4 133.4 27 132.5 27.1 132.3 25.3 132.6 26.5 130.7 28 130.5 28.6 129.2 25.8 129.7 23.4 133.5 26.2 136.1 28.5 135.6 28.1 134.7" fill="#4d4d4d"/><polygon points="39.3 128.6 46.3 127.5 47.3 128.8 39.7 130.1 39.7 130.2 39.6 131.3 47.6 129.9 46.4 131.6 39.4 132.8 39.2 134 47 132.7 49.3 129.4 46.7 126.3 39 127.5 39.3 128.6" fill="#4d4d4d"/><polygon points="26.5 134.9 27.8 134.7 27.1 133.4 25.4 133.8 26.5 134.9" fill="#b3b3b3"/><polyline points="26.1 103 26.9 103.5 23.9 107.7 27.3 111.9 25.2 116.5 28.4 120.1 26.5 125.2 29.6 128.6 27.8 132.6 29.4 135.4 28.7 135.8 27 132.7 28.7 128.7 25.5 125.6 27.5 120.3 24.3 116.8 26.4 112 23 107.7" fill="#4d4d4d"/><path d="M39.3,133.9h-.1c-.2,0-.3-.2-.3-.4l.3-2.6-.8-3.5h0l-.2-4.1L37,119.4v-.2l.5-4.7-1.2-4.2h-.1l.3-4.6-.8-3.6c-.1-.2.1-.4.3-.4s.4,0,.4.2l.8,3.6v.2l-.2,4.5,1.2,4.3h0l-.4,4.7,1.1,3.9a.1.1,0,0,1,.1.1v4.1l.9,3.5h0l-.3,2.7C39.6,133.8,39.5,133.9,39.3,133.9Z" fill="#4d4d4d"/><polygon points="56.5 71.7 53 77.1 18.6 82.4 15.1 78.1 56.5 71.7" fill="#b3b3b3"/><polygon points="14.8 78.5 18.3 73.1 52.7 67.8 56.2 72.1 14.8 78.5" fill="#e6e6e6"/><line x1="56.2" y1="72.1" x2="14.8" y2="78.5" fill="#fff"/><path d="M52.9,67.2,18,72.5l-3.9,6.1,4.2,4.1,35-5.4L57,72.1ZM18.7,73.6l33.8-5.2,2.7,3.3L16,77.7Zm33.9,2.6L18.7,81.4l-2.6-2.5,38.9-6Z" fill="#4d4d4d"/><polygon points="54.9 82.3 51.7 87.2 20.5 92.3 17.2 88.4 54.9 82.3" fill="#b3b3b3"/><line x1="54.4" y1="82.6" x2="17.2" y2="89.1" fill="#fff"/><path d="M51.8,78.4,20,83.6l-3.5,5.6,3.9,3.7,31.8-5.2,3.4-4.8ZM20.7,84.7l30.7-5,2.1,2.5L18.4,88.3Zm30.9,2-30.8,5-2.4-2.3L54,83.3Z" fill="#4d4d4d"/><path d="M19.2,58.1H51.8a4.2,4.2,0,0,1,4.2,4.2v4.8a0,0,0,0,1,0,0H15.6a0,0,0,0,1,0,0V61.7A3.6,3.6,0,0,1,19.2,58.1Z" fill="#e6e6e6"/><path d="M56.4,67.6H15.1v-7a2.9,2.9,0,0,1,2.9-3H53.5a2.9,2.9,0,0,1,2.9,3ZM16.1,66.5H55.4V60.6a2,2,0,0,0-1.9-2H18a2,2,0,0,0-1.9,2Z" fill="#4d4d4d"/></g></svg>
				);
				break;
			case '36':
			case '37':
			case '38':
			case '46':
			case '47':
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="6233836d-9cae-4a17-b76a-f62745aeafa4" data-name="Incisivo"><path d="M52.5,67.3H18.9l1.6,44L26.6,135c0,1.9,4.2,3.5,9.3,3.5s9.2-1.6,9.2-3.5l5.7-26.9Z" fill="#999"/><path d="M35.9,139.2c-5.5,0-9.7-1.7-9.8-4s-4.1-15.8-6.2-23.7h0L18.3,66.9h35l-1.8,41.5-5.7,26.8C45.7,137.5,41.5,139.2,35.9,139.2ZM21.2,111.3c6.1,23.7,6.1,23.8,6.1,23.9s3.6,2.8,8.6,2.8,8.6-1.5,8.6-2.8,0-.3,5.8-27L51.9,68H19.6Z" fill="#4d4d4d"/><polygon points="55.7 92.8 52.5 97.5 19.8 102.2 16.5 98.6 55.7 92.8" fill="#b3b3b3"/><polygon points="12.4 78.5 16.3 73.1 54.8 67.8 58.7 72.1 12.4 78.5" fill="#fff"/><line x1="58.7" y1="72.1" x2="12.4" y2="78.5" fill="#fff"/><path d="M55,67.2,15.9,72.5l-4.4,6.1,4.8,4.1,39.1-5.4,4.1-5.2ZM16.6,73.6l37.9-5.2,3,3.3-43.8,6Zm38.1,2.6-38,5.2-3-2.5,43.6-6Z"/><polygon points="15 89.1 18.5 84.1 53.5 79 57.2 82.9 15 89.1" fill="#e6e6e6"/><line x1="56.6" y1="82.6" x2="15" y2="89.1" fill="#fff"/><path d="M53.8,78.4,18.2,83.6l-4,5.6,4.4,3.7,35.6-5.2L58,82.9ZM18.9,84.7l34.4-5,2.3,2.5L16.3,88.3Zm34.6,2L19,91.7l-2.6-2.3,39.8-6.1Z"/><polygon points="16.5 99 19.7 94.4 52.3 89.7 55.7 93.3 16.5 99" fill="#e6e6e6"/><line x1="55.2" y1="93" x2="16.5" y2="99" fill="#fff"/><path d="M52.6,89,19.4,93.9l-3.7,5.2,4.1,3.5L53,97.8l3.5-4.5ZM20.1,94.9l32-4.6,2.1,2.3L17.8,98.2Zm32.2,1.8-32.1,4.7-2.4-2,36.9-5.8Z" fill="#4d4d4d"/><polygon points="51.3 100.3 21.1 104.7 18.9 107.8 22.8 107.2 25.4 104.1 36.1 102.6 37 105 53.3 102.4 51.3 100.3" fill="#e6e6e6"/><polygon points="53.8 103.5 37 106.2 36.9 108.5 51.6 106.4 53.8 103.5" fill="#b3b3b3"/><polygon points="21.2 110.8 24.2 110.4 22.4 108.4 19 109 21.2 110.8" fill="#b3b3b3"/><polygon points="24.2 110.4 21.3 110.8 19.1 109 22.4 108.4 21.9 107.9 22.9 107.2 19 107.8 21.2 104.7 51.4 100.3 53.4 102.4 37.1 105 37 106.2 53.8 103.5 51.6 106.4 36.9 108.5 36.8 109.7 52.3 107.4 55.7 103.1 51.9 99.1 20.4 103.7 16.9 108.7 20.8 112 25.2 111.4 24.2 110.4" fill="#4d4d4d"/><polygon points="50.1 110 37.5 111.8 38.1 113.9 51.8 111.8 50.1 110" fill="#e6e6e6"/><polygon points="22.7 119.4 25.3 119 23.5 117.4 20.8 117.8 22.7 119.4" fill="#b3b3b3"/><polygon points="52.2 112.9 38 115.1 37.8 117.2 50.2 115.4 52.2 112.9" fill="#b3b3b3"/><polygon points="20.7 116.6 23.5 116.2 24.7 113.7 22.6 114 20.7 116.6" fill="#e6e6e6"/><polygon points="37.5 111.8 50.1 110 51.8 111.8 38.1 113.9 38.1 114.1 38 115.1 52.2 112.9 50.2 115.4 37.8 117.2 37.7 118.4 51 116.5 54 112.5 50.6 108.8 37.1 110.7 37.5 111.8" fill="#4d4d4d"/><polygon points="25.3 119 22.7 119.4 20.8 117.8 23.5 117.4 23.2 117.1 23.5 116.2 20.7 116.6 22.6 114 24.7 113.7 25.2 112.4 21.9 112.9 18.6 117.5 22.3 120.6 26.4 120 25.3 119" fill="#4d4d4d"/><polygon points="22.1 125.3 24.7 124.9 25.8 122.6 23.7 122.9 22.1 125.3" fill="#e6e6e6"/><polygon points="51.1 122 39 123.8 39.1 125.7 49.4 124.2 51.1 122" fill="#b3b3b3"/><polygon points="23.8 127.9 26.7 127.5 24.9 126 22.1 126.5 23.8 127.9" fill="#b3b3b3"/><polygon points="49.3 119.2 38.3 120.8 39 122.7 50.8 120.8 49.3 119.2" fill="#e6e6e6"/><polygon points="26.6 127.5 23.8 127.9 22.1 126.5 24.9 126 24.3 125.6 24.7 124.9 22.1 125.3 23.7 122.9 25.8 122.6 26.4 121.4 23 121.9 19.9 126.2 23.4 129.1 27.7 128.5 26.6 127.5" fill="#4d4d4d"/><polygon points="38.3 120.8 49.3 119.2 50.8 120.8 39 122.7 39 122.8 39 123.8 51.1 122 49.4 124.2 39.1 125.7 39.2 126.8 50.1 125.2 53 121.5 49.8 118 38 119.7 38.3 120.8" fill="#4d4d4d"/><polygon points="24.1 132.6 26.1 132.3 27.1 130.5 25.4 130.7 24.1 132.6" fill="#e6e6e6"/><polygon points="49 129.9 40 131.3 39.8 132.8 47.7 131.6 49 129.9" fill="#b3b3b3"/><polygon points="47.6 127.5 39.7 128.6 40.1 130.1 48.8 128.8 47.6 127.5" fill="#e6e6e6"/><polygon points="27.2 134.7 25.5 134.9 24.2 133.8 26.5 133.4 25.9 132.5 26.1 132.3 24.1 132.6 25.4 130.7 27.1 130.5 27.8 129.2 24.7 129.7 22 133.5 25.1 136.1 27.7 135.6 27.2 134.7" fill="#4d4d4d"/><polygon points="39.7 128.6 47.6 127.5 48.8 128.8 40.1 130.1 40.2 130.2 40 131.3 49 129.9 47.7 131.6 39.8 132.8 39.7 134 48.4 132.7 51 129.4 48.1 126.3 39.4 127.5 39.7 128.6" fill="#4d4d4d"/><polygon points="25.5 134.9 26.9 134.7 26.1 133.4 24.2 133.8 25.5 134.9" fill="#b3b3b3"/><polyline points="25 103 25.8 103.5 22.6 107.7 26.3 111.9 23.9 116.5 27.6 120.1 25.4 125.2 28.9 128.6 26.9 132.6 28.6 135.4 27.9 135.8 25.9 132.7 27.9 128.7 24.3 125.6 26.6 120.3 22.9 116.8 25.3 112 21.5 107.7" fill="#4d4d4d"/><path d="M39.7,133.9h0a.4.4,0,0,1-.4-.4l.4-2.6-.9-3.5h-.1l-.2-4.1-1.3-3.9v-.2l.5-4.7-1.3-4.2h-.1l.3-4.6-.9-3.6c-.1-.2.1-.4.3-.4s.5,0,.5.2l.9,3.6v.2l-.3,4.5,1.3,4.3h0l-.5,4.7,1.4,3.9h0l.2,4.1.9,3.5h0l-.3,2.7A.5.5,0,0,1,39.7,133.9Z" fill="#4d4d4d"/><polygon points="59 71.7 55.1 77.1 16.6 82.4 12.6 78.1 59 71.7" fill="#b3b3b3"/><polygon points="12.4 78.5 16.3 73.1 54.8 67.8 58.7 72.1 12.4 78.5" fill="#e6e6e6"/><line x1="58.7" y1="72.1" x2="12.4" y2="78.5" fill="#fff"/><path d="M55,67.2,15.9,72.5l-4.4,6.1,4.8,4.1,39.1-5.4,4.1-5.2ZM16.6,73.6l37.9-5.2,3,3.3-43.8,6Zm38.1,2.6-38,5.2-3-2.5,43.6-6Z" fill="#4d4d4d"/><polygon points="57.2 82.3 53.7 87.2 18.7 92.3 15 88.4 57.2 82.3" fill="#b3b3b3"/><line x1="56.6" y1="82.6" x2="15" y2="89.1" fill="#fff"/><path d="M53.8,78.4,18.2,83.6l-4,5.6,4.4,3.7,35.6-5.2L58,82.9ZM18.9,84.7l34.4-5,2.3,2.5L16.3,88.3Zm34.6,2L19,91.7l-2.6-2.3,39.8-6.1Z" fill="#4d4d4d"/><path d="M15,57.1H56a4.2,4.2,0,0,1,4.2,4.2V68a0,0,0,0,1,0,0H11.4a0,0,0,0,1,0,0V60.7A3.6,3.6,0,0,1,15,57.1Z" fill="#e6e6e6"/><path d="M60.8,68.6H10.7V60.2a3.6,3.6,0,0,1,3.6-3.7H57.2a3.6,3.6,0,0,1,3.6,3.7ZM12,67.4H59.5V60.2a2.3,2.3,0,0,0-2.3-2.4H14.3A2.3,2.3,0,0,0,12,60.2Z" fill="#4d4d4d"/></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getXraySvg = (icon, color) => {
		switch(icon) {
			case 'bot_right_C':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="34.5" cy="63.3" r="22.6" fill="#e6e6e6" opacity="0.3"/><path d="M10.6,63.3A23.8,23.8,0,1,1,34.4,87,23.9,23.9,0,0,1,10.6,63.3Zm2.4,0A21.4,21.4,0,1,0,34.4,41.8,21.4,21.4,0,0,0,13,63.3Z" fill={color}/></svg>
				);
				break;
			case 'bot_right_CD':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="45.5" cy="43.2" r="21.7" fill="#e6e6e6" opacity="0.3"/><path d="M22.8,43.2A22.8,22.8,0,1,1,45.5,66,22.7,22.7,0,0,1,22.8,43.2Zm2.1,0A20.6,20.6,0,1,0,45.5,22.6,20.6,20.6,0,0,0,24.9,43.2Z" fill={color}/></svg>
				);
				break;
			case 'bot_right_CM':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="23.4" cy="43.2" r="21.6" fill="#e6e6e6" opacity="0.3"/><path d="M.7,43.2A22.7,22.7,0,1,1,23.4,65.9,22.7,22.7,0,0,1,.7,43.2Zm2.1,0A20.6,20.6,0,1,0,23.4,22.6,20.6,20.6,0,0,0,2.8,43.2Z" fill={color}/></svg>
				);
				break;
			case 'bot_right_CO':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="34.4" cy="42.2" r="20.9" fill="#e6e6e6" opacity="0.3"/><path d="M12.5,42.2a22,22,0,1,1,22,22A22,22,0,0,1,12.5,42.2Zm2,0a20,20,0,1,0,20-19.9A20.1,20.1,0,0,0,14.5,42.2Z" fill={color}/></svg>
				);
				break;
			case 'bot_right_RO':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M18.4,83.9a22.6,22.6,0,1,0,16-6.6,22.6,22.6,0,0,0-16,6.6" fill="#e6e6e6" opacity="0.3"/><path d="M10.7,99.8a23.2,23.2,0,0,1,6.9-16.7A23.7,23.7,0,0,1,58.1,99.8a23.7,23.7,0,1,1-47.4,0Zm8.6-15.1A20.9,20.9,0,0,0,13,99.8a21.5,21.5,0,1,0,6.3-15.1Z" fill={color}/></svg>
				);
				break;
			case 'bot_right_RD':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="44.5" cy="103.6" r="22.7" fill="#e6e6e6" opacity="0.3"/><path d="M20.7,103.6a23.8,23.8,0,1,1,23.8,23.8A23.8,23.8,0,0,1,20.7,103.6Zm2.2,0A21.6,21.6,0,1,0,44.5,82,21.6,21.6,0,0,0,22.9,103.6Z" fill={color}/></svg>
				);
				break;
			case 'bot_right_RM':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="24.5" cy="103.6" r="22.7" fill="#e6e6e6" opacity="0.3"/><path d="M.7,103.6a23.8,23.8,0,1,1,23.8,23.8A23.9,23.9,0,0,1,.7,103.6Zm2.2,0A21.6,21.6,0,1,0,24.5,82,21.6,21.6,0,0,0,2.9,103.6Z" fill={color}/></svg>
				);
				break;
			case 'bot_left_C':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="35.6" cy="63.8" r="22.6" fill="#e6e6e6" opacity="0.3"/><path d="M35.6,87A23.8,23.8,0,1,1,59.3,63.3,23.8,23.8,0,0,1,35.6,87Zm0-45.2A21.5,21.5,0,1,0,57,63.3,21.5,21.5,0,0,0,35.6,41.8Z" fill={color}/></svg>
				);
				break;
			case 'bot_left_RO':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M51.5,84.1a22.6,22.6,0,1,1-15.9-6.6,22.4,22.4,0,0,1,15.9,6.6" fill="#e6e6e6" opacity="0.3"/><path d="M35.6,123.6A23.8,23.8,0,1,1,59.3,99.8,23.8,23.8,0,0,1,35.6,123.6Zm0-45.2a21.5,21.5,0,1,0,15.1,6.3A21.4,21.4,0,0,0,35.6,78.4Z" fill={color}/></svg>
				);
				break;
			case 'bot_left_RD':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="25.5" cy="103" r="22.7" fill="#e6e6e6" opacity="0.3"/><path d="M25.5,127.4a23.8,23.8,0,1,1,23.8-23.8A23.9,23.9,0,0,1,25.5,127.4Zm0-45.4a21.6,21.6,0,1,0,21.6,21.6A21.6,21.6,0,0,0,25.5,82Z" fill={color}/></svg>
				);
				break;
			case 'bot_left_RM':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="45.5" cy="103.6" r="22.7" fill="#e6e6e6" opacity="0.3"/><path d="M45.5,127.4a23.8,23.8,0,1,1,23.8-23.8A23.8,23.8,0,0,1,45.5,127.4Zm0-45.4A21.6,21.6,0,1,0,67,103.6,21.6,21.6,0,0,0,45.5,82Z" fill={color}/></svg>
				);
				break;
			case 'bot_left_CD':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="24.4" cy="43.2" r="21.7" fill="#e6e6e6" opacity="0.3"/><path d="M24.4,66A22.8,22.8,0,1,1,47.1,43.2,22.8,22.8,0,0,1,24.4,66Zm0-43.4A20.6,20.6,0,1,0,45,43.2,20.7,20.7,0,0,0,24.4,22.6Z" fill={color}/></svg>
				);
				break;
			case 'bot_left_CM':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="46.6" cy="43.2" r="21.6" fill="#e6e6e6" opacity="0.3"/><path d="M46.6,65.9A22.7,22.7,0,1,1,69.3,43.2,22.7,22.7,0,0,1,46.6,65.9Zm0-43.3A20.6,20.6,0,1,0,67.1,43.2,20.6,20.6,0,0,0,46.6,22.6Z" fill={color}/></svg>
				);
				break;
			case 'bot_left_CO':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><circle cx="38" cy="41.6" r="20.9" fill="#e6e6e6" opacity="0.3"/><path d="M35.5,64.2a22,22,0,1,1,21.9-22A22,22,0,0,1,35.5,64.2Zm0-41.9A20,20,0,1,0,55.4,42.2,19.9,19.9,0,0,0,35.5,22.3Z" fill={color}/></svg>
				);
				break;
			case 'top_right_C':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="bc041c88-7091-4b79-be0e-128e1fb2ba00" data-name="Raio X Superior Direito"><g id="9bb91273-ac89-4b10-89cb-64cc747951a6" data-name="Raio X Superior Esquerdo"><g id="d928b715-e12f-4acf-9231-05a9faea42ac" data-name="cervical"><circle cx="35.1" cy="103.4" r="22.6" fill="#e6e6e6" opacity="0.3"/><path d="M58.8,103.4A23.8,23.8,0,1,1,35,79.6,23.8,23.8,0,0,1,58.8,103.4Zm-2.3,0A21.5,21.5,0,1,0,35,124.8,21.6,21.6,0,0,0,56.5,103.4Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_right_CO':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="392e6e90-8fa0-4087-980d-7bcd26c7b14f" data-name="Raio X Superior Direito"><g id="159f8c1d-8733-422d-8767-a4682a42dbca" data-name="Raio X Superior Esquerdo"><g id="e005bad2-7846-4f5a-863a-f6e701883bce" data-name="Coroa - orto radial"><circle cx="35" cy="124.4" r="20.9" fill="#e6e6e6" opacity="0.3"/><path d="M56.9,124.4A22,22,0,1,1,35,102.5,21.9,21.9,0,0,1,56.9,124.4Zm-2,0A20,20,0,1,0,35,144.3,19.9,19.9,0,0,0,54.9,124.4Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_right_CM':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="e9ff05fe-671c-432e-8d92-6979622f93dd" data-name="Raio X Superior Direito"><g id="4b4bac4f-daf9-4a84-9665-55c04e25cde1" data-name="Raio X Superior Esquerdo"><g id="eb5c9d55-cd9f-4828-bffe-2c35c8e431aa" data-name="Coroa - mesio radial"><circle cx="23.9" cy="123.8" r="21.7" fill="#e6e6e6" opacity="0.3"/><path d="M46.6,123.4a22.7,22.7,0,1,1-22.7-22.7A22.7,22.7,0,0,1,46.6,123.4Zm-2.1,0A20.6,20.6,0,1,0,23.9,144,20.6,20.6,0,0,0,44.5,123.4Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_right_CD':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="5c64774f-1bc0-4f9a-89ee-d0beb158fd60" data-name="Raio X Superior Direito"><g id="efc73324-f9bc-439c-a2f7-b9bd3ddd629b" data-name="Raio X Superior Esquerdo"><g id="9b95ecb5-da50-4d7c-9163-72557da76d4a" data-name="Coroa - disto radial"><circle cx="46.1" cy="123.4" r="21.6" fill="#e6e6e6" opacity="0.3"/><path d="M68.7,123.4a22.7,22.7,0,1,1-22.6-22.7A22.7,22.7,0,0,1,68.7,123.4Zm-2.1,0A20.6,20.6,0,1,0,46.1,144,20.5,20.5,0,0,0,66.6,123.4Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_right_RD':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="ae5b9f90-228b-4761-af68-e968b6b2d3a0" data-name="Raio X Superior Direito"><g id="b634f7d0-8dfc-4306-ac1a-5cd0a57181cb" data-name="Raio X Superior Esquerdo"><g id="85053339-1fb3-4ff4-b239-087e5f8e1bf1" data-name="Raiz - disto radial"><circle cx="44.9" cy="63" r="22.7" fill="#e6e6e6" opacity="0.3"/><path d="M68.7,63A23.8,23.8,0,1,1,44.9,39.2,23.8,23.8,0,0,1,68.7,63Zm-2.2,0A21.6,21.6,0,1,0,44.9,84.6,21.6,21.6,0,0,0,66.5,63Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_right_RO':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="1adabf44-2f3b-444c-9db2-e786eec14e54" data-name="Raio X Superior Direito"><g id="89998e9a-0423-40cc-a1bc-7d82f77e6f70" data-name="Raio X Superior Esquerdo"><g id="cb56b95c-c8f8-4980-b8a7-811837565749" data-name="Raiz - orto radial"><path d="M51,82.7a22.2,22.2,0,0,0,6.6-15.9A22.5,22.5,0,1,0,51,82.7" fill="#e6e6e6" opacity="0.3"/><path d="M58.8,66.8A23.8,23.8,0,1,1,35.1,43.1,23.7,23.7,0,0,1,58.8,66.8ZM50.2,81.9a21.4,21.4,0,1,0-15.1,6.3A21.3,21.3,0,0,0,50.2,81.9Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_right_RM':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="786f32a0-fd6d-4a1f-abb0-f26a7a11a3f8" data-name="Raio X Superior Direito"><g id="1c519213-845e-4354-8666-865a304f1226" data-name="Raio X Superior Esquerdo"><g id="8de684b7-5c65-4d12-94d7-7bb844b59dfa" data-name="Raiz - mesio radial"><circle cx="25" cy="63" r="22.7" fill="#e6e6e6" opacity="0.3"/><path d="M48.8,63A23.8,23.8,0,1,1,25,39.2,23.9,23.9,0,0,1,48.8,63Zm-2.2,0A21.6,21.6,0,1,0,25,84.6,21.6,21.6,0,0,0,46.6,63Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_left_C':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="e79eba2f-b4a9-43a1-a822-50c15dae66f6" data-name="Raio X Superior Esquerdo"><g id="dd373270-cbce-4c15-987f-4349dc7c20e6" data-name="Raio X Superior Esquerdo"><g id="e2a62e95-ad34-47d3-97ff-840c2da49f15" data-name="cervical"><circle cx="35" cy="103.4" r="22.6" fill="#e6e6e6" opacity="0.3"/><path d="M34.9,79.6a23.8,23.8,0,1,1-23.8,23.8A23.8,23.8,0,0,1,34.9,79.6Zm0,45.2a21.5,21.5,0,1,0-21.4-21.4A21.4,21.4,0,0,0,34.9,124.8Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_left_CM':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b30eb97d-36f4-45c1-8386-8dfcb82511b7" data-name="Raio X Superior Esquerdo"><g id="bf52c0f7-b3ee-4480-a293-317bb2b72149" data-name="Raio X Superior Esquerdo"><g id="38d0dab8-7263-4951-9681-1eda6f0aad5d" data-name="Coroa - mesio radial"><circle cx="46.6" cy="123.4" r="21.7" fill="#e6e6e6" opacity="0.3"/><path d="M46,100.7a22.7,22.7,0,1,1-22.7,22.7A22.7,22.7,0,0,1,46,100.7ZM46,144a20.6,20.6,0,1,0-20.6-20.6A20.6,20.6,0,0,0,46,144Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_left_CO':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="787a313a-bab4-4416-b789-7254043c4c7a" data-name="Raio X Superior Esquerdo"><g id="b0f370bd-4b67-4727-a3fc-c72de35d7262" data-name="Raio X Superior Esquerdo"><g id="5ec10010-ba61-430d-8be8-53577d15a854" data-name="Coroa - orto radial"><circle cx="34.9" cy="124.4" r="20.9" fill="#e6e6e6" opacity="0.3"/><path d="M34.9,102.5A21.9,21.9,0,1,1,13,124.4,22,22,0,0,1,34.9,102.5Zm0,41.8A19.9,19.9,0,1,0,15,124.4,20,20,0,0,0,34.9,144.3Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_left_CD':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="20ed2d0e-fb66-4493-a7cf-8a7707d4142c" data-name="Raio X Superior Esquerdo"><g id="79889aee-a358-433e-86e1-beb1cd82e001" data-name="Raio X Superior Esquerdo"><g id="bf8362d5-fcfd-42cb-a27d-ded87a330bbe" data-name="Coroa - disto radial"><circle cx="23.9" cy="123.4" r="21.6" fill="#e6e6e6" opacity="0.3"/><path d="M23.9,100.7A22.7,22.7,0,1,1,1.2,123.4,22.7,22.7,0,0,1,23.9,100.7Zm0,43.3A20.6,20.6,0,1,0,3.3,123.4,20.5,20.5,0,0,0,23.9,144Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_left_RD':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="89c724f2-dbec-48d7-bf2f-07116082342e" data-name="Raio X Superior Esquerdo"><g id="74c86944-8e13-42c2-8bb4-01dfd4843edd" data-name="Raio X Superior Esquerdo"><g id="602f1fff-6fe0-43e4-9bd2-95e1b26d1882" data-name="Raiz - disto radial"><circle cx="25" cy="63" r="22.7" fill="#e6e6e6" opacity="0.3"/><path d="M25,39.2A23.8,23.8,0,1,1,1.2,63,23.9,23.9,0,0,1,25,39.2Zm0,45.4A21.6,21.6,0,1,0,3.4,63,21.6,21.6,0,0,0,25,84.6Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_left_RM':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="a4ecd378-2d7a-4952-b276-7af43b8a36e3" data-name="Raio X Superior Esquerdo"><g id="50e08848-fd63-4247-b3c0-8e158df16f4f" data-name="Raio X Superior Esquerdo"><g id="75a49298-4d7a-4831-870c-66218964a2d8" data-name="Raiz - mesio radial"><circle cx="44.9" cy="63" r="22.7" fill="#e6e6e6" opacity="0.3"/><path d="M44.9,39.2A23.8,23.8,0,1,1,21.1,63,23.8,23.8,0,0,1,44.9,39.2Zm0,45.4A21.6,21.6,0,1,0,23.4,63,21.6,21.6,0,0,0,44.9,84.6Z" fill={color}/></g></g></g></svg>
				);
				break;
			case 'top_left_RO':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b07dfa12-1c5e-407f-ab29-95d2089c46ed" data-name="Raio X Superior Esquerdo"><g id="f11c0f07-347d-4446-a21f-b4e8901933ff" data-name="Raio X Superior Esquerdo"><g id="20d1158b-99b7-48a7-abbb-f0e74b4d9b55" data-name="Raiz - orto radial"><path d="M18.9,82.7a22.2,22.2,0,0,1-6.6-15.9,22.5,22.5,0,1,1,6.6,15.9" fill="#e6e6e6" opacity="0.3"/><path d="M34.9,43.1A23.7,23.7,0,1,1,11.1,66.8,23.8,23.8,0,0,1,34.9,43.1Zm0,45.1a21.3,21.3,0,1,0-15.2-6.3A21.2,21.2,0,0,0,34.9,88.2Z" fill={color}/></g></g></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getNobelSvg = (icon) => {
		switch(icon) {
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
			case '17':
			case '18':
			case '21':
			case '22':
			case '23':
			case '24':
			case '25':
			case '26':
			case '27':
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="50a30cbb-5fd3-46e2-be88-31e7d0e18417" data-name="molar" opacity="0.9"><path d="M18.2,96.7h34L50.6,46.4,44.4,19.3c0-2.2-4.2-3.9-9.4-3.9s-9.3,1.7-9.3,3.9c0,.2-5.8,30.7-5.8,30.7Z" fill="#999"/><path d="M35,14.6c5.6,0,9.8,2.6,9.9,5.2.2,1,4.2,18.1,6.2,27.1h0l1.7,50.9H17.5l1.7-47.4c2-10.3,5.6-29.7,5.8-30.7C25.1,17.2,29.3,14.6,35,14.6ZM49.9,47.1c-6.3-27-6.3-27.2-6.3-27.3s-3.5-3.9-8.6-3.9-8.7,2.4-8.7,3.9,0,.3-5.8,30.9L18.8,96.6H51.5Z" fill="#4d4d4d"/><polygon points="14.8 88.3 18.6 84.9 51.9 82.9 54.9 85.9 14.8 88.3" fill="#b3b3b3"/><polygon points="55.2 85.7 51.4 89.1 18 91.1 15 88.1 55.2 85.7" fill="#e6e6e6"/><path d="M17.8,91.4l33.9-2,4.2-3.9-3.7-2.9-33.9,2-3.9,3.3Zm33.3-2.8-32.8,2L16,88.3,54,86ZM18.8,85.4l32.9-2L54,85.2,16.3,87.5Z" fill="#4d4d4d"/><polygon points="15.1 80.8 18.9 77.3 51.6 75.3 54.5 78.4 15.1 80.8" fill="#b3b3b3"/><polygon points="54.8 78.1 51.1 81.6 18.3 83.6 15.4 80.5 54.8 78.1" fill="#e6e6e6"/><path d="M18.1,83.8l33.3-2L55.5,78l-3.6-3L18.6,77.1l-3.9,3.3Zm32.7-2.7L18.6,83l-2.2-2.3,37.3-2.3ZM19.1,77.8l32.3-2,2.3,1.9L16.6,79.9Z" fill="#4d4d4d"/><polygon points="15.1 73.4 18.9 70 51.6 68 54.5 71 15.1 73.4" fill="#b3b3b3"/><polygon points="54.8 70.8 51.1 74.2 18.3 76.2 15.4 73.2 54.8 70.8" fill="#e6e6e6"/><path d="M18.1,76.5l33.3-2,4.1-3.9-3.6-2.9-33.3,2L14.7,73Zm32.7-2.8-32.2,2-2.2-2.3,37.3-2.3ZM19.1,70.5l32.3-2,2.3,1.8L16.6,72.6Z" fill="#4d4d4d"/><polygon points="15.1 66 18.9 62.5 51.6 60.5 54.5 63.6 15.1 66" fill="#b3b3b3"/><polygon points="54.8 63.3 51.1 66.7 18.3 68.7 15.4 65.7 54.8 63.3" fill="#e6e6e6"/><path d="M18.1,69l33.3-2,4.1-3.9-3.6-2.9-33.3,2-3.9,3.4Zm32.7-2.7L18.6,68.2l-2.2-2.3,37.3-2.3ZM19.1,63l8.8-.5L51.4,61l2.3,1.9L16.6,65.1Z" fill="#4d4d4d"/><polygon points="15.5 58.5 19.2 54.9 51.3 52.8 54.2 56 15.5 58.5" fill="#b3b3b3"/><polygon points="54.4 55.8 50.8 59.4 18.6 61.5 15.8 58.3 54.4 55.8" fill="#e6e6e6"/><path d="M18.4,61.8l32.7-2.2,4-4-3.5-3.1L18.9,54.7l-3.8,3.4Zm32.1-2.9-31.6,2-2.2-2.4,36.6-2.4ZM19.4,55.4l8.6-.5,23.1-1.5,2.3,1.9L17,57.7Z" fill="#4d4d4d"/><polygon points="16.3 51.1 19.8 47.8 50.6 46 53.4 48.8 16.3 51.1" fill="#b3b3b3"/><polygon points="53.7 48.6 50.1 51.8 19.3 53.7 16.5 50.8 53.7 48.6" fill="#e6e6e6"/><path d="M19.1,53.9,50.4,52l3.9-3.6-3.4-2.7L19.6,47.6l-3.7,3.1Zm30.8-2.6L19.6,53.2,17.5,51l35.1-2.1Zm-29.8-3,8.2-.5,22.2-1.4,2.1,1.8L17.7,50.3Z" fill="#4d4d4d"/><polygon points="18 44.5 21.2 41.5 49.2 39.6 51.7 42.2 18 44.5" fill="#b3b3b3"/><polygon points="52 41.9 48.8 44.8 20.8 46.8 18.2 44.2 52 41.9" fill="#e6e6e6"/><path d="M20.6,47,49,45.1l3.6-3.3-3.2-2.4L21,41.3l-3.3,2.8Zm28-2.6L21,46.3l-1.9-1.9L51,42.2ZM21.4,41.9l7.5-.5,20.2-1.3L51,41.6,19.3,43.7Z" fill="#4d4d4d"/><polygon points="19.9 37.8 22.7 34.6 47.7 32.8 49.9 35.6 19.9 37.8" fill="#b3b3b3"/><polygon points="50.2 35.4 47.3 38.6 22.3 40.4 20.1 37.6 50.2 35.4" fill="#e6e6e6"/><path d="M22.1,40.7l25.4-1.9,3.2-3.6-2.8-2.7L22.5,34.4l-2.9,3.1Zm25-2.6L22.5,39.9l-1.7-2.1,28.5-2.1Zm-24.2-3,6.7-.5,18-1.3L49.3,35,21,37.1Z" fill="#4d4d4d"/><polygon points="21 31.6 23.6 29.1 46.4 27.3 48.5 29.3 21 31.6" fill="#b3b3b3"/><polygon points="48.7 29.2 46.1 31.6 23.3 33.5 21.2 31.4 48.7 29.2" fill="#e6e6e6"/><path d="M23.1,33.7l23.2-1.9L49.1,29l-2.5-1.9L23.4,29l-2.7,2.3Zm22.8-2.4L23.5,33.1l-1.6-1.6,26-2.1ZM23.8,29.5l6.1-.5,16.4-1.4,1.6,1.3L22.1,31Z" fill="#4d4d4d"/><polygon points="22.5 26.4 24.7 24.6 45.5 23 47.4 24.5 22.5 26.4" fill="#b3b3b3"/><polygon points="47.6 24.4 45.3 26.2 24.5 27.8 22.6 26.3 47.6 24.4" fill="#e6e6e6"/><path d="M24.4,27.9l21.1-1.6,2.5-2-2.3-1.4L24.6,24.5l-2.4,1.7ZM45.2,26,24.7,27.5l-1.5-1.1,23.7-1.8ZM24.9,24.8l5.5-.4,15-1.1,1.5.9L23.4,26Z" fill="#4d4d4d"/><polygon points="30.2 21.4 31.6 19.7 44.5 18.6 45.6 20.2 30.2 21.4" fill="#b3b3b3"/><polygon points="45.7 20 44.2 21.8 31.4 22.9 30.3 21.3 45.7 20" fill="#e6e6e6"/><path d="M31.3,23l13-1.1L46,20l-1.4-1.5-13.1,1L30,21.2Zm12.8-1.4-12.6,1-.9-1.2,14.6-1.2ZM31.7,19.9l3.4-.3,9.3-.7.9.9L30.7,21Z" fill="#4d4d4d"/><rect x="13.2" y="91.6" width="43.9" height="14.14" transform="translate(70.3 197.3) rotate(180)" fill="#e6e6e6"/><path d="M57.7,106.3H12.6V90.9H57.7Zm-43.9-1.2H56.4V92.2H13.8Z" fill="#4d4d4d"/></g></svg>
				);
				break;
			case '31':
			case '32':
			case '33':
			case '34':
			case '35':
			case '36':
			case '37':
			case '38':
			case '41':
			case '42':
			case '43':
			case '44':
			case '45':
			case '46':
			case '47':
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="32056e6f-e52c-4046-b9cc-5006c9f72106" data-name="molar" opacity="0.9"><path d="M53.8,67.1H16.3l1.8,52.7s6.8,28.3,6.8,28.5c0,2.2,4.6,4,10.3,4s10.3-1.8,10.3-4c0-.2,6.4-32.3,6.4-32.3Z" fill="#999"/><path d="M35.3,153.2c-6.2,0-10.9-2.8-11-5.5-.2-1.1-4.5-18.9-6.8-28.4h0L15.7,65.8H54.6l-1.9,49.7c-2.2,10.8-6.2,31.1-6.4,32.2C46.2,150.4,41.5,153.2,35.3,153.2ZM18.9,119.1c6.8,28.3,6.8,28.5,6.8,28.6,0,1.6,4,4.1,9.6,4.1s9.6-2.5,9.6-4.1c0-.1,0-.3,6.4-32.4l1.8-48.2h-36Z" fill="#4d4d4d"/><polygon points="57.6 75.8 53.4 79.5 16.6 81.6 13.3 78.4 57.6 75.8" fill="#b3b3b3"/><polygon points="13 78.6 17.2 75 54 72.9 57.3 76.1 13 78.6" fill="#e6e6e6"/><path d="M54.3,72.6,16.9,74.7l-4.7,4.1,4.1,3.1,37.3-2.2L58,76.3ZM17.5,75.5l36.2-2,2.5,2.4L14.3,78.3ZM53.1,79,16.8,81l-2.5-1.9,41.6-2.4Z" fill="#4d4d4d"/><polygon points="57.2 83.8 53.1 87.4 17 89.5 13.7 86.3 57.2 83.8" fill="#b3b3b3"/><polygon points="13.4 86.6 17.5 82.9 53.6 80.9 56.9 84.1 13.4 86.6" fill="#e6e6e6"/><path d="M53.9,80.6,17.2,82.7l-4.6,4,4,3.1,36.7-2.1,4.3-3.5ZM17.8,83.5l35.5-2.1,2.5,2.4L14.7,86.2Zm35,3.4-35.7,2L14.6,87l40.9-2.3Z" fill="#4d4d4d"/><polygon points="57.2 91.5 53.1 95.1 17 97.2 13.7 94 57.2 91.5" fill="#b3b3b3"/><polygon points="13.4 94.3 17.5 90.6 53.6 88.6 56.9 91.8 13.4 94.3" fill="#e6e6e6"/><path d="M53.9,88.3,17.2,90.4l-4.6,4,4,3.1,36.7-2.1,4.3-3.5ZM17.8,91.2l35.5-2.1,2.5,2.4L14.7,93.9Zm35,3.4L17.1,96.7l-2.5-2,40.9-2.3Z" fill="#4d4d4d"/><polygon points="57.2 99.3 53.1 102.9 17 105 13.7 101.8 57.2 99.3" fill="#b3b3b3"/><polygon points="13.4 102.1 17.5 98.5 53.6 96.4 56.9 99.6 13.4 102.1" fill="#e6e6e6"/><path d="M53.9,96.1,17.2,98.2l-4.6,4,4,3.1,36.7-2.1,4.3-3.5ZM17.8,99l35.5-2.1,2.5,2.5-41.1,2.3Zm35,3.4-9.7.6-26,1.5-2.5-1.9,40.9-2.4Z" fill="#4d4d4d"/><polygon points="56.8 107.1 52.7 110.9 17.3 113.1 14.1 109.7 56.8 107.1" fill="#b3b3b3"/><polygon points="13.8 110 17.9 106.2 53.3 104 56.5 107.4 13.8 110" fill="#e6e6e6"/><path d="M53.6,103.7l-36,2.2-4.5,4.3,3.9,3.2,36-2.3,4.2-3.6Zm-35.5,3L53,104.6l2.4,2.5-40.3,2.5Zm34.3,3.6-9.4.6-25.5,1.6-2.5-2L55.1,108Z" fill="#4d4d4d"/><polygon points="55.9 114.9 52 118.3 18 120.3 15 117.3 55.9 114.9" fill="#b3b3b3"/><polygon points="14.7 117.5 18.6 114.2 52.6 112.2 55.6 115.2 14.7 117.5" fill="#e6e6e6"/><path d="M52.8,111.9l-34.5,2L14,117.7l3.7,2.9,34.6-2,4-3.3Zm-34,2.7,33.5-1.9,2.3,2.3-38.7,2.2Zm32.9,3.2-9,.6-24.5,1.4L15.8,118l38.5-2.2Z" fill="#4d4d4d"/><polygon points="54 121.8 50.5 124.9 19.6 126.9 16.8 124.3 54 121.8" fill="#b3b3b3"/><polygon points="16.6 124.5 20.1 121.4 50.9 119.4 53.8 122.1 16.6 124.5" fill="#e6e6e6"/><path d="M51.2,119.2l-31.4,2-3.9,3.4,3.4,2.6,31.4-2.1,3.7-2.9Zm-30.9,2.7,30.4-2,2.1,2-35.2,2.3Zm29.9,2.6L42,125l-22.2,1.4-2.2-1.5,35-2.3Z" fill="#4d4d4d"/><polygon points="52 128.8 48.8 132.1 21.3 134.1 18.8 131.1 52 128.8" fill="#b3b3b3"/><polygon points="18.6 131.4 21.7 128 49.3 126.1 51.7 129.1 18.6 131.4" fill="#e6e6e6"/><path d="M49.5,125.8l-28,2L18,131.5l3,2.8,28-1.9,3.3-3.2Zm-27.6,2.7L49,126.6l1.9,2.2L19.5,131Zm26.7,3.2-7.4.5-19.8,1.4-1.9-1.8,31.2-2.2Z" fill="#4d4d4d"/><polygon points="50.7 135.3 47.9 137.9 22.7 139.9 20.4 137.7 50.7 135.3" fill="#b3b3b3"/><polygon points="20.2 137.9 23 135.3 48.2 133.3 50.5 135.5 20.2 137.9" fill="#e6e6e6"/><path d="M48.4,133.1l-25.6,2L19.7,138l2.8,2.1,25.5-2,3-2.5Zm-25.2,2.6,24.8-2,1.7,1.7-28.6,2.2Zm24.4,1.9-6.7.5-18.1,1.4-1.7-1.3L49.5,136Z" fill="#4d4d4d"/><polygon points="49.1 140.7 46.6 142.7 23.6 144.3 21.6 142.7 49.1 140.7" fill="#b3b3b3"/><polygon points="21.4 142.9 23.9 141 46.8 139.3 48.9 140.9 21.4 142.9" fill="#e6e6e6"/><path d="M47,139.2l-23.3,1.6L20.9,143l2.5,1.5,23.3-1.7,2.7-1.8Zm-22.9,2,22.5-1.6,1.6,1.2-26,1.9Zm22.3,1.2-6.1.5L23.7,144l-1.6-.9,26-1.9Z" fill="#4d4d4d"/><polygon points="40.6 146 39 147.8 24.8 148.9 23.6 147.3 40.6 146" fill="#b3b3b3"/><polygon points="23.5 147.4 25.1 145.6 39.3 144.5 40.5 146.1 23.5 147.4" fill="#e6e6e6"/><path d="M39.4,144.3,25,145.4l-1.8,2.1,1.5,1.6L39.1,148l1.7-1.8Zm-14.2,1.5,14-1,.9,1.2L24,147.3Zm13.7,1.8-3.8.3-10.2.7-1-.9L40,146.4Z" fill="#4d4d4d"/><rect x="10.9" y="57.6" width="48.4" height="14.82" fill="#e6e6e6"/><path d="M10.2,57H60V73.1H10.2Zm48.4,1.3h-47V71.8h47Z" fill="#4d4d4d"/></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getZygomaticSvg = (icon) => {
		switch(icon) {
			case '18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="3fe1e996-e277-438a-9195-666d3a588166" data-name="molar" opacity="0.9"><path d="M9.9,5.7l4-1c1.8-.5,3.5,1.3,4.5,3.5L23,17.1l3,8.8L36,65.6l2.2,3.7,6.3,26.1-19.7,4.8L18.4,74.1v-3L8.4,30.1l-.5-7.9L7,10.6C6.8,8.2,8,6.2,9.9,5.7Z" fill="#999"/><path d="M45,95.8l-20.5,4.9L18.1,74.1V71.2l-10-41h0l-.6-7.9L6.6,10.6C6.4,8.1,7.7,5.8,9.8,5.3v0l4-1.1h0c2.2-.5,4,1.7,4.9,3.9L23.3,17l3.1,8.8,10,39.7,2.1,3.6ZM25,99.7l19.1-4.6L37.9,69.4l-2.2-3.6h0L25.7,26l-3.1-8.7L18.1,8.4c-.9-1.9-2.4-3.8-4.1-3.3h0l-4,1c-1.7.4-2.8,2.3-2.7,4.5l.9,11.6.6,7.9,10.1,41V74Z" fill="#4d4d4d"/><polygon points="21.4 100.7 23.3 98 44.1 91.8 46.4 93.1 21.4 100.7" fill="#b3b3b3"/><polygon points="46.5 92.9 44.6 95.5 23.8 101.8 21.5 100.5 46.5 92.9" fill="#e6e6e6"/><path d="M23.7,102l21.1-6.3,2.2-3-2.8-1.1L23.1,97.9l-2,2.6Zm20.7-6.7L24,101.5l-1.8-1.1,23.6-7.1Zm-20.9,3L44,92.1l1.8.7L22.2,99.9Z" fill="#4d4d4d"/><polygon points="20.2 95.9 22.1 93.3 42.9 87 45.3 88.4 20.2 95.9" fill="#b3b3b3"/><polygon points="45.4 88.2 43.5 90.8 22.7 97.1 20.4 95.7 45.4 88.2" fill="#e6e6e6"/><path d="M22.6,97.3l21.1-6.4L45.8,88l-2.7-1.2L22,93.2l-2.1,2.6Zm20.7-6.7L22.8,96.7l-1.8-1,23.7-7.1Zm-20.9,3,20.5-6.2,1.7.7L21.1,95.2Z" fill="#4d4d4d"/><polygon points="19.1 91.2 21 88.6 41.8 82.3 44.1 83.7 19.1 91.2" fill="#b3b3b3"/><polygon points="44.2 83.5 42.3 86.1 21.6 92.4 19.2 91 44.2 83.5" fill="#e6e6e6"/><path d="M21.4,92.6l21.2-6.4,2.1-2.9-2.8-1.2L20.8,88.5l-2,2.5Zm20.7-6.8L21.7,92l-1.8-1,23.7-7.2Zm-20.9,3,20.5-6.2,1.8.8L19.9,90.5Z" fill="#4d4d4d"/><polygon points="18 86.6 19.9 83.9 40.7 77.7 43 79 18 86.6" fill="#b3b3b3"/><polygon points="43.1 78.8 41.2 81.4 20.4 87.7 18.1 86.4 43.1 78.8" fill="#e6e6e6"/><path d="M20.3,87.9l21.1-6.3,2.2-3-2.8-1.1L19.7,83.8l-2,2.6ZM41,81.2,20.5,87.4l-1.7-1.1,23.6-7.1Zm-20.9,3L40.6,78l1.7.7L18.8,85.8Z" fill="#4d4d4d"/><polygon points="16.8 81.9 18.7 79.2 39.5 73 41.8 74.3 16.8 81.9" fill="#b3b3b3"/><polygon points="42 74.1 40.1 76.7 19.3 83 17 81.7 42 74.1" fill="#e6e6e6"/><path d="M19.2,83.2l21.1-6.4,2.1-2.9-2.7-1.2L18.6,79.1l-2.1,2.6Zm20.6-6.7L19.4,82.7l-1.8-1.1,23.7-7.1ZM19,79.5l20.5-6.2,1.7.7L17.7,81.1Z" fill="#4d4d4d"/><polygon points="16.8 72.8 18.4 70.5 35.8 65.2 37.8 66.4 16.8 72.8" fill="#b3b3b3"/><polygon points="37.9 66.2 36.3 68.5 18.9 73.8 17 72.6 37.9 66.2" fill="#e6e6e6"/><path d="M18.8,74l17.7-5.4,1.8-2.5L35.9,65,18.3,70.4l-1.7,2.2Zm17.3-5.7L19,73.5l-1.5-.9,19.8-6ZM18.6,70.7l17.2-5.2,1.5.6-19.7,6Z" fill="#4d4d4d"/><polygon points="16.9 77.1 18.6 74.7 37.6 69 39.7 70.2 16.9 77.1" fill="#b3b3b3"/><polygon points="39.8 70 38.1 72.5 19.1 78.2 17 76.9 39.8 70" fill="#e6e6e6"/><path d="M19,78.4l19.3-5.8,1.9-2.7-2.5-1.1L18.5,74.6,16.6,77Zm18.9-6.2L19.2,77.9l-1.6-1,21.6-6.5Zm-19,2.7,18.6-5.6,1.6.7L17.7,76.5Z" fill="#4d4d4d"/><polygon points="16.2 68.5 17.7 66.3 34.5 61.1 36.4 62.3 16.2 68.5" fill="#b3b3b3"/><polygon points="36.5 62.1 35 64.4 18.2 69.5 16.3 68.3 36.5 62.1" fill="#e6e6e6"/><path d="M18.1,69.7l17.1-5.2L36.9,62l-2.3-1.1-17,5.3-1.7,2.1Zm16.7-5.5-16.5,5-1.5-.9L36,62.4ZM17.9,66.5l16.6-5.1,1.4.6-19,5.9Z" fill="#4d4d4d"/><polygon points="15.2 64.4 16.7 62.1 33.5 57 35.4 58.2 15.2 64.4" fill="#b3b3b3"/><polygon points="35.5 58 34 60.2 17.2 65.4 15.3 64.2 35.5 58" fill="#e6e6e6"/><path d="M17.1,65.6l17.1-5.3,1.7-2.5-2.3-1L16.5,62l-1.6,2.2ZM33.8,60,17.3,65.1l-1.5-.9L35,58.3ZM16.9,62.3l16.6-5.1,1.4.7-19,5.8Z" fill="#4d4d4d"/><polygon points="14.2 60.4 15.7 58.1 32.5 53 34.5 54.2 14.2 60.4" fill="#b3b3b3"/><polygon points="34.6 54 33 56.2 16.2 61.4 14.3 60.2 34.6 54" fill="#e6e6e6"/><path d="M16.1,61.6l17.1-5.3,1.7-2.5-2.2-1L15.6,58,14,60.2ZM32.9,56,16.3,61.1l-1.4-.9L34,54.3Zm-17,2.3,16.6-5.1,1.4.7-19,5.8Z" fill="#4d4d4d"/><polygon points="13.6 56.2 15 54 31.3 49 33.1 50.2 13.6 56.2" fill="#b3b3b3"/><polygon points="33.3 50 31.8 52.2 15.5 57.2 13.7 56 33.3 50" fill="#e6e6e6"/><path d="M15.4,57.3l16.6-5,1.6-2.5-2.2-1L14.9,53.9,13.3,56ZM31.6,52l-16,4.9L14.2,56l18.5-5.7ZM15.2,54.2l16.1-4.9,1.3.6L14.2,55.6Z" fill="#4d4d4d"/><polygon points="12.6 52.2 14.1 50 30.3 45 32.2 46.2 12.6 52.2" fill="#b3b3b3"/><polygon points="32.3 46 30.8 48.2 14.5 53.2 12.7 52 32.3 46" fill="#e6e6e6"/><path d="M14.4,53.3l16.6-5,1.6-2.5-2.2-1L13.9,49.9,12.3,52ZM30.6,48l-16,4.9L13.2,52l18.6-5.7ZM14.3,50.2l16-4.9,1.4.6L13.2,51.6Z" fill="#4d4d4d"/><polygon points="11.6 48.2 13.1 46 29.4 41 31.2 42.2 11.6 48.2" fill="#b3b3b3"/><polygon points="31.3 42 29.8 44.2 13.6 49.2 11.7 48 31.3 42" fill="#e6e6e6"/><path d="M13.5,49.3l16.5-5,1.7-2.5-2.2-1L12.9,45.9,11.4,48ZM29.7,44l-16,4.9L12.2,48l18.6-5.7ZM13.3,46.2l16-4.9,1.4.6L12.3,47.6Z" fill="#4d4d4d"/><polygon points="10.3 44.3 11.9 42.2 28.7 37.2 30.6 38.2 10.3 44.3" fill="#b3b3b3"/><polygon points="30.7 38.1 29.2 40.2 12.3 45.2 10.4 44.2 30.7 38.1" fill="#e6e6e6"/><path d="M12.2,45.4l17.1-5.2,1.8-2.3L28.8,37,11.7,42.2l-1.6,2ZM29,40,12.4,44.9,11,44.1l19.2-5.7ZM12.1,42.4l16.6-5,1.4.6L11,43.7Z" fill="#4d4d4d"/><polygon points="9.8 40.6 11.2 38.4 27.5 33.4 29.4 34.6 9.8 40.6" fill="#b3b3b3"/><polygon points="29.5 34.4 28 36.6 11.7 41.6 9.9 40.4 29.5 34.4" fill="#e6e6e6"/><path d="M11.6,41.7l16.6-5,1.6-2.5-2.2-1L11.1,38.3,9.5,40.4Zm16.2-5.3-16,4.9-1.4-.9,18.5-5.7ZM11.4,38.6l16.1-4.9,1.4.6L10.4,40Z" fill="#4d4d4d"/><polygon points="8.8 36.6 10.3 34.4 26.6 29.4 28.4 30.6 8.8 36.6" fill="#b3b3b3"/><polygon points="28.5 30.4 27 32.6 10.8 37.6 8.9 36.4 28.5 30.4" fill="#e6e6e6"/><path d="M10.7,37.7l16.5-5,1.6-2.5-2.1-1L10.1,34.3,8.6,36.4Zm16.2-5.3L10.8,37.3l-1.4-.9L28,30.7ZM10.5,34.6l16-4.9,1.4.6L9.5,36Z" fill="#4d4d4d"/><polygon points="7.8 32.6 9.3 30.4 25.6 25.4 27.4 26.6 7.8 32.6" fill="#b3b3b3"/><polygon points="27.5 26.4 26.1 28.6 9.8 33.5 7.9 32.4 27.5 26.4" fill="#e6e6e6"/><path d="M9.7,33.7l16.5-5,1.7-2.5-2.2-1L9.2,30.3,7.6,32.4Zm16.2-5.4-16,5-1.4-.9L27,26.7ZM9.5,30.6l16.1-4.9,1.3.6L8.5,31.9Z" fill="#4d4d4d"/><polygon points="7.5 28.5 8.9 26.4 24.1 21.8 25.9 22.9 7.5 28.5" fill="#b3b3b3"/><polygon points="26 22.7 24.6 24.7 9.4 29.4 7.6 28.3 26 22.7" fill="#e6e6e6"/><path d="M9.3,29.6l15.5-4.8,1.5-2.2-2.1-1L8.8,26.4,7.3,28.3Zm15.1-5.1-15,4.6-1.3-.8L25.5,23ZM9.1,26.6l15-4.6,1.3.6L8.2,27.9Z" fill="#4d4d4d"/><polygon points="7 24.9 8.4 23 23.1 18.6 24.8 19.5 7 24.9" fill="#b3b3b3"/><polygon points="24.8 19.4 23.5 21.3 8.8 25.8 7.1 24.8 24.8 19.4" fill="#e6e6e6"/><path d="M8.7,25.9l15-4.5,1.5-2.1-2-.9-15,4.5L6.8,24.8Zm14.6-4.8L8.8,25.5l-1.2-.7,16.8-5.1ZM8.5,23.2l14.6-4.4,1.2.5L7.6,24.4Z" fill="#4d4d4d"/><polygon points="6.6 21.3 7.9 19.4 21.9 15.1 23.5 16.1 6.6 21.3" fill="#b3b3b3"/><polygon points="23.5 16 22.3 17.8 8.3 22.1 6.7 21.1 23.5 16" fill="#e6e6e6"/><path d="M8.2,22.3l14.2-4.4,1.4-2.1L22,15,7.7,19.3,6.4,21.1Zm13.9-4.6L8.4,21.9l-1.3-.8,16-4.9ZM8,19.6l13.8-4.2,1.2.5L7.2,20.8Z" fill="#4d4d4d"/><polygon points="6.7 17.5 7.8 15.8 20.3 11.9 21.7 12.9 6.7 17.5" fill="#b3b3b3"/><polygon points="21.8 12.7 20.7 14.5 8.2 18.4 6.7 17.4 21.8 12.7" fill="#e6e6e6"/><path d="M8.1,18.5l12.7-3.9,1.3-2-1.7-.8L7.7,15.7,6.5,17.4Zm12.5-4.2L8.2,18.1l-1.1-.7L21.4,13ZM7.9,16l12.4-3.9,1,.6L7.2,17.1Z" fill="#4d4d4d"/><polygon points="6.7 14.1 7.7 12.5 18.8 9.1 20.1 9.9 6.7 14.1" fill="#b3b3b3"/><polygon points="20.2 9.8 19.2 11.3 8.1 14.8 6.8 13.9 20.2 9.8" fill="#e6e6e6"/><path d="M8,14.9l11.3-3.5,1.1-1.7-1.5-.8L7.6,12.4,6.6,14Zm11.1-3.7-11,3.4-.9-.7L19.8,10ZM7.9,12.7,18.8,9.3l1,.4L7.2,13.6Z" fill="#4d4d4d"/><polygon points="6.5 11.2 7.4 9.8 18 6.5 19.2 7.3 6.5 11.2" fill="#b3b3b3"/><polygon points="19.2 7.2 18.3 8.6 7.7 11.9 6.5 11.1 19.2 7.2" fill="#e6e6e6"/><path d="M7.6,12,18.4,8.7l1-1.6L18,6.4,7.3,9.7l-1,1.4ZM18.1,8.5,7.8,11.7l-1-.6L18.9,7.4ZM7.5,9.9,17.9,6.7l.9.5L6.9,10.8Z" fill="#4d4d4d"/><polygon points="18.1 104.1 20.3 101.9 49.3 93.7 52.1 96.8 56.7 110.3 18.1 104.1" fill="#e6e6e6"/><path d="M49.2,94.3,51.6,97,56,110.1l-37-6.2,1.6-1.5,28.6-8.1m.3-1.2L20,101.5l-3.2,3,40.7,6.8L52.6,96.6l-3.1-3.5Z" fill="#4d4d4d"/><path d="M17.7,23.3l-.3-.2-1.1-.8c0-.1-.1-.1-.1-.2l-.9-1.5-1.4-1.5-1-1.6-1.1-1.3h-.1l-.5-1a.3.3,0,0,1,0-.4l.3-.3,5.1-1.6h.1c.2,0,.3,0,.4.2l.7.8V14l.6,1.6.9,1.5h0L20,19l.8,1.5v.2l.2,1.1c.1.1,0,.3-.1.4a.5.5,0,0,1-.4.2l-2.6.8Z" fill="#999"/><path d="M16.7,13.3l.7.9.6,1.6.9,1.5.6,1.9.8,1.6.2,1.1h0l-2.8.9-1.1-.9-.9-1.6-1.4-1.6-.9-1.5-1.2-1.4-.5-.9,5-1.6m0-1h-.2l-5.1,1.6a1.1,1.1,0,0,0-.7.6.8.8,0,0,0,.1.8l.5,1c0,.1.1.1.1.2l1.2,1.3.9,1.5h0l1.4,1.5.9,1.5a.2.2,0,0,0,.2.2l1.1.9a.7.7,0,0,0,.6.3H18l2.7-.8a1.2,1.2,0,0,0,.7-.5.9.9,0,0,0,.1-.7h0l-.2-1.1a.4.4,0,0,0-.1-.3l-.7-1.5L19.9,17c0-.1-.1-.1-.1-.2l-.9-1.5-.5-1.5-.2-.3-.7-.8a.8.8,0,0,0-.8-.4Z" fill="#4d4d4d"/><path d="M20.8,22.4a21.4,21.4,0,0,0-2.7.9l-5.8-7.6-1-1.3,5.4-1.6.6,1.5,1.3,3.1,1.5,3.4Z" fill="#999"/></g></svg>
				);
				break;
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="fd27bff0-48d3-4393-a22d-aed70916be91" data-name="molar" opacity="0.9"><path d="M60.9,5.7l-4-1c-1.8-.5-3.5,1.3-4.5,3.5l-4.6,8.9-3,8.8-10,39.7-2.2,3.7L26.3,95.4l19.8,4.8,6.3-26.1v-3l10.1-41,.6-7.9.8-11.6C64,8.2,62.8,6.2,60.9,5.7Z" fill="#999"/><path d="M32.3,69.1l2.1-3.6,10-39.7L47.5,17l4.6-8.9c1-2.2,2.8-4.4,4.9-3.9h.1l4,1.1-.2.4.2-.4c2,.5,3.3,2.8,3.1,5.3l-.9,11.6-.6,7.9h0l-10,41v2.9l-6.5,26.6L25.8,95.8ZM52,74V71.1l10-41,.6-7.9.9-11.6c.1-2.2-1-4.1-2.7-4.5l-4-1h0c-1.7-.5-3.2,1.4-4.1,3.3l-4.5,8.9L45.1,26l-10,39.7h0L33,69.4,26.7,95.1l19.1,4.6Z" fill="#4d4d4d"/><polygon points="49.4 100.7 47.5 98 26.8 91.8 24.4 93.1 49.4 100.7" fill="#b3b3b3"/><polygon points="24.3 92.9 26.2 95.5 47 101.8 49.3 100.5 24.3 92.9" fill="#e6e6e6"/><path d="M49.7,100.5l-2-2.6L26.6,91.6l-2.8,1.1,2.2,3L47.1,102ZM25,93.3l23.6,7.1-1.7,1.1L26.4,95.3Zm23.6,6.6L25.1,92.8l1.7-.7,20.5,6.2Z" fill="#4d4d4d"/><polygon points="50.6 95.9 48.7 93.3 27.9 87 25.6 88.4 50.6 95.9" fill="#b3b3b3"/><polygon points="25.4 88.2 27.3 90.8 48.1 97.1 50.4 95.7 25.4 88.2" fill="#e6e6e6"/><path d="M50.9,95.8l-2-2.6L27.7,86.8,25,88l2.1,2.9,21.1,6.4ZM26.1,88.6l23.7,7.1-1.8,1L27.6,90.6Zm23.6,6.6L26.2,88.1l1.7-.7,20.5,6.2Z" fill="#4d4d4d"/><polygon points="51.7 91.2 49.8 88.6 29 82.3 26.7 83.7 51.7 91.2" fill="#b3b3b3"/><polygon points="26.6 83.5 28.5 86.1 49.3 92.4 51.6 91 26.6 83.5" fill="#e6e6e6"/><path d="M52,91l-2-2.5L28.9,82.1l-2.8,1.2,2.2,2.9,21.1,6.4ZM27.3,83.8,50.9,91l-1.7,1L28.7,85.8Zm23.6,6.7L27.3,83.4l1.8-.8,20.5,6.2Z" fill="#4d4d4d"/><polygon points="52.8 86.6 50.9 83.9 30.2 77.7 27.8 79 52.8 86.6" fill="#b3b3b3"/><polygon points="27.7 78.8 29.6 81.4 50.4 87.7 52.7 86.4 27.7 78.8" fill="#e6e6e6"/><path d="M53.2,86.4l-2.1-2.6L30,77.5l-2.7,1.1,2.1,3,21.1,6.3ZM28.4,79.2,52,86.3l-1.7,1.1L29.8,81.2ZM52,85.8,28.5,78.7l1.7-.7,20.5,6.2Z" fill="#4d4d4d"/><polygon points="54 81.9 52.1 79.2 31.3 73 29 74.3 54 81.9" fill="#b3b3b3"/><polygon points="28.8 74.1 30.7 76.7 51.5 83 53.9 81.7 28.8 74.1" fill="#e6e6e6"/><path d="M54.3,81.7l-2-2.6L31.2,72.7l-2.8,1.2,2.1,2.9,21.1,6.4ZM29.5,74.5l23.7,7.1-1.8,1.1L31,76.5Zm23.6,6.6L29.6,74l1.7-.7,20.5,6.2Z" fill="#4d4d4d"/><polygon points="54 72.8 52.4 70.5 35 65.2 33 66.4 54 72.8" fill="#b3b3b3"/><polygon points="32.9 66.2 34.5 68.5 51.9 73.8 53.9 72.6 32.9 66.2" fill="#e6e6e6"/><path d="M54.2,72.6l-1.7-2.2L34.9,65l-2.3,1.1,1.7,2.5L52,74Zm-20.7-6,19.8,6-1.5.9L34.7,68.3Zm19.8,5.5-19.7-6,1.4-.6,17.2,5.2Z" fill="#4d4d4d"/><polygon points="53.9 77.1 52.2 74.7 33.3 69 31.1 70.2 53.9 77.1" fill="#b3b3b3"/><polygon points="31 70 32.7 72.5 51.7 78.2 53.8 76.9 31 70" fill="#e6e6e6"/><path d="M54.2,77l-1.8-2.4L33.1,68.8l-2.5,1.1,1.9,2.7,19.3,5.8ZM31.6,70.4l21.6,6.5-1.6,1L33,72.2Zm21.5,6.1L31.7,70l1.6-.7L52,74.9Z" fill="#4d4d4d"/><polygon points="54.6 68.5 53.1 66.3 36.3 61.1 34.4 62.3 54.6 68.5" fill="#b3b3b3"/><polygon points="34.3 62.1 35.8 64.4 52.6 69.5 54.5 68.3 34.3 62.1" fill="#e6e6e6"/><path d="M54.9,68.3l-1.6-2.1L36.2,60.9,33.9,62l1.7,2.5,17.1,5.2ZM34.8,62.4,54,68.3l-1.5.9L36,64.2ZM54,67.9,34.9,62l1.4-.6,16.6,5.1Z" fill="#4d4d4d"/><polygon points="55.6 64.4 54.1 62.1 37.3 57 35.4 58.2 55.6 64.4" fill="#b3b3b3"/><polygon points="35.3 58 36.8 60.2 53.6 65.4 55.5 64.2 35.3 58" fill="#e6e6e6"/><path d="M55.9,64.2,54.3,62,37.2,56.8l-2.3,1,1.7,2.5,17.1,5.3ZM35.8,58.3,55,64.2l-1.5.9L37,60ZM55,63.7,35.9,57.9l1.4-.7,16.6,5.1Z" fill="#4d4d4d"/><polygon points="56.6 60.4 55.1 58.1 38.3 53 36.4 54.2 56.6 60.4" fill="#b3b3b3"/><polygon points="36.3 54 37.8 56.2 54.6 61.4 56.5 60.2 36.3 54" fill="#e6e6e6"/><path d="M56.9,60.2,55.2,58l-17-5.2-2.3,1,1.7,2.5,17.1,5.3ZM36.8,54.3,56,60.2l-1.5.9L38,56Zm19.1,5.4-19-5.8,1.4-.7,16.6,5.1Z" fill="#4d4d4d"/><polygon points="57.3 56.2 55.8 54 39.5 49 37.7 50.2 57.3 56.2" fill="#b3b3b3"/><polygon points="37.6 50 39 52.2 55.3 57.2 57.2 56 37.6 50" fill="#e6e6e6"/><path d="M57.5,56l-1.6-2.1L39.4,48.8l-2.2,1,1.7,2.5,16.5,5ZM38.1,50.3,56.6,56l-1.4.9L39.2,52Zm18.5,5.3L38.2,49.9l1.3-.6,16.1,4.9Z" fill="#4d4d4d"/><polygon points="58.2 52.2 56.8 50 40.5 45 38.6 46.2 58.2 52.2" fill="#b3b3b3"/><polygon points="38.5 46 40 48.2 56.3 53.2 58.1 52 38.5 46" fill="#e6e6e6"/><path d="M58.5,52l-1.6-2.1L40.4,44.8l-2.2,1,1.6,2.5,16.6,5ZM39.1,46.3,57.6,52l-1.4.9L40.2,48Zm18.5,5.3L39.1,45.9l1.4-.6,16.1,4.9Z" fill="#4d4d4d"/><polygon points="59.2 48.2 57.7 46 41.5 41 39.6 42.2 59.2 48.2" fill="#b3b3b3"/><polygon points="39.5 42 41 44.2 57.2 49.2 59.1 48 39.5 42" fill="#e6e6e6"/><path d="M59.4,48l-1.5-2.1L41.3,40.8l-2.1,1,1.6,2.5,16.5,5ZM40,42.3,58.6,48l-1.4.9L41.2,44Zm18.5,5.3L40.1,41.9l1.4-.6,16,4.9Z" fill="#4d4d4d"/><polygon points="60.5 44.3 58.9 42.2 42.1 37.2 40.2 38.2 60.5 44.3" fill="#b3b3b3"/><polygon points="40.1 38.1 41.7 40.2 58.5 45.2 60.4 44.2 40.1 38.1" fill="#e6e6e6"/><path d="M60.7,44.2l-1.6-2L42,37l-2.3.9,1.8,2.3,17.1,5.2Zm-20-5.8,19.1,5.7-1.4.8L41.8,40Zm19.1,5.3L40.7,38l1.4-.6,16.6,5Z" fill="#4d4d4d"/><polygon points="61 40.6 59.6 38.4 43.3 33.4 41.4 34.6 61 40.6" fill="#b3b3b3"/><polygon points="41.3 34.4 42.8 36.6 59.1 41.6 60.9 40.4 41.3 34.4" fill="#e6e6e6"/><path d="M61.3,40.4l-1.6-2.1L43.2,33.2l-2.2,1,1.6,2.5,16.6,5ZM41.9,34.7l18.5,5.7-1.4.9L43,36.4ZM60.4,40,41.9,34.3l1.4-.6,16.1,4.9Z" fill="#4d4d4d"/><polygon points="62 36.6 60.5 34.4 44.3 29.4 42.4 30.6 62 36.6" fill="#b3b3b3"/><polygon points="42.3 30.4 43.8 32.6 60.1 37.6 61.9 36.4 42.3 30.4" fill="#e6e6e6"/><path d="M62.3,36.4l-1.6-2.1L44.2,29.2l-2.2,1,1.6,2.5,16.5,5ZM42.8,30.7l18.6,5.7-1.4.9L44,32.4ZM61.3,36,42.9,30.3l1.4-.6,16,4.9Z" fill="#4d4d4d"/><polygon points="63 32.6 61.5 30.4 45.2 25.4 43.4 26.6 63 32.6" fill="#b3b3b3"/><polygon points="43.3 26.4 44.7 28.6 61 33.5 62.9 32.4 43.3 26.4" fill="#e6e6e6"/><path d="M63.2,32.4l-1.5-2.1L45.1,25.2l-2.2,1,1.7,2.5,16.5,5ZM43.8,26.7l18.6,5.7-1.5.9-16-5Zm18.5,5.2L43.9,26.3l1.4-.6,16,4.9Z" fill="#4d4d4d"/><polygon points="63.3 28.5 61.9 26.4 46.7 21.8 45 22.9 63.3 28.5" fill="#b3b3b3"/><polygon points="44.9 22.7 46.2 24.7 61.4 29.4 63.2 28.3 44.9 22.7" fill="#e6e6e6"/><path d="M63.5,28.3l-1.4-1.9L46.6,21.6l-2.1,1,1.6,2.2,15.4,4.8ZM45.4,23l17.3,5.3-1.3.8-15-4.6Zm17.3,4.9L45.4,22.6l1.3-.6,15,4.6Z" fill="#4d4d4d"/><polygon points="63.8 24.9 62.5 23 47.7 18.6 46.1 19.5 63.8 24.9" fill="#b3b3b3"/><polygon points="46 19.4 47.3 21.3 62.1 25.8 63.7 24.8 46 19.4" fill="#e6e6e6"/><path d="M64,24.8l-1.4-1.9-15-4.5-1.9.9,1.5,2.1,14.9,4.5ZM46.5,19.7l16.7,5.1-1.2.7L47.5,21.1Zm16.7,4.7L46.5,19.3l1.2-.5,14.6,4.4Z" fill="#4d4d4d"/><polygon points="64.2 21.3 62.9 19.4 49 15.1 47.4 16.1 64.2 21.3" fill="#b3b3b3"/><polygon points="47.3 16 48.5 17.8 62.5 22.1 64.1 21.1 47.3 16" fill="#e6e6e6"/><path d="M64.4,21.1l-1.3-1.8L48.9,15l-1.9.8,1.4,2.1,14.2,4.4ZM47.7,16.2l16,4.9-1.2.8L48.7,17.7Zm15.9,4.6L47.8,15.9l1.2-.5,13.8,4.2Z" fill="#4d4d4d"/><polygon points="64.2 17.5 63 15.8 50.5 11.9 49.1 12.9 64.2 17.5" fill="#b3b3b3"/><polygon points="49 12.7 50.1 14.5 62.6 18.4 64.1 17.4 49 12.7" fill="#e6e6e6"/><path d="M64.3,17.4l-1.1-1.7L50.4,11.8l-1.7.8,1.3,2,12.7,3.9ZM49.4,13l14.3,4.4-1.1.7L50.3,14.3Zm14.2,4.1L49.5,12.7l1-.6L62.9,16Z" fill="#4d4d4d"/><polygon points="64.1 14.1 63.1 12.5 52 9.1 50.7 9.9 64.1 14.1" fill="#b3b3b3"/><polygon points="50.6 9.8 51.6 11.3 62.7 14.8 64 13.9 50.6 9.8" fill="#e6e6e6"/><path d="M64.2,14l-1-1.6L51.9,8.9l-1.5.8,1.1,1.7,11.3,3.5ZM51,10l12.6,3.9-.9.7-11-3.4Zm12.6,3.6L51,9.7l1-.4,10.9,3.4Z" fill="#4d4d4d"/><polygon points="64.4 11.2 63.4 9.8 52.9 6.5 51.6 7.3 64.4 11.2" fill="#b3b3b3"/><polygon points="51.6 7.2 52.5 8.6 63.1 11.9 64.3 11.1 51.6 7.2" fill="#e6e6e6"/><path d="M64.5,11.1l-1-1.4L52.8,6.4l-1.4.7,1,1.6L63.2,12ZM52,7.4l12,3.7-.9.6L52.7,8.5Zm12,3.4L52,7.2l.9-.5L63.3,9.9Z" fill="#4d4d4d"/><polygon points="52.7 104.1 50.5 101.9 21.5 93.7 18.7 96.8 14.1 110.3 52.7 104.1" fill="#e6e6e6"/><path d="M21.7,94.3l28.5,8.1,1.6,1.5-37,6.2L19.2,97l2.5-2.7m-.4-1.2-3.1,3.5-4.9,14.7L54,104.5l-3.2-3L21.3,93.1Z" fill="#4d4d4d"/><path d="M53.1,23.3H53l-2.8-.8a.3.3,0,0,1-.3-.3.4.4,0,0,1-.1-.3l.2-1.1v-.2l.8-1.6.6-1.7h0l1-1.5.5-1.6v-.2l.7-.8c.1-.2.2-.2.4-.2h.1l5.1,1.6a.3.3,0,0,1,.3.3.3.3,0,0,1,0,.4l-.5,1H59l-1.2,1.4L56.9,19l-1.4,1.7-.9,1.4v.2l-1.1.8Z" fill="#999"/><path d="M54.1,13.3l5.1,1.6-.5.9-1.2,1.4-1,1.5-1.4,1.6-.9,1.6-1.1.9-2.8-.9h0l.2-1.1.8-1.6.6-1.9.9-1.5.6-1.6.7-.9m0-1a.9.9,0,0,0-.8.4l-.7.8-.2.3-.5,1.5L51,16.8c0,.1-.1.1-.1.2l-.6,1.8-.7,1.5c0,.1-.1.2-.1.3l-.2,1.1h0a1.7,1.7,0,0,0,.1.7,1.1,1.1,0,0,0,.8.5l2.6.8h.3a.9.9,0,0,0,.7-.3l1-.9.3-.2.8-1.5,1.4-1.5h.1l.9-1.5,1.1-1.3v-.2l.6-1a1.1,1.1,0,0,0,0-.8,1.2,1.2,0,0,0-.6-.6l-5.1-1.6Z" fill="#4d4d4d"/><path d="M50.1,22.4l2.7.9,5.7-7.6,1-1.3-5.4-1.6-.6,1.5-1.3,3.1-1.5,3.4Z" fill="#999"/></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getResorptionSvg = (icon, vestibular, distal, mesial) => {
		switch(icon) {
			case '11':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M24,42.2A164,164,0,0,0,20.5,62c-.4,3.8,5.6,3.8,6,0a153.7,153.7,0,0,1,3.2-18.2c.9-3.8-4.9-5.4-5.7-1.6Z" fill={distal}/><path d="M44.5,41.5h0c-2.1-2.3-5.6.2-5,3,1.2,6,3,12,3.5,18.2.3,3.8,6.3,3.8,6,0-.5-6.7-2.4-13.3-3.7-19.8l-5,2.9h0c2.6,2.8,6.9-1.4,4.2-4.3Z" fill={mesial}/><path d="M32.4,43.5l-.8,20.1c-.1,3.8,5.9,3.8,6,0l.8-20.1c.2-3.9-5.8-3.9-6,0Z" fill={vestibular}/></svg>
				);
				break;
			case '12':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M29.4,42.6c-1.2,6.3-2.4,12.7-3.4,19-.6,3.8,5.1,5.4,5.8,1.6,1-6.3,2.2-12.7,3.4-19,.7-3.7-5.1-5.4-5.8-1.6Z" fill={distal}/><path d="M42.8,46.2a93.9,93.9,0,0,1,1.9,16.7c.2,3.9,6.2,3.9,6,0a101.6,101.6,0,0,0-2.1-18.3c-.8-3.8-6.6-2.2-5.8,1.6Z" fill={mesial}/><path d="M36.5,44.2l-.8,21c-.2,3.8,5.8,3.8,6,0l.8-21c.2-3.9-5.8-3.9-6,0Z" fill={vestibular}/></svg>
				);
				break;
			case '13':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M23.3,42c-1.2,6.3-2.3,12.7-3.4,19-.6,3.8,5.2,5.4,5.8,1.6,1.1-6.3,2.2-12.7,3.4-19,.7-3.8-5.1-5.4-5.8-1.6Z" fill={distal}/><path d="M39.1,45.7c1.2,5.8,2.3,11.6,3.4,17.4.7,3.8,6.5,2.2,5.8-1.6-1.1-5.8-2.3-11.6-3.4-17.3-.7-3.8-6.5-2.2-5.8,1.5Z" fill={mesial}/><path d="M31.2,43.6v21c0,3.8,6,3.8,6,0v-21c0-3.9-6-3.9-6,0Z" fill={vestibular}/></svg>
				);
				break;
			case '14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M25.2,42c-1.2,6.3-2.3,12.7-3.4,19-.6,3.8,5.2,5.4,5.8,1.6,1-6.3,2.2-12.7,3.4-19,.7-3.8-5.1-5.4-5.8-1.6Z" fill={distal}/><path d="M44,45.1V62.7c0,3.9,6,3.9,6,0V45.1c0-3.8-6-3.8-6,0Z" fill={mesial}/><path d="M33.1,43.6c-.4,6.7-.8,13.4-1.3,20.1-.3,3.8,5.7,3.8,6,0,.5-6.7.9-13.4,1.3-20.1.2-3.9-5.8-3.9-6,0Z" fill={vestibular}/></svg>
				);
				break;
			case '15':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M27.8,42c-1.2,6.3-2.4,12.7-3.4,19-.6,3.8,5.1,5.4,5.8,1.6,1-6.3,2.1-12.7,3.4-19,.7-3.8-5.1-5.4-5.8-1.6Z" fill={distal}/><path d="M46.7,44.3a142,142,0,0,0-1.1,18.4c0,3.9,6,3.9,6,0a118.3,118.3,0,0,1,.9-16.8c.6-3.7-5.2-5.4-5.8-1.6Z" fill={mesial}/><path d="M38.3,43.4a99.8,99.8,0,0,0-3.9,20.3c-.4,3.8,5.6,3.8,6,0A98.3,98.3,0,0,1,44.1,45c1.1-3.7-4.7-5.3-5.8-1.6Z" fill={vestibular}/></svg>
				);
				break;
			case '16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M36.1,64c-.3,4.5-.8,9.1-1.3,13.6s5.5,3.8,6,0,1-9.1,1.3-13.6-5.7-3.8-6,0Z" fill={vestibular}/><path d="M25.1,49.2a59.8,59.8,0,0,0-8.3,22.7c-.6,3.8,5.2,5.5,5.7,1.6a57.1,57.1,0,0,1,7.8-21.3c2.1-3.2-3.1-6.2-5.2-3Z" fill={distal}/><path d="M51.1,55.8c.5,6.8.5,13.6.5,20.4,0,3.9,6,3.9,6,0,0-6.8,0-13.6-.5-20.4-.3-3.8-6.3-3.9-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M33.4,68l-.9,12.5c-.2,3.8,5.8,3.8,6,0L39.4,68c.2-3.9-5.8-3.9-6,0Z" fill={vestibular}/><path d="M27.9,51.4A48,48,0,0,0,17.5,70.6c-1.1,3.8,4.7,5.3,5.7,1.6a40.4,40.4,0,0,1,9-16.5c2.6-2.9-1.7-7.1-4.3-4.3Z" fill={distal}/><path d="M49.4,55.1A34.8,34.8,0,0,1,51.5,74c-.5,3.8,5.2,5.4,5.8,1.6,1.1-7.6.8-15-2.1-22.1-1.5-3.5-7.3-2-5.8,1.6Z" fill={mesial}/></svg>
				);
				break;
			case '18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M34.6,48.4a109.9,109.9,0,0,0-9.2,20.4c-1.3,3.7,4.5,5.3,5.8,1.6a104.5,104.5,0,0,1,8.6-19c1.9-3.3-3.3-6.4-5.2-3Z" fill={distal}/><path d="M50,51.4a81.8,81.8,0,0,0-1,23.7c.5,3.8,6.5,3.8,6,0A74.4,74.4,0,0,1,55.8,53c.7-3.8-5.1-5.4-5.8-1.6Z" fill={mesial}/><path d="M42.9,51.4a84.1,84.1,0,0,0-5.3,23.2c-.4,3.8,5.6,3.8,6,0A80,80,0,0,1,48.7,53c1.3-3.6-4.5-5.2-5.8-1.6Z" fill={vestibular}/></svg>
				);
				break;
			case '21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M40,46.4a161.5,161.5,0,0,1,3.3,18.2c.4,3.8,6.4,3.8,6,0a164,164,0,0,0-3.5-19.8c-.9-3.8-6.7-2.2-5.8,1.6Z" fill={distal}/><path d="M29.4,48.4h.1l-5.1-2.9c-1.3,6.6-3.1,13.1-3.7,19.8-.3,3.9,5.7,3.9,6,0,.5-6.1,2.3-12.2,3.5-18.2.6-2.8-2.8-5.2-5-2.9h0c-2.6,2.8,1.6,7.1,4.2,4.2Z" fill={mesial}/><path d="M31.3,46.1l.8,20.1c.2,3.9,6.2,3.9,6,0l-.8-20.1c-.1-3.8-6.1-3.8-6,0Z" fill={vestibular}/></svg>
				);
				break;
			case '22':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M33,46.2c1.2,6.3,2.3,12.7,3.3,19,.7,3.8,6.4,2.2,5.8-1.6-1-6.3-2.2-12.7-3.4-19-.7-3.8-6.5-2.2-5.7,1.6Z" fill={distal}/><path d="M19.5,46.5a103.7,103.7,0,0,0-2.1,18.4c-.2,3.9,5.8,3.8,6,0a96.1,96.1,0,0,1,1.9-16.8c.8-3.7-5-5.3-5.8-1.6Z" fill={mesial}/><path d="M25.6,46.2l.8,21c.2,3.8,6.2,3.8,6,0l-.8-21c-.2-3.9-6.2-3.9-6,0Z" fill={vestibular}/></svg>
				);
				break;
			case '23':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M40,45.6c1.2,6.3,2.3,12.6,3.4,19,.6,3.8,6.4,2.2,5.8-1.6-1.1-6.3-2.2-12.7-3.4-19-.7-3.8-6.5-2.2-5.8,1.6Z" fill={distal}/><path d="M24.2,46.1c-1.1,5.8-2.2,11.6-3.4,17.4-.7,3.8,5.1,5.4,5.8,1.6,1.1-5.8,2.3-11.6,3.4-17.4.7-3.7-5.1-5.4-5.8-1.6Z" fill={mesial}/><path d="M31.9,45.5v21c0,3.9,6,3.9,6,0v-21c0-3.8-6-3.8-6,0Z" fill={vestibular}/></svg>
				);
				break;
			case '24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M39.2,45.6c1.2,6.3,2.3,12.6,3.3,19,.7,3.8,6.4,2.2,5.8-1.6-1-6.3-2.2-12.7-3.4-19-.7-3.8-6.5-2.2-5.7,1.6Z" fill={distal}/><path d="M20.1,47.1V64.7c0,3.9,6,3.9,6,0V47.1c0-3.9-6-3.9-6,0Z" fill={mesial}/><path d="M31,45.5c.4,6.8.8,13.5,1.3,20.2.3,3.8,6.3,3.8,6,0-.5-6.7-.9-13.4-1.3-20.2-.2-3.8-6.2-3.8-6,0Z" fill={vestibular}/></svg>
				);
				break;
			case '25':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M36.6,46.6c1.2,6.3,2.3,12.6,3.3,19,.7,3.8,6.4,2.2,5.8-1.6-1-6.3-2.2-12.7-3.4-19-.7-3.8-6.5-2.2-5.7,1.6Z" fill={distal}/><path d="M17.6,48.9a118.3,118.3,0,0,1,.9,16.8c0,3.9,6,3.9,6,0a140.9,140.9,0,0,0-1.1-18.4c-.6-3.8-6.4-2.2-5.8,1.6Z" fill={mesial}/><path d="M26,47.9a100.9,100.9,0,0,1,3.7,18.8c.4,3.8,6.4,3.8,6,0a100.7,100.7,0,0,0-3.9-20.4c-1.1-3.6-6.9-2.1-5.8,1.6Z" fill={vestibular}/></svg>
				);
				break;
			case '26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M28,64c.3,4.5.8,9.1,1.3,13.6s6.5,3.8,6,0S34.3,68.5,34,64s-6.3-3.9-6,0Z" fill={vestibular}/><path d="M39.8,52.2a55.9,55.9,0,0,1,7.8,21.3c.6,3.8,6.3,2.2,5.8-1.6A61.7,61.7,0,0,0,45,49.2c-2.1-3.3-7.3-.3-5.2,3Z" fill={distal}/><path d="M13,55.8c-.5,6.8-.4,13.6-.5,20.4,0,3.9,6,3.9,6,0,.1-6.8,0-13.6.5-20.4.3-3.9-5.7-3.8-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M29.7,69l.9,12.4c.2,3.9,6.2,3.9,6,0L35.7,69c-.2-3.9-6.2-3.9-6,0Z" fill={vestibular}/><path d="M36.9,56.7a40.4,40.4,0,0,1,9,16.5c1,3.7,6.8,2.1,5.8-1.6A48.8,48.8,0,0,0,41.2,52.4c-2.6-2.8-6.9,1.4-4.3,4.3Z" fill={distal}/><path d="M13.9,54.5c-2.9,7.1-3.2,14.5-2.1,22,.6,3.9,6.3,2.2,5.8-1.5a34.8,34.8,0,0,1,2.1-18.9c1.5-3.6-4.3-5.1-5.8-1.6Z" fill={mesial}/></svg>
				);
				break;
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M30.8,51.4a104.5,104.5,0,0,1,8.6,19c1.3,3.7,7.1,2.1,5.8-1.6A109.9,109.9,0,0,0,36,48.4c-1.9-3.4-7.1-.4-5.2,3Z" fill={distal}/><path d="M14.8,53a73.9,73.9,0,0,1,.8,22c-.5,3.9,5.5,3.8,6,0a81.2,81.2,0,0,0-1-23.6c-.7-3.8-6.5-2.2-5.8,1.6Z" fill={mesial}/><path d="M22,53a79.2,79.2,0,0,1,5,21.5c.4,3.9,6.4,3.9,6,0a84.2,84.2,0,0,0-5.3-23.1c-1.3-3.6-7.1-2.1-5.7,1.6Z" fill={vestibular}/></svg>
				);
				break;
			case '31':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M40.3,94.8c-1.6,5.9-3.8,11.7-4.8,17.8-.6,3.8,5.2,5.4,5.8,1.6,1-6.1,3.2-11.9,4.8-17.8,1.1-3.7-4.7-5.3-5.8-1.6Z" fill={distal}/><path d="M32.2,90.2l-2.5,17.3c-.5,3.8,5.2,5.4,5.8,1.6L38,91.8c.6-3.7-5.2-5.4-5.8-1.6Z" fill={vestibular}/><path d="M23.1,95c.3,6.4.6,12.7.7,19,0,3.9,6,3.9,6,0-.1-6.3-.4-12.6-.7-19-.2-3.8-6.2-3.8-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '32':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M40.8,96.9c-1.6,6.1-3.8,12.1-5,18.4-.7,3.8,5.1,5.4,5.8,1.6,1.2-6.3,3.4-12.3,5-18.4,1-3.8-4.8-5.4-5.8-1.6Z" fill={distal}/><path d="M31.8,96.4l-2.7,18.5c-.6,3.8,5.2,5.4,5.8,1.6L37.5,98c.6-3.8-5.2-5.4-5.7-1.6Z" fill={vestibular}/><path d="M22,97.2c.3,6.3.7,12.6.7,18.9,0,3.9,6,3.9,6,0,0-6.3-.4-12.6-.7-18.9-.2-3.9-6.2-3.9-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '33':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M44.8,97.8c-.3,6.1-.7,12.2-1.5,18.3-.4,3.9,5.6,3.8,6,0,.8-6.1,1.2-12.2,1.5-18.3.1-3.8-5.9-3.8-6,0Z" fill={distal}/><path d="M34.1,98.3l.2,17.2c0,3.9,6,3.9,6,0l-.2-17.2c-.1-3.8-6.1-3.9-6,0Z" fill={vestibular}/><path d="M23.6,98.3c.8,6.3,1.6,12.5,2.1,18.8.3,3.8,6.3,3.9,6,0-.5-6.3-1.3-12.5-2.1-18.8-.5-3.8-6.5-3.8-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '34':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M41.3,97.8c-.3,6.1-.7,12.2-1.5,18.3-.4,3.9,5.6,3.8,6,0,.8-6.1,1.2-12.2,1.5-18.3.1-3.8-5.9-3.8-6,0Z" fill={distal}/><path d="M32.3,98.3l.2,17.2c.1,3.9,6.1,3.9,6,0l-.2-17.2c0-3.8-6-3.9-6,0Z" fill={vestibular}/><path d="M22.8,98.3c.7,6.4,1.4,13,2.7,19.3.9,3.7,6.6,2.1,5.8-1.6a175.3,175.3,0,0,1-2.5-17.7c-.5-3.8-6.5-3.8-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '35':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M44.2,98.3c-.5,6-.6,12-1.3,18.1-.4,3.8,5.6,3.8,6,0,.7-6.1.8-12.1,1.3-18.1.3-3.9-5.7-3.9-6,0Z" fill={distal}/><path d="M41.2,96.2h-.1a3.2,3.2,0,0,0-4.2,0c-2.3,1.9-1.1,8.5-1.1,10.9s-.8,8.7,1.3,10.6a3,3,0,0,0,5-1.3h0c1.2-3.7-4.6-5.3-5.7-1.6h-.1l5.1-1.3c.7.7.6,2.4.7,1a12.1,12.1,0,0,0-.1-1.9c-.1-1.8-.1-3.7-.2-5.5v-5.4a13.3,13.3,0,0,0,0-2c-.1-1.5.5-.2-.7.8H36.9c2.9,2.6,7.2-1.7,4.3-4.2Z" fill={vestibular}/><path d="M26.6,99.1a127.9,127.9,0,0,0,3.5,17.2c1.1,3.7,6.9,2.1,5.8-1.6-1.8-5.6-2.6-11.5-3.5-17.2-.6-3.8-6.4-2.2-5.8,1.6Z" fill={mesial}/></svg>
				);
				break;
			case '36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M51,97.5a57.9,57.9,0,0,1-6.4,18.3c-1.8,3.4,3.4,6.4,5.2,3a63.2,63.2,0,0,0,7-19.8c.6-3.7-5.2-5.4-5.8-1.5Z" fill={distal}/><path d="M29.8,80.3a136.3,136.3,0,0,1-2.6,21.9c-.7,3.7,5.1,5.4,5.8,1.6a155.4,155.4,0,0,0,2.8-23.5c.1-3.9-5.9-3.9-6,0Z" fill={vestibular}/><path d="M7.3,93.1c-.1,7.6-.4,15.3.4,22.9.4,3.8,6.4,3.9,6,0-.8-7.6-.5-15.3-.4-22.9.1-3.8-5.9-3.8-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M47.5,97.6c-1.6,5.6-6.1,11.3-10.5,15.1-2.9,2.5,1.3,6.7,4.2,4.2,5.2-4.4,10.2-11.2,12.1-17.7,1.1-3.7-4.7-5.3-5.8-1.6Z" fill={distal}/><path d="M7.9,88.8a35,35,0,0,0-2,22.8c.9,3.8,6.7,2.2,5.8-1.6a28.4,28.4,0,0,1,1.4-18.2c1.5-3.5-3.6-6.6-5.2-3Z" fill={mesial}/><path d="M29.6,85.4c-1.7,5-3.2,10.2-5.7,14.9s3.4,6.5,5.2,3.1c2.7-5.2,4.4-10.9,6.3-16.4,1.3-3.7-4.5-5.2-5.8-1.6Z" fill={vestibular}/></svg>
				);
				break;
			case '38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M49.1,97.5A31.5,31.5,0,0,1,41,116c-2.5,2.8,1.7,7.1,4.2,4.2,5.7-6.5,9.3-14,9.9-22.7.2-3.8-5.8-3.8-6,0Z" fill={distal}/><path d="M29.5,99.8v18.4c0,3.9,6,3.9,6,0V99.8c0-3.9-6-3.9-6,0Z" fill={vestibular}/><path d="M13,98.8a75.5,75.5,0,0,0,6.9,19.5c1.8,3.4,7,.3,5.2-3.1a67.6,67.6,0,0,1-6.3-18c-.9-3.7-6.6-2.1-5.8,1.6Z" fill={mesial}/></svg>
				);
				break;
			case '41':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M24,96.8c1.6,5.9,3.9,11.7,4.8,17.8.6,3.8,6.4,2.2,5.8-1.6-1-6.1-3.2-11.9-4.8-17.8-1.1-3.7-6.8-2.1-5.8,1.6Z" fill={distal}/><path d="M32.1,92.2l2.5,17.3c.6,3.8,6.4,2.2,5.8-1.6L37.9,90.6c-.6-3.8-6.3-2.2-5.8,1.6Z" fill={vestibular}/><path d="M41,95.4c-.3,6.3-.6,12.7-.6,19-.1,3.8,5.9,3.8,6,0,0-6.3.3-12.7.6-19,.2-3.8-5.8-3.8-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '42':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M22.5,98.8c1.6,6.2,3.9,12.2,5,18.5.7,3.8,6.5,2.2,5.8-1.6-1.2-6.3-3.4-12.3-5-18.5-1-3.7-6.8-2.1-5.8,1.6Z" fill={distal}/><path d="M31.6,98.3l2.7,18.6c.5,3.8,6.3,2.2,5.8-1.6L37.4,96.7c-.6-3.8-6.4-2.1-5.8,1.6Z" fill={vestibular}/><path d="M41.1,97.5c-.3,6.4-.6,12.7-.6,19-.1,3.9,5.9,3.9,6,0,0-6.3.3-12.6.6-19,.2-3.8-5.8-3.8-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M19.9,97.4c.2,6.2.7,12.3,1.4,18.4.5,3.7,6.5,3.8,6,0-.7-6.1-1.2-12.2-1.4-18.4-.2-3.8-6.2-3.8-6,0Z" fill={distal}/><path d="M30.5,97.9l-.2,17.2c0,3.9,6,3.9,6,0l.2-17.2c.1-3.8-5.9-3.8-6,0Z" fill={vestibular}/><path d="M41.1,97.9c-.8,6.3-1.7,12.6-2.2,18.8-.3,3.9,5.7,3.9,6,0,.5-6.2,1.4-12.5,2.2-18.8.5-3.8-5.5-3.7-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '44':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M22.4,97.4c.2,6.2.7,12.3,1.4,18.4.5,3.7,6.5,3.8,6,0-.7-6.1-1.2-12.2-1.4-18.4-.2-3.8-6.2-3.8-6,0Z" fill={distal}/><path d="M31.3,97.9l-.2,17.2c0,3.9,6,3.9,6,0l.2-17.2c.1-3.8-5.9-3.8-6,0Z" fill={vestibular}/><path d="M40.9,97.9a175.5,175.5,0,0,1-2.6,17.7c-.8,3.8,5,5.4,5.8,1.6,1.4-6.3,2-12.8,2.8-19.3.4-3.8-5.6-3.8-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M20.4,97.9c.5,6,.6,12.1,1.3,18.1.4,3.8,6.4,3.8,6,0-.7-6-.8-12.1-1.3-18.1-.3-3.8-6.3-3.9-6,0Z" fill={distal}/><path d="M33.7,100H29.5c-.8-.7-.5-2.3-.7-1a13.4,13.4,0,0,0,0,2c.1,1.8,0,3.7,0,5.6s-.1,3.5-.2,5.3-.1,1.3-.1,2-.3.2.8-.9l5,1.4h0c-1.2-3.7-7-2.1-5.8,1.6h0a3.1,3.1,0,0,0,5,1.4c2.1-2,1.2-8.2,1.3-10.7s1.2-9-1.1-10.8a3,3,0,0,0-4.2,0h0c-2.9,2.6,1.3,6.8,4.2,4.2Z" fill={vestibular}/><path d="M38.2,97.1c-.9,5.7-1.7,11.7-3.4,17.2-1.2,3.7,4.6,5.3,5.7,1.6,1.8-5.5,2.6-11.5,3.5-17.2.6-3.8-5.2-5.4-5.8-1.6Z" fill={mesial}/></svg>
				);
				break;
			case '46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M13.2,99.4a63,63,0,0,0,6.9,19.8c1.9,3.4,7.1.4,5.2-3a62.9,62.9,0,0,1-6.4-18.4c-.6-3.8-6.4-2.2-5.7,1.6Z" fill={distal}/><path d="M34.2,80.6a152.3,152.3,0,0,0,2.7,23.5c.8,3.8,6.6,2.2,5.8-1.6a145.4,145.4,0,0,1-2.5-21.9c-.2-3.8-6.2-3.8-6,0Z" fill={vestibular}/><path d="M56.6,93.5a194.4,194.4,0,0,1-.3,22.9c-.4,3.8,5.6,3.8,6,0a194.4,194.4,0,0,0,.3-22.9c0-3.9-6-3.9-6,0Z" fill={mesial}/></svg>
				);
				break;
			case '47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M18.2,98.9c1.9,6.5,6.9,13.3,12,17.7,2.9,2.5,7.2-1.7,4.3-4.2S25.6,102.9,24,97.3c-1.1-3.7-6.9-2.2-5.8,1.6Z" fill={distal}/><path d="M58.4,91.5c2.6,6,2.8,11.8,1.4,18.2-.9,3.8,4.9,5.4,5.8,1.6a35.4,35.4,0,0,0-2-22.9c-1.6-3.5-6.7-.4-5.2,3.1Z" fill={mesial}/><path d="M36.1,86.7c1.9,5.5,3.6,11.1,6.3,16.3,1.8,3.5,7,.4,5.2-3s-4-9.9-5.8-14.9-7-2.1-5.7,1.6Z" fill={vestibular}/></svg>
				);
				break;
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><path d="M16.1,98.2c.5,8.6,4.1,16.1,9.8,22.6,2.5,2.9,6.8-1.3,4.2-4.2-4.6-5.3-7.6-11.4-8-18.4-.3-3.9-6.3-3.9-6,0Z" fill={distal}/><path d="M35.6,100.4v18.4c0,3.9,6,3.9,6,0V100.4c0-3.8-6-3.8-6,0Z" fill={vestibular}/><path d="M52.4,97.9a77,77,0,0,1-6.3,18c-1.8,3.4,3.4,6.4,5.2,3a75.3,75.3,0,0,0,6.8-19.5c.9-3.7-4.9-5.3-5.7-1.5Z" fill={mesial}/></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	const getMetalBlockSvg = (icon, cervical, distal, mesial, vestibular) => {
		switch(icon) {
			case '11':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="9bacc999-99f6-43ca-9e1b-a65869e85f44" data-name="Procedimentos - 11"><g id="c78225e9-6c4c-4aea-ae5f-12e77f7cb2db" data-name="Bloco metalico 11"><path id="391601eb-13aa-4ff2-adf0-680737760fd8" data-name="cervical" fill={cervical} d="M34.5,103.6c-2.9,0-6.7,1.9-9.5,6.6H44.5C41.4,104.6,37.5,103.6,34.5,103.6Z" /><path id="dd33ae16-d759-48ad-9c5a-92e911528fd0" data-name="mesial" fill={mesial} d="M47.1,115.9a26.6,26.6,0,0,0-4.1-8.3v48.5a44.4,44.4,0,0,0,10.4-14.3C56.4,135.3,49.4,123.1,47.1,115.9Z" /><path id="55ed1c38-7842-40c4-9914-edb3fa1febe7" data-name="distal" fill={distal} d="M26.3,108.1h0c-2.6,3.3-8.6,16-9.5,30.3-.2,3.3,5.9,12.7,9.5,16.9h0Z" /><path id="a42f05d6-145a-48c8-a097-ef0dd31cf587" data-name="vestibular" fill={vestibular} d="M26.3,109.8v45.6c3.4,3.6,6.9,6,9.7,6a29.6,29.6,0,0,0,7-5V109.8Z" /></g></g></svg>
				);
				break;
			case '12':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="03682328-f9ee-4495-99b5-a2139787e2fb" data-name="Procedimentos - 12"><g id="182c0519-e669-45bd-91d8-c1d9205399fe" data-name="Bloco metalico 12"><path id="7b7514e5-6b26-4692-ab0a-b63474e2894d" data-name="distal" fill={distal} d="M16.1,148.8c1.3,2.3,6.1,3.4,9.2,3.9V104.4c-1.6,1.6-3.6,6.3-4.3,8.3C18.7,119.4,13.7,144.5,16.1,148.8Z" /><path id="addd0ddd-081c-4393-8840-15c6bf039213" data-name="mesial" fill={mesial} d="M45,112.2c-1-3.3-2.8-7.8-5.1-9.7v49.9c3.1-.5,5.7-1.3,6.9-2.3C50.9,146.5,47,119.3,45,112.2Z" /><path id="776f2103-a64e-42b2-8dbb-ece91a85d2f1" data-name="cervical" fill={cervical} d="M43.4,108.8c-3.2-8-7.3-9.1-10.8-9.1s-7,3.1-9.8,9.1Z" /><path id="331806ae-a13d-44ac-88d2-a062cfaa817e" data-name="vestbiular" d="M35.2,108.5H25.3v44.3a56.2,56.2,0,0,0,14.8-.3v-44Z" /></g></g></svg>
				);
				break;
			case '13':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="95769499-344b-4e8c-accf-83cb56bf6794" data-name="Procedimentos - 13"><g id="323daab6-7b46-497e-9310-f22cee9941a7" data-name="Bloco metalico 13"><path id="a0f48c1b-64c8-491b-af9e-6582aef237c6" data-name="cervical" fill={cervical} d="M33.9,107c-2.9,0-6.7,1.9-9.5,6.6H44C40.8,108,36.9,107,33.9,107Z" /><path id="a203b08b-c243-4c34-9774-c1fc9544f402" data-name="mesial" fill={mesial} d="M46.5,119.3a26.6,26.6,0,0,0-4.1-8.3v48.4a43.5,43.5,0,0,0,10.4-14.2C55.9,138.6,48.8,126.5,46.5,119.3Z" /><path id="91e26cc2-3ebc-4271-aa7c-7580985a2fbc" data-name="distal" fill={distal} d="M25.8,111.5h-.1c-2.6,3.3-8.6,16-9.5,30.3-.2,3.2,5.9,12.7,9.5,16.8h.1Z" /><path id="a0509d13-8b64-4cd3-b7cc-ce72b269bd07" data-name="vestibular" fill={vestibular} d="M25.8,113.2v45.5c3.3,3.6,6.8,6,9.6,6a29.6,29.6,0,0,0,7-5V113.2Z" /></g></g></svg>
				);
				break;
			case '14':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="2dbaf452-fe69-4b61-b2b3-639f64309837" data-name="Procedimentos - 14"><g id="ded97d82-1612-4220-bb5d-5dc9ad0d5116" data-name="Bloco metalico 14"><path id="d946eba0-380c-4fc4-bd66-89cc7a044d2b" data-name="distal" fill={distal} d="M27.8,107.1c-.5.1-2.9,4-2.9,4S12.2,137.6,16,143.6s8.8,8.3,11.7,9.5Z" /><path id="6da91e91-7048-4a64-8bda-d0f273a2d160" data-name="mesial" fill={mesial} d="M41.9,107.4v45A25.7,25.7,0,0,0,53.5,140c1.5-3.7-3.4-13.6-4.2-15.8C45.8,113.4,44.1,110,41.9,107.4Z" /><path id="c190230c-f5a4-42a0-b24a-5bd3c68e6e13" data-name="cervical" fill={cervical} d="M34.6,104.6c-6.3,0-8.6,3.6-9.7,6.6H44.4C43.4,108.9,41.1,104.6,34.6,104.6Z" /><path id="44aaf795-7ae8-4fc8-a3fd-3dda67812e50" data-name="vestibular" fill={vestibular} d="M42.1,111.2H27.7v41.9a14.8,14.8,0,0,0,14.5-.9v-41Z" /></g></g></svg>
				);
				break;
			case '15':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="933b175e-342e-414b-bc6a-1e991a8a003a" data-name="Procedimentos - 15"><g id="40fde5c2-10ce-4267-becc-2923ed122abe" data-name="Bloco metalico 15"><path id="b74c2259-ca4b-4988-bbda-28027f29d076" data-name="distal" fill={distal} d="M24.1,105.3l-1.4.3S10.3,125,14.4,132.5a29.1,29.1,0,0,0,9.5,10.7Z" /><path id="82e1bae4-7da4-4e2c-b046-60d9b9c68a24" data-name="mesial" fill={mesial} d="M46.2,107.1s-.2-.7-2-1.4v6.5l.2,31c3.9-3.3,6.5-8.1,8.9-15.5S46.2,107.1,46.2,107.1Z" /><path id="d26e74eb-3bf3-4b42-af44-397447749211" data-name="cervical" fill={cervical} d="M45.9,106.9s-.7-2.5-11.2-2.5a50.2,50.2,0,0,0-12,1.2s-1.3,2.1-2.8,5.1H48.3Z" /><path id="c7374d7f-f68e-4659-a3a9-8c32a6be2be4" data-name="vestibular" fill={vestibular} d="M44.5,110.7H24v32.9a20.7,20.7,0,0,0,9.7,3.2c3.7.8,7.5-.7,10.9-3.6V110.7Z" /></g></g></svg>
				);
				break;
			case '16':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b2a3fe1a-2aae-4d06-936e-bd086829454a" data-name="Procedimentos - 16"><g id="d6808732-b7f7-4eec-905b-69c5f91950a8" data-name="Bloco metalico 16"><path id="65975e4a-c96e-4bdb-bdc2-8100e1425237" data-name="distal" fill={distal} d="M20.8,103.9H19s-9.6,19.9-9.1,25.9c.7,7.5,5.5,13.6,10.7,14.4Z" /><path id="8bf3c616-4763-4755-a495-35d6d0e66f0b" data-name="mesial" fill={mesial} d="M56,118.9c-.6-1.8-4.1-15-4.1-15h-5v14.8h0v19.9h0v5.3c5-.2,9.3-2.3,10.7-6.8S56.5,120.6,56,118.9Z" /><path id="625bf203-0292-4015-9fa8-c0fb1330d81b" data-name="cervical" fill={cervical} d="M52,103.9H18.9s-1,2.1-2.3,5.2H53.2C52.5,106.2,52,103.9,52,103.9Z" /><path id="33be00a9-1d4f-453f-ad4f-f277a182579a" data-name="vestibular" fill={vestibular} d="M43.3,108.9H20.5v31.3h0v4c8.4,1,13.7-3.8,14-8.9.2-3.1-.4,4.1,3.5,6.4s3.9,2.2,8.8,2.3V108.9Z" /></g></g></svg>
				);
				break;
			case '17':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="2820dc51-5e71-46b9-93f5-286627937bdd" data-name="Procedimentos - 17"><g id="e08ee403-5c3b-4015-99c0-8b082057ec97" data-name="Bloco metalico 17"><path id="5b18703d-f042-4fcd-bc40-4a3f494e0050" data-name="distal" fill={distal} d="M21,103.9H19.4s-8.3,17.1-7.8,22.3,4.7,11.7,9.2,12.4Z" /><path id="7e3c3d63-c13f-4212-8097-519eccc76cd7" data-name="mesial" fill={mesial} d="M51.2,116.8c-.5-1.5-3.5-12.9-3.5-12.9H43.4v12.8h0v17h0v4.6c4.3-.1,8-2,9.2-5.9S51.6,118.3,51.2,116.8Z" /><path id="09c08853-b9ce-418a-a556-f01fc11aaffc" data-name="cervical" fill={cervical} d="M47.8,103.9H19.4s-.9,1.8-2,4.5H48.9Z" /><path id="6c1eb1f2-0df5-487c-b92d-a8b34d7ad8fa" data-name="vestibular" fill={vestibular} d="M40.3,108.2H20.7v27h0v3.4c7.2.8,11.8-3.3,12-7.7.2-2.7-.3,3.6,3,5.5s3.4,2,7.6,2V108.2Z" /></g></g></svg>
				);
				break;
			case '18':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="ba393cb0-1a2e-4486-90c2-b10a3f6eff62" data-name="Procedimentos - 18"><g id="a00e8f00-dcb1-4888-b877-820e4a01e577" data-name="Bloco metalico 18"><path id="a6c7ab2f-c5b7-4459-8385-a32762c3fddf" data-name="distal" fill={distal} d="M22.5,106.1s-10.7,20.4-.4,26.1l2.1.9h.3v-3.7h0v-18h0l-.2-5.1Z" /><path id="1436b5c1-219d-4ded-b713-7e3b98158f15" data-name="cervical" fill={cervical} d="M39.9,105a42.7,42.7,0,0,1-17.4,1.1s-.6,1.3-1.4,3.3H51.8a4.5,4.5,0,0,0-.6-2.7C49,103.8,39.9,105,39.9,105Z" /><path id="484a9ac6-db6b-4d1d-b0db-262b6a5242d0" data-name="mesial" fill={mesial} d="M52.1,122.9c-.7-6.8.8-14.3-.7-16.2s-2.5-1.5-4.4-1.8v26a9.6,9.6,0,0,0,2.7-.3C51.5,130,52.8,129.8,52.1,122.9Z" /><path id="15fa9ae7-7590-4044-9e84-892256541e62" data-name="vestibular" fill={vestibular} d="M24.5,109.4v23.9c7.4,2.7,15.5.9,16.1-1.3s3.7-.9,6.4-.9V109.4Z" /></g></g></svg>
				);
				break;
			case '21':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="7de98bae-98fb-4ddf-a8c5-fe5df6a52e7e" data-name="Procedimentos - 21"><g id="3cfb8c1c-108f-47f3-8c5c-0e77743500d6" data-name="Bloco metalico 21"><path id="51cc9c2f-cfc2-4ded-bfdc-8288c0482303" data-name="cervical" fill={cervical} d="M36.4,103.6c2.9,0,6.7,2,9.5,6.7H26.3C29.4,104.6,33.4,103.6,36.4,103.6Z" /><path id="9e0de8cb-cdb0-48e2-9125-30d00fd78750" data-name="mesial" fill={mesial} d="M23.8,116a28.5,28.5,0,0,1,4.1-8.4v48.6a45.2,45.2,0,0,1-10.4-14.3C14.4,135.3,21.4,123.2,23.8,116Z" /><path id="ff170e81-2fb1-4def-8785-0dce7de7ba6b" data-name="distal" fill={distal} d="M44.5,108.1h.1c2.6,3.2,8.6,16,9.5,30.3.2,3.3-5.9,12.7-9.5,16.9a.1.1,0,0,1-.1-.1Z" /><path id="fc0b23ab-69b8-4781-a4a8-8b33f7dd7e94" data-name="vestibular" fill={vestibular} d="M44.5,109.9v45.6c-3.3,3.6-6.8,6-9.6,6a29.6,29.6,0,0,1-7-5V109.9Z" /></g></g></svg>
				);
				break;
			case '22':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="a48431b1-8906-4269-891f-0db8db98284e" data-name="Procedimentos - 22"><g id="6867d1c8-78e0-4f55-a88c-a1f18c7e3a94" data-name="Bloco metalico 22"><path id="d1b45a41-7944-49c9-a479-c4e625e4eb8b" data-name="distal" fill={distal} d="M52.1,154.7c-1.3,2.3-6.1,3.3-9.2,3.9V110.3c1.6,1.6,3.6,6.3,4.3,8.3C49.5,125.3,54.5,150.4,52.1,154.7Z" /><path id="1c0c2daf-c0e5-451f-80c5-c3cb43d9a489" data-name="mesial" fill={mesial} d="M23.2,118.1c1-3.3,2.8-7.8,5.1-9.7v49.9c-3.1-.5-5.7-1.3-6.9-2.3C17.3,152.4,21.2,125.2,23.2,118.1Z" /><path id="d3aad318-da7d-40d2-8298-d216118c4b2b" data-name="cervical" fill={cervical} d="M24.8,114.7c3.2-8,7.3-9.1,10.8-9.1s7,3.1,9.8,9.1Z" /><path id="58f50da0-b479-49b5-8fad-25ceceff5b83" data-name="vestbiular" d="M33,114.4h9.9v44.3a56.2,56.2,0,0,1-14.8-.3v-44Z" /></g></g></svg>
				);
				break;
			case '23':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="28d7bf1a-302e-4a26-9075-dbfdb848363a" data-name="Procedimentos - 23"><g id="3bad0dda-ad07-4f59-84ad-ce4082b434a0" data-name="Bloco metalico 23"><path id="2a920800-0693-4fde-bd37-f5e60dfd4069" data-name="cervical" fill={cervical} d="M34.1,100.7c2.9,0,6.7,2,9.5,6.7H23.9C27,101.7,31,100.7,34.1,100.7Z" /><path id="f5642e6e-ce2c-4779-98d0-2c58e7ebfd86" data-name="mesial" fill={mesial} d="M21.3,113.1a24.6,24.6,0,0,1,4.2-8.3v48.7A46.2,46.2,0,0,1,15,139.1C11.9,132.6,19,120.4,21.3,113.1Z" /><path id="79c0dbf4-a1d1-4196-b1f3-f8b62236d6fa" data-name="distal" fill={distal} d="M42.2,105.2h.1c2.6,3.3,8.7,16.1,9.6,30.4.2,3.3-6,12.8-9.6,17h-.1Z" /><path id="c5436293-2429-48bf-9b69-f51026107a44" data-name="vestibular" fill={vestibular} d="M42.2,107v45.8c-3.4,3.6-6.9,6-9.7,6a29.6,29.6,0,0,1-7-5V107Z" /></g></g></svg>
				);
				break;
			case '24':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="e2fcc490-4637-472e-a6c6-132c27340e31" data-name="Procedimentos - 24"><g id="f22c0007-cbfe-471c-a260-ff13e50bea1f" data-name="Bloco metalico 24"><path id="587dc011-fd73-40d1-9437-98e942fe3e84" data-name="distal" fill={distal} d="M41.7,107.1c.5.1,2.9,4,2.9,4s12.7,26.5,9,32.5-8.9,8.3-11.7,9.5Z" /><path id="ebee956c-17de-4158-aaca-f63a45ac189a" data-name="mesial" fill={mesial} d="M27.7,107.4v45A26.2,26.2,0,0,1,16,140c-1.5-3.7,3.4-13.6,4.2-15.8C23.8,113.4,25.4,110,27.7,107.4Z" /><path id="ac6ee70c-af16-4598-84cf-2a57a0724567" data-name="cervical" fill={cervical} d="M34.9,104.6c6.3,0,8.6,3.6,9.8,6.6H25.2A9.7,9.7,0,0,1,34.9,104.6Z" /><path id="733ae9e0-6017-415e-984a-891479721233" data-name="vestibular" fill={vestibular} d="M27.5,111.2H41.9v41.9c-5.7,2.4-10.2,1.7-14.5-.9v-41Z" /></g></g></svg>
				);
				break;
			case '25':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="06d0594e-11a3-451b-ab48-9140c31f9b2f" data-name="Procedimentos - 25"><g id="ad9c0b11-4e4b-4b1a-b270-2dfc9d6384d6" data-name="Bloco metalico 25"><path id="18e2dc39-f6a1-431e-99ce-1bfef99d4857" data-name="distal" fill={distal} d="M44.7,106.7l1.4.4s12.4,19.3,8.3,26.8a29.1,29.1,0,0,1-9.5,10.7Z" /><path id="82e1888f-9d8a-4e81-8115-feb300bdc281" data-name="mesial" fill={mesial} d="M22.6,108.5s.2-.7,2-1.4v6.5l-.2,31c-3.9-3.3-6.5-8.1-9-15.5S22.6,108.5,22.6,108.5Z" /><path id="2db99c2b-cc43-4911-91d4-7a4475dfecc9" data-name="cervical" fill={cervical} d="M22.9,108.3s.7-2.4,11.2-2.5a46.5,46.5,0,0,1,12,1.3s1.2,2,2.8,5H20.5Z" /><path id="44639585-5e0a-4c35-bb31-0e8746a92544" data-name="vestibular" fill={vestibular} d="M24.3,112.1H44.8V145a20.7,20.7,0,0,1-9.7,3.2c-3.7.9-7.5-.7-10.9-3.6V112.1Z" /></g></g></svg>
				);
				break;
			case '26':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b314884e-3086-4926-b277-7593be7e2206" data-name="Procedimentos - 26"><g id="fd53ca52-dec1-4d25-96cc-6dbbe625705a" data-name="Bloco metalico 26"><path id="f733007f-e41a-413f-a690-11e239bf5d0b" data-name="distal" fill={distal} d="M49.3,103.2h1.9s9.6,20,9,26-5.4,13.6-10.7,14.4Z" /><path id="7f9bee5a-6637-4c99-bf37-594021c07977" data-name="mesial" fill={mesial} d="M14.2,118.2c.5-1.7,4-15,4-15h5v14.9h0v19.8h0v5.4c-5-.2-9.3-2.3-10.7-6.8S13.6,120,14.2,118.2Z" /><path id="33673aef-3d9b-4baa-a8d6-e0e112326def" data-name="cervical" fill={cervical} d="M18.1,103.3l33.1-.2s1,2.2,2.3,5.3H16.9C17.6,105.6,18.1,103.3,18.1,103.3Z" /><path id="a81380a1-eabb-44fe-af24-07383d77da18" data-name="vestibular" fill={vestibular} d="M26.8,108.3H49.6v31.3h0v4c-8.4.9-13.7-3.8-14-8.9-.1-3.2.5,4.1-3.5,6.4s-3.9,2.2-8.8,2.3V108.3Z" /></g></g></svg>
				);
				break;
			case '27':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="8089168e-fdca-4854-9a7e-e66626002887" data-name="Procedimentos - 27"><g id="3e1f01b6-79a0-40e3-aad7-2ba02faad485" data-name="Bloco metalico 27"><path id="9bd58c9c-ace5-40a4-9f17-fb29adf47bc7" data-name="distal" fill={distal} d="M47.5,103.3h1.6s8.2,17.1,7.8,22.2-4.7,11.7-9.2,12.4Z" /><path id="211fa64e-ca81-4b68-b9e7-b2a5cd0e34f2" data-name="mesial" fill={mesial} d="M17.3,116.2c.5-1.6,3.5-12.9,3.5-12.9h4.3v12.8h0v17h0v4.6c-4.3-.2-8-2-9.3-5.9S16.8,117.7,17.3,116.2Z" /><path id="a4d84c3f-c6ce-4af5-9823-de117ba41b3b" data-name="cervical" fill={cervical} d="M20.7,103.3H49.1s.9,1.8,2,4.5H19.6Z" /><path id="1500926e-75e4-4898-a82d-88dec36c2aa3" data-name="vestibular" fill={vestibular} d="M28.2,107.6H47.8v26.9h0v3.4c-7.2.9-11.8-3.2-12-7.6-.2-2.7.3,3.5-3.1,5.5s-3.3,1.9-7.5,1.9V107.6Z" /></g></g></svg>
				);
				break;
			case '28':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="6225897d-18dc-4975-9f99-6034949542ad" data-name="Procedimentos - 28"><g id="faba2a29-55b2-41e9-8007-4bae4301de56" data-name="Bloco metalico 28"><path id="074057cd-a73c-40cb-867d-1a9269eba84a" data-name="distal" fill={distal} d="M49,105.5s10.7,20.4.4,26l-2.1,1H47v-3.7h0V110.7h0l.2-5Z" /><path id="e3ce9a94-b129-43e9-b2fd-1a12b00c9375" data-name="cervical" fill={cervical} d="M31.6,104.3A41.6,41.6,0,0,0,49,105.5l1.4,3.2H19.6a5.1,5.1,0,0,1,.7-2.6C22.5,103.2,31.6,104.3,31.6,104.3Z" /><path id="5195c946-5a5f-4e2c-a1f9-0cc11cb7ab0f" data-name="mesial" fill={mesial} d="M19.4,122.3c.7-6.9-.8-14.4.7-16.3s2.5-1.5,4.4-1.7v26a9.6,9.6,0,0,1-2.7-.3C20,129.3,18.7,129.1,19.4,122.3Z" /><path id="4763b895-3964-4aaa-88a1-3ac3147f2760" data-name="vestibular" fill={vestibular} d="M47,108.7v24c-7.4,2.6-15.5.9-16.1-1.3s-3.7-.9-6.4-1V108.7Z" /></g></g></svg>
				);
				break;
			case '31':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="2fbf866a-e5d1-477c-b57d-85d058e64297" data-name="Procedimentos - 31"><g id="6f44c602-0398-41d3-a564-85eb5f3e7cd4" data-name="Bloco Metalico 31"><path id="95038ef2-cab0-42d9-99e6-c1f2a1f717be" data-name="distal" fill={distal} d="M47.7,9.4s1.9,0,1.9,4.2-3.9,39.9-3.9,39.9A31.8,31.8,0,0,1,41.1,60V9.4Z" /><path id="b497d898-1959-409e-aa21-99c52720e9c8" data-name="mesial" fill={mesial} d="M29,9.4h2.3V58.1a22.5,22.5,0,0,1-4.6-8C25.1,44.7,22,14.9,22,13.7S21.5,9.4,29,9.4Z" /><path id="771c5cd9-bc3e-4471-8c41-40f484078602" data-name="cervical" fill={cervical} d="M30.5,54.2H45.3c-.9,1.8-4.2,8-7.5,7.9s-6.9-3.8-9.2-7.9Z" /><path id="01845a30-415a-445b-a715-e278b03d4de5" data-name="vestibular" fill={vestibular} d="M36.3,9.4h4.8V54.5H31.3V9.4Z" /></g></g></svg>
				);
				break;
			case '32':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="60f38bcb-c99c-4ce7-ab06-95d9998aa8f9" data-name="Procedimentos - 32"><g id="66dbee61-b15d-4e6e-90d1-6cdd25059b16" data-name="Bloco Metalico 32"><path id="478ebb95-a468-4a26-bab9-e943b94ee903" data-name="distal" fill={distal} d="M46.1,5.7S48,5.7,48,10s-4,41-4,41a30.9,30.9,0,0,1-4.7,6.8V5.7Z" /><path id="d21cc703-392d-4049-9bf5-f4b12cb131a6" data-name="mesial" fill={mesial} d="M26.9,5.7h2.3V55.8a22.1,22.1,0,0,1-4.7-8.2C22.8,42,19.6,11.3,19.6,10S19,5.7,26.9,5.7Z" /><path id="23f7bfbd-5a31-419c-8ba1-e8512795c5fe" data-name="cervical" fill={cervical} d="M28.4,51.8H43.6c-.9,1.8-4.3,8.2-7.7,8.1s-7.1-3.9-9.5-8.1Z" /><path id="d198b870-06cf-4187-a0a6-db5ec3c9201c" data-name="vestibular" fill={vestibular} d="M34.3,5.7h5V52.1H29.2V5.7Z" /></g></g></svg>
				);
				break;
			case '33':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="431a6825-6643-43fd-81b3-ebf20479dc1d" data-name="Procedimentos - 33"><g id="a8725c44-0e66-4fe8-8b64-9f7ef49355e1" data-name="Bloco Metalico33"><path id="417ba0dc-c7de-4ba6-b819-a056b16e75f2" data-name="distal" fill={distal} d="M41.3,14.8V48.4h0v9.7c2.7-.9,5.3-2.3,5.9-4.1s4.3-30.4,4.1-30.7A32.6,32.6,0,0,0,41.3,14.8Z" /><path id="24065097-f800-40c6-9124-cbfcfb018f07" data-name="mesial" fill={mesial} d="M28.7,16.6V57.4c-1.9-.9-3.5-2-4-3.4-1.4-3.4-6.5-23-6.5-23S23.1,21.7,28.7,16.6Z" /><path id="ecb9ce98-7cd6-4ef7-bb05-f503d7d1b40f" data-name="cervical" fill={cervical} d="M26.6,52.8h21a13,13,0,0,1-.3,1.5C45.5,57.5,38,59.2,35.4,59S26,57.3,24.7,54.1a10.4,10.4,0,0,1-.4-1.3Z" /><path id="3e1a781f-a1d8-4700-ac5a-929ad97de4f8" data-name="vestibular" fill={vestibular} d="M34.7,13.1a15.4,15.4,0,0,1,6.6,1.7v38H28.5v-36C30.6,14.7,32.7,13.1,34.7,13.1Z" /></g></g></svg>
				);
				break;
			case '34':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="42f45a94-b387-467f-bb4e-30115c5b264d" data-name="Procedimentos - 34"><g id="3405a64d-d663-4a06-8e73-db9b6b457e4d" data-name="Bloco Metalico 34"><path id="11fef4ac-8d81-467f-a439-eacdf64578a8" data-name="distal" fill={distal} d="M53.2,30.1c2,4.3-5.1,18.7-8.2,24.5-.8,1.6-2.8,2.6-3.9,3.2V15.2c2,.1,3.4-.2,5.6,2.4S51.7,26.9,53.2,30.1Z" /><path id="b14c7e89-2249-496a-9f66-1c6b6ddac258" data-name="mesial" fill={mesial} d="M17.3,25.6c3-5.8,7.3-7.1,10.1-8.3v40c-1.4-1.2-2.7-1.6-3.7-4.9C21.5,45.1,15.3,29.4,17.3,25.6Z" /><path id="10aeecf2-610e-4973-909a-93e7b532ce7d" data-name="cervical" fill={cervical} d="M35.2,58.7c-4.8.2-8.8.1-11.5-5.9H46c-.3.7-.7,1.4-1,2C42.6,59.1,38.8,58.6,35.2,58.7Z" /><path id="e70cacd5-8c95-41a7-880e-4ae40176d899" data-name="vestibular" fill={vestibular} d="M41.1,15.2v38H27.4V17.3C31.6,15.4,38.7,14.9,41.1,15.2Z" /></g></g></svg>
				);
				break;
			case '35':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="d26bd959-bbdd-4974-a639-24ac847f602f" data-name="Procedimentos - 35"><g id="7e6970bd-1812-45f5-9c0c-8f069c752aef" data-name="Bloco Metalico 35"><path id="cfef77fd-4b2e-48a5-806b-73fc952ef505" data-name="distal" fill={distal} d="M53.5,23.7c2,4.3-5.2,24.2-8.3,30.1a7.3,7.3,0,0,1-2.9,3.1V13.6A19.9,19.9,0,0,1,53.5,23.7Z" /><path id="d011312a-9123-40aa-b9e2-22319373d0eb" data-name="mesial" fill={mesial} d="M18.7,25.4a26.1,26.1,0,0,1,9.9-10.9V56.1c-1.4-1.2-2.7-3.1-3.7-6.5C22.7,42.3,16.7,29.2,18.7,25.4Z" /><path id="5e96e7c1-b693-4c53-9751-f92b86765be4" data-name="cervical" fill={cervical} d="M36.3,57.7c-4.2.2-7.7,0-10.1-5.9H46a17.2,17.2,0,0,1-.9,1.9C42.9,58,39.6,57.5,36.3,57.7Z" /><path id="3a6533bc-3193-4ee3-b8b8-fe866af80853" data-name="vestibular" fill={vestibular} d="M35.5,12.1a18.7,18.7,0,0,1,6.8,1.4V52.1H28.6V14.6A16.8,16.8,0,0,1,35.5,12.1Z" /></g></g></svg>
				);
				break;
			case '36':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="36e25e66-b7fa-4468-950f-48bf4cc9da48" data-name="Incisivo"><rect x="17.3" y="55.5" height="1.93" /><line x1="17.1" y1="54.8" x2="30.1" y2="54.8" /></g><g id="8ecc9661-4dc2-4e72-aa01-59d8250d5bfe" data-name="Procedimentos - 36"><g id="e3912a26-f14b-49aa-a3de-99967188fc0f" data-name="Bloco metalico 36"><path id="90b9bc49-6cd0-4c6a-945d-f242c808aa91" data-name="cervical" fill={cervical} d="M54.9,57.8c-1.4,2.6-2.5,4.3-2.5,4.3H14.1s-.6-1.7-1.4-4.3H54.9Z" /><path id="93cf5247-0643-42e4-ae66-50362673cc83" data-name="distal" fill={distal} d="M47.1,28.2c2.2.4,11.4,6.8,13.3,10.5.9,1.8.8,3.1-.5,8C58,54.1,52.6,62,52.6,62H45.3V28.2Z" /><path id="32ceb494-0a2a-4532-8334-454bf0afe019" data-name="mesial" fill={mesial} d="M25.5,28.7h1v3.9h0V62H13.9s-5.2-14-6.2-21.5S21.3,28.6,25.5,28.7Z" /><path id="9ce942c2-54d7-400b-bfc7-954aca5b71e8" data-name="vestibular" fill={vestibular} d="M39.3,31.5c1.3-.2,3.3-2.9,6.1-3.4V58H26.5V28.8C31.1,29.3,37,31.9,39.3,31.5Z" /></g></g></svg>
				);
				break;
			case '37':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="b192c18e-0559-4489-b51a-27a07de38c39" data-name="molar" opacity="0.9"><rect x="49.5" y="23.3" width="13.8" height="40" transform="translate(112.7 86.5) rotate(-180)" fill="none"/></g><g id="dc9e03f8-b4ee-4d4b-88e7-c8490f91ca25" data-name="Procedimentos - 37"><g id="3fa9e718-c462-40b4-b634-3497fe17add4" data-name="Bloco metalico 37"><path id="47f5c907-a74c-47bd-845f-53a8cbf95692" data-name="distal" fill={distal} d="M53.1,28.8v32h1.6c1,0,2.6-3.7,2.6-3.7s5.3-15,5-19.6-5.3-7.6-6.6-8.1A7.7,7.7,0,0,0,53.1,28.8Z" /><g id="2526f56d-3d91-4d48-b4d8-78f6a6172c94" data-name="cervical" fill={cervical}><path d="M14.2,54.5H57.9a26.7,26.7,0,0,0-.9,2.6s-1.6,3.7-2.6,3.7H38l-22.4-.7-1.8-5.6Z" /></g><path d="M22.9,30.1v-.9H19.8c-6.6.3-8.3,9.4-8.4,12.2a22.1,22.1,0,0,0,.9,8l3.2,10.8,7.4.2V32.8h0V30.1h0Zm-1,2.7a3.8,3.8,0,0,0-2.1.5c-2.1,1.4-4.7,1.9-4.7,6.6s4.3,19.8,4.3,19.8h-.1S15,44.6,15,39.9s2.7-5.2,4.8-6.6A3.8,3.8,0,0,1,21.9,32.8Z" /><path id="467f4c58-e20c-4490-88e1-2ed984125041" data-name="vestibular" fill={vestibular} d="M22.9,54.4V29.2c5.5.3,13.4,1.2,13.4,1.2a13.8,13.8,0,0,1,6.6-2.1,77.5,77.5,0,0,1,10.2.6V54.4Z" /></g></g></svg>
				);
				break;
			case '38':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="8904d39b-a2bc-4b91-ba43-1d943b4c5107" data-name="Procedimentos - 47"><line x1="44.3" y1="55.1" x2="51.4" y2="55.1" /></g><g id="1f7b4fd5-376f-41a2-9fa2-748be66bcd04" data-name="Procedimentos - 38"><g id="594fb1e6-d25f-44ae-868c-ab60ee8db5c7" data-name="Bloco Metalico 38"><path id="0b6fe6c4-bb22-489e-8219-c826156b7c59" data-name="distal" fill={distal} d="M47.1,27.8c5.2,0,13.3-2.3,13.9,1.3s0,8.8-1.7,14.9-3.6,13.1-6.2,16c-.1.2-2.7.3-6.4.4V27.8Z" /><path id="82a62fc5-93d4-43a4-9fc3-6818f8c4d3e6" data-name="mesial" fill={mesial} d="M13.3,29c3.5,0,7.5,1.2,9.5,0a15.1,15.1,0,0,1,2.9-1.3V60.4H16.5s-5.8-10.5-6.1-16.6S9.8,29,13.3,29Z" /><path id="7e2b7e2d-a69d-4f78-8860-0168ca40264f" data-name="cervical" fill={cervical} d="M14.9,55.1H55.7a16.4,16.4,0,0,1-2.6,4.8c-.6.8-36.5.5-36.5.5s-1.2-2.2-2.5-5.3Z" /><path id="e17b05f8-0225-42c2-8489-ae5377932f37" data-name="vestibular" fill={vestibular} d="M25.7,55.2V27.5c2.5-.6,5.3-.4,9.2,1.3,1.1.5,4.1.9,5.4.2s1.5-1.3,6.4-1.3V55.2Z" /></g></g></svg>
				);
				break;
			case '41':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="54bf29d9-6603-4ecb-8a19-76b91b04d7a8" data-name="Procedimentos - 41"><g id="70e75162-bd68-4f0b-a768-fd6233ccebf2" data-name="Bloco Metalico 41"><path id="bbbc193a-c327-420a-a57c-77b2cb0cad2d" data-name="distal" fill={distal} d="M23.1,10s-1.9,0-1.9,4.2S25.1,54,25.1,54a27.5,27.5,0,0,0,4.6,6.6V10Z" /><path id="dca7386e-b1d5-4d8a-a755-db00c6cd5e40" data-name="mesial" fill={mesial} d="M41.7,10H39.5V58.6A23.3,23.3,0,0,0,44,50.7c1.6-5.4,4.8-35.3,4.8-36.5S49.3,10,41.7,10Z" /><path id="99821b00-4e86-469e-acd1-82d44f07e55d" data-name="cervical" fill={cervical} d="M40.2,54.8H25.4c1,1.7,4.2,8,7.5,7.9s7-3.8,9.3-7.9Z" /><path id="4f25563d-cbaa-4e1a-8825-afdb142ec3a5" data-name="vestibular" fill={vestibular} d="M34.5,10H29.7V55.1h9.8V10Z" /></g></g></svg>
				);
				break;
			case '42':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="fa1d4c14-f805-4ff9-a3af-c401ccb23892" data-name="Procedimentos - 42"><g id="590c0784-0818-4f1c-a335-c64e566da9c7" data-name="Bloco Metalico 42"><path id="c11d5403-745b-4fa3-925d-1281cf003f60" data-name="distal" fill={distal} d="M22.7,9.7s-1.9,0-1.9,4.3,4,41.1,4,41.1a31.4,31.4,0,0,0,4.7,6.7V9.7Z" /><path id="5b9c55b7-d2e5-4095-b2e5-70f8e11ff3d0" data-name="mesial" fill={mesial} d="M41.9,9.7H39.6V59.8a24.2,24.2,0,0,0,4.7-8.2c1.6-5.6,4.9-36.3,4.9-37.5S49.7,9.7,41.9,9.7Z" /><path id="3575536c-3d95-4562-8eb3-a38826492e7e" data-name="cervical" fill={cervical} d="M40.4,55.9H25.1c1,1.7,4.3,8.2,7.7,8.1s7.2-4,9.6-8.1Z" /><path id="bdb8de2c-7973-4c58-ad02-a0c85d8e9656" data-name="vestibular" fill={vestibular} d="M34.5,9.7h-5V56.2H39.6V9.7Z" /></g></g></svg>
				);
				break;
			case '43':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="e2114a6b-6fb8-4376-bc55-42f69a827254" data-name="Procedimentos - 43"><g id="43d04968-51b9-4bb9-a428-a81fbb8d0d3e" data-name="Bloco Metalico 43"><path id="4dcbff31-eff6-4db8-9b1a-11c0b3728a18" data-name="distal" fill={distal} d="M18.4,26.3c-.1.4,3,27.5,4.1,30.8.6,1.8,3.3,3.2,6,4.1V51.5h0V17.9A35.5,35.5,0,0,0,18.4,26.3Z" /><path id="bc7365be-c227-4a6d-9244-374b1fcd07a2" data-name="mesial" fill={mesial} d="M41.1,19.6V60.4c1.8-.8,3.4-1.9,4-3.4,1.3-3.3,6.5-23,6.5-23S46.6,24.7,41.1,19.6Z" /><path id="5c0597c1-c5fa-4484-8128-2e12abdb4916" data-name="cervical" fill={cervical} d="M43.1,55.8H22.2c.1.5.1,1.2.3,1.4,1.8,3.2,9.3,4.9,11.8,4.8s9.4-1.7,10.8-5l.4-1.3Z" /><path id="e8e01e8f-d402-4472-891f-9b5263980b15" data-name="vestibular" fill={vestibular} d="M35,16.2a15.3,15.3,0,0,0-6.5,1.7v38H41.3V19.8C39.2,17.8,37,16.2,35,16.2Z" /></g></g></svg>
				);
				break;
			case '44':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="56336276-5c2c-4ad4-97b3-9d4ba19dee67" data-name="Procedimentos - 44"><g id="cdcd9ac3-107f-434f-a1a1-10cbc7d726d3" data-name="Bloco Metalico 44"><path id="facd3b81-7815-40ad-bc38-f1f4b45ba0fc" data-name="distal" fill={distal} d="M17.1,32.4c-2,4.3,5,18.7,8.1,24.5.9,1.6,2.9,2.6,4,3.2V17.5c-2,.1-3.4-.2-5.6,2.4S18.6,29.2,17.1,32.4Z" /><path id="2e8cec7b-ae03-45a3-b651-461227805ce9" data-name="mesial" fill={mesial} d="M53,27.9c-3-5.8-7.3-7.1-10.2-8.3v40c1.5-1.2,2.8-1.6,3.8-4.9C48.8,47.4,55,31.7,53,27.9Z" /><path id="4c58a851-8f23-471b-9962-e2ba2437fd53" data-name="cervical" fill={cervical} d="M35.1,61c4.7.2,8.7.1,11.4-5.9H24.2a18,18,0,0,0,1.1,2C27.7,61.4,31.4,60.9,35.1,61Z" /><path id="475f0240-de86-4c31-a5cc-a590cc9147ad" data-name="vestibular" fill={vestibular} d="M29.2,17.5v38H42.8V19.6C38.7,17.7,31.6,17.2,29.2,17.5Z" /></g></g></svg>
				);
				break;
			case '45':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="41855593-1536-4e0d-adf2-7a89c6dc470f" data-name="Procedimentos - 45"><g id="d53ca91b-a933-4af0-9e8a-c52c2e31dbd0" data-name="Bloco Metalico 45"><path id="d281d2e9-9574-4c35-8f97-76f18e07875f" data-name="distal" fill={distal} d="M17.7,28c-2,4.3,5.3,24.2,8.4,30.1A6.8,6.8,0,0,0,29,61.2V17.9A20.4,20.4,0,0,0,17.7,28Z" /><path id="ae2908fa-6f92-4611-a654-d87439c6c16a" data-name="mesial" fill={mesial} d="M52.6,29.7a26.2,26.2,0,0,0-10-10.9V60.4c1.5-1.2,2.8-3.1,3.8-6.5C48.6,46.6,54.6,33.5,52.6,29.7Z" /><path id="83c73c07-f21d-4ca0-83aa-9c95f6f349ce" data-name="cervical" fill={cervical} d="M34.9,62c4.3.2,7.8.1,10.2-5.9H25.3a17.2,17.2,0,0,0,.9,1.9C28.4,62.3,31.7,61.8,34.9,62Z" /><path id="4f4945b5-7c40-4f98-9d44-2259e0404447" data-name="vestibular" fill={vestibular} d="M35.8,16.4A18.7,18.7,0,0,0,29,17.8V56.4H42.6V18.9A16.7,16.7,0,0,0,35.8,16.4Z" /></g></g></svg>
				);
				break;
			case '46':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="fd7a4172-ce65-4eca-98a7-da0e8da42f5b" data-name="Procedimentos - 46"><g id="f143e7ec-66a9-4cfd-8168-b5566d8e4f85" data-name="Bloco metalico 46"><path id="5c39fb68-410d-444e-81f5-9f84103eeb68" data-name="cervical" fill={cervical} d="M15.6,56.1a46.1,46.1,0,0,0,2.6,4.3H56.5s.6-1.7,1.4-4.3H15.6Z" /><path id="a119600f-f399-48d6-87d6-7072eba57c73" data-name="distal" fill={distal} d="M23.4,26.5c-2.1.4-11.3,6.8-13.2,10.5-.9,1.8-.8,3.1.5,8C12.6,52.4,18,60.3,18,60.3h7.2V26.5A5.4,5.4,0,0,0,23.4,26.5Z" /><path id="f6bcefbc-d53c-4325-b354-a67691e906cb" data-name="mesial" fill={mesial} d="M45.1,27h-1v3.9h0V60.3H56.7s5.2-14,6.2-21.5S49.3,26.9,45.1,27Z" /><path id="f6078295-100f-42e3-87b0-d9d9e0c77280" data-name="vestibular" fill={vestibular} d="M31.3,29.8c-1.3-.2-3.3-2.9-6.1-3.4V56.3H44.1V27.1C39.5,27.6,33.6,30.2,31.3,29.8Z" /></g></g></svg>
				);
				break;
			case '47':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="c87055f8-a2c0-4617-bbc3-b3fe017a9133" data-name="molar" opacity="0.9"><rect x="5.3" y="24.6" width="13.8" height="40" fill="none"/></g><g id="de86bb4e-02cc-4794-9822-1a4390e5ac88" data-name="Procedimentos - 47"><g id="0a941637-72c3-4959-a5ed-53251a6edeca" data-name="Bloco metalico 47"><path id="269f9228-43b3-4861-8757-5e51a04bb143" data-name="distal" fill={distal} d="M14.9,30.7c-1.3.5-6.3,3.5-6.6,8.1s5,19.6,5,19.6,1.6,3.7,2.6,3.7h1.6v-32A7.7,7.7,0,0,0,14.9,30.7Z" /><g id="56dc4a6a-120b-4733-a6e6-d0b0bac48084" data-name="cervical" fill={cervical}><path d="M56.4,55.8H12.7c.6,1.6.9,2.6.9,2.6s1.6,3.7,2.6,3.7H32.6L55,61.4l1.7-5.6Z" /></g><path id="03ec223f-8db1-4481-acd4-ad44dc83171d" data-name="mesial" fill={mesial} d="M59.2,42.7c-.1-2.8-1.9-11.9-8.4-12.2H47.6v.9h.1v2.7h-.1V61.7l7.5-.2,3.1-10.8A20.6,20.6,0,0,0,59.2,42.7ZM51.2,61h0s4.3-15.1,4.3-19.8-2.7-5.2-4.7-6.6a4.2,4.2,0,0,0-2.2-.5,4,4,0,0,1,2.2.5c2.1,1.4,4.7,1.9,4.7,6.6S51.2,61,51.2,61Z" /><path id="10a50eb6-1023-4cd4-a7a4-3bbd4b1e6caa" data-name="vestibular" fill={vestibular} d="M47.6,55.7V30.5c-5.5.3-13.3,1.2-13.3,1.2a14,14,0,0,0-6.7-2.1,76.2,76.2,0,0,0-10.1.6V55.7Z" /></g></g></svg>
				);
				break;
			case '48':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width={'70px'} height={'175px'} viewBox="0 0 70 175"><g id="39ad6a1f-0e04-44e4-96cf-208b1fe917f1" data-name="Procedimentos - 48"><g id="60eeae21-f3e4-4f6e-b97a-5655d3df00fc" data-name="Bloco Metalico 48"><path id="0fd965e3-7b25-488f-b39a-ee1227e59d9f" data-name="distal" fill={distal} d="M23.7,28.4c-5.2,0-13.4-2.4-13.9,1.3s0,8.8,1.7,14.8,3.5,13.1,6.1,16c.2.2,2.7.3,6.4.4V28.4Z" /><path id="fb12d539-140e-41c0-beb6-9b5bd4cb2583" data-name="mesial" fill={mesial} d="M57.4,29.6c-3.4,0-7.4,1.2-9.5,0A9.5,9.5,0,0,0,45,28.3V60.9h9.3s5.8-10.5,6-16.6S60.9,29.6,57.4,29.6Z" /><path id="a5ea2170-ebef-4f38-a20e-1c13d2991ea9" data-name="cervical" fill={cervical} d="M55.9,55.7H15.1a16.4,16.4,0,0,0,2.5,4.8c.7.7,36.6.4,36.6.4s1.2-2.2,2.5-5.2Z" /><path id="40e070ec-40a4-402a-a403-16b858b31704" data-name="vestibular" fill={vestibular} d="M45,55.7V28.1c-2.4-.7-5.3-.5-9.1,1.2-1.2.5-4.1.9-5.5.3S29,28.3,24,28.2V55.7Z" /></g></g></svg>
				);
				break;
			default:
				return '';
				break;
		}
	};

	function shadeColor(color, percent) {  
		var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
	}
	
	function checkImplante(proc) {
		var implante = false;
		tooth.procedures.map( proc => {

			if(proc.procedure_type == 'CONEMORSE' ||	proc.procedure_type == 'SHORT' ||
				proc.procedure_type == 'HEXAGONAL_OUT' || proc.procedure_type == 'HEXAGONAL_IN' || 
				proc.procedure_type == 'ZYGOMATIC' || proc.procedure_type == 'NOBEL_REPLACE'
			){
				implante = true;
			}
		});
		return implante;
	}

	function toolTip(procedures, crown){
		var id = 'tool'+number;
		if(crown == 'CROWN'){
			id = 'tool_crown_'+number;
		}
		if(procedures.length > 0){
			return (
				<ReactTooltip id={id} effect='solid'>
					{
						procedures.map( (proc, index) => {
							return(
								<div>
									{ index != 0 ?
										<div style={ {borderBottom: 'solid 1px #fff', margin: '0.5rem 0'} }></div>
									:''}
									<span>Procedimento: </span>
									<span>{proc.description}</span>
									<br/>
									{proc.face && proc.face.length > 0 ? 
										<div>
											<span>Faces: </span>
											<span>{proc.face}</span>
										</div>
									: ''}
								</div>
							)
						})
					}
				</ReactTooltip>
			)
		}
		return null
	}

	if(!crown){

		function getPocedure(){
			if(tooth.procedures.length > 0){

				function Crown(proc){

					var color2;
					if(proc.color){
						color2 = shadeColor(proc.color, -0.2);
					}
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getSvg('tooth_'+number, proc.color, color2)}
							</span>
						</div>
					);
				}

				function Apicectomia(proc){

					var side = {
						A: proc.color,
						D: 'none',
						V: 'none',
						M: 'none',
						L: 'none'
					}
					var facesAux = proc.face.split(',');
	
					facesAux.map( fac => {
						switch(fac) {
							case 'D':
								return side.D = proc.color;
								break;
							case 'V':
								return side.V = proc.color;
								break;
							case 'M':
								return side.M = proc.color;
								break;
							case 'L':
								return side.L = proc.color;
								break;
							default:
								return null;
								break;
						}
					});

					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getApicectomiaSvg(number, side.A, side.M, side.D, side.V, side.L)}
							</span>
						</div>
					);
				}

				function Externo(proc){
					return(
						<div>
							<span style={ {position: 'absolute', marginLeft: '-1px'} }>
								{getExternoSvg(number, proc.color)}
							</span>
						</div>
					);
				}

				function MalhaPeriodental(proc){
					return(
						<span style={ {position: 'absolute', marginLeft: '-1px'} }>
							{getMalhaPeriodentalSvg(number, proc.color)}
						</span>
					);
				}

				function Fenulotomia(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getFenulotomiaSvg(number, proc.color)}
							</span>
						</div>
					);
				}

				function Rizectomia(proc){

					var side = {
						D: 'none',
						V: 'none',
						M: 'none',
						L: 'none'
					}
					var facesAux = proc.face.split(',');
	
					facesAux.map( fac => {
						switch(fac) {
							case 'D':
								return side.D = proc.color;
								break;
							case 'V':
								return side.V = proc.color;
								break;
							case 'M':
								return side.M = proc.color;
								break;
							case 'L':
								return side.L = proc.color;
								break;
							default:
								return null;
								break;
						}
					});

					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getRizectomiaSvg(number, side.V, side.D, side.M, side.L)}
							</span>
						</div>
					);
				}

				function Raspagem(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getRaspagemSvg(number, proc.color)}
							</span>
						</div>
					);
				}
				
				function Channel(proc){

					var side = {
						A: proc.color,
						D: 'none',
						V: 'none',
						M: 'none',
						L: 'none'
					}
					var facesAux = proc.face.split(',');
	
					facesAux.map( fac => {
						switch(fac) {
							case 'D':
								return side.D = proc.color;
								break;
							case 'V':
								return side.V = proc.color;
								break;
							case 'M':
								return side.M = proc.color;
								break;
							case 'L':
								return side.L = proc.color;
								break;
							default:
								return null;
								break;
						}
					});

					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getChannelSvg(number, side.A, side.M, side.D, side.V, side.L)}
							</span>
						</div>
					);
				}

				function Restoration(proc){

					var side = {
						D: 'none',
						V: 'none',
						M: 'none',
						O: 'none'
					}
					var facesAux = proc.face.split(',');
	
					facesAux.map( fac => {
						switch(fac) {
							case 'D':
								return side.D = proc.color;
								break;
							case 'V':
								return side.V = proc.color;
								break;
							case 'M':
								return side.M = proc.color;
								break;
							case 'O':
								return side.O = proc.color;
								break;
							default:
								return null;
								break;
						}
					});

					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getRestorationSvg(number, side.V, side.D, side.M, side.O)}
							</span>
						</div>
					);
				}

				function Core(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getCoreSvg(number, proc.color)}
							</span>
						</div>
					);
				}

				function Conemorse(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getConemorseSvg(number)}
							</span>
						</div>
					);
				}

				function HexagonalInter(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getHexagonalInterSvg(number)}
							</span>
						</div>
					);
				}

				function Xray(proc){

					var location;
					if(number >= 11 && number <= 18){
						location = 'top_left_'+proc.xray;
					}
					if(number >= 21 && number <= 28){
						location = 'top_right_'+proc.xray;
					}
					if(number >= 41 && number <= 48){
						location = 'bot_left_'+proc.xray;
					}
					if(number >= 31 && number <= 38){
						location = 'bot_right_'+proc.xray;
					}
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getXraySvg(location, proc.color)}
							</span>
						</div>
					);
				}

				function Nobel(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getNobelSvg(number)}
							</span>
						</div>
					);
				}

				function Zygomatic(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getZygomaticSvg(number)}
							</span>
						</div>
					);
				}

				function Resorption(proc){

					var side = {
						D: 'none',
						V: 'none',
						M: 'none',
					}
					var facesAux = proc.face.split(',');
	
					facesAux.map( fac => {
						switch(fac) {
							case 'D':
								return side.D = proc.color;
								break;
							case 'V':
								return side.V = proc.color;
								break;
							case 'M':
								return side.M = proc.color;
								break;
							case 'L':
								return side.V = proc.color;
								break;
							default:
								return null;
								break;
						}
					});

					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getResorptionSvg(number, side.V, side.D, side.M)}
							</span>
						</div>
					);
				}

				function MetalBlock(proc){

					var side = {
						D: 'none',
						V: 'none',
						M: 'none',
						C: 'none'
					}
					var facesAux = proc.face.split(',');
	
					facesAux.map( fac => {
						switch(fac) {
							case 'D':
								return side.D = proc.color;
								break;
							case 'V':
								return side.V = proc.color;
								break;
							case 'M':
								return side.M = proc.color;
								break;
							case 'C':
								return side.C = proc.color;
								break;
							default:
								return null;
								break;
						}
					});

					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getMetalBlockSvg(number, side.C, side.D, side.M, side.V)}
							</span>
						</div>
					);
				}

				function Adhesive(proc){
					
					if(proc.face == 'V'){
						return(
							<div>
								<span style={ {position: 'absolute'} }>
									{getSvg('tooth_'+number)}
								</span>
							</div>
						);	
					}

					var color2;
					if(proc.color){
						color2 = shadeColor(proc.color, -0.2);
					}
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getSvg('tooth_'+number, proc.color, color2)}
							</span>
						</div>
					);
				}

				function HexagonalOut(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getHexagonalOutSvg(number)}
							</span>
						</div>
					);
				}

				function Short(proc){
					return(
						<div>
							<span style={ {position: 'absolute'} }>
								{getShortSvg(number)}
							</span>
						</div>
					);
				}

				return(
					tooth.procedures.map( proc => {

						switch(proc.procedure_type) {
							case 'NOTYPE':
								return ''; //feito
								break;
							case 'EXTRACTION':
								return ''; //feito
								break;
							case 'CROWN':
								return Crown(proc); //feito
								break;
							case 'RESTORATION':
								return Restoration(proc); //feito
								break;
							case 'RIZECTOMY':
								return Rizectomia(proc); //feito
								break;
							case 'APICECTOMY':
								return Apicectomia(proc); //feito
								break;
							case 'CHANNEL':
								return Channel(proc); //feito
								break;
							case 'XRAY':
								return Xray(proc); //feito
								break;
							case 'DENTURES':
								return Crown(proc); //feito
								break;
							case 'MOBILE':
								return ''; //feito
								break;
							case 'FIXED':
								return Crown(proc); //feito
								break;
							case 'ADHESIVE':
								return Adhesive(proc); //feito
								break;
							case 'SPLINTER':
								return ''; //feito
								break;
							case 'GRAFT':
								return Externo(proc); //feito
								break;
							case 'CONEMORSE':
								return Conemorse(proc); //feito
								break;
							case 'SHORT':
								return Short(proc);//feito
								break;
							case 'HEXAGONAL_OUT':
								return HexagonalOut(proc); //feito
								break;
							case 'HEXAGONAL_IN':
								return HexagonalInter(proc); //feito
								break;
							case 'ZYGOMATIC':
								return Zygomatic(proc); //feito
								break;
							case 'NOBEL_REPLACE':
								return Nobel(proc); //feito
								break;
							case 'RETAIL':
								return MalhaPeriodental(proc); //feito
								break;
							case 'STEEL_CROWN':
								return Crown(proc); //feito
								break;
							case 'PULPECTOMY':
								return '';// feito
								break;
							case 'FACETS':
								return Crown(proc); //feito
								break;
							case 'CORE':
								return Core(proc); //feito
								break;
							case 'METAL_BLOCK':
								return MetalBlock(proc); //feito
								break;
							case 'RESORPTION':
								return Resorption(proc); //feito
								break;
							case 'RAP':
								return Raspagem(proc); //feito
								break;
							case 'FRENULOTOMY':
								return Fenulotomia(proc); //feito
								break;
							case 'SELANTE':
								return ''; //feito
								break;
							default:
								return '';
								break;
						}
					})
				)
			}
		}

		if( tooth.status == 'NORMAL' ){
			return (
				<div data-tip data-for={'tool'+number} data-event='click'>
					<span style={ {position: 'absolute'} }>
						{getSvg('root_'+number)}
					</span>
					<span style={ {position: 'absolute'} }>
						{getSvg('tooth_'+number)}
					</span>
					{getPocedure(tooth.procedures)}
					{toolTip(tooth.procedures)}
				</div>
			);
		} else if( tooth.status == 'MISSING' || tooth.status == 'MISSING_TREATMENT' ){
			rootColor = '#cecece';
			backRootColor = '#afafaf';
			return (
				<div data-tip data-for={'tool'+number} data-event='click'>
					<span style={ {position: 'absolute'} }>
						{getSvg('root_'+number)}
					</span>
					<span style={ {position: 'absolute'} }>
						{getSvg('tooth_'+number, rootColor, backRootColor)}
					</span>
					{getPocedure(tooth.procedures)}
					{toolTip(tooth.procedures)}
				</div>
			);
		} else if( tooth.status == 'IMPLANTE' || tooth.status == 'IMPLANTE_TREATMENT' ){

			if(checkImplante(tooth.procedures)){
				return (
					<div data-tip data-for={'tool'+number} data-event='click'>
						<span style={ {position: 'absolute'} }>
							{getSvg('tooth_'+number)}
						</span>
						{getPocedure(tooth.procedures)}
						{toolTip(tooth.procedures)}
					</div>
				);
			} else {
				return (
					<div>
						<span style={ {position: 'absolute'} }>
							{getSvg('tooth_'+number)}
						</span>

						{getPocedure(tooth.procedures)}

						<span style={ {position: 'absolute'} }>
							{getConemorseSvg(number)}
						</span>
					</div>
				);
			}
		}
		return (<div></div>);

	} else {
		var side = {D:'#fff', V:'#fff', L:'#fff', M:'#fff', O:'#fff'};
		var pulpectomy = null;

		if(tooth.procedures.length > 0){

			tooth.procedures.map( proc => {
				var facesAux = proc.face != null ? proc.face.split(',') : [];

				if(proc.procedure_type == 'PULPECTOMY'){
					if(number == 55 || number == 54 || number == 65 || number == 64 || number == 75 || number == 74 || number == 85 || number == 84){
						pulpectomy = proc;
					}
				} else if(proc.procedure_type == 'DENTURES' || proc.procedure_type == 'FIXED' || proc.procedure_type == 'CROWN' ||
					proc.procedure_type == 'STEEL_CROWN'
				){
					side = {D :proc.color, V: proc.color, L: proc.color, M: proc.color, O: proc.color}
				} else if(
					proc.procedure_type == 'SPLINTER' || proc.procedure_type == 'MOBILE' || proc.procedure_type == 'APICECTOMY' ||
					proc.procedure_type == 'CHANNEL' || proc.procedure_type == 'XRAY' || proc.procedure_type == 'SPLINTER' || proc.procedure_type == 'RESORPTION'
				){
					side = {D:'#fff', V:'#fff', L:'#fff', M:'#fff', O:'#fff'}
				} else if(proc.procedure_type == 'FACETS'){

					side = {D:'#fff', V: proc.color, L:'#fff', M:'#fff', O:'#fff'}
				} else {

					facesAux.map( fac => {
						switch(fac) {
							case 'D':
								return side.D = proc.color;
								break;
							case 'V':
								return side.V = proc.color;
								break;
							case 'L':
								return side.L = proc.color;
								break;
							case 'M':
								return side.M = proc.color;
								break;
							case 'O':
								return side.O = proc.color;
								break;
							default:
								return '';
								break;
						}
					});
					
				}	
			});
		}

		if(number >= 11 && number <= 18 || number >= 41 && number <= 48 || number >= 51 && number <= 55 || number >= 81 && number <= 85){
			var sideAux;
			sideAux = side.M;
			side.M = side.D;
			side.D = sideAux;
		}

		if(number >= 31 && number <= 48 || number >= 71 && number <= 85){
			var sideAux;
			sideAux = side.V;
			side.V = side.L;
			side.L = sideAux;
		}

		return (
			<div data-tip data-for={'tool_crown_'+number} data-event='click'>
				<span style={ {position: 'absolute'} }>
					{getCrownSvg('crown_'+number, side.D, side.V, side.L, side.M, side.O)}
				</span>
				{ pulpectomy && pulpectomy.color ?
					<span style={ {position: 'absolute'} }>
						<svg xmlns="http://www.w3.org/2000/svg" width={'34px'} height={'34px'} viewBox="0 0 34 34"><g opacity="0.9"><path d="M18.5,24.3H15.3a5.2,5.2,0,0,1-3.7-1.7A6.6,6.6,0,0,1,10,18.2V16.5a6.6,6.6,0,0,1,1.6-4.4,5.2,5.2,0,0,1,3.7-1.7h3.2a4.6,4.6,0,0,1,3.6,1.7,6,6,0,0,1,1.7,4.4v1.7a6.2,6.2,0,0,1-1.7,4.4A4.9,4.9,0,0,1,18.5,24.3Z" fill="none" stroke={pulpectomy.color} stroke-miterlimit="10" stroke-width="2"/></g></svg>
					</span>
				: "" }
				{toolTip(tooth.procedures, 'CROWN')}
			</div>
		);
	}

}

export default IconOdontogram;
