import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { css } from 'aphrodite/no-important';
import { styles } from './PerioFormStyles';

import ReactTooltip from 'react-tooltip';

import { getDentalStatus } from '../../../actions/dentalStatus';

import  Tooth  from '../../../components/forms/patient/image/tooth';

import IconPerio from '../../common/IconPerio';

import { defaultPeriogram } from '../../../components/_constants/periogram';

import { updatePeriogram, getPeriogram } from '../../../actions/periogram';



class PerioComponent extends Component {
	constructor(props) {
		super(props);

        this.getAlert = this.getAlert.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
		this.drawLinesBucalTop = this.drawLinesBucalTop.bind(this);
        this.drawLinesBucalBottom = this.drawLinesBucalBottom.bind(this);
        this.drawLinesLingualTop = this.drawLinesLingualTop.bind(this);
        this.drawLinesLingualBottom = this.drawLinesLingualBottom.bind(this);        
        
        this.renderCanvasBucalTop = this.renderCanvasBucalTop.bind(this);
        this.renderCanvasBucalBottom = this.renderCanvasBucalBottom.bind(this);
        this.renderCanvasLingualTop = this.renderCanvasLingualTop.bind(this);
        this.renderCanvasLingualBottom = this.renderCanvasLingualBottom.bind(this);

        this.renderDataPerioBucalBottom = this.renderDataPerioBucalBottom.bind(this);
        this.renderDataPerioBucalTop = this.renderDataPerioBucalTop.bind(this);
        this.renderDataPerioLingualTop = this.renderDataPerioLingualTop.bind(this);
        this.renderDataPerioLingualBottom = this.renderDataPerioLingualBottom.bind(this);

        this.renderPerioBucalTop = this.renderPerioBucalTop.bind(this);
        this.renderPerioBucalBottom = this.renderPerioBucalBottom.bind(this);
        this.renderPerioLingualTop = this.renderPerioLingualTop.bind(this);
        this.renderPerioLingualBottom = this.renderPerioLingualBottom.bind(this);


        this.redrawEveryting = this.redrawEverything.bind(this);

		this.state = {}
    }

    onSubmit(){

    }

    handleFocus(event) {
        event.target.select();
    }

    handleKeyPress(event) {
        if(event.keyCode == 38){
            var str = event.target.name;
            var res = str.split("_");

            if(event.target.value == ""){
                var valor = 1;
            }else{
                if(res[0] == 'bleeding' && event.target.value == 3){ 
                    var valor = 3;   
                }else if((res[0] == 'margin' || res[0] == 'depth')  && event.target.value == 12){
                    var valor = 12;
                }else{
                    var valor = parseInt(event.target.value) + 1 }
            }
    
        }else if(event.keyCode == 40){
            var str = event.target.name;
            var res = str.split("_");
            if(event.target.value == ""){
            var valor = -1;
            }else{
                if(res[0] == 'bleeding' && event.target.value == 0){ 
                var valor = 0;
                }else if((res[0] == 'margin' || res[0] == 'depth')  && event.target.value == -6){
                    var valor = -6;
                }
                else{
                var valor = parseInt(event.target.value) - 1 }
            }
        }

        if(event.keyCode == 38 || event.keyCode == 40){
            //var str = event.target.name;
            //var res = str.split("_");
            var dente = "tooth_"+res[1];
    
            if(res[0] == 'bleeding'){
                var problema = 'bleeding'

            }else if(res[0] == 'margin'){
                var problema = 'gingival_margin'
            }else if(res[0] == 'depth'){
                var problema = 'probing_depth'
            }
    
            var visao = res[3];
    
            if(res[1] >= 11 && res[1] <= 28){
                var arcada = 'superior'
            }else if(res[1] >= 31 && res[1] <= 48){
                var arcada = 'inferior'
            }
    
            var faces = this.state.dentes[arcada][dente][visao][problema];
            if(res[2] == 'mesial'){
                faces = [valor,faces[1],faces[2]];
            }else if(res[2] == 'oclusal'){
                faces = [faces[0],valor,faces[2]];
            }else if(res[2] == 'distal'){
                faces = [faces[0],faces[1],valor];
            }
    

            this.setState(
                {
                dentes: { ...this.state.dentes, 
                [arcada]: { ...this.state.dentes[arcada],
                [dente]: { ...this.state.dentes[arcada][dente],
                [visao]: { ...this.state.dentes[arcada][dente][visao], 
                [problema]:  faces }
                }
            }
        }
    } ,
                () => this.redrawEverything(arcada,visao) );
    
           
        }



    }

    handleChange(event) {


        var str = event.target.name;
     
        var res = str.split("_");
        var dente = "tooth_"+res[1];

        if(res[0] == 'bleeding'){
            var problema = 'bleeding'
            if(event.target.value > 3){
                var valor = 3;
            }else 
            if(event.target.value < 0){
                var valor = 0;
            }else{
                var valor = event.target.value;
            }
        }else if(res[0] == 'margin'){
            var problema = 'gingival_margin'
            if(event.target.value > 12){
                var valor = 12;
            }else
            if(event.target.value < -6){
                var valor = -6;
            }else{
                var valor = event.target.value;
            }
        }else if(res[0] == 'depth'){
            var problema = 'probing_depth'
            if(event.target.value > 12){
                var valor = 12;
            }else
            if(event.target.value < -6){
                var valor = -6;
            }else{
                var valor = event.target.value;
            }
        }

        var visao = res[3];

        if(res[1] >= 11 && res[1] <= 28){
            var arcada = 'superior'
        }else if(res[1] >= 31 && res[1] <= 48){
            var arcada = 'inferior'
        }

        var faces = this.state.dentes[arcada][dente][visao][problema];
        if(res[2] == 'mesial'){
            faces = [valor,faces[1],faces[2]];
        }else if(res[2] == 'oclusal'){
            faces = [faces[0],valor,faces[2]];
        }else if(res[2] == 'distal'){
            faces = [faces[0],faces[1],valor];
        }

        
        this.setState(
            {
            dentes: { ...this.state.dentes, 
            [arcada]: { ...this.state.dentes[arcada],
            [dente]: { ...this.state.dentes[arcada][dente],
            [visao]: { ...this.state.dentes[arcada][dente][visao], 
            [problema]:  faces }
            }
        }
    }
} ,
            () => this.redrawEverything(arcada,visao) );


      }


    redrawEverything(arcada, visao){

        if(arcada == 'superior' && visao == 'bucal'){
            var g = document.getElementById("guide_bucal_top");
            var c = document.getElementById("lines_bucal_top");
            var b = document.getElementById("balls_bucal_top");
            var guide = g.getContext("2d");
            var ctx = c.getContext("2d");
            var ball = b.getContext("2d");
            ctx.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            guide.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            ball.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            this.drawLinesBucalTop(this.state.dentes, "probing_depth", "#5062eb",guide,ctx,ball);
            this.drawLinesBucalTop(this.state.dentes, "gingival_margin", "#f13c56","",ctx,ball);
            this.drawLinesBucalTop(this.state.dentes, "bleeding", "#810e0e","",ctx,ball);
        }
        if(arcada == 'superior' && visao == 'lingual'){
            var g = document.getElementById("guide_lingual_top");
            var c = document.getElementById("lines_lingual_top");
            var b = document.getElementById("balls_lingual_top");
            var guide = g.getContext("2d");
            var ctx = c.getContext("2d");
            var ball = b.getContext("2d");
            ctx.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            guide.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            ball.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            this.drawLinesLingualTop(this.state.dentes, "probing_depth", "#5062eb",guide,ctx,ball);
            this.drawLinesLingualTop(this.state.dentes, "gingival_margin", "#f13c56","",ctx,ball);
            this.drawLinesLingualTop(this.state.dentes, "bleeding", "#810e0e","",ctx,ball);
        }
        if(arcada == 'inferior' && visao == 'lingual'){
            var g = document.getElementById("guide_lingual_bottom");
            var c = document.getElementById("lines_lingual_bottom");
            var b = document.getElementById("balls_lingual_bottom");
            var guide = g.getContext("2d");
            var ctx = c.getContext("2d");
            var ball = b.getContext("2d");
            ctx.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            guide.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            ball.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            this.drawLinesLingualBottom(this.state.dentes, "probing_depth", "#5062eb",guide,ctx,ball);
            this.drawLinesLingualBottom(this.state.dentes, "gingival_margin", "#f13c56","",ctx,ball);
            this.drawLinesLingualBottom(this.state.dentes, "bleeding", "#810e0e","",ctx,ball);
        }
        if(arcada == 'inferior' && visao == 'bucal'){
            var g = document.getElementById("guide_bucal_bottom");
            var c = document.getElementById("lines_bucal_bottom");
            var b = document.getElementById("balls_bucal_bottom");
            var guide = g.getContext("2d");
            var ctx = c.getContext("2d");
            var ball = b.getContext("2d");
            ctx.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            guide.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            ball.clearRect(0,0,guide.canvas.width,guide.canvas.height);
            this.drawLinesBucalBottom(this.state.dentes, "probing_depth", "#5062eb",guide,ctx,ball);
            this.drawLinesBucalBottom(this.state.dentes, "gingival_margin", "#f13c56","",ctx,ball);
            this.drawLinesBucalBottom(this.state.dentes, "bleeding", "#810e0e","",ctx,ball);
        }

    }

