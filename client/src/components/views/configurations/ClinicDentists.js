import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { css } from 'aphrodite/no-important'; 
import { styles } from './ClinicUsersStyles';

import { fetchDentists, clearDentist } from '../../../actions/dentists';

import DentistsList from '../../lists/DentistsList';
import Button from '../../common/Button';

import ModalDeleteDentist from '../../forms/dentist/modal/ModalDeleteDentist';
import Modal from '../../modals/Modal';

class ClinicDentists extends Component {
    constructor(props) { 
        super(props);

        this.onNewDentist = this.onNewDentist.bind(this);

        this.renderList = this.renderList.bind(this);

        this.onOpenModal = this.onOpenModal.bind(this); 
		this.onCloseModal = this.onCloseModal.bind(this);
        
        this.state = {
            showModal: false,
            dentistId: null,
            dentists: []
        }
	} 
 
	componentDidMount() {
        const { fetchDentists } = this.props;

        // action the fetch all the dentists of he current logged in clinic
        fetchDentists();
    }

    onNewDentist() { 
        const { history, match, clearDentist } = this.props;

        clearDentist();
        history.push(`${match.url}/dentist/registration`);
    }
    
    onOpenModal(id) { 
		this.setState({ 
              showModal: true,
              dentistId: id
		});
	} 
	 
	onCloseModal() {
		this.setState({
            showModal: false,
            dentistId: null
		}); 
	}

    renderList() {
        // the clinic users are mapped from the redux reducer to the component props in the mapStateToProps function below
        const { match, dentistsById } = this.props;

        // if there are dentists, it renders a list of them...
        if (dentistsById && dentistsById.length > 0) {
            return <DentistsList dentists={dentistsById} deleteDentist={this.onOpenModal} match={match} />;
        }

        // if not, it renders "loading"
        return <DentistsList dentists={[]} match={match} />;
    }
    
    render() {
        return (
            <div className={css(styles.grid)}>
                <div className={css(styles.listContainer)}>
                    <h3 className={css(styles.sectionTitle)}>Dentistas cadastrados</h3>  
                    <div className={css(styles.backgroundCard)}>
                        {this.renderList()}

                        <Button
                            text="Cadastrar novo dentista"
                            onClick={this.onNewDentist}
                        />
                    </div>                
                </div>
                <Modal 
                    isOpen={this.state.showModal} 
                    header="Deletar Dentista" 
                    adjustStyle={styles.newUserModal} 
                > 
                    <ModalDeleteDentist onCancel={this.onCloseModal} idDentist={this.state.dentistId} />
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) { 
	return {
        clinic: state.auth.clinic,
        dentistsById: state.clinicConfig.dentistsById
	}; 
}

export default connect(mapStateToProps, { fetchDentists, clearDentist })(ClinicDentists);