import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';
import { styles } from './PerioChartStyles';

class PerioChart extends Component{
    constructor(props){
        super(props)
    }

    render(){

        let svg = new SVG(this.refs.mainDiv).size("100%", 200);
        let links = svg.group();
        let markers = svg.group();
        let nodes = svg.group();
        let g = [];
        let k = 0;
        let n = 0;
       for(let i = 0; i < 16; i++){
         for(let j = 0; j < 3; j++){
            k = k + 10;
            g[n] = nodes.group().translate(k, 10);
            g[n].circle(3).fill("red");
            n++;
         } 
         k = k + 15;
       }
       for(let i = 0; i < 47; i++){
            g[i].connectable({
                container: links,
                markers: markers
            }, g[i+1]).setLineColor("red");
       }

        return(
            <div className={css(styles.mainDiv)} ref="mainDiv">
            
            </div>
        )
    }

}