	componentWillReceiveProps(nextProps){
        const { selectedPatient, periograma } = this.props;
        
		if(!selectedPatient && nextProps.selectedPatient){

					this.setState({
						selectedPatient: nextProps.selectedPatient,
					});
		}else{
            this.setState({
                selectedPatient: selectedPatient,
            });
        }
	}

	componentWillMount() {

        const {  selectedPatient, getDentalStatus, defaultPeriogram, perioId, getPeriogram } = this.props;
    



        var periogram;
     
        periogram = defaultPeriogram();
        periogram = periogram.periogram;

        this.setState(periogram);

        getPeriogram(perioId, ret => {
				
            if(ret){
               
                this.setState({
                    active: ret.active,
                    date: ret.date,
                    dentes: ret.dentes,
                    patient_id: ret.patient_id,
                    _id: ret._id
                });
          
                //history.push(`${match.url}/periogram/${ret._id}`);
            }

        });

  

/*         if(selectedPatient){

			getDentalStatus(selectedPatient._id, ret => {

				if(ret){
                  
					this.setState({
						dentalStatus: ret,
                    });
            
                    if(this.state.dentes){
                        var i;
                        var n = 0;
                        var teeth_inferior = this.state.dentes.inferior;
                        var teeth_superior = this.state.dentes.superior;
                
                        for(i in teeth_superior){
                            var porra = Object.keys(teeth_superior)[n];
       
                            this.setState(
                                {
                                dentes: { ...this.state.dentes, 
                                superior: { ...this.state.dentes.superior,
                                [porra]: { ...this.state.dentes.superior[porra],
                                status: this.state.dentalStatus[porra].status
                                }
                            }
                        }
                    } 
                ); 
                    
                            n++;
                        }
                        n = 0;
                        for(i in teeth_inferior){
                            var porra = Object.keys(teeth_inferior)[n];
       
                            this.setState(
                                {
                                dentes: { ...this.state.dentes, 
                                inferior: { ...this.state.dentes.inferior,
                                [porra]: { ...this.state.dentes.inferior[porra],
                                status: this.state.dentalStatus[porra].status
                                }
                            }
                        }
                    } 
                ); 
                    
                            n++;
                        }

                    }
                
				} 
            });


      

            
		} */
		

	}



    componentDidMount(){
 
        this.props.setClick(this.getAlert);

        const {  selectedPatient, getDentalStatus, defaultPeriogram, perioId, getPeriogram } = this.props;
    



        var periogram;
     
        periogram = defaultPeriogram();
        periogram = periogram.periogram;

        this.setState(periogram);

        getPeriogram(perioId, ret => {
				
            if(ret){
               console.log(ret.dentes);
                this.setState({
                    active: ret.active,
                    date: ret.date,
                    dentes: ret.dentes,
                    patient_id: ret.patient_id,
                    _id: ret._id
                });
                this.redrawEverything("superior", "lingual");
                this.redrawEverything("superior", "bucal");
                this.redrawEverything("inferior", "lingual");
                this.redrawEverything("inferior", "bucal");
                //history.push(`${match.url}/periogram/${ret._id}`);
            }

        });




    }

    componentDidUpdate(){

    }

	onSubmit(values) {
    }
    
    drawLinesBucalTop(dentes,type,color,guide,ctx,ball){

        function drawBlood(ball, positionY, positionX){
            ball.beginPath();
            ball.arc(positionX, positionY, 4, 0, 2 * Math.PI, false);
            ball.fillStyle = color;
            ball.fill();
        }

        if(guide){

        guide.lineWidth = 0.2;
		guide.strokeStyle = "black";
        guide.beginPath();
        //linhas de marcação
        guide.moveTo(1, 6);
        guide.lineTo(830, 6);
        guide.moveTo(1, 12);
        guide.lineTo(830, 12);
        guide.moveTo(1, 18);
        guide.lineTo(830, 18);
        guide.moveTo(1, 24);
        guide.lineTo(830, 24);
        guide.moveTo(1, 30);
        guide.lineTo(830, 30);
        guide.moveTo(1, 36);
        guide.lineTo(830, 36);
        guide.moveTo(1, 42);
        guide.lineTo(830, 42);
        guide.moveTo(1, 48);
        guide.lineTo(830, 48);
        guide.moveTo(1, 54);
        guide.lineTo(830, 54);
        guide.moveTo(1, 60);
        guide.lineTo(830, 60);
        guide.moveTo(1, 66);
        guide.lineTo(830, 66);
        guide.moveTo(1, 72);
        guide.lineTo(830, 72);
        guide.moveTo(1, 78);
        guide.lineTo(830, 78);
       
        guide.stroke();

        }

        ctx.beginPath();

        if(type == "gingival_margin"){
          ctx.moveTo(0, 78);

        }
        if(type == "probing_depth"){
          ctx.moveTo(0, 78);

        }
        if(type == "bleeding"){
            ctx.moveTo(6, 78 - (dentes.superior.tooth_18.bucal.bleeding[0] * 6));
        }
              let k = 6;
              let n = 0;
              let i;
             
      let objectLenght = Object.keys(dentes.superior).length
      
              //for de altura gengival

             for(i = 18; i >= 11; i--){
               
                for(let j = 0; j < 3; j++){
                   if(type == "gingival_margin"){
                   ctx.lineTo(k, 78 - (dentes.superior['tooth_'+i].bucal.gingival_margin[j] * 6));
                   }
                   if(type == "probing_depth"){
                   ctx.lineTo(k, 78 - (dentes.superior['tooth_'+i].bucal.probing_depth[j] * 6));
                   }
                   if(type == "bleeding"){
                     if(dentes.superior['tooth_'+i].bucal.bleeding[j] == 1){
                         drawBlood(ball, 100, k);
                     }
                     if(dentes.superior['tooth_'+i].bucal.bleeding[j] == 2){
                         drawBlood(ball, 100, k);
                         drawBlood(ball, 110, k);
                     }
                     if(dentes.superior['tooth_'+i].bucal.bleeding[j] >= 3){
                         drawBlood(ball, 100, k);
                         drawBlood(ball, 110, k);
                         drawBlood(ball, 120, k);
                     }
                     
                 }
                   k = k + 20;
                } 
                k = k - 8;
              }

              for(i = 21; i <= 28; i++){
               
                for(let j = 0; j < 3; j++){
                   if(type == "gingival_margin"){
                   ctx.lineTo(k, 78 - (dentes.superior['tooth_'+i].bucal.gingival_margin[j] * 6));
                   }
                   if(type == "probing_depth"){
                   ctx.lineTo(k, 78 - (dentes.superior['tooth_'+i].bucal.probing_depth[j] * 6));
                   }
                   if(type == "bleeding"){
                     if(dentes.superior['tooth_'+i].bucal.bleeding[j] == 1){
                         drawBlood(ball, 100, k);
                     }
                     if(dentes.superior['tooth_'+i].bucal.bleeding[j] == 2){
                         drawBlood(ball, 100, k);
                         drawBlood(ball, 110, k);
                     }
                     if(dentes.superior['tooth_'+i].bucal.bleeding[j] >= 3){
                         drawBlood(ball, 100, k);
                         drawBlood(ball, 110, k);
                         drawBlood(ball, 120, k);
                     }
                     
                 }
                   k = k + 20;
                } 
                k = k - 8;
              }



             if(type == "gingival_margin"){
                ctx.lineTo(832, 78);
              }
              if(type == "probing_depth"){
                ctx.lineTo(832, 78);
              }

          ctx.lineWidth = 2;
          ctx.strokeStyle = color;
          ctx.stroke();

        
      }

