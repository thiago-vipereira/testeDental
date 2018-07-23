import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { NavLink, Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'

import { css } from 'aphrodite/no-important';
import { styles, stylesMarquee } from './PathImagesStyles';

import InputField from '../../forms/InputField';
import Button from '../../common/Button';
import Modal from '../../modals/Modal';
import Icon from '../../common/Icon';

import { 
  createFile,
  renameFile,
  deleteFile,
  createDirectory,
  renameDirectory,
  fetchDirectory,
  deleteDirectory
} from '../../../actions/patientsSearch';

// 'ProcedureRouter' will manage the routes inside the patient module
class PathImages extends Component {
  constructor(props) { 
    super(props); 

    this.getFiles = this.getFiles.bind(this);

    this.state = {
      showModalPath: false,
      showModalFile: false,
      showModalRenameFile: false,
      showMarquee: false,
      patientDir: {},
      currentDir: "/",
      fileRename: {},
      files: [],
      paths: [],
      doc: [],
      loaded: false,
      showModalRenamePath: false,
      oldNamePath: '',
      fileNames: [],
      msgTotalSize: 'Selecione os arquivos'
    } 
    var lkdjasl = {a: {b : {c: { d: {content: 'asjdopaskdposakd'}}}}}, copy;
    copy = lkdjasl.a;
    copy = copy.b;
    copy = copy.c;
    copy = copy.d;
    copy.content = 'jsjdasoijdsa';
  }

  componentDidMount() {
    const { fetchDirectory, selectedPatient } = this.props;
    if (selectedPatient)
      fetchDirectory(selectedPatient._id, (obj) => this.getFiles(window.location.pathname, obj));
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { fetchDirectory, selectedPatient } = this.props;
    if (selectedPatient)
      this.getFiles(window.location.pathname, this.state.patientDir);
    else if (nextProps.selectedPatient)
      fetchDirectory(nextProps.selectedPatient._id, (obj) => this.getFiles(window.location.pathname, obj));
  }

  getFiles(pathname, obj) {
    var splt = decodeURIComponent(pathname).split('/'), copy = {...obj};
    splt.splice(0, 6);
    splt.map((path) => {
      copy = {...copy[path]};
    });
    var content = [...copy.content?copy.content:[]];
    delete copy.content;
    console.log('setState');
    console.log({ files: content, paths: Object.keys(copy).map((item) => {return {name:item, shouldMove: false}}), patientDir: obj })
    this.setState({ files: content, paths: Object.keys(copy).map((item) => {return {name:item, shouldMove: false}}), patientDir: obj });
  }

  getExtension(name, url){
    var dots = name.split('.'),
    extension = dots[dots.length-1];
    if (['xls', 'xml','xlsx'].includes(extension))
      return <Icon icon='excel' size="ultra-large"/>;
    else if (['pdf'].includes(extension))
      return <Icon icon='pdf' size="ultra-large"/>;
    else if (['pptx'].includes(extension))
      return <Icon icon='ppt' size="ultra-large"/>;
    else if (['docx','txt', 'rtf'].includes(extension))
      return <Icon icon='word' size="ultra-large"/>;
    else if (['zip', 'rar'].includes(extension))
      return <Icon icon='zip' size="ultra-large"/>;
    else if (['jpg','jpeg','png', 'gif'].includes(extension))
      return <img className={css(styles.pictureExt)} src={url} />;
    else
      return <Icon icon='unknown' size="ultra-large"/>;
  }
/*
  getWidthDiv() {
    var widthDiv1 = getElementById("firstDiv").offsetWidth;
    var widthDiv2 = getElementById("secondDiv").offsetWidth;
    var showMarquee = false;

    if (widthDiv2 > widthDiv1) {
      this.setState.showMarquee = true;
    }

    return showMarquee;
  }
*/
  render () {
    return (
      <div style={{position: 'relative'}}>
        <Modal
					isOpen={this.state.showModalPath}
					header="Nova pasta"
					adjustStyle={styles.modal}
				>
          <div className={css(styles.modalContent)}>
            <InputField
              input={{
                name: 'name1',
                onChange: (e) => this.state.name = e.currentTarget.value,
              }}
              label={'Nome'}
            />
            <div>
              <Button
                text="Criar"
                color="green"
                onClick={() => {
                  const { createDirectory, selectedPatient } = this.props;
                  var splt = decodeURIComponent(window.location.pathname).split('/');
                  splt.splice(1, 5);
                  splt.push('');
                  createDirectory(selectedPatient._id, splt.join('/'), this.state.name, () => {
                    var splt = decodeURIComponent(window.location.pathname).split('/'), copy = this.state.patientDir;
                    splt.splice(0, 6);
                    splt.map((path) => {
                      copy = copy[path];
                    });
                    copy[this.state.name] = {content: []};
                    this.state.paths.push({name:this.state.name, shouldMove: false});
                    this.setState({showModalPath: false});
                  })
                }}
              />
              <Button
                right
                text="Cancelar"
                color="secondary"
                onClick={() => this.setState({showModalPath: false})}
              />
            </div>
          </div>
				</Modal>
        <Modal
					isOpen={this.state.showModalRenameFile}
					header="Renomear arquivo"
					adjustStyle={styles.modal}
				>
          <div className={css(styles.modalContent)}>
            <InputField
              input={{
                name: 'name3',
                onChange: (e) => this.state.name = e.currentTarget.value,
              }}
              label={'Nome'}
            />
            <div>
              <Button
                text="Salvar"
                color="green"
                onClick={() => {
                  const { renameFile, selectedPatient } = this.props;
                  var splt = decodeURIComponent(window.location.pathname).split('/');
                  splt.splice(1, 5);
                  splt.push('');
                  renameFile(selectedPatient._id, splt.join('/'), this.state.fileRename.hash, this.state.name, () => {
                    var splt = decodeURIComponent(window.location.pathname).split('/'), copy = this.state.patientDir;
                    splt.splice(0, 6);
                    splt.map((path) => {
                      copy = copy[path];
                    });
                    copy.content[copy.content.findIndex((item) => item.hash === this.state.fileRename.hash)].filename = this.state.name;
                    this.state.files[this.state.files.indexOf(this.state.fileRename.filename)] = this.state.name;

                    this.setState({showModalRenameFile: false});
                  })
                }}
              />
              <Button
                right
                text="Cancelar"
                color="secondary"
                onClick={() => this.setState({showModalRenameFile: false})}
              />
            </div>
          </div>
				</Modal>
        <Modal
					isOpen={this.state.showModalRenamePath}
					header="Renomear pasta"
					adjustStyle={styles.modal}
				>
          <div className={css(styles.modalContent)}>
            <InputField
              input={{
                name: 'name2',
                onChange: (e) => this.state.name = e.currentTarget.value,
              }}
              label={'Nome'}
            />
            <div>
              <Button
                text="Salvar"
                color="green"
                onClick={() => {
                  const { renameDirectory, selectedPatient } = this.props;
                  var splt = decodeURIComponent(window.location.pathname).split('/');
                  splt.splice(1, 5);
                  splt.push('');
                  renameDirectory(selectedPatient._id, splt.join('/'), this.state.oldNamePath, this.state.name, () => {
                    var splt = decodeURIComponent(window.location.pathname).split('/'), copy = this.state.patientDir;
                    splt.splice(0, 6);
                    splt.map((path) => {
                      copy = copy[path];
                    });
                    copy[this.state.name] = {...copy[this.state.oldNamePath]};
                    delete copy[this.state.oldNamePath];
                    this.state.paths[this.state.paths.findIndex((itm) => itm.name === this.state.oldNamePath)].name = this.state.name;
                    this.setState({showModalRenamePath: false});
                  })
                }}
              />
              <Button
                right
                text="Cancelar"
                color="secondary"
                onClick={() => this.setState({showModalRenamePath: false})}
              />
            </div>
          </div>
				</Modal>
        <Modal
					isOpen={this.state.showModalFile}
					header="Novo Arquivo"
					adjustStyle={styles.modal}
				>
          <div className={css(styles.modalContent)}>
            {/* <label className={css(styles.label)}>Selecione os arquivos</label> */}
            <div className={css(styles.gridPathModal)}>
              <label htmlFor="file-upload" className={css(styles.fileSelect)}>
                <Button
                  right
                  style={{pointerEvents: 'none'}}
                  icon={'image'}
                  color="secondary"
                />
              </label>
              <input id="file-upload" type="file" style={{display: 'none'}} multiple
                onChange={(e)=> {
                  var totalSize = 0;
                  var length = e.target.files.length;
                  for (var i=0; i<length; i++)
                    totalSize += (e.target.files[i].size / 1024);
                  if (totalSize < 1000)
                    totalSize = totalSize.toFixed(2) + ' KB';
                  else if (totalSize < 1000000)
                    totalSize = (totalSize/1000).toFixed(2) + ' MB';
                  else
                    totalSize = (totalSize/1000000).toFixed(2)+ ' GB';
                  this.setState({
                    doc: e.target.files,
                    fileNames: new Array(length).toString().split(","),
                    msgTotalSize: `${length} arquivo${length>1 ? 's': ''} selecionado${length>1 ? 's': ''} (${totalSize})`
                  });
                }}
              />
              <div>{this.state.fileNames.length>0?this.state.msgTotalSize:'Selecione os arquivos'}</div>
            </div>
            {this.state.fileNames.map((item, index) => 
              <div key={'fileToUpload_'+index}>
                <div className={css(styles.disabledInput)}>{`Arquivo ${index+1} - ${this.state.doc[index].name}`}</div>
                <InputField
                  input={{
                    name: 'nameFile_'+index,
                    onChange: (e) => this.state.fileNames[index] = e.currentTarget.value,
                  }}
                  label={'Nome'}
                />
              </div>
            )}
            <div>
              <Button
                text="Salvar"
                color="green"
                onClick={() => {
                  var splt = decodeURIComponent(window.location.pathname).split('/');
                  splt.splice(0, 6);
                  splt.push('');
                  const { createFile, selectedPatient } = this.props;
                  createFile(selectedPatient._id, this.state.doc, this.state.fileNames, splt.join('/'), this.state.name, (uploadedFiles) => {
                    var copy = this.state.patientDir;
                    splt.pop();
                    splt.map((path) => {
                      copy = copy[path];
                    });
                    copy.content.push(...uploadedFiles);
                    this.state.files.push(...uploadedFiles);
                    this.setState({showModalFile: false})
                  });
                }}
              />
              <Button
                right
                text="Cancelar"
                color="secondary"
                onClick={() => this.setState({showModalFile: false, doc: [], fileNames: [], msgTotalSize: ''})}
              />
            </div>
          </div>
				</Modal>
        <div className={css(styles.containerOptions)}>
          <div className={css(styles.link, styles.newFolder)} onClick={() => this.setState({showModalPath: true})}>
            <Icon icon="folder" size="small"/>
            <span className={css(styles.topText)}>Criar Pasta</span>
          </div>
          <div onClick={() => this.setState({showModalFile: true, doc: [], fileNames: [], msgTotalSize: 'Selecione os arquivos'})} className={css(styles.link, styles.newPicture)} style={{marginLeft: '1rem'}}>
            <Icon icon="plus" size="small"/>
            <span className={css(styles.topText)}>Enviar Arquivo</span>
          </div>
        </div>
        <div>
          <h4>Pastas</h4>
          <div className={css(styles.containerFolders)}>
            {this.state.paths.map((item, index) =>{
              return(
                <div className={css(styles.flexPath)} key={`path_${index}`}>
                  <div className={css(styles.flex)}>
                    <div className={css(styles.gear)} data-tip data-for={'confirmSplice1'+index} data-event='click'>
                      <Icon icon="gear" size="12px" color="grey" />
                    </div>
                    <div className={css(styles.tooltipContainer)}>
                      <ReactTooltip id={'confirmSplice1'+index} place="right" effect="solid" className={css(styles.tooltipFolder)} globalEventOff='click'>
                        <div className={css(styles.tooltipOption)}>
                          <Icon icon="edit" size="14px" color="grey" />
                          <div onClick={() => this.setState({showModalRenamePath: true, oldNamePath: item.name})} style={{lineHeight: '17px'}}>Renomear</div>
                        </div>
                        <div className={css(styles.tooltipOption)}>
                          <Icon icon="x" size="14px" color="grey" />
                          <div onClick={() => { 
                            var splt = decodeURIComponent(window.location.pathname).split('/'); 
                            splt.splice(1, 5); 
                            splt.push(''); 
                            const { deleteDirectory, selectedPatient } = this.props; 
                            deleteDirectory(selectedPatient._id, splt.join('/'), item.name, () => { 
                              var splt = decodeURIComponent(window.location.pathname).split('/'), copy = this.state.patientDir; 
                              splt.splice(0, 6); 
                              splt.map((path) => { 
                                copy = copy[path]; 
                              }); 
                              delete copy[item.name]; 
                              this.state.paths.splice(this.state.paths.findIndex((itm) => itm.name === item.name), 1); 
                              this.setState({}); 
                            }); 
                            }} style={{lineHeight: '17px'}}>
                            Excluir
                          </div>
                        </div>
                      </ReactTooltip>
                    </div>
                    <NavLink
                      to={`${window.location.pathname}/${item.name}`} className={css(styles.folders)}
                    >
                      <div>
                      <Icon color = "grey" icon="folder" size="normal"/>
                      </div>
                      <div ref={`firstDiv_${index}`} className={css(styles.folderNameBox)} onMouseEnter={() => {
                        this.state.paths[index].shouldMove = (this.refs[`secondDiv_${index}`].offsetWidth > this.refs[`firstDiv_${index}`].offsetWidth);
                        this.setState({});
                      }}>
                        <span ref={`secondDiv_${index}`} className={css(styles.folderName, item.shouldMove && stylesMarquee({length: item.name.length}).marqueeName)} onClick={() => this.getFiles(`${window.location.pathname}/${item.name}`, this.state.patientDir)}>
                          {item.name}
                        </span>
                      </div>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
          <h4>Arquivos</h4>
          <div className={css(styles.containerArchives)}>
            {this.state.files.map((item, index) =>
              <div className={css(styles.flexPath)} key={`path_${index}`}>
                <div className={css(styles.flex)}>
                  <div className={css(styles.gear)} data-tip data-for={'confirmSplice'+index} data-event='click'>
                    <Icon icon="gear" size="12px" color="grey" />
                  </div>
                  <div className={css(styles.tooltipContainer)}>
                    <ReactTooltip id={'confirmSplice'+index} place="right" effect="solid" className={css(styles.tooltipArchives)} globalEventOff='click'>
                      <div className={css(styles.tooltipOption)}>
                        <Icon icon="edit" size="14px" color="grey" />
                        <div onClick={() => this.setState({showModalRenameFile: true, fileRename: item})} style={{lineHeight: '17px'}}>Renomear</div>
                      </div>
                      <div onClick={() => {
                            var splt = decodeURIComponent(window.location.pathname).split('/');
                            splt.splice(1, 5);
                            splt.push('');
                            const { deleteFile, selectedPatient } = this.props;
                            deleteFile(selectedPatient._id, splt.join('/'), item.hash, () => {
                              var splt = decodeURIComponent(window.location.pathname).split('/'), copy = this.state.patientDir;
                              splt.splice(0, 6);
                              splt.map((path) => {
                                copy = copy[path];
                              });
                              copy.content.splice(copy.content.findIndex((itm) => item.hash === itm.hash), 1);
                              this.state.files.splice(index, 1);
                              this.setState({});
                            });
                          }} className={css(styles.tooltipOption)}>
                        <Icon icon="x" size="14px" color="grey" />
                        <div style={{lineHeight: '17px'}}>Excluir</div>
                      </div>
                    </ReactTooltip>
                  </div>
                  <Link to={`${item.url}`} target="_blank" className={css(styles.archives)}>
                    <div className={css(styles.archiveBox)}>
                      <div className={css(styles.pictures)}>
                        {this.getExtension(item.hash, item.url)}
                      </div>
                      <p className={css(styles.archiveName)}>{item.filename}</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ patientsCreation }) {
  return {
    selectedPatient: patientsCreation.selectedPatient
	}; 
}

export default connect(mapStateToProps, { 
  createFile,
  renameFile,
  deleteFile,
  createDirectory,
  renameDirectory,
  fetchDirectory,
  deleteDirectory
} )(PathImages);