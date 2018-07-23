import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { css } from 'aphrodite/no-important'; 
import { styles } from './ClinicUsersStyles';

import { fetchUsers, clearUser } from '../../../actions/users';

import UsersList from '../../lists/UsersList';
import NewUserForm from '../../forms/clinic/NewUserForm';
import PermissionsModal from '../../forms/clinic/modals/PermissionsModal';

import Button from '../../common/Button';
import Modal from '../../modals/Modal'; 

class ClinicUsers extends Component {
    constructor(props) { 
        super(props);

        this.onOpenNewUserModal = this.onOpenNewUserModal.bind(this);
        this.onCloseNewUserModal = this.onCloseNewUserModal.bind(this);
        this.onOpenPermissionsModal = this.onOpenPermissionsModal.bind(this);
        this.onClosePermissionsModal = this.onClosePermissionsModal.bind(this);

        this.renderList = this.renderList.bind(this);
        
        this.state = {
            users: [],
            newUserModal: false,
            permissionsModal: false,
            idPermissions: null,
        }
	} 
 
	componentDidMount() { 
        const { fetchUsers, clinic } = this.props;

        clearUser();
        // action the fetch all the users of he current logged in clinic
        if (clinic) {
            fetchUsers({ users: clinic.users });
        }       
    }

    onOpenNewUserModal() { 
		this.setState({ 
			newUserModal: true 
		}); 
	} 
 
	onCloseNewUserModal() { 
		this.setState({ 
			newUserModal: false 
		}); 
    }
    
    onOpenPermissionsModal(id) {
        this.setState({
            permissionsModal: true,
            idPermissions: id
        });
    }

    onClosePermissionsModal() { 
		this.setState({ 
			permissionsModal: false 
		}); 
    }

    renderList() {
        // the clinic users are mapped from the redux reducer to the component props in the mapStateToProps function below
        const { clinicUsers, match } = this.props;

        // if there are clinic users, it renders a list of them...
        if (clinicUsers && clinicUsers.length > 0) {
            return (
                <UsersList
                    users={clinicUsers}
                    match={match}
                    onClick={this.onOpenPermissionsModal}
                />
            );
        }

        // if not, it renders "loading"
        return <div className={css(styles.loading)}>Carregando...</div>;
    }
    
    render() {
        return (
            <div className={css(styles.grid)}>
                <div className={css(styles.listContainer)}>
                    <h3 className={css(styles.sectionTitle)}>Usuários cadastrados</h3>  
                    <div className={css(styles.backgroundCard)}>
                        {this.renderList()}

                        <Modal
                            isOpen={this.state.permissionsModal}
                            header="Permissões de Usuário"
                            adjustStyle={styles.permissionsModal}
                        >
                            <PermissionsModal onCancel={this.onClosePermissionsModal} userId={this.state.idPermissions} />
                        </Modal>

                        <Modal 
                            isOpen={this.state.newUserModal} 
                            header="Convidar Novo Usuário" 
                            adjustStyle={styles.newUserModal} 
                        >
                            <NewUserForm onCancel={this.onCloseNewUserModal} />
                        </Modal>

                        <Button
                            text="Convidar novo usuário"
                            onClick={this.onOpenNewUserModal}
                        />
                    </div>                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) { 
	return {
		//user: state.auth.user,
        clinic: state.auth.clinic,
        clinicUsers: state.clinicConfig.usersById
	}; 
}

export default connect(mapStateToProps, { fetchUsers })(ClinicUsers);