import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Route } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { gridStyles } from '../DashboardStyles';
import { styles } from '../../forms/procedure/ProcedureFormStyles';

import ListModelForm from '../../forms/model/ListModelForm';
import EditModelForm from '../../forms/model/EditModelForm';
import EditPatternForm from '../../forms/model/EditPatternForm';
import EditAnamnesisForm from '../../forms/model/EditAnamnesisForm';
import BreadcrumbBar from '../../bars/BreadcrumbBar';

import { getMention } from '../../../actions/model';

// 'ModelsRouter' will manage the routes inside the patient module
class ModelsRouter extends Component {

  constructor(props) {
    super(props); 
    this.getLinks = this.getLinks.bind(this);
    this.state = {
      links: [],
      menu: []
    }
  }

  componentDidMount() {
    const { location } = this.props;
    this.getLinks(location.pathname);
  }

  componentWillMount() {
    const {getMention} = this.props;
    getMention();
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { location, selectedModel } = this.props;
    if (location.pathname !== nextProps.location.pathname)
      this.getLinks(nextProps.location.pathname);
    if (selectedModel !== nextProps.selectedModel || nextProps.location.pathname.split('/')[5])
      this.getLinks(nextProps.location.pathname, nextProps.selectedModel, nextProps.selectedAnamnesis);
  }

  getTypeFormat(link) {
    switch (link) {
      case "email":
        return {type:" de e-mail", format: "html"}
      break;
      case "sms":
        return {type:" de SMS", format: "text"}
        break;
      case "anamnesis":
        return {type:" de anamnese", format: "quiz"}
        break;
      case "prescription":
        return {type:" de prescrição", format: "html"}
        break;
      case "attestations":
        return {type:" de atestado", format: "html"}
        break;
      case "contracts":
        return {type:" de contrato", format: "html"}
        break;
      default:
        return {type:"", format: ""}
        break;
    }
  }

  getLinks(pathname, selectedModel, selectedAnamnesis) {
    this.setState({ links: [] });
    const links = pathname.split('/').slice(1);
    let linksToState = [];
    linksToState.push({ text: 'Lista de Modelos', path: '', exact: true });
    if (links.length > 1) {
      if (selectedAnamnesis && links[2] === "quiz")
        linksToState.push({ text: selectedAnamnesis.name, path: `/quiz/anamnesis/${selectedAnamnesis._id}` })
      else if (selectedModel) {
        var infos = this.getTypeFormat(selectedModel.type);
        linksToState.push({ text: selectedModel.name, path: `/${infos.format}/${selectedModel.type}/${selectedModel._id}` });
      }
      else if (links[2] === "html" || links[2] === "text" || links[2] === "quiz") {
        var infos = this.getTypeFormat(links[3]);
        linksToState.push({ text: "Novo Modelo"+infos.type, path: `/${infos.format}/${links[3]}`, exact: true });
      }
      else if (links[2] === "pattern") {
        linksToState.push({ text: "Cabeçalho e Rodapé", path: `/pattern`, exact: true });
      }
    }
    return this.setState({ links: linksToState });
  }

  render() {
    const { history, match } = this.props;
    return (
      <div className={css(gridStyles.flex)}>
        {<BreadcrumbBar history={history} match={match} links={this.state.links} />}
        <div className={css(gridStyles.flexScroll)}>
          <Route path={`${match.url}/pattern`} component={EditPatternForm} />
          <Route path={`${match.url}/text/:type?/:modelId?`} component={EditModelForm} />
          <Route path={`${match.url}/html/:type?/:modelId?`} component={EditModelForm} />
          <Route path={`${match.url}/quiz/anamnesis/:anamneseId?`} component={EditAnamnesisForm} />
          <Route exact path={`${match.url}`} component={ListModelForm} />
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
	return {
    selectedModel: state.model.selectedModel,
    selectedAnamnesis: state.anamnesis.selectedAnamnesis
	}; 
} 

export default connect(mapStateToProps, { getMention })(ModelsRouter);