      drawLinesLingualTop(dentes,type,color,guide,ctx,ball){

        function drawBlood(ball, positionY, positionX){
            ball.beginPath();
            ball.arc(positionX, positionY, 4, 0, 2 * Math.PI, false);
            ball.fillStyle = color;
            ball.fill();
        }

        if(guide){
            
            guide.lineWidth = 0.2;
            guide.strokeStyle = "black";
            guide.beginPath();
            //linhas de marcação
            guide.moveTo(1, 6);
            guide.lineTo(830, 6);
            guide.moveTo(1, 12);
            guide.lineTo(830, 12);
            guide.moveTo(1, 18);
            guide.lineTo(830, 18);
            guide.moveTo(1, 24);
            guide.lineTo(830, 24);
            guide.moveTo(1, 30);
            guide.lineTo(830, 30);
            guide.moveTo(1, 36);
            guide.lineTo(830, 36);
            guide.moveTo(1, 42);
            guide.lineTo(830, 42);
            guide.moveTo(1, 48);
            guide.lineTo(830, 48);
            guide.moveTo(1, 54);
            guide.lineTo(830, 54);
            guide.moveTo(1, 60);
            guide.lineTo(830, 60);
            guide.moveTo(1, 66);
            guide.lineTo(830, 66);
            guide.moveTo(1, 72);
            guide.lineTo(830, 72);
            guide.moveTo(1, 78);
            guide.lineTo(830, 78);
    
            guide.stroke();
            }

        ctx.beginPath();
        if(type == "gingival_margin"){
            ctx.moveTo(0, 78);
          }
          if(type == "probing_depth"){
            ctx.moveTo(0, 78);
          }      
        if(type == "bleeding"){
            ctx.moveTo(6, 78 - (dentes.superior.tooth_18.lingual.bleeding[0] * 6));
        }
              let k = 6;
              let n = 0;
              let i;
             
      let objectLenght = Object.keys(dentes.superior).length
      
              //for de altura gengival
             for(i = 18; i >= 11; i--){
               for(let j = 0; j < 3; j++){
                  if(type == "gingival_margin"){
                  ctx.lineTo(k, 78 - (dentes.superior['tooth_'+i].lingual.gingival_margin[j] * 6));
                  }
                  if(type == "probing_depth"){
                  ctx.lineTo(k, 78 - (dentes.superior['tooth_'+i].lingual.probing_depth[j] * 6));
                  }
                
                    if(type == "bleeding"){
                        if(dentes.superior['tooth_'+i].lingual.bleeding[j] == 1){
                            drawBlood(ball, 100, k);
                        }
                        if(dentes.superior['tooth_'+i].lingual.bleeding[j] == 2){
                            drawBlood(ball, 100, k);
                            drawBlood(ball, 110, k);
                        }
                        if(dentes.superior['tooth_'+i].lingual.bleeding[j] >= 3){
                            drawBlood(ball, 100, k);
                            drawBlood(ball, 110, k);
                            drawBlood(ball, 120, k);
                        }
                    }
                  k = k + 20;
               } 
               k = k - 8;
             }

             for(i = 21; i <= 28; i++){
                for(let j = 0; j < 3; j++){
                   if(type == "gingival_margin"){
                   ctx.lineTo(k, 78 - (dentes.superior['tooth_'+i].lingual.gingival_margin[j] * 6));
                   }
                   if(type == "probing_depth"){
                   ctx.lineTo(k, 78 - (dentes.superior['tooth_'+i].lingual.probing_depth[j] * 6));
                   }
                 
                     if(type == "bleeding"){
                         if(dentes.superior['tooth_'+i].lingual.bleeding[j] == 1){
                             drawBlood(ball, 100, k);
                         }
                         if(dentes.superior['tooth_'+i].lingual.bleeding[j] == 2){
                             drawBlood(ball, 100, k);
                             drawBlood(ball, 110, k);
                         }
                         if(dentes.superior['tooth_'+i].lingual.bleeding[j] >= 3){
                             drawBlood(ball, 100, k);
                             drawBlood(ball, 110, k);
                             drawBlood(ball, 120, k);
                         }
                     }
                   k = k + 20;
                } 
                k = k - 8;
              }

             if(type == "gingival_margin"){
                ctx.lineTo(832, 78);
              }
              if(type == "probing_depth"){
                ctx.lineTo(832, 78);
              }
             
          ctx.lineWidth = 2;
          ctx.strokeStyle = color;
          ctx.stroke();
        
      }


	  drawLinesBucalBottom(dentes,type,color,guide,ctx,ball){

        function drawBlood(ball, positionY, positionX){
            ball.beginPath();
            ball.arc(positionX, positionY, 4, 0, 2 * Math.PI, false);
            ball.fillStyle = color;
            ball.fill();
        }
        if(guide){
            //guide.translate(0.5, 0.5);
            guide.lineWidth = 0.2;
            guide.strokeStyle = "black";
            guide.beginPath();
            //linhas de marcação
            guide.moveTo(1, 50);
            guide.lineTo(830, 50);
            guide.moveTo(1, 56);
            guide.lineTo(830, 56);
            guide.moveTo(1, 62);
            guide.lineTo(830, 62);
            guide.moveTo(1, 68);
            guide.lineTo(830, 68);
            guide.moveTo(1, 74);
            guide.lineTo(830, 74);
            guide.moveTo(1, 80);
            guide.lineTo(830, 80);
            guide.moveTo(1, 86);
            guide.lineTo(830, 86);
            guide.moveTo(1, 92);
            guide.lineTo(830, 92);
            guide.moveTo(1, 98);
            guide.lineTo(830, 98);
            guide.moveTo(1, 104);
            guide.lineTo(830, 104);
            guide.moveTo(1, 110);
            guide.lineTo(830, 110);
            guide.moveTo(1, 116);
            guide.lineTo(830, 116);
            guide.moveTo(1, 122);
            guide.lineTo(830, 122);
    
            guide.stroke();
        }

        ctx.beginPath();

        if(type == "gingival_margin"){
            ctx.moveTo(0, 50);
           // ctx.lineTo(6, 50 - (dentes.inferior.tooth_48.bucal.gingival_margin[0] * 6));
          }
        if(type == "probing_depth"){
            ctx.moveTo(0, 50);
            //ctx.lineTo(6, 50 - (dentes.inferior.tooth_48.bucal.probing_depth[0] * 6));
        }    
        if(type == "bleeding"){
            ctx.moveTo(6, 50 - (dentes.inferior.tooth_48.bucal.bleeding[0] * 6));
        }
              let k = 6;
              let n = 0;
              let i;
             
      let objectLenght = Object.keys(dentes.inferior).length
      
              //for de altura gengival
             for(i = 48; i >= 41; i--){
               for(let j = 0; j < 3; j++){
                  if(type == "gingival_margin"){
                  ctx.lineTo(k, 50 + (dentes.inferior['tooth_'+i].bucal.gingival_margin[j] * 6));

                  }
                  if(type == "probing_depth"){
                  ctx.lineTo(k, 50 +  (dentes.inferior['tooth_'+i].bucal.probing_depth[j] * 6));

                  }
            if(type == "bleeding"){
                if(dentes.inferior['tooth_'+i].bucal.bleeding[j] == 1){
                    drawBlood(ball, 30, k);
                }
                if(dentes.inferior['tooth_'+i].bucal.bleeding[j] == 2){
                    drawBlood(ball, 30, k);
                    drawBlood(ball, 20, k);
                }
                  if(dentes.inferior['tooth_'+i].bucal.bleeding[j] >= 3){
                    drawBlood(ball, 30, k);
                    drawBlood(ball, 20, k);
                    drawBlood(ball, 10, k);
                }
            }
                  k = k + 20;
               } 
               k = k - 8;
             }
             
             for(i = 31; i <= 38; i++){
                for(let j = 0; j < 3; j++){
                   if(type == "gingival_margin"){
                   ctx.lineTo(k, 50 + (dentes.inferior['tooth_'+i].bucal.gingival_margin[j] * 6));
 
                   }
                   if(type == "probing_depth"){
                   ctx.lineTo(k, 50 +  (dentes.inferior['tooth_'+i].bucal.probing_depth[j] * 6));
 
                   }
             if(type == "bleeding"){
                 if(dentes.inferior['tooth_'+i].bucal.bleeding[j] == 1){
                     drawBlood(ball, 30, k);
                 }
                 if(dentes.inferior['tooth_'+i].bucal.bleeding[j] == 2){
                     drawBlood(ball, 30, k);
                     drawBlood(ball, 20, k);
                 }
                   if(dentes.inferior['tooth_'+i].bucal.bleeding[j] >= 3){
                     drawBlood(ball, 30, k);
                     drawBlood(ball, 20, k);
                     drawBlood(ball, 10, k);
                 }
             }
                   k = k + 20;
                } 
                k = k - 8;
              }


             if(type == "gingival_margin"){
                ctx.lineTo(832, 50);
              }
              if(type == "probing_depth"){
                ctx.lineTo(832, 50);
              }

          ctx.lineWidth = 2;
          ctx.strokeStyle = color;
          ctx.stroke();
        
      }
      

	  drawLinesLingualBottom(dentes,type,color,guide,ctx,ball){

        function drawBlood(ball, positionY, positionX){
            ball.beginPath();
            ball.arc(positionX, positionY, 4, 0, 2 * Math.PI, false);
            ball.fillStyle = color;
            ball.fill();
        }

        if(guide){

            guide.lineWidth = 0.2;
            guide.strokeStyle = "black";
            guide.beginPath();
            //linhas de marcação
            guide.moveTo(1, 50);
            guide.lineTo(830, 50);
            guide.moveTo(1, 56);
            guide.lineTo(830, 56);
            guide.moveTo(1, 62);
            guide.lineTo(830, 62);
            guide.moveTo(1, 68);
            guide.lineTo(830, 68);
            guide.moveTo(1, 74);
            guide.lineTo(830, 74);
            guide.moveTo(1, 80);
            guide.lineTo(830, 80);
            guide.moveTo(1, 86);
            guide.lineTo(830, 86);
            guide.moveTo(1, 92);
            guide.lineTo(830, 92);
            guide.moveTo(1, 98);
            guide.lineTo(830, 98);
            guide.moveTo(1, 104);
            guide.lineTo(830, 104);
            guide.moveTo(1, 110);
            guide.lineTo(830, 110);
            guide.moveTo(1, 116);
            guide.lineTo(830, 116);
            guide.moveTo(1, 122);
            guide.lineTo(830, 122);

           
    
            guide.stroke();
            }

        ctx.beginPath();


        if(type == "gingival_margin"){
            ctx.moveTo(0, 50);
            //ctx.lineTo(6, 50 - (dentes.inferior.tooth_48.lingual.gingival_margin[0] * 6));
          }
        if(type == "probing_depth"){
            ctx.moveTo(0, 50);
            //ctx.lineTo(6, 50 - (dentes.inferior.tooth_48.lingual.probing_depth[0] * 6));
        }   
        if(type == "bleeding"){
            ctx.moveTo(6, 50 - (dentes.inferior.tooth_48.lingual.bleeding[0] * 6));
        }
              let k = 6;
              let n = 0;
              let i;
             
      let objectLenght = Object.keys(dentes.inferior).length
      
              //for de altura gengival
             for(i = 48; i >= 41; i--){
               for(let j = 0; j < 3; j++){
                  if(type == "gingival_margin"){
                  ctx.lineTo(k, 50 + (dentes.inferior['tooth_'+i].lingual.gingival_margin[j] * 6));
                  }
                  if(type == "probing_depth"){
                  ctx.lineTo(k, 50 +  (dentes.inferior['tooth_'+i].lingual.probing_depth[j] * 6));
                  }
            if(type == "bleeding"){
                if(dentes.inferior['tooth_'+i].lingual.bleeding[j] == 1){
                    drawBlood(ball, 30, k);
                }
                if(dentes.inferior['tooth_'+i].lingual.bleeding[j] == 2){
                    drawBlood(ball, 30, k);
                    drawBlood(ball, 20, k);
                }
                  if(dentes.inferior['tooth_'+i].lingual.bleeding[j] >= 3){
                    drawBlood(ball, 30, k);
                    drawBlood(ball, 20, k);
                    drawBlood(ball, 10, k);
                }
            }
                  k = k + 20;
               } 
               k = k - 8;
             }

             for(i = 31; i <= 38; i++){
                for(let j = 0; j < 3; j++){
                   if(type == "gingival_margin"){
                   ctx.lineTo(k, 50 + (dentes.inferior['tooth_'+i].lingual.gingival_margin[j] * 6));
                   }
                   if(type == "probing_depth"){
                   ctx.lineTo(k, 50 +  (dentes.inferior['tooth_'+i].lingual.probing_depth[j] * 6));
                   }
             if(type == "bleeding"){
                 if(dentes.inferior['tooth_'+i].lingual.bleeding[j] == 1){
                     drawBlood(ball, 30, k);
                 }
                 if(dentes.inferior['tooth_'+i].lingual.bleeding[j] == 2){
                     drawBlood(ball, 30, k);
                     drawBlood(ball, 20, k);
                 }
                   if(dentes.inferior['tooth_'+i].lingual.bleeding[j] >= 3){
                     drawBlood(ball, 30, k);
                     drawBlood(ball, 20, k);
                     drawBlood(ball, 10, k);
                 }
             }
                   k = k + 20;
                } 
                k = k - 8;
              }
             

             if(type == "gingival_margin"){
                ctx.lineTo(832, 50);
              }
              if(type == "probing_depth"){
                ctx.lineTo(832, 50);
              }
             
          ctx.lineWidth = 2;
          ctx.strokeStyle = color;
          ctx.stroke();
        
	  }
	  
renderCanvasBucalTop(name){

    return(
    <canvas id={name} width="832" height="130" className={css(styles.canvas_top)} style={{position: 'absolute', zIndex: '999', left: '27px', top: '2px'}} >            
    </canvas>
    );
}

renderCanvasLingualTop(name){

    return(
    <canvas id={name} width="832" height="130" className={css(styles.canvas_top)} style={{position: 'absolute', zIndex: '999', left: '27px', top: '2px'}} >            
    </canvas>
    );
}

renderCanvasBucalBottom(name){

    return(
    <canvas id={name} width="832" height="130" className={css(styles.canvas_bot)} style={{position: 'absolute', zIndex: '999', left: '27px'}} >            
    </canvas>
    );
}

renderCanvasLingualBottom(name){

    return(
    <canvas id={name} width="832" height="130" className={css(styles.canvas_bot)} style={{position: 'absolute', zIndex: '999', left: '27px'}} >            
    </canvas>
    );
}


renderDataPerioBucalTop(){

    return(
            
		
        <div className={css(styles.odonto_top)} style={{position: 'relative',  height: '110px'}} >
            
            
            <div className={css(styles.listItemInfo)}>
                <div className={css(styles.indice_sangramento)} data-tip='Índice de Sangramento' data-for='tip_bleeding_bucal_top'> <span className={css(styles.infoInterno)}>S</span> </div>
                <div className={css(styles.margem_gengival)} data-tip='Margem Gengival' data-for='tip_margin_bucal_top'> <span className={css(styles.infoInterno)}>G</span> </div>
                <div className={css(styles.nivel_osseo)}data-tip='Nível Ósseo' data-for='tip_depth_bucal_top'> <span className={css(styles.infoInterno)}>O</span> </div>
            </div>
            <ReactTooltip place="left" effect="solid" id="tip_bleeding_bucal_top" ></ReactTooltip> 
            <ReactTooltip place="left" effect="solid" id="tip_margin_bucal_top" ></ReactTooltip> 
            <ReactTooltip place="left" effect="solid" id="tip_depth_bucal_top" ></ReactTooltip> 

                <div name='tooth_18' className={css(styles.listItem)} >
                    <span className={css(styles.tooth_number)}> { '18' } </span>
                    <input type="text" name="bleeding_18_mesial_bucal"  className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_18_oclusal_bucal" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_18_distal_bucal" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)}  value={this.state.dentes.superior.tooth_18.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_18_mesial_bucal" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.bucal.gingival_margin[0]}   onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_18_oclusal_bucal" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_18_distal_bucal" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_18_mesial_bucal" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_18_oclusal_bucal" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_18_distal_bucal" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_17' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '17' } </span>
                    <input type="text" name="bleeding_17_mesial_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.bleeding[0]}   onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_17_oclusal_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_17_distal_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_17_mesial_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_17_oclusal_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_17_distal_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_17_mesial_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_17_oclusal_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_17_distal_bucal" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_16' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '16' } </span>
                    <input type="text" name="bleeding_16_mesial_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_16_oclusal_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_16_distal_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_16_mesial_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="margin_16_oclusal_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_16_distal_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_16_mesial_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_16_oclusal_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_16_distal_bucal" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_15' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '15' } </span>
                    <input type="text" name="bleeding_15_mesial_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_15_oclusal_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_15_distal_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_15_mesial_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_15_oclusal_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_15_distal_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_15_mesial_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_15_oclusal_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_15_distal_bucal" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_14' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '14' } </span>
                    <input type="text" name="bleeding_14_mesial_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_14_oclusal_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_14_distal_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_14_mesial_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_14_oclusal_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_14_distal_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_14_mesial_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_14_oclusal_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_14_distal_bucal" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_13' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '13' } </span>
                    <input type="text" name="bleeding_13_mesial_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_13_oclusal_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_13_distal_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_13_mesial_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_13_oclusal_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_13_distal_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_13_mesial_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_13_oclusal_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_13_distal_bucal" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_12' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '12' } </span>
                    <input type="text" name="bleeding_12_mesial_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_12_oclusal_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_12_distal_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_12_mesial_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_12_oclusal_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_12_distal_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_12_mesial_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_12_oclusal_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_12_distal_bucal" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_11' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '11' } </span>
                    <input type="text" name="bleeding_11_mesial_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_11_oclusal_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_11_distal_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_11_mesial_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_11_oclusal_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_11_distal_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_11_mesial_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_11_oclusal_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_11_distal_bucal" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_21' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '21' } </span>
                    <input type="text" name="bleeding_21_mesial_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_21_oclusal_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_21_distal_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_21_mesial_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_21_oclusal_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_21_distal_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_21_mesial_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_21_oclusal_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_21_distal_bucal" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_22' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '22' } </span>
                    <input type="text" name="bleeding_22_mesial_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_22_oclusal_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_22_distal_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_22_mesial_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_22_oclusal_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_22_distal_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_22_mesial_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_22_oclusal_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_22_distal_bucal" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_23' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '23' } </span>
                    <input type="text" name="bleeding_23_mesial_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_23_oclusal_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_23_distal_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_23_mesial_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_23_oclusal_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_23_distal_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_23_mesial_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_23_oclusal_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_23_distal_bucal" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_24' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '24' } </span>
                    <input type="text" name="bleeding_24_mesial_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_24_oclusal_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_24_distal_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>                   
                    <input type="text" name="margin_24_mesial_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_24_oclusal_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_24_distal_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_24_mesial_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_24_oclusal_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_24_distal_bucal" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_25' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '25' } </span>
                    <input type="text" name="bleeding_25_mesial_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_25_oclusal_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_25_distal_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_25_mesial_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_25_oclusal_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_25_distal_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_25_mesial_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_25_oclusal_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_25_distal_bucal" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_26' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '26' } </span>
                    <input type="text" name="bleeding_26_mesial_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_26_oclusal_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_26_distal_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_26_mesial_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_26_oclusal_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_26_distal_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_26_mesial_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_26_oclusal_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_26_distal_bucal" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_27' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '27' } </span>
                    <input type="text" name="bleeding_27_mesial_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_27_oclusal_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_27_distal_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_27_mesial_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_27_oclusal_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_27_distal_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_27_mesial_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_27_oclusal_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_27_distal_bucal" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_28' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '28' } </span>
                    <input type="text" name="bleeding_28_mesial_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_28_oclusal_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_28_distal_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_28_mesial_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_28_oclusal_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_28_distal_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_28_mesial_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_28_oclusal_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_28_distal_bucal" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                </div>

            
            <div className={css(styles.listItemInfo)}>
                <div className={css(styles.indice_sangramento)} data-tip='Índice de Sangramento' data-for='tip_bleeding_bucal_top_2'> <span className={css(styles.infoInterno)}>S</span> </div>
                <div className={css(styles.margem_gengival)} data-tip='Margem Gengival' data-for='tip_margin_bucal_top_2'> <span className={css(styles.infoInterno)}>G</span> </div>
                <div className={css(styles.nivel_osseo)}data-tip='Nível Ósseo' data-for='tip_depth_bucal_top_2'> <span className={css(styles.infoInterno)}>O</span> </div>
            </div>
            <ReactTooltip place="right" effect="solid" id="tip_bleeding_bucal_top_2" ></ReactTooltip> 
            <ReactTooltip place="right" effect="solid" id="tip_margin_bucal_top_2" ></ReactTooltip> 
            <ReactTooltip place="right" effect="solid" id="tip_depth_bucal_top_2" ></ReactTooltip> 

            </div>
            

  
        
    );
}

renderPerioBucalTop(){

		return(
            
		
			<div className={css(styles.odonto_top)} style={{position: 'relative',  height: '150px'}} >
                
                {this.renderCanvasBucalTop("guide_bucal_top")}
                {this.renderCanvasBucalTop("lines_bucal_top")}
                {this.renderCanvasBucalTop("balls_bucal_top")}


                <div className={css(styles.listItemInfo)}>
                    <span className={css(styles.teeth_bucal_sup)}> Vestibular Superior </span>
                </div>
                
					<div name='tooth_18' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'18'} tooth={{status: this.state.dentes.superior.tooth_18.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '18' } </span>
					</div>
					<div name='tooth_17' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'17'} tooth={{status: this.state.dentes.superior.tooth_17.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '17' } </span>
					</div>
					<div name='tooth_16' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'16'} tooth={{status: this.state.dentes.superior.tooth_16.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '16' } </span>
					</div>
					<div name='tooth_15' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'15'} tooth={{status: this.state.dentes.superior.tooth_15.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '15' } </span>
					</div>
					<div name='tooth_14' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'14'} tooth={{status: this.state.dentes.superior.tooth_14.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '14' } </span>
					</div>
					<div name='tooth_13' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'13'} tooth={{status: this.state.dentes.superior.tooth_13.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '13' } </span>
					</div>
					<div name='tooth_12' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'12'} tooth={{status: this.state.dentes.superior.tooth_12.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '12' } </span>
					</div>
					<div name='tooth_11' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'11'} tooth={{status: this.state.dentes.superior.tooth_11.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '11' } </span>
					</div>
					<div name='tooth_21' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'21'} tooth={{status: this.state.dentes.superior.tooth_21.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '21' } </span>
					</div>
					<div name='tooth_22' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'22'} tooth={{status: this.state.dentes.superior.tooth_22.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '22' } </span>
					</div>
					<div name='tooth_23' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'23'} tooth={{status: this.state.dentes.superior.tooth_23.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '23' } </span>
					</div>
					<div name='tooth_24' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'24'} tooth={{status: this.state.dentes.superior.tooth_24.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '24' } </span>
					</div>
					<div name='tooth_25' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'25'} tooth={{status: this.state.dentes.superior.tooth_25.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '25' } </span>
					</div>
					<div name='tooth_26' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'26'} tooth={{status: this.state.dentes.superior.tooth_26.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '26' } </span>
					</div>
					<div name='tooth_27' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'27'} tooth={{status: this.state.dentes.superior.tooth_27.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '27' } </span>
					</div>
					<div name='tooth_28' className={css(styles.listItemPerioTop)}>
						<IconPerio number={'28'} tooth={{status: this.state.dentes.superior.tooth_28.status}}/>
                        <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '28' } </span>
					</div>

                
                <div className={css(styles.listItemInfo)}>
                <span className={css(styles.teeth_bucal_sup)}> Vestibular Superior</span>
                </div>

				</div>
                

      
			
		);
    };


