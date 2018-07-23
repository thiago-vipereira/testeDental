import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Route, Redirect, NavLink } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './PatientFilesRouterStyles';

// import ListProcedureForm from '../../forms/procedure/ListProcedureForm';
import BreadcrumbBar from '../../bars/BreadcrumbBar';

import PathImages from './PathImages';
import PatientAnamnesisRouter from './PatientAnamnesisRouter';
import PatientDocumentRouter from './PatientDocumentRouter';

// 'ProcedureRouter' will manage the routes inside the patient module
class PatientFilesRouter extends Component {
  constructor(props) { 
    super(props); 

    this.getPaths = this.getPaths.bind(this);
    
    this.state = { 
      links: [],
      fileOptions: [
        { text: 'Anamneses', path: 'anamnesis' },
        { text: 'Prescrições', path: 'prescription' },
        { text: 'Atestados', path: 'attestations' },
        { text: 'Arquivos', path: 'image' }
      ]
    } 
  }

  componentDidMount() {
    const { location } = this.props;
    var paths = location.pathname.split('/');
    paths.splice(0, 5);
    if (paths[0] === 'image')
      this.getPaths(paths);
    else if (paths[0] === 'anamnesis') {
      const { selectedAnamnesis, selectedAnamnesisModel } = this.props;
      if (selectedAnamnesis || selectedAnamnesisModel)
        this.getAnamnesisLinks(paths, selectedAnamnesis, selectedAnamnesisModel);
      else
        this.getAnamnesisLinks(paths);
    }
    else if (paths[0] === 'prescription' || paths[0] === 'attestations') {
      const { selectedDocument, selectedDocumentModel } = this.props;
      if (selectedDocument || selectedDocumentModel)
        this.getDocumentLinks(paths, selectedDocument, selectedDocumentModel);
      else
        this.getDocumentLinks(paths);
    }
  }
 
  componentWillReceiveProps(nextProps, nextState) {
    const { location } = this.props;
    var paths = nextProps.location.pathname.split('/');
    paths.splice(0, 5);
    if (paths[0] === 'image') {
      if (location.pathname !== nextProps.location.pathname)
        this.getPaths(paths);
    }
    else if (paths[0] === 'anamnesis') {
      if (nextProps.selectedAnamnesis || nextProps.selectedAnamnesisModel)
        this.getAnamnesisLinks(paths, nextProps.selectedAnamnesis, nextProps.selectedAnamnesisModel);
      else if (location.pathname !== nextProps.location.pathname)
        this.getAnamnesisLinks(paths);
    }
    else if (paths[0] === 'prescription' || paths[0] === 'attestations') {
      if (nextProps.selectedDocument || nextProps.selectedDocumentModel)
        this.getDocumentLinks(paths, nextProps.selectedDocument, nextProps.selectedDocumentModel);
      else if (location.pathname !== nextProps.location.pathname)
        this.getDocumentLinks(paths);
    }
  }

  getAnamnesisLinks(paths, selectedAnamnesis, selectedModel) {
    var linksToState = [{ text: 'Anamneses', path: '/anamnesis', exact: true }];
    if (paths.length > 1) {
      if (paths[1] === 'create' && selectedModel)
        linksToState.push({ text: selectedModel.name, path: `/anamnesis/create/${selectedModel._id}` });
      else if (selectedAnamnesis)
        linksToState.push({ text: selectedAnamnesis.name, path: `/anamnesis/${selectedAnamnesis._id}` });
    }
    this.setState({ links: linksToState });
  }

  getDocumentLinks(paths, selectedDocument, selectedModel) {
    var findDocument = this.state.fileOptions.find((item) => item.path === paths[0])
    var linksToState = [{ text: findDocument.text, path: `/${paths[0]}`, exact: true }];
    if (paths.length > 1) {
      if (paths[1] === 'create' && selectedModel)
        linksToState.push({ text: selectedModel.name, path: `/${paths[0]}/create/${selectedModel._id}` });
      else if (selectedDocument)
        linksToState.push({ text: selectedDocument.name, path: `/${paths[0]}/${selectedDocument._id}` });
    }
    this.setState({ links: linksToState });
  }

  getPaths(paths) {
    var linksToState = [{ text: 'Arquivos', path: '/image', exact: true }], dir = '/image';
    paths.splice(0, 1);
    paths.map((item) => { dir+=`/${item}`; linksToState.push({ text: decodeURIComponent(item), path: dir, exact: true }) });
    this.setState({links: linksToState});
  }

  renderGroups() {
    const { match } = this.props;
    return (
      <ul className={css(styles.list)}>
        {this.state.fileOptions.map((item, index) =>
          <li key={'navLink_'+index}>
            <NavLink
              to={`${match.url}/${item.path}`}
              activeClassName={css(styles.active)}
              className={css(styles.listItem)}
            >
              {item.text}
            </NavLink>
          </li>
        )}
      </ul>
    )
  }

  render() {
    const { history, match } = this.props;
    return (
      <div className={css(styles.flex)}>
        <BreadcrumbBar history={history} match={match} links={this.state.links} />
        <div className={css(styles.grid)}>
          <div className={css(styles.formContent)}>
            <div className={css(styles.formGroup)}>
              <h3 className={css(styles.sectionTitle)}>VISUALIZAR</h3>
              <div className={css(styles.backgroundGroup)}>
                {this.renderGroups()}
              </div>
            </div>
            <div className={css(styles.formFiles)}>	
              <h3 className={css(styles.sectionTitle)}>{this.state.links[0] && this.state.links[0].text.toUpperCase()}</h3>
              <div className={css(styles.backgroundDocuments)}>
                <Route path={`${match.url}/anamnesis`} component={PatientAnamnesisRouter} />
                <Route path={`${match.url}/prescription`} component={PatientDocumentRouter} />
                <Route path={`${match.url}/attestations`} component={PatientDocumentRouter} />
                <Route path={`${match.url}/image`} component={PathImages} />
                <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}/anamnesis`} />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ patientAnamnesis, patientsCreation, anamnesis, patientDocument, model }) {
  return {
    selectedPatient: patientsCreation.selectedPatient,
    selectedAnamnesis: patientAnamnesis.selectedAnamnesis,
    selectedAnamnesisModel: anamnesis.selectedAnamnesis,
    selectedDocument: patientDocument.selectedDocument,
    selectedDocumentModel: model.selectedModel
	}; 
}

export default connect(mapStateToProps)(PatientFilesRouter);