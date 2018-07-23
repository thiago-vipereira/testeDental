import axios from 'axios';
import { SHOW_MESSAGE } from '../actions/systemMsg';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_LOAD_CLINIC = 'AUTH_LOAD_CLINIC';
export const LOGOUT = 'LOGOUT';
export const UNAUTH = 'UNAUTH';

export const CHANGING_PASS = 'CHANGING_PASS';
export const APP_CHANGE_PASS = 'APP_CHANGE_PASS';
export const APP_CHANGE_PASS_ERROR = 'APP_CHANGE_PASS_ERROR';

export const GET_FULL_USER = 'GET_FULL_USER';
export const SELECT_CLINIC = 'SELECT_CLINIC';
export const DROP = 'DROP';
export const UPDATE_CLINIC = 'UPDATE_CLINIC';

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

export function logInUser({ email, password }, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/login', { email, password });
			const user = res.data;

			if (user.clinics.length > 1) {
				dispatch({ type: AUTH_LOAD_CLINIC, payload: user });

			} else {
				const clinic = await axios.get(`/api/${user.clinics[0].clinic_data}/clinic/${user.clinics[0].clinic_id}`);
				const auxReq = { 'user': user, 'clinic': clinic.data };
				
				await axios.post('/api/login', { auxReq, email: 'null', password: 'null' });

				dispatch({ type: AUTH_USER, payload: { user, clinic: clinic.data } });
				callback();
			}
		} catch(err) {
			dispatch({ type: UNAUTH, payload: err });
		}
	}
};

export function logInClinic({ user, clinicId, clinicDb }, callback) {
	return async dispatch => {
		try {
			const clinic = await axios.get(`/api/${clinicDb}/clinic/${clinicId}`);
			const auxReq = { 'user': user, 'clinic': clinic.data };

			await axios.post('/api/login', { auxReq, email: 'null', password: 'null' });

			dispatch({ type: AUTH_USER, payload: { user, clinic: clinic.data } });
			callback();
		} catch(err) {
			console.log(err);
		}
	}
};

export function logOutUser(callback) {
	return async dispatch => {
		try {
			const res = await axios.get('/api/logout');

			dispatch({ type: LOGOUT, payload: res.data });

			if (callback) {
				callback();
			}
			
		} catch(err) {
			console.log(err);
		}
	}
};

export function changePassEmail(email, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/user/send_pass', email);

			dispatch({ type: CHANGING_PASS, payload: res.data });
		} catch(err) {
			dispatch({ type: UNAUTH, payload: err.message });
		}
	}
};

export function changePassword(values, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/user/change_pass', values);
			if (typeof res.data !== 'string') {
				dispatch({ type: APP_CHANGE_PASS, payload: res.data });
				dispatch({ type: SHOW_MESSAGE, payload: { message: `Senha trocada com sucesso`, type: 'success' } });
			}

			callback(res.data);
			
		} catch(err) {
			console.log('error');
			callback('Oops! Senha incorreta');
		}
	}
}

export function getFullUser(userId, callback) {
	return async dispatch => {
		try {
			const res = await axios.get(`/api/user/${userId}`);
			
			dispatch({ type: GET_FULL_USER, payload: res.data });
			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};

export function getClinic({ clinicId, clinicDb }, callback) { 
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/${clinicDb}/clinic/${clinicId}`); 
			
			dispatch({ type: SELECT_CLINIC, payload: res.data });
			callback(res.data); 

		} catch(err) { 
			console.log(err); 
		} 
	} 
};

export function updateClinic(clinicData, clinicId, clinicDb, callback) { 
	return async dispatch => {
		try {
			const res = await axios.put(`/api/${clinicDb}/clinic/${clinicId}`, clinicData); 
			
			dispatch({ type: UPDATE_CLINIC, payload: res.data }); 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `As informações de ${res.data.name} foram salvas`, type: 'success' } }); 
			callback(res.data);
		
		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Aconteceu um erro`, type: 'danger' } }); 
		}
	} 
};
export function inUse(data, callback) { 
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/in_use`, data);
			if(res.data == 'out'){
				callback(false);
			}else if(res.data == false) {
				dispatch({ type: DROP, payload: res.data });
				callback(false);
			}
			callback(res.data);
		} catch(err) { 
			console.log(err); 
		} 
	}
};
export function updateDashboard(card, callback) { 
	return async dispatch => { 
		try { 
			var copy = [...card];
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
			const res = await axios.get(`/api/user/dashboard`, copy);
			dispatch({ type: UPDATE_GRID, payload: card });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Dashboard atualizado com sucesso`, type: 'success' } });
			if(callback)
				callback(res.data);
		} catch(err) { 
			console.log(err); 
		} 
	}
};
export function getDashboard(cards, callback) {
	return async dispatch => {
		try {
			var dashboard = cards;
      for (var i=0; i<dashboard.length; i++) {
        if (['patient', 'agenda'].includes(dashboard[i].kind)) {
          for (var k=0; k<dashboard[i].element.length; k++) {
            if (dashboard[i].element[k].kind === 'text')
              for (var j=0; j<dashboard[i].element[k].component.length; j++)
                dashboard[i].element[k].component[j].array = {...await axios.post('/api/'+dashboard[i].kind+'/filter', {...dashboard[i].element[k].component[j].filters, [dashboard[i].element[k].key]: getFilterDate(dashboard[i].element[k].component[j], dashboard[i].element[k].key)})}.data;
            else
              dashboard[i].element[k].array = {...await axios.post('/api/'+dashboard[i].kind+'/filter', {...dashboard[i].element[k].filters, [dashboard[i].element[k].key]: getFilterDate(dashboard[i].element[k], dashboard[i].element[k].key)})}.data;
          }
        }
      }
			dispatch({ type: GET_GRID, payload: dashboard });

      if (callback)
        callback(dashboard);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao carregar o Dashboard.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};
export function deleteCard(type, id, callback) { 
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/user/dashboard/${type}`, {id});
			if(callback)
				callback(res.data);
		} catch(err) { 
			console.log(err); 
		} 
	}
};
export function saveCard(type, card, callback) { 
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/user/dashboard/${type}`, card);
			if(callback)
				callback(res.data);
		} catch(err) { 
			console.log(err); 
		} 
	}
};