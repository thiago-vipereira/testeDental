import React from 'react';
import { css } from 'aphrodite/no-important';
import { styles } from './IconStyles';

function OdontogramBar({procedure, top}) {

	// 38 meio do primeiro, depois somar com 72
	var init;
	var end;
	
	function toothValueTop(tooth) {

		switch(tooth) {
			case '18':
				return 0;
				break;
			case '17':
				return 1;
				break;
			case '16':
				return 2;
				break;
			case '15':
				return 3;
				break;
			case '14':
				return 4;
				break;
			case '13':
				return 5;
				break;
			case '12':
				return 6;
				break;
			case '11':
				return 7;
				break;
			case '21':
				return 8;
				break;
			case '22':
				return 9;
				break;
			case '23':
				return 10;
				break;
			case '24':
				return 11;
				break;
			case '25':
				return 12;
				break;
			case '26':
				return 13;
				break;
			case '27':
				return 14;
				break;
			case '28':
				return 15;
				break;
			default:
				return '';
				break;
		}
	}

	function toothValueBot(tooth) {
		
		switch(tooth) {
			case '48':
				return 0;
				break;
			case '47':
				return 1;
				break;
			case '46':
				return 2;
				break;
			case '45':
				return 3;
				break;
			case '44':
				return 4;
				break;
			case '43':
				return 5;
				break;
			case '42':
				return 6;
				break;
			case '41':
				return 7;
				break;
			case '31':
				return 8;
				break;
			case '32':
				return 9;
				break;
			case '33':
				return 10;
				break;
			case '34':
				return 11;
				break;
			case '35':
				return 12;
				break;
			case '36':
				return 13;
				break;
			case '37':
				return 14;
				break;
			case '38':
				return 15;
				break;
			default:
				return '';
				break;
		}
	}

	if(top){
		if(procedure.length > 0){
			return(
				<svg height="20" width="1152">
					{
						procedure.map( proc => {
							if(proc.specification.tooth.length > 0){

								var procedure_type = proc.procedure.procedure_type;
								var color = proc.procedure.color;

								if(procedure_type == 'MOBILE'){
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueTop(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
									});

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={38 + (init*72) + ""} y1="10" x2={38 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
											<line x1={38 + (init*72) + ""} y1="10" x2={38 + (init*72) + ""} y2="0" style={{ stroke: color, strokeWidth: '2' }} />
											<line x1={38 + (end*72) + ""} y1="10" x2={38 + (end*72) + ""} y2="0" style={{ stroke: color, strokeWidth: '2' }} />
										</svg>
									);

								} else if(procedure_type == 'SPLINTER'){
									var verticalLine = [];
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueTop(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
									});
									for(var i = init; i <= end ; i++){ verticalLine.push(i) };

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={38 + (init*72) + ""} y1="10" x2={38 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
											{
												verticalLine.map( line => {
													return(
														<line x1={38 + (line*72) + ""} y1="10" x2={38 + (line*72) + ""} y2="0" style={{ stroke: color, strokeWidth: '2' }} />
													)
												})
											}
										</svg>
									);

								} else if(procedure_type == 'FIXED'){
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueTop(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
									});

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={(init*72) + ""} y1="10" x2={72 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
										</svg>
									);

								} else if(procedure_type == 'ADHESIVE'){
									var verticalLine = [];
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueTop(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
										verticalLine.push(toothAux);
									});

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={38 + (init*72) + ""} y1="10" x2={38 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
											{
												verticalLine.map( line => {
													return(
														<line x1={38 + (line*72) + ""} y1="10" x2={38 + (line*72) + ""} y2="0" style={{ stroke: color, strokeWidth: '2' }} />
													)
												})
											}
										</svg>
									);

								} else if(procedure_type == 'DENTURES'){
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueTop(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
									});

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={(init*72) + ""} y1="10" x2={72 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '4' }} />
										</svg>
									);
								}
							}
						})
					}
				</svg>
			);
		}
	}
	if(!top){
		if(procedure.length > 0){
			return(
				<svg height="20" width="1152">
					{
						procedure.map( proc => {
							if(proc.specification.tooth.length > 0){

								var procedure_type = proc.procedure.procedure_type;
								var color = proc.procedure.color;

								if(procedure_type == 'MOBILE'){
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueBot(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
									});

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={38 + (init*72) + ""} y1="10" x2={38 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
											<line x1={38 + (init*72) + ""} y1="10" x2={38 + (init*72) + ""} y2="0" style={{ stroke: color, strokeWidth: '2' }} />
											<line x1={38 + (end*72) + ""} y1="10" x2={38 + (end*72) + ""} y2="0" style={{ stroke: color, strokeWidth: '2' }} />
										</svg>
									);

								} else if(procedure_type == 'SPLINTER'){
									var verticalLine = [];
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueBot(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
									});
									for(var i = init; i <= end ; i++){ verticalLine.push(i) };

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={38 + (init*72) + ""} y1="10" x2={38 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
											{
												verticalLine.map( line => {
													return(
														<line x1={38 + (line*72) + ""} y1="20" x2={38 + (line*72) + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
													)
												})
											}
										</svg>
									);

								} else if(procedure_type == 'FIXED'){
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueBot(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
									});

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={(init*72) + ""} y1="10" x2={72 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
										</svg>
									);

								} else if(procedure_type == 'ADHESIVE'){
									var verticalLine = [];
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueBot(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
										verticalLine.push(toothAux);
									});

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={38 + (init*72) + ""} y1="10" x2={38 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '2' }} />
											{
												verticalLine.map( line => {
													return(
														<line x1={38 + (line*72) + ""} y1="10" x2={38 + (line*72) + ""} y2="0" style={{ stroke: color, strokeWidth: '2' }} />
													)
												})
											}
										</svg>
									);

								} else if(procedure_type == 'DENTURES'){
									init = 100;
									end = 0;

									proc.specification.tooth.map( tooth => {
										var toothAux = toothValueBot(tooth);
										if(toothAux < init){
											init = toothAux;
										}
										if(toothAux > end){
											end = toothAux;
										}
									});

									if(init =='' || end =='' || init > 15 || end > 15){
										return <svg height="20" width="1152"></svg>
									}
									return (
										<svg height="20" width="1152">
											<line x1={(init*72) + ""} y1="10" x2={72 + (end*72)  + ""} y2="10" style={{ stroke: color, strokeWidth: '4' }} />
										</svg>
									);
								}
							}
						})
					}
				</svg>
			);
		}
	}


	return (
		<svg height="20" width="1152">
		</svg>
	);
}

export default OdontogramBar;
