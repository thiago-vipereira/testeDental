import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const UPDATE_GRID = 'UPDATE_GRID';
export const GET_GRID = 'GET_GRID';

var getFilterDate = (element, key) => {
  var today = new Date();
  var tomorrow = new Date();
  switch (element.time.type) {
    case "day":
      today.setDate(today.getDate() - element.time.last);
      tomorrow.setDate(tomorrow.getDate() + element.time.next);
      break;
    case "week":
      today.setDate(today.getDate() - element.time.last*7);
      tomorrow.setDate(tomorrow.getDate() + element.time.next*7);
      break;
    case "month":
      today.setMonth(today.getMonth() - element.time.last);
      today.setDate(1);
      tomorrow.setMonth(tomorrow.getMonth() + element.time.next);
      tomorrow.setDate(31);
      break;
    default:
      break;
  }
  var back = {type: "date"};

  var dd = ('0'+today.getDate()).slice(-2);
  var mm = ('0'+(today.getMonth()+1)).slice(-2);
  if (key === 'birthday')
    back.since = dd+'/'+mm;
  else {
    var yyyy = today.getFullYear();
    back.since = dd+'/'+mm+'/'+yyyy;
  }

  dd = ('0'+tomorrow.getDate()).slice(-2);
  mm = ('0'+(tomorrow.getMonth()+1)).slice(-2);
  if (key === 'birthday')
    back.to = dd+'/'+mm;
  else {
    yyyy = tomorrow.getFullYear();
    back.to = dd+'/'+mm+'/'+yyyy;
  }

  return back;
}

export function updateGrid(data, callback) {
	return async dispatch => {
		try {
      var copy = [...data];
      copy = copy.map((item) => {
        var cpy = {...item};
        cpy.element = cpy.element.map((itm) => {
          var cp = {...itm};
          if (cp.kind === 'text')
            cp.component = cp.component.map((it) => {
              var cop = {...it};
              delete cop.array;
              return cop;
            });
          else {
            delete cp.page;
            delete cp.array;
          }
          return cp;
        });
        return cpy;
      });
			const res = await axios.put(`/api/resume`, copy);
			
			dispatch({ type: UPDATE_GRID, payload: data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Dashboard atualizado com sucesso`, type: 'success' } });
      
      if (callback)
  			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao atualizar o Dashboard`, type: 'danger' } });
			console.log(err); 
		} 
	}
};

export function getGrid(callback) {
	return async dispatch => {
		try { 
      // const res = await axios.post(`/api/resume`);
      const res = await axios.get('/api/resume');
      for (var i=0; i<res.data.length; i++) {
        if (['patient', 'agenda'].includes(res.data[i].kind)) {
          for (var k=0; k<res.data[i].element.length; k++) {
            if (res.data[i].element[k].kind === 'text')
              for (var j=0; j<res.data[i].element[k].component.length; j++)
                res.data[i].element[k].component[j].array = {...await axios.post('/api/'+res.data[i].kind+'/filter', {...res.data[i].element[k].component[j].filters, [res.data[i].element[k].key]: getFilterDate(res.data[i].element[k].component[j], res.data[i].element[k].key)})}.data;
            else
              res.data[i].element[k].array = {...await axios.post('/api/'+res.data[i].kind+'/filter', {...res.data[i].element[k].filters, [res.data[i].element[k].key]: getFilterDate(res.data[i].element[k], res.data[i].element[k].key)})}.data;
          }
        }
      }
			dispatch({ type: GET_GRID, payload: res.data });

      if (callback)
        callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao carregar o Dashboard.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function save(card, callback) {
	return async dispatch => {
		try { 
      // const res = await axios.post(`/api/resume`);
      const res = await axios.post(`/api/resume/saved`, card);
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Modelo de card salvo`, type: 'success' } });
      
      if (callback)
        callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao salvar modelo de card.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteSaved(id, callback) {
	return async dispatch => {
		try { 
      // const res = await axios.post(`/api/resume`);
      const res = await axios.delete(`/api/resume/saved/${id}`);
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Modelo de card excluído`, type: 'success' } });
      
      if (callback)
        callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao excluir modelo de card`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function getSaved(type, callback) {
	return async dispatch => {
		try { 
      const res = await axios.put(`/api/resume/saved`, type);
      for (var i=0; i<res.data.length; i++) {
        if (['patient', 'agenda'].includes(res.data[i].kind)) {
          for (var k=0; k<res.data[i].element.length; k++) {
            if (res.data[i].element[k].kind === 'text')
              for (var j=0; j<res.data[i].element[k].component.length; j++)
                res.data[i].element[k].component[j].array = {...await axios.post('/api/'+res.data[i].kind+'/filter', {...res.data[i].element[k].component[j].filters, [res.data[i].element[k].key]: getFilterDate(res.data[i].element[k].component[j], res.data[i].element[k].key)})}.data;
            else
              res.data[i].element[k].array = {...await axios.post('/api/'+res.data[i].kind+'/filter', {...res.data[i].element[k].filters, [res.data[i].element[k].key]: getFilterDate(res.data[i].element[k], res.data[i].element[k].key)})}.data;
          }
        }
      }
      if (callback)
        callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao carregar modelos de card salvos.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};