renderDataPerioLingualTop(){

    return(
            
		
        <div className={css(styles.odonto_top)} style={{position: 'relative',  height: '110px'}} >
            
            <div className={css(styles.listItemInfo)}>
                <div className={css(styles.indice_sangramento)} data-tip='Índice de Sangramento' data-for='tip_bleeding_lingual_top'> <span className={css(styles.infoInterno)}>S</span> </div>
                <div className={css(styles.margem_gengival)} data-tip='Margem Gengival' data-for='tip_margin_lingual_top'> <span className={css(styles.infoInterno)}>G</span> </div>
                <div className={css(styles.nivel_osseo)}data-tip='Nível Ósseo' data-for='tip_depth_lingual_top'> <span className={css(styles.infoInterno)}>O</span> </div>
            </div>
            <ReactTooltip place="left" effect="solid" id="tip_bleeding_lingual_top" ></ReactTooltip> 
            <ReactTooltip place="left" effect="solid" id="tip_margin_lingual_top" ></ReactTooltip> 
            <ReactTooltip place="left" effect="solid" id="tip_depth_lingual_top" ></ReactTooltip> 
            
            <div name='tooth_18' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '18' } </span>
                    <input type="text" name="bleeding_18_mesial_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_18_oclusal_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_18_distal_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)}  value={this.state.dentes.superior.tooth_18.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_18_mesial_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.lingual.gingival_margin[0]}   onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_18_oclusal_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_18_distal_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_18_mesial_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_18_oclusal_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_18_distal_lingual" className={this.state.dentes.superior.tooth_18.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_18.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_18.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_17' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '17' } </span>
                    <input type="text" name="bleeding_17_mesial_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.bleeding[0]}   onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_17_oclusal_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_17_distal_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_17_mesial_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_17_oclusal_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_17_distal_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_17_mesial_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_17_oclusal_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_17_distal_lingual" className={this.state.dentes.superior.tooth_17.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_17.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_17.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_16' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '16' } </span>
                    <input type="text" name="bleeding_16_mesial_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_16_oclusal_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_16_distal_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_16_mesial_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="margin_16_oclusal_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_16_distal_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_16_mesial_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_16_oclusal_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_16_distal_lingual" className={this.state.dentes.superior.tooth_16.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_16.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_16.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_15' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '15' } </span>
                    <input type="text" name="bleeding_15_mesial_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_15_oclusal_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_15_distal_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_15_mesial_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_15_oclusal_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_15_distal_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_15_mesial_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_15_oclusal_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_15_distal_lingual" className={this.state.dentes.superior.tooth_15.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_15.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_15.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_14' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '14' } </span>
                    <input type="text" name="bleeding_14_mesial_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_14_oclusal_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_14_distal_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_14_mesial_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_14_oclusal_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_14_distal_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_14_mesial_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_14_oclusal_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_14_distal_lingual" className={this.state.dentes.superior.tooth_14.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_14.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_14.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_13' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '13' } </span>
                    <input type="text" name="bleeding_13_mesial_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_13_oclusal_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_13_distal_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_13_mesial_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_13_oclusal_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_13_distal_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_13_mesial_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_13_oclusal_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_13_distal_lingual" className={this.state.dentes.superior.tooth_13.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_13.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_13.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_12' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '12' } </span>
                    <input type="text" name="bleeding_12_mesial_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_12_oclusal_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_12_distal_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_12_mesial_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_12_oclusal_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_12_distal_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_12_mesial_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_12_oclusal_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_12_distal_lingual" className={this.state.dentes.superior.tooth_12.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_12.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_12.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_11' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '11' } </span>
                    <input type="text" name="bleeding_11_mesial_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_11_oclusal_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_11_distal_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_11_mesial_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_11_oclusal_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_11_distal_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_11_mesial_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_11_oclusal_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_11_distal_lingual" className={this.state.dentes.superior.tooth_11.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_11.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_11.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_21' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '21' } </span>
                    <input type="text" name="bleeding_21_mesial_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_21_oclusal_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_21_distal_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_21_mesial_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_21_oclusal_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_21_distal_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_21_mesial_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_21_oclusal_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_21_distal_lingual" className={this.state.dentes.superior.tooth_21.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_21.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_21.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_22' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '22' } </span>
                    <input type="text" name="bleeding_22_mesial_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_22_oclusal_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_22_distal_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_22_mesial_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_22_oclusal_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_22_distal_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_22_mesial_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_22_oclusal_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_22_distal_lingual" className={this.state.dentes.superior.tooth_22.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_22.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_22.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_23' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '23' } </span>
                    <input type="text" name="bleeding_23_mesial_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_23_oclusal_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_23_distal_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_23_mesial_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_23_oclusal_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_23_distal_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_23_mesial_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_23_oclusal_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_23_distal_lingual" className={this.state.dentes.superior.tooth_23.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_23.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_23.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_24' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '24' } </span>
                    <input type="text" name="bleeding_24_mesial_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_24_oclusal_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_24_distal_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>                   
                    <input type="text" name="margin_24_mesial_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_24_oclusal_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_24_distal_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_24_mesial_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_24_oclusal_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_24_distal_lingual" className={this.state.dentes.superior.tooth_24.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_24.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_24.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_25' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '25' } </span>
                    <input type="text" name="bleeding_25_mesial_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_25_oclusal_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_25_distal_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_25_mesial_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_25_oclusal_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_25_distal_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_25_mesial_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_25_oclusal_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_25_distal_lingual" className={this.state.dentes.superior.tooth_25.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_25.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_25.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_26' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '26' } </span>
                    <input type="text" name="bleeding_26_mesial_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_26_oclusal_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_26_distal_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_26_mesial_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_26_oclusal_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_26_distal_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_26_mesial_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_26_oclusal_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_26_distal_lingual" className={this.state.dentes.superior.tooth_26.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_26.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_26.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_27' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '27' } </span>
                    <input type="text" name="bleeding_27_mesial_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_27_oclusal_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_27_distal_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_27_mesial_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_27_oclusal_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_27_distal_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_27_mesial_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_27_oclusal_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_27_distal_lingual" className={this.state.dentes.superior.tooth_27.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_27.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_27.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_28' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '28' } </span>
                    <input type="text" name="bleeding_28_mesial_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_28_oclusal_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_28_distal_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_28_mesial_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_28_oclusal_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_28_distal_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_28_mesial_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_28_oclusal_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_28_distal_lingual" className={this.state.dentes.superior.tooth_28.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.superior.tooth_28.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.superior.tooth_28.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                </div>


            <div className={css(styles.listItemInfo)}>
                <div className={css(styles.indice_sangramento)} data-tip='Índice de Sangramento' data-for='tip_bleeding_lingual_top_2'> <span className={css(styles.infoInterno)}>S</span> </div>
                <div className={css(styles.margem_gengival)} data-tip='Margem Gengival' data-for='tip_margin_lingual_top_2'> <span className={css(styles.infoInterno)}>G</span> </div>
                <div className={css(styles.nivel_osseo)}data-tip='Nível Ósseo' data-for='tip_depth_lingual_top_2'> <span className={css(styles.infoInterno)}>O</span> </div>
            </div>
            <ReactTooltip place="right" effect="solid" id="tip_bleeding_lingual_top_2" ></ReactTooltip> 
            <ReactTooltip place="right" effect="solid" id="tip_margin_lingual_top_2" ></ReactTooltip> 
            <ReactTooltip place="right" effect="solid" id="tip_depth_lingual_top_2" ></ReactTooltip> 


            </div>
            

  
        
    );
}

renderPerioLingualTop(){

    return(
        
    
        <div className={css(styles.odonto_top)} style={{position: 'relative',  height: '150px'}} >
            
            {this.renderCanvasLingualTop("guide_lingual_top")}
            {this.renderCanvasLingualTop("lines_lingual_top")}
            {this.renderCanvasLingualTop("balls_lingual_top")}
            
            <div className={css(styles.listItemInfo)}>
                <span className={css(styles.teeth_bucal_sup)}> Palatina Superior </span>
            </div>
            
                <div name='tooth_18' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'18'} tooth={{status: this.state.dentes.superior.tooth_18.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '18' } </span>
                </div>
                <div name='tooth_17' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'17'} tooth={{status: this.state.dentes.superior.tooth_17.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '17' } </span>
                </div>
                <div name='tooth_16' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'16'} tooth={{status: this.state.dentes.superior.tooth_16.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '16' } </span>
                </div>
                <div name='tooth_15' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'15'} tooth={{status: this.state.dentes.superior.tooth_15.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '15' } </span>
                </div>
                <div name='tooth_14' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'14'} tooth={{status: this.state.dentes.superior.tooth_14.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '14' } </span>
                </div>
                <div name='tooth_13' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'13'} tooth={{status: this.state.dentes.superior.tooth_13.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '13' } </span>
                </div>
                <div name='tooth_12' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'12'} tooth={{status: this.state.dentes.superior.tooth_12.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '12' } </span>
                </div>
                <div name='tooth_11' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'11'} tooth={{status: this.state.dentes.superior.tooth_11.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '11' } </span>
                </div>
                <div name='tooth_21' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'21'} tooth={{status: this.state.dentes.superior.tooth_21.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '21' } </span>
                </div>
                <div name='tooth_22' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'22'} tooth={{status: this.state.dentes.superior.tooth_22.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '22' } </span>
                </div>
                <div name='tooth_23' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'23'} tooth={{status: this.state.dentes.superior.tooth_23.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '23' } </span>
                </div>
                <div name='tooth_24' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'24'} tooth={{status: this.state.dentes.superior.tooth_24.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '24' } </span>
                </div>
                <div name='tooth_25' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'25'} tooth={{status: this.state.dentes.superior.tooth_25.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '25' } </span>
                </div>
                <div name='tooth_26' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'26'} tooth={{status: this.state.dentes.superior.tooth_26.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '26' } </span>
                </div>
                <div name='tooth_27' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'27'} tooth={{status: this.state.dentes.superior.tooth_27.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '27' } </span>
                </div>
                <div name='tooth_28' className={css(styles.listItemPerioTop)}>
                    <IconPerio number={'28'} tooth={{status: this.state.dentes.superior.tooth_28.status}}/>
                    <span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '28' } </span>
                </div>

            
            <div className={css(styles.listItemInfo)}>
            <span className={css(styles.teeth_bucal_sup)}> Palatina Superior</span>
            </div>

            </div>
            

  
        
    );
};
    

    renderDataPerioBucalBottom(){

        return(
                
            
            <div className={css(styles.odonto_top)} style={{position: 'relative',  height: '110px'}} >
                
                
                <div className={css(styles.listItemInfo)}>
                <div className={css(styles.indice_sangramento)} data-tip='Índice de Sangramento' data-for='tip_bleeding_bucal_bottom'> <span className={css(styles.infoInterno)}>S</span> </div>
                <div className={css(styles.margem_gengival)} data-tip='Margem Gengival' data-for='tip_margin_bucal_bottom'> <span className={css(styles.infoInterno)}>G</span> </div>
                <div className={css(styles.nivel_osseo)}data-tip='Nível Ósseo' data-for='tip_depth_bucal_bottom'> <span className={css(styles.infoInterno)}>O</span> </div>
            </div>
            <ReactTooltip place="left" effect="solid" id="tip_bleeding_bucal_bottom" ></ReactTooltip> 
            <ReactTooltip place="left" effect="solid" id="tip_margin_bucal_bottom" ></ReactTooltip> 
            <ReactTooltip place="left" effect="solid" id="tip_depth_bucal_bottom" ></ReactTooltip> 
                
                <div name='tooth_48' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '48' } </span>
                    <input type="text" name="bleeding_48_mesial_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_48_oclusal_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_48_distal_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)}  value={this.state.dentes.inferior.tooth_48.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_48_mesial_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.bucal.gingival_margin[0]}   onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_48_oclusal_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_48_distal_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_48_mesial_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_48_oclusal_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_48_distal_bucal" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_47' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '47' } </span>
                    <input type="text" name="bleeding_47_mesial_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.bleeding[0]}   onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_47_oclusal_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_47_distal_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_47_mesial_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_47_oclusal_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_47_distal_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_47_mesial_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_47_oclusal_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_47_distal_bucal" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_46' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '46' } </span>
                    <input type="text" name="bleeding_46_mesial_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_46_oclusal_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_46_distal_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_46_mesial_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="margin_46_oclusal_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_46_distal_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_46_mesial_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_46_oclusal_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_46_distal_bucal" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_45' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> {  '45' } </span>
                    <input type="text" name="bleeding_45_mesial_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_45_oclusal_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_45_distal_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_45_mesial_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_45_oclusal_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_45_distal_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_45_mesial_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_45_oclusal_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_45_distal_bucal" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_44' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '44' } </span>
                    <input type="text" name="bleeding_44_mesial_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_44_oclusal_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_44_distal_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_44_mesial_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_44_oclusal_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_44_distal_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_44_mesial_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_44_oclusal_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_44_distal_bucal" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_43' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> {  '43' } </span>
                    <input type="text" name="bleeding_43_mesial_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_43_oclusal_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_43_distal_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_43_mesial_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_43_oclusal_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_43_distal_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_43_mesial_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_43_oclusal_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_43_distal_bucal" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_42' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '42' } </span>
                    <input type="text" name="bleeding_42_mesial_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_42_oclusal_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_42_distal_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_42_mesial_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_42_oclusal_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_42_distal_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_42_mesial_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_42_oclusal_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_42_distal_bucal" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_41' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '41' } </span>
                    <input type="text" name="bleeding_41_mesial_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_41_oclusal_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_41_distal_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_41_mesial_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_41_oclusal_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_41_distal_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_41_mesial_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_41_oclusal_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_41_distal_bucal" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_31' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> {  '31' } </span>
                    <input type="text" name="bleeding_31_mesial_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_31_oclusal_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_31_distal_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_31_mesial_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_31_oclusal_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_31_distal_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_31_mesial_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_31_oclusal_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_31_distal_bucal" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_32' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> {  '32' } </span>
                    <input type="text" name="bleeding_32_mesial_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_32_oclusal_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_32_distal_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_32_mesial_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_32_oclusal_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_32_distal_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_32_mesial_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_32_oclusal_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_32_distal_bucal" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_33' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '33' } </span>
                    <input type="text" name="bleeding_33_mesial_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_33_oclusal_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_33_distal_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_33_mesial_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_33_oclusal_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_33_distal_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_33_mesial_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_33_oclusal_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_33_distal_bucal" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_34' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '34' } </span>
                    <input type="text" name="bleeding_34_mesial_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_34_oclusal_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_34_distal_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>                   
                    <input type="text" name="margin_34_mesial_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_34_oclusal_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_34_distal_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_34_mesial_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_34_oclusal_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_34_distal_bucal" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_35' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '35' } </span>
                    <input type="text" name="bleeding_35_mesial_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_35_oclusal_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_35_distal_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_35_mesial_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_35_oclusal_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_35_distal_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_35_mesial_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_35_oclusal_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_35_distal_bucal" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_36' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '36' } </span>
                    <input type="text" name="bleeding_36_mesial_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_36_oclusal_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_36_distal_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_36_mesial_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_36_oclusal_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_36_distal_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_36_mesial_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_36_oclusal_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_36_distal_bucal" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_37' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '37' } </span>
                    <input type="text" name="bleeding_37_mesial_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_37_oclusal_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_37_distal_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_37_mesial_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_37_oclusal_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_37_distal_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_37_mesial_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_37_oclusal_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_37_distal_bucal" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_38' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '38' } </span>
                    <input type="text" name="bleeding_38_mesial_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_38_oclusal_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_38_distal_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_38_mesial_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_38_oclusal_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_38_distal_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_38_mesial_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_38_oclusal_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_38_distal_bucal" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.bucal.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                </div>
    
                
            <div className={css(styles.listItemInfo)}>
                <div className={css(styles.indice_sangramento)} data-tip='Índice de Sangramento' data-for='tip_bleeding_bucal_bottom_2'> <span className={css(styles.infoInterno)}>S</span> </div>
                <div className={css(styles.margem_gengival)} data-tip='Margem Gengival' data-for='tip_margin_bucal_bottom_2'> <span className={css(styles.infoInterno)}>G</span> </div>
                <div className={css(styles.nivel_osseo)}data-tip='Nível Ósseo' data-for='tip_depth_bucal_bottom_2'> <span className={css(styles.infoInterno)}>O</span> </div>
            </div>
            <ReactTooltip place="right" effect="solid" id="tip_bleeding_bucal_bottom_2" ></ReactTooltip> 
            <ReactTooltip place="right" effect="solid" id="tip_margin_bucal_bottom_2" ></ReactTooltip> 
            <ReactTooltip place="right" effect="solid" id="tip_depth_bucal_bottom_2" ></ReactTooltip> 

    
                </div>
                
    
      
            
        );
    }

	renderPerioBucalBottom(){

		return(
			
			
			<div className={css(styles.odonto_bot)} style={{position: 'relative',  height: '150px'}} >

				{this.renderCanvasBucalBottom("guide_bucal_bottom")}
                {this.renderCanvasBucalBottom("lines_bucal_bottom")}
				{this.renderCanvasBucalBottom("balls_bucal_bottom")}

                    <div className={css(styles.listItemInfo)}>
                    <span className={css(styles.teeth_bucal_inf)}> Vestibular Inferior </span>
                    </div>

					<div name='tooth_48' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'48'} tooth={{status: this.state.dentes.inferior.tooth_48.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '48' } </span>
						
					</div>
					<div name='tooth_47' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'47'} tooth={{status: this.state.dentes.inferior.tooth_47.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '47' } </span>
					</div>
					<div name='tooth_46' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'46'} tooth={{status: this.state.dentes.inferior.tooth_46.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '46' } </span>
					</div>
					<div name='tooth_45' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'45'} tooth={{status: this.state.dentes.inferior.tooth_45.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '45' } </span>
					</div>
					<div name='tooth_44' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'44'} tooth={{status: this.state.dentes.inferior.tooth_44.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '44' } </span>
					</div>
					<div name='tooth_43' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'43'} tooth={{status: this.state.dentes.inferior.tooth_43.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '43' } </span>
					</div>
					<div name='tooth_42' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'42'} tooth={{status: this.state.dentes.inferior.tooth_42.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '42' } </span>
					</div>
					<div name='tooth_41' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'41'} tooth={{status: this.state.dentes.inferior.tooth_41.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '41' } </span>
					</div>
					<div name='tooth_31' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'31'} tooth={{status: this.state.dentes.inferior.tooth_31.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '31' } </span>
					</div>
					<div name='tooth_32' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'32'} tooth={{status: this.state.dentes.inferior.tooth_32.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '32' } </span>
					</div>
					<div name='tooth_33' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'33'} tooth={{status: this.state.dentes.inferior.tooth_33.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '33' } </span>
					</div>
					<div name='tooth_34' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'34'} tooth={{status: this.state.dentes.inferior.tooth_34.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '34' } </span>
					</div>
					<div name='tooth_35' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'35'} tooth={{status: this.state.dentes.inferior.tooth_35.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '35' } </span>
					</div>
					<div name='tooth_36' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'36'} tooth={{status: this.state.dentes.inferior.tooth_36.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '36' } </span>
					</div>
					<div name='tooth_37' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'37'} tooth={{status: this.state.dentes.inferior.tooth_37.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '37' } </span>
					</div>
					<div name='tooth_38' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'38'} tooth={{status: this.state.dentes.inferior.tooth_38.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '38' } </span>
					</div>

                        <div className={css(styles.listItemInfo)}>
                        <span className={css(styles.teeth_bucal_inf)}> Vestibular Inferior </span>
                        </div>

				</div>
		
		
		);
	}

   

    renderDataPerioLingualBottom(){

        return(
                
            
            <div className={css(styles.odonto_top)} style={{position: 'relative',  height: '110px'}} >
                
                
            <div className={css(styles.listItemInfo)}>
                <div className={css(styles.indice_sangramento)} data-tip='Índice de Sangramento' data-for='tip_bleeding_lingual_bottom'> <span className={css(styles.infoInterno)}>S</span> </div>
                <div className={css(styles.margem_gengival)} data-tip='Margem Gengival' data-for='tip_margin_lingual_bottom'> <span className={css(styles.infoInterno)}>G</span> </div>
                <div className={css(styles.nivel_osseo)}data-tip='Nível Ósseo' data-for='tip_depth_lingual_bottom'> <span className={css(styles.infoInterno)}>O</span> </div>
            </div>
            <ReactTooltip place="left" effect="solid" id="tip_bleeding_lingual_bottom" ></ReactTooltip> 
            <ReactTooltip place="left" effect="solid" id="tip_margin_lingual_bottom" ></ReactTooltip> 
            <ReactTooltip place="left" effect="solid" id="tip_depth_lingual_bottom" ></ReactTooltip> 
                
                <div name='tooth_48' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '48' } </span>
                    <input type="text" name="bleeding_48_mesial_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_48_oclusal_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_48_distal_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)}  value={this.state.dentes.inferior.tooth_48.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_48_mesial_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.lingual.gingival_margin[0]}   onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_48_oclusal_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_48_distal_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_48_mesial_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_48_oclusal_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_48_distal_lingual" className={this.state.dentes.inferior.tooth_48.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_48.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_48.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_47' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '47' } </span>
                    <input type="text" name="bleeding_47_mesial_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.bleeding[0]}   onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_47_oclusal_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_47_distal_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_47_mesial_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_47_oclusal_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_47_distal_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_47_mesial_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_47_oclusal_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_47_distal_lingual" className={this.state.dentes.inferior.tooth_47.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_47.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_47.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_46' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> {  '46' } </span>
                    <input type="text" name="bleeding_46_mesial_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_46_oclusal_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_46_distal_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_46_mesial_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="margin_46_oclusal_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_46_distal_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_46_mesial_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_46_oclusal_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_46_distal_lingual" className={this.state.dentes.inferior.tooth_46.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_46.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_46.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_45' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '45' } </span>
                    <input type="text" name="bleeding_45_mesial_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_45_oclusal_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <input type="text" name="bleeding_45_distal_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress} />
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_45_mesial_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_45_oclusal_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_45_distal_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_45_mesial_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_45_oclusal_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_45_distal_lingual" className={this.state.dentes.inferior.tooth_45.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_45.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_45.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_44' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '44' } </span>
                    <input type="text" name="bleeding_44_mesial_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_44_oclusal_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_44_distal_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_44_mesial_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_44_oclusal_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_44_distal_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_44_mesial_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_44_oclusal_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_44_distal_lingual" className={this.state.dentes.inferior.tooth_44.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_44.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_44.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_43' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '43' } </span>
                    <input type="text" name="bleeding_43_mesial_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_43_oclusal_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_43_distal_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_43_mesial_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_43_oclusal_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_43_distal_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_43_mesial_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_43_oclusal_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_43_distal_lingual" className={this.state.dentes.inferior.tooth_43.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_43.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_43.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_42' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '42' } </span>
                    <input type="text" name="bleeding_42_mesial_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_42_oclusal_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_42_distal_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_42_mesial_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_42_oclusal_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_42_distal_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_42_mesial_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_42_oclusal_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_42_distal_lingual" className={this.state.dentes.inferior.tooth_42.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_42.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_42.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_41' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '41' } </span>
                    <input type="text" name="bleeding_41_mesial_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_41_oclusal_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_41_distal_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_41_mesial_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_41_oclusal_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_41_distal_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_41_mesial_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_41_oclusal_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_41_distal_lingual" className={this.state.dentes.inferior.tooth_41.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_41.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_41.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_31' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '31' } </span>
                    <input type="text" name="bleeding_31_mesial_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_31_oclusal_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_31_distal_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_31_mesial_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_31_oclusal_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_31_distal_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_31_mesial_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_31_oclusal_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_31_distal_lingual" className={this.state.dentes.inferior.tooth_31.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_31.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_31.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_32' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '32' } </span>
                    <input type="text" name="bleeding_32_mesial_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_32_oclusal_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_32_distal_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_32_mesial_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_32_oclusal_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_32_distal_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_32_mesial_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_32_oclusal_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_32_distal_lingual" className={this.state.dentes.inferior.tooth_32.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_32.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_32.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_33' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '33' } </span>
                    <input type="text" name="bleeding_33_mesial_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_33_oclusal_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_33_distal_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_33_mesial_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_33_oclusal_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_33_distal_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_33_mesial_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_33_oclusal_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_33_distal_lingual" className={this.state.dentes.inferior.tooth_33.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_33.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_33.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_34' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '34' } </span>
                    <input type="text" name="bleeding_34_mesial_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_34_oclusal_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_34_distal_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>                   
                    <input type="text" name="margin_34_mesial_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_34_oclusal_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_34_distal_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_34_mesial_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_34_oclusal_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_34_distal_lingual" className={this.state.dentes.inferior.tooth_34.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_34.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_34.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_35' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '35' } </span>
                    <input type="text" name="bleeding_35_mesial_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_35_oclusal_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_35_distal_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_35_mesial_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_35_oclusal_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_35_distal_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_35_mesial_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_35_oclusal_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_35_distal_lingual" className={this.state.dentes.inferior.tooth_35.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_35.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_35.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_36' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '36' } </span>
                    <input type="text" name="bleeding_36_mesial_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_36_oclusal_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_36_distal_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_36_mesial_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_36_oclusal_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_36_distal_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_36_mesial_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_36_oclusal_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_36_distal_lingual" className={this.state.dentes.inferior.tooth_36.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_36.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_36.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_37' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '37' } </span>
                    <input type="text" name="bleeding_37_mesial_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_37_oclusal_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_37_distal_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_37_mesial_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_37_oclusal_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_37_distal_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_37_mesial_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_37_oclusal_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_37_distal_lingual" className={this.state.dentes.inferior.tooth_37.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_37.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_37.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    
                </div>
                <div name='tooth_38' className={css(styles.listItem)}>
                    <span className={css(styles.tooth_number)}> { '38' } </span>
                    <input type="text" name="bleeding_38_mesial_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.bleeding[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_38_oclusal_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.bleeding[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="bleeding_38_distal_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.bleeding[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="margin_38_mesial_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.gingival_margin[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_38_oclusal_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.gingival_margin[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="margin_38_distal_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.gingival_margin[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <div style={{ height:'5px', width: '50px' }}> </div>
                    <input type="text" name="depth_38_mesial_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.probing_depth[0]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_38_oclusal_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.probing_depth[1]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                    <input type="text" name="depth_38_distal_lingual" className={this.state.dentes.inferior.tooth_38.status == 'NORMAL'   ? css(styles.inputPerio) : this.state.dentes.inferior.tooth_38.status == 'IMPLANTE'   ? css(styles.inputPerio) : css(styles.inputPerioDisabled)} value={this.state.dentes.inferior.tooth_38.lingual.probing_depth[2]}  onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyPress}/>
                </div>
    
                
            <div className={css(styles.listItemInfo)}>
                <div className={css(styles.indice_sangramento)} data-tip='Índice de Sangramento' data-for='tip_bleeding_lingual_bottom_2'> <span className={css(styles.infoInterno)}>S</span> </div>
                <div className={css(styles.margem_gengival)} data-tip='Margem Gengival' data-for='tip_margin_lingual_bottom_2'> <span className={css(styles.infoInterno)}>G</span> </div>
                <div className={css(styles.nivel_osseo)}data-tip='Nível Ósseo' data-for='tip_depth_lingual_bottom_2'> <span className={css(styles.infoInterno)}>O</span> </div>
            </div>
            <ReactTooltip place="right" effect="solid" id="tip_bleeding_lingual_bottom_2" ></ReactTooltip> 
            <ReactTooltip place="right" effect="solid" id="tip_margin_lingual_bottom_2" ></ReactTooltip> 
            <ReactTooltip place="right" effect="solid" id="tip_depth_lingual_bottom_2" ></ReactTooltip> 

    
                </div>
                
    
      
            
        );
    }

	renderPerioLingualBottom(){

		return(
			
			
			<div className={css(styles.odonto_bot)} style={{position: 'relative',  height: '150px'}} >

				{this.renderCanvasLingualBottom("guide_lingual_bottom")}
                {this.renderCanvasLingualBottom("lines_lingual_bottom")}
				{this.renderCanvasLingualBottom("balls_lingual_bottom")}

                    <div className={css(styles.listItemInfo)}>
                    <span className={css(styles.teeth_bucal_inf)}> Lingual Inferior </span>
                    </div>

					<div name='tooth_48' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'48'} tooth={{status: this.state.dentes.inferior.tooth_48.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '48' } </span>
						
					</div>
					<div name='tooth_47' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'47'} tooth={{status: this.state.dentes.inferior.tooth_47.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '47' } </span>
					</div>
					<div name='tooth_46' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'46'} tooth={{status: this.state.dentes.inferior.tooth_46.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '46' } </span>
					</div>
					<div name='tooth_45' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'45'} tooth={{status: this.state.dentes.inferior.tooth_45.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '45' } </span>
					</div>
					<div name='tooth_44' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'44'} tooth={{status: this.state.dentes.inferior.tooth_44.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '44' } </span>
					</div>
					<div name='tooth_43' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'43'} tooth={{status: this.state.dentes.inferior.tooth_43.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '43' } </span>
					</div>
					<div name='tooth_42' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'42'} tooth={{status: this.state.dentes.inferior.tooth_42.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '42' } </span>
					</div>
					<div name='tooth_41' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'41'} tooth={{status: this.state.dentes.inferior.tooth_41.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '41' } </span>
					</div>
					<div name='tooth_31' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'31'} tooth={{status: this.state.dentes.inferior.tooth_31.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '31' } </span>
					</div>
					<div name='tooth_32' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'32'} tooth={{status: this.state.dentes.inferior.tooth_32.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '32' } </span>
					</div>
					<div name='tooth_33' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'33'} tooth={{status: this.state.dentes.inferior.tooth_33.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '33' } </span>
					</div>
					<div name='tooth_34' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'34'} tooth={{status: this.state.dentes.inferior.tooth_34.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '34' } </span>
					</div>
					<div name='tooth_35' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'35'} tooth={{status: this.state.dentes.inferior.tooth_35.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '35' } </span>
					</div>
					<div name='tooth_36' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'36'} tooth={{status: this.state.dentes.inferior.tooth_36.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> { '36' } </span>
					</div>
					<div name='tooth_37' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'37'} tooth={{status: this.state.dentes.inferior.tooth_37.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '37' } </span>
					</div>
					<div name='tooth_38' className={css(styles.listItemPerioBottom)}>
						<IconPerio number={'38'} tooth={{status: this.state.dentes.inferior.tooth_38.status}}/>
						<span style={{position: 'absolute', bottom: '0', marginBottom: '0'}} className={css(styles.tooth_number)}> {  '38' } </span>
					</div>

                        <div className={css(styles.listItemInfo)}>
                        <span className={css(styles.teeth_bucal_inf)}> Lingual Inferior </span>
                        </div>

				</div>
		
		
		);
    }

    getAlert() {
        const { updatePeriogram } = this.props;

        updatePeriogram(this.state, this.state.patient_id, ret => {

        });
        console.log(this.state);
    }
    
    
	render() {
        
			return (
				
				<div style={{}}>
                    <div className={css(styles.first_separator)}> <h3 className={css(styles.infoText)}> VESTIBULAR SUPERIOR </h3> </div>
                    {this.renderDataPerioBucalTop()}
                    {this.renderPerioBucalTop()}
                    <div className={css(styles.separator)}> <h3 className={css(styles.infoText)}> PALATINA SUPERIOR </h3> </div>
                    {this.renderDataPerioLingualTop()}
                    {this.renderPerioLingualTop()}
                    <div className={css(styles.separator)}> <h3 className={css(styles.infoText)}> VESTIBULAR INFERIOR </h3> </div>
                    {this.renderDataPerioBucalBottom()}
                    {this.renderPerioBucalBottom()}
                    <div className={css(styles.separator)}> <h3 className={css(styles.infoText)}> LINGUAL INFERIOR </h3> </div>
                    {this.renderDataPerioLingualBottom()}
                    {this.renderPerioLingualBottom()}

                   
				</div>	
            
			
			);
		
	}
}

const perioComponent = reduxForm({
	form: 'dentalStatus'
})(PerioComponent);

function mapStateToProps(state) {
    const selectedPatient = state.patientsCreation.selectedPatient;

	return {
		selectedPatient: state.patientsCreation.selectedPatient
	};
}

export default connect(mapStateToProps, { getDentalStatus, defaultPeriogram, getPeriogram, updatePeriogram })(perioComponent);