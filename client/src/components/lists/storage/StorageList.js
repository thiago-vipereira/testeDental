import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './StorageListStyles';

import TableFilter from './TableFilterStorage';

class StorageList extends Component {
	constructor(props) {
		super(props);

        this.renderItems = this.renderItems.bind(this);
        this.orderTable = this.orderTable.bind(this);

        
        this.state = {
            noStorage: true,
            column: 'date',
            order: true,
            infos: {
                registry_type: { type: 'String', content: '', head: 'Tipo Registro', width: '140px'  },
                material_name: { type: 'String', content: '', head: 'Produto'},
                quantity: { type: 'String', content: '', head: 'Quantidade', width: '100px', margin: '18px' },
                date: { type: 'String', content: '', head: 'Data', width: '200px', margin: '18px' }
            }
        }
	}

    orderTable(coluna, order){
        this.setState({ 
            column: coluna,
            order: order
		});
    }

renderItems(materials, match, openModal){
    
   let noStorage = true;
   
    if (materials.length > 0) {
        console.log("entrou primeiro if");
        console.log(materials[0])
        noStorage = false;

        //console.log(noStorage);
        if(noStorage == true){
            return (
            <li className={css(styles.noItems)}>
                Nenhum registro de estoque incluso
            </li>
            );
            
        }else{

            let storageMaterial = [];
            let d = "";
            for ( var k in materials){
                
                    
               
                        d=new Date(materials[k].storage.date); 
                        storageMaterial.push({"material_name": materials[k].name, "registry_type": materials[k].storage.registry_type, "quantity": materials[k].storage.quantity, "date": d.toLocaleString() });
                
            
            }
           // console.log(storageMaterial);
          //  console.log(materials);

            
            return ( 
                
                <TableFilter 
                width="100%"
                id="_id"
                // array JSON
                array={storageMaterial}
                // infos das colunas da tabela              
                infos={this.state.infos}
                // evento ao escrever no input (coluna, conteudo)
                onWrite={this.onWrite}
                // qtd de linhas
                limit={this.state.limit}
                // evento clica coluna (coluna, order-boolean)
                orderTable={this.orderTable}
                // default coluna ordenada
                column={this.state.column}
                order={this.state.order}
                />
            
            );

        }


    }else{
        return (
            <li className={css(styles.noItems)}>
                Nenhum produto cadastrado
            </li>
        );
    }
    
    
    
}

// 'proceduresList' will manage the routes inside the app
render() {
    const { match, materials, onClick } = this.props;
   
	return (
		<div >
            {this.renderItems(materials, match, onClick)}
		</div>
	);
}

}

export default StorageList;