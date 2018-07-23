import React from 'react';
import { css } from 'aphrodite/no-important';
import { styles } from './IconStyles';

function OdontogramIndication({procedure, leftTooth, rightTooth, top}) {
	
	if(procedure.length > 0){
		return(
			<div className={css(styles.midBlock)}>
				{
					procedure.map( proc => {
						if(proc.specification.tooth.indexOf(leftTooth) != -1 && proc.specification.tooth.indexOf(rightTooth) != -1){
							var procedure_type = proc.procedure.procedure_type;
							var color = proc.procedure.color;

							if(procedure_type == 'MOBILE'){
								return(
									<div>
										<div style={{ height: '6px', marginTop: '16px', backgroundColor: color }}>
										</div>
										<div style={{ height: '6px', marginTop: '6px', backgroundColor: color }}>
										</div>
									</div>
								);
							} else if(procedure_type == 'SPLINTER'){
								return(
									<div>
										<div style={{ height: '4px', marginTop: '6px', backgroundColor: color }}>
										</div>
										<div style={{ height: '4px', marginTop: '30px', backgroundColor: color }}>
										</div>
									</div>
								);
							} else if(procedure_type == 'FIXED'){
								return(
									<div>
										<div style={{ height: '8px', marginTop: '21px', backgroundColor: color }}>
										</div>
									</div>
								);
							} else if(procedure_type == 'ADHESIVE'){
								if(top){
									return(
										<div>
											<div style={{ height: '16px', margin: '34px -6px 0px -6px', zIndex: 0, backgroundColor: color }}>
											</div>
										</div>
									);
								}
								return(
									<div>
										<div style={{ height: '16px', margin: '0px -6px 0px -6px', zIndex: 0, backgroundColor: color }}>
										</div>
									</div>
								);
							}
						}
					})
				}
			</div>
		);
	} 
	return (
		<div className={css(styles.midBlock)}>
		</div>
	);
}

export default OdontogramIndication